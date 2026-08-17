"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, User, LogOut } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);
  
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Trang Chủ" },
    { href: "/about", label: "Về Chúng Tôi" },
    { href: "/menu", label: "Thực Đơn" },
    { href: "/spaces", label: "Không Gian" },
    { href: "/packages", label: "Gói Tiệc" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-lumina-black/90 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
        <Link href="/" className="font-playfair text-3xl uppercase tracking-widest text-white">
          Lumina<span className="text-lumina-gold italic">.</span>
        </Link>

        <ul className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link 
                href={link.href} 
                className={`text-sm uppercase tracking-widest transition-colors duration-300 hover:text-lumina-gold relative group ${
                  pathname === link.href ? "text-lumina-gold" : "text-white/80"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-lumina-gold transition-transform duration-300 ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
              </Link>
            </li>
          ))}
          <li>
            <Link 
              href="/reservation" 
              className="text-sm uppercase tracking-widest text-lumina-gold border-b border-lumina-gold pb-1 hover:text-yellow-200 transition-colors"
            >
              Đặt Bàn Ngay
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <Link href="/reservation" className="relative text-lumina-gold hover:text-yellow-200 transition-colors">
            <ShoppingBag size={24} strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
              >
                {cartItemCount}
              </motion.span>
            )}
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm uppercase tracking-wider hidden lg:block">
                Xin chào, {user.fullName.split(" ")[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="text-white/60 hover:text-red-400 transition-colors"
                title="Đăng xuất"
              >
                <LogOut size={20} strokeWidth={1.5} />
              </button>
            </div>
          ) : (
            <Link href="/login">
              <User size={24} strokeWidth={1.5} className="text-white/80 hover:text-lumina-gold transition-colors" />
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
