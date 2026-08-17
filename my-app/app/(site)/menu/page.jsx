"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import FoodService from "@/services/FoodService";
import { Plus, ShoppingBag, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

export default function MenuPage() {
  const { addToCart, cart } = useCart();
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const categories = ["Tất cả", "Món chính", "Khai vị", "Đồ uống", "Tráng miệng", "Combo"];

  useEffect(() => {
    FoodService.getAll()
      .then(data => {
        const mappedData = data.map(f => ({
          id: f.foodId,
          name: f.foodName,
          price: f.price.toLocaleString(),
          cat: f.category,
          desc: f.description,
          img: f.imageUrl || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop"
        }));
        setFoods(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi gọi API foods:", err);
        setLoading(false);
      });
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
  };

  const filteredFoods = activeTab === "Tất cả" ? foods : foods.filter(f => f.cat === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      {/* Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center -mt-[100px]">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop" 
            alt="Menu Header" 
            fill 
            className="object-cover"
            priority 
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <p className="text-lumina-gold text-sm tracking-[4px] uppercase mb-4 font-inter">A Culinary Journey</p>
          <h1 className="text-5xl md:text-7xl font-playfair text-white">Thực Đơn A La Carte</h1>
        </motion.div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 max-w-7xl py-24">
        
        {/* Category Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`pb-2 uppercase tracking-widest text-sm font-medium transition-all duration-300 relative ${
                activeTab === cat ? "text-lumina-gold" : "text-white/60 hover:text-white"
              }`}
            >
              {cat}
              {activeTab === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-lumina-gold"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-lumina-gold">
            <Loader2 className="animate-spin w-10 h-10 mb-4" />
            <p className="tracking-[2px] text-sm uppercase">Đang tải thực đơn...</p>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredFoods.map(item => (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  layout
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-lumina-gold/40 transition-colors duration-500 flex flex-col"
                >
                  <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <Image 
                      src={item.img} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-lumina-black via-lumina-black/20 to-transparent opacity-80"></div>
                  </div>
                  
                  <div className="p-6 relative z-10 flex flex-col flex-grow -mt-16">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-playfair text-xl text-white">{item.name}</h3>
                      <span className="text-lumina-gold font-semibold font-inter whitespace-nowrap ml-4">{item.price}đ</span>
                    </div>
                    
                    <p className="text-white/60 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                    
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
                      <span className="text-xs text-white/40 uppercase tracking-widest">{item.cat}</span>
                      <button 
                        onClick={() => handleAdd(item)}
                        className="bg-lumina-gold/10 text-lumina-gold hover:bg-lumina-gold hover:text-black w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
                        title="Đặt trước"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Link href="/reservation" className="bg-lumina-gold text-black w-16 h-16 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform duration-300">
              <ShoppingBag size={24} />
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[11px] w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-lumina-black">
                {cart.reduce((total, item) => total + item.qty, 0)}
              </div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
