"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Home() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center -mt-[100px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
            alt="Lumina Restaurant"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-lumina-black"></div>
        </div>

        <motion.div 
          className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={fadeUpVariant} className="text-lumina-gold text-sm md:text-base tracking-[4px] uppercase mb-6 font-inter">
            Nghệ Thuật Ẩm Thực Tinh Tế
          </motion.p>
          <motion.h1 variants={fadeUpVariant} className="text-5xl md:text-7xl lg:text-8xl mb-12 drop-shadow-2xl font-playfair leading-tight">
            Trải Nghiệm <br className="hidden md:block"/> Ẩm Thực Đỉnh Cao
          </motion.h1>
          
          <motion.div variants={fadeUpVariant} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/reservation">
              <Button variant="primary" size="lg">Đặt Bàn Ngay</Button>
            </Link>
            <Link href="/menu">
              <Button variant="secondary" size="lg">Khám Phá Thực Đơn</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeUpVariant} className="text-lumina-gold text-sm tracking-[4px] uppercase mb-4">Về Lumina</motion.p>
              <motion.h2 variants={fadeUpVariant} className="text-4xl md:text-5xl mb-8 leading-tight">
                Tinh Hoa <br/> Ẩm Thực Đương Đại
              </motion.h2>
              <motion.p variants={fadeUpVariant} className="text-white/60 text-lg leading-relaxed mb-10">
                Lumina mang đến trải nghiệm thưởng thức tinh tế nhất. Không gian nhà hàng được thiết kế theo 
                lối kiến trúc tối giản sang trọng, kết hợp cùng nguồn nguyên liệu hảo hạng nhất được tuyển chọn 
                khắt khe bởi Bếp trưởng Michelin 3 sao.
              </motion.p>
              <motion.div variants={fadeUpVariant}>
                <Link href="/about" className="text-lumina-gold uppercase tracking-[2px] font-bold text-sm hover:text-yellow-200 transition-colors flex items-center gap-2">
                  Tìm hiểu thêm <span className="text-lg">→</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop" 
                alt="Fine Dining" 
                fill 
                className="object-cover" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 relative bg-[url('https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-lumina-black/90 backdrop-blur-sm"></div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-gradient-gold text-4xl md:text-5xl inline-block">Dịch Vụ Nổi Bật</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-panel p-12 text-center group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🍽️</div>
              <h3 className="text-2xl mb-4">A La Carte</h3>
              <p className="text-white/60 mb-8 leading-relaxed max-w-sm mx-auto">
                Sự giao thoa hoàn hảo giữa ẩm thực Á Đông và phương pháp nấu ăn hiện đại của Pháp.
              </p>
              <Link href="/menu">
                <Button variant="secondary">Xem Thực Đơn</Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="glass-panel p-12 text-center group"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">🥂</div>
              <h3 className="text-2xl mb-4">Sự Kiện Đặc Biệt</h3>
              <p className="text-white/60 mb-8 leading-relaxed max-w-sm mx-auto">
                Không gian linh hoạt, thiết kế cá nhân hóa dành riêng cho những buổi tiệc đẳng cấp.
              </p>
              <Link href="/reservation">
                <Button variant="secondary">Thiết Kế Sự Kiện</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 text-center max-w-4xl"
        >
          <div className="text-lumina-gold text-8xl font-playfair leading-none opacity-50 mb-[-2rem]">"</div>
          <p className="italic text-2xl md:text-4xl text-white my-10 font-playfair leading-relaxed">
            Một bữa ăn ngon không chỉ làm no bụng, mà còn chạm đến tận cùng của cảm xúc và ký ức.
          </p>
          <div className="tracking-[3px] text-xs md:text-sm uppercase text-lumina-gold font-bold">
            - Bếp Trưởng Pierre Gagnaire
          </div>
        </motion.div>
      </section>
    </>
  );
}
