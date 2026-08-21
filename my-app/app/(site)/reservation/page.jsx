"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import BookingService from "@/services/BookingService";
import PackageService from "@/services/PackageService";
import TableService from "@/services/TableService";
import { Calendar, Clock, Users, X, Check, Search, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function UnifiedBookingPage() {
  const router = useRouter();
  const { cart, getTotalPrice } = useCart();
  
  const [packages, setPackages] = useState([]);
  const [tables, setTables] = useState([]);
  const [searched, setSearched] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  
  const tablesRef = useRef(null);
  const formRef = useRef(null);
  
  const [filterData, setFilterData] = useState({
    bookingType: "REGULAR",
    date: "",
    time: "",
    guests: "2"
  });

  const [formData, setFormData] = useState({
    eventType: "", 
    packageId: "", 
    name: "",
    email: "",
    phone: "",
    requests: ""
  });

  useEffect(() => {
    PackageService.getActive().then(res => setPackages(res)).catch(e => console.error(e));

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setFormData(prev => ({
          ...prev,
          name: user.fullName || "",
          email: user.email || "",
          phone: user.phone || ""
        }));
      } catch (e) {}
    }
    
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const defaultDate = `${yyyy}-${mm}-${dd}`;
    setFilterData(prev => ({ ...prev, date: defaultDate }));
    
    TableService.checkAvailability(defaultDate, '18:00', 2).then(response => {
      const availableTables = response.availableTables || response || [];
      let matchedTables = Array.isArray(availableTables) ? availableTables.filter(t => t.capacity >= 2) : [];
      setTables(matchedTables);
    }).catch(e => console.error(e));
  }, []);

  const handleFilterChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    setSearched(false);
    setSelectedTable(null);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchTables = async () => {
    if (!filterData.date || !filterData.time || !filterData.guests) {
      return alert("Vui lòng nhập đủ Ngày, Giờ và Số lượng khách để tìm bàn!");
    }
    
    const selectedDate = new Date(filterData.date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate < today) {
      return alert("Ngày đặt không hợp lệ!");
    }

    try {
      setLoading(true);
      const response = await TableService.checkAvailability(filterData.date, filterData.time, filterData.guests);
      const availableTables = response.availableTables || response || [];
      const guestCount = parseInt(filterData.guests);
      let matchedTables = Array.isArray(availableTables) ? availableTables.filter(t => t.capacity >= guestCount) : [];
      
      if (["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType)) {
        if (guestCount < 10) {
          alert("Các loại Đặt Tiệc thường yêu cầu từ 10 khách trở lên. Đang tự động tìm bàn phù hợp.");
        }
      }

      setTables(matchedTables);
      setSearched(true);
      
      setTimeout(() => {
        tablesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      console.error(err);
      alert("Lỗi khi tìm kiếm bàn trống.");
    } finally {
      setLoading(false);
    }
  };

  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedTable) {
      return alert("Vui lòng chọn một Không gian / Bàn trước!");
    }
    
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      alert("Vui lòng đăng nhập trước khi xác nhận đặt bàn!");
      router.push("/login");
      return;
    }
    
    if (!formData.name || !formData.phone || !formData.email) {
      return alert("Vui lòng nhập đầy đủ thông tin liên hệ!");
    }

    setShowDepositModal(true);
  };

  const handleFinalSubmit = async () => {
    const userStr = localStorage.getItem("user");
    const user = JSON.parse(userStr);
    
    setLoading(true);

    const bookingTypeEnum = ["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) ? "PARTY" : "REGULAR";

    const bookingRequest = {
      userId: user.userId,
      tableId: selectedTable.id || selectedTable.tableId,
      bookingType: bookingTypeEnum,
      packageId: bookingTypeEnum === "PARTY" && formData.packageId ? parseInt(formData.packageId) : null,
      eventType: filterData.bookingType === "BIRTHDAY" ? "Sinh Nhật" : filterData.bookingType === "COMPANY" ? "Tiệc Công Ty" : formData.eventType,
      bookingDate: filterData.date,
      bookingTime: filterData.time + ":00",
      guestCount: parseInt(filterData.guests),
      note: formData.requests,
      items: cart.map(item => ({ foodId: item.id, quantity: item.qty }))
    };

    try {
      await BookingService.createBooking(bookingRequest);
      setShowDepositModal(false);
      setSubmitted(true);
    } catch (err) {
      alert("Lỗi kết nối hoặc xử lý từ Server.");
    } finally {
      setLoading(false);
    }
  };

  const bookingTypeOptions = [
    { value: "REGULAR", label: "Bàn Thường (Gia đình/Bạn bè)" },
    { value: "PARTY", label: "Đặt Tiệc Chung" },
    { value: "BIRTHDAY", label: "Tiệc Sinh Nhật" },
    { value: "COMPANY", label: "Tiệc Công Ty / Hội Họp" },
    { value: "DRINK", label: "Bàn Nhậu / Chill" }
  ];

  if (submitted) {
    return (
      <div className="container mx-auto px-6 flex items-center justify-center min-h-[80vh] py-32">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="glass-panel p-16 text-center max-w-2xl w-full"
        >
          <div className="w-24 h-24 bg-lumina-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-lumina-gold">
            <Check size={48} className="text-lumina-gold" />
          </div>
          <h2 className="text-gradient-gold text-4xl font-playfair mb-6">Đặt Bàn Thành Công!</h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Cảm ơn quý khách <strong className="text-white font-medium">{formData.name}</strong>. Yêu cầu đặt bàn của quý khách tại <strong className="text-white font-medium">{selectedTable.name || selectedTable.tableNumber}</strong> vào lúc <strong className="text-white font-medium">{filterData.time} ngày {filterData.date}</strong> đã được ghi nhận. 
            <br/><br/>Hệ thống đã xác nhận tiền cọc của bạn. Quản lý nhà hàng sẽ liên hệ sớm nhất để xác nhận lại chi tiết.
          </p>
          <Button onClick={() => router.push("/")} size="lg">Về Trang Chủ</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-[-1]">
        <Image 
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop" 
          alt="Reservation Background" 
          fill 
          className="object-cover opacity-20"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-lumina-black/80 to-lumina-black"></div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-32 min-h-screen">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-gradient-gold text-5xl font-playfair mb-4">Lumina Reservation</h1>
          <p className="text-white/60 tracking-[2px] uppercase text-sm">Tìm Kiếm Không Gian Trải Nghiệm</p>
        </motion.div>

        {/* STEP 1: FILTER */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <Select 
              label="Mục Đích Đặt" 
              id="bookingType"
              name="bookingType"
              value={filterData.bookingType} 
              onChange={handleFilterChange}
              options={bookingTypeOptions}
              className="mb-0"
            />
            
            <div className="relative">
              <Input 
                type="number" 
                label="Số Lượng Khách" 
                name="guests" 
                min="1"
                value={filterData.guests} 
                onChange={handleFilterChange}
                className="mb-0"
              />
              <Users size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
            </div>

            <div className="relative">
              <Input 
                type="date" 
                label="Ngày Đến" 
                name="date" 
                value={filterData.date} 
                onChange={handleFilterChange}
                className="mb-0 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <div className="relative">
              <Input 
                type="time" 
                label="Giờ Đến" 
                name="time" 
                value={filterData.time} 
                onChange={handleFilterChange}
                className="mb-0 [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>
          </div>
          
          <Button 
            className="w-full mt-8" 
            size="lg"
            onClick={handleSearchTables}
            isLoading={loading}
          >
            <Search size={18} className="mr-2" />
            Lọc Không Gian Phù Hợp
          </Button>
        </motion.div>

        {/* STEP 2: AVAILABLE TABLES */}
        <div ref={tablesRef} className="mb-16 scroll-mt-24">
          <AnimatePresence>
            {searched && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-2xl font-playfair text-center mb-10 text-white">
                  {tables.length > 0 ? `Chúng tôi tìm thấy ${tables.length} không gian phù hợp cho bạn` : "Rất tiếc, không có bàn trống phù hợp với yêu cầu của bạn!"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tables.map((table) => {
                    const isSelected = selectedTable && (selectedTable.id === table.id || selectedTable.tableId === table.tableId);
                    return (
                      <motion.div 
                        key={table.id || table.tableId} 
                        whileHover={{ y: -5 }}
                        onClick={() => handleTableSelect(table)}
                        className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'ring-2 ring-lumina-gold shadow-[0_0_30px_rgba(212,175,55,0.2)]' 
                            : 'border border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="relative h-[250px] w-full">
                          <Image 
                            src={table.imageUrl || table.img || "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070"} 
                            alt={table.tableNumber || table.name} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                          
                          <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-lumina-gold/50 text-lumina-gold text-xs uppercase tracking-widest">
                            {table.area || table.tag}
                          </div>
                          
                          {isSelected && (
                            <div className="absolute top-4 right-4 bg-lumina-gold text-black p-1 rounded-full">
                              <Check size={16} strokeWidth={3} />
                            </div>
                          )}

                          <h3 className="absolute bottom-6 left-6 text-3xl font-playfair text-white m-0">
                            {table.tableNumber || table.name}
                          </h3>
                        </div>
                        <div className="bg-lumina-gray p-6">
                          <p className="text-white/60 text-sm leading-relaxed h-[45px] overflow-hidden mb-6">
                            {table.description || table.desc}
                          </p>
                          <div className="flex justify-between items-center border-t border-white/5 pt-4">
                            <span className="text-white/80 text-sm flex items-center gap-2">
                              <Users size={16} className="text-lumina-gold" />
                              Sức chứa: <strong className="text-lumina-gold">{table.capacity} khách</strong>
                            </span>
                            <span className={`text-sm uppercase tracking-widest font-semibold ${isSelected ? 'text-lumina-gold' : 'text-white/40'}`}>
                              {isSelected ? "Đã Chọn" : "Chọn Không Gian"}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* STEP 3: FORM */}
        <AnimatePresence>
          {selectedTable && (
            <motion.div 
              ref={formRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel p-10 scroll-mt-24"
            >
              <div className="text-center mb-12 border-b border-white/10 pb-8">
                <h2 className="text-gradient-gold text-3xl font-playfair mb-3">
                  Xác nhận đặt: {selectedTable.tableNumber || selectedTable.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
                  <span className="flex items-center gap-2"><Clock size={16} className="text-lumina-gold"/> {filterData.time}</span>
                  <span className="flex items-center gap-2"><Calendar size={16} className="text-lumina-gold"/> {filterData.date}</span>
                  <span className="flex items-center gap-2"><Users size={16} className="text-lumina-gold"/> {filterData.guests} khách</span>
                </div>
              </div>

              <form onSubmit={handlePreSubmit}>
                
                {/* DỊCH VỤ KÈM THEO */}
                {(["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) || cart.length > 0) && (
                  <h3 className="text-xl font-playfair text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-lumina-gold text-black flex items-center justify-center text-sm font-bold font-inter">1</span> 
                    Dịch Vụ Kèm Theo
                  </h3>
                )}

                {["PARTY", "BIRTHDAY", "COMPANY"].includes(filterData.bookingType) && (
                  <div className="mb-10 pl-11">
                    <h4 className="text-white/60 text-sm uppercase tracking-widest mb-4">Chọn Gói Dịch Vụ Tiệc (Tùy chọn):</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div 
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${formData.packageId === "" ? 'bg-lumina-gold/10 border-lumina-gold text-lumina-gold' : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'}`}
                        onClick={() => setFormData({ ...formData, packageId: "" })}
                      >
                        <h4 className="text-center text-sm font-medium">Không dùng gói (Tự chọn món)</h4>
                      </div>
                      {packages.map(pkg => (
                        <div 
                          key={pkg.packageId}
                          className={`p-4 rounded-xl border cursor-pointer transition-all text-center ${formData.packageId === pkg.packageId.toString() ? 'bg-lumina-gold/10 border-lumina-gold' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                          onClick={() => setFormData({ ...formData, packageId: pkg.packageId.toString() })}
                        >
                          <h4 className={`text-base font-playfair mb-1 ${formData.packageId === pkg.packageId.toString() ? 'text-lumina-gold' : 'text-white'}`}>{pkg.packageName}</h4>
                          <span className="text-white/50 text-xs uppercase tracking-widest font-semibold">Từ {pkg.price.toLocaleString()}đ</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {cart.length > 0 && (
                  <div className="mb-12 pl-11">
                    <div className="bg-black/30 border border-white/5 rounded-xl p-6">
                      <h4 className="text-white/80 text-sm uppercase tracking-widest mb-4 border-b border-white/10 pb-4">Món ăn đã chọn trước (Từ Giỏ Hàng):</h4>
                      <div className="space-y-3 mb-6">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <span className="text-white/70"><span className="text-white font-medium mr-2">{item.qty}x</span> {item.name}</span>
                            <span className="text-lumina-gold font-inter">{item.price}đ</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <span className="text-white uppercase tracking-widest text-sm font-semibold">Tổng tạm tính thực đơn:</span>
                        <span className="text-xl text-lumina-gold font-semibold">{getTotalPrice().toLocaleString()}đ</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* THÔNG TIN LIÊN HỆ */}
                <h3 className="text-xl font-playfair text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-lumina-gold text-black flex items-center justify-center text-sm font-bold font-inter">2</span> 
                  Thông Tin Liên Hệ
                </h3>
                
                <div className="pl-11">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <Input type="text" label="Họ và tên" name="name" value={formData.name} onChange={handleFormChange} required />
                    <Input type="tel" label="Số điện thoại" name="phone" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <Input type="email" label="Email" name="email" value={formData.email} onChange={handleFormChange} required />
                  
                  <div className="relative mb-8">
                    <textarea 
                      name="requests" 
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-inter focus:outline-none focus:bg-white/10 focus:border-lumina-gold transition-all duration-300 min-h-[120px] resize-y placeholder-transparent peer"
                      placeholder="Yêu cầu đặc biệt" 
                      value={formData.requests} 
                      onChange={handleFormChange}
                    ></textarea>
                    <label className="absolute left-6 top-4 text-gray-400 text-sm font-inter transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lumina-gold peer-focus:bg-lumina-black px-1">
                      Yêu cầu đặc biệt (Ghi chú, dị ứng...)
                    </label>
                  </div>

                  {/* CỌC TIỀN CAUTION */}
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-8 flex items-start gap-4">
                    <Info className="text-red-400 shrink-0 mt-1" />
                    <div>
                      <h4 className="text-red-400 font-semibold mb-2">Quy định đặt chỗ</h4>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Để đảm bảo trải nghiệm tốt nhất và giữ đúng không gian bàn <strong className="text-white">{selectedTable.tableNumber || selectedTable.name}</strong>, nhà hàng yêu cầu <strong className="text-white">thanh toán trước khoản cọc 500,000 VNĐ</strong>.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" isLoading={loading}>
                    XÁC NHẬN & THANH TOÁN CỌC
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* DEPOSIT MODAL */}
      <AnimatePresence>
        {showDepositModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-lumina-dark border border-white/10 rounded-2xl max-w-md w-full p-8 text-center relative shadow-2xl"
            >
              <button 
                onClick={() => setShowDepositModal(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-gradient-gold text-2xl font-playfair mb-4">Thanh Toán Cọc</h2>
              <p className="text-white/60 text-sm mb-8">
                Vui lòng quét mã QR để chuyển khoản <strong className="text-white">500,000 VNĐ</strong> giữ chỗ.
              </p>

              <div className="bg-white p-4 rounded-xl inline-block mb-8">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PAY_DEPOSIT_${Date.now()}`} alt="QR Code" className="w-[200px] h-[200px]" />
              </div>

              <div className="text-left bg-black/30 p-5 rounded-xl border border-white/5 mb-8 text-sm">
                <p className="mb-2 text-white/60">Ngân hàng: <strong className="text-white">Vietcombank</strong></p>
                <p className="mb-2 text-white/60">Số TK: <strong className="text-white text-base">1900 888 888</strong></p>
                <p className="mb-2 text-white/60">Tên: <strong className="text-white">LUMINA RESTAURANT</strong></p>
                <p className="text-white/60">Nội dung: <strong className="text-white bg-white/10 px-2 py-1 rounded">COC BAN {formData.phone}</strong></p>
              </div>

              <Button className="w-full" onClick={handleFinalSubmit} isLoading={loading}>
                TÔI ĐÃ CHUYỂN KHOẢN
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
