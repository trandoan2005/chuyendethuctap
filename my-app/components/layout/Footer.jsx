import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-lumina-black border-t border-white/5 pt-24 pb-12 mt-auto">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          <div className="md:col-span-5">
            <Link href="/" className="font-playfair text-4xl mb-6 block text-white">
              Lumina<span className="text-lumina-gold italic">.</span>
            </Link>
            <p className="text-white/60 text-base leading-relaxed max-w-sm mb-8">
              Nơi hội tụ tinh hoa ẩm thực và nghệ thuật tổ chức sự kiện đẳng cấp. Trải nghiệm không gian sang trọng và dịch vụ hoàn hảo tại Lumina.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-lumina-gold hover:border-lumina-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-lumina-gold hover:border-lumina-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-lumina-gold hover:border-lumina-gold transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="font-inter text-sm tracking-[2px] uppercase text-white mb-8 border-b border-white/10 pb-4 inline-block">Khám Phá</h4>
            <ul className="space-y-4">
              <li><Link href="/menu" className="text-white/60 hover:text-lumina-gold transition-colors block">Thực Đơn A La Carte</Link></li>
              <li><Link href="/spaces" className="text-white/60 hover:text-lumina-gold transition-colors block">Không Gian Nhà Hàng</Link></li>
              <li><Link href="/packages" className="text-white/60 hover:text-lumina-gold transition-colors block">Gói Dịch Vụ Tiệc</Link></li>
              <li><Link href="/reservation" className="text-white/60 hover:text-lumina-gold transition-colors block">Đặt Bàn Ngay</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-inter text-sm tracking-[2px] uppercase text-white mb-8 border-b border-white/10 pb-4 inline-block">Liên Hệ</h4>
            <ul className="space-y-4 text-white/60">
              <li className="flex items-start gap-3">
                <span className="text-lumina-gold">📍</span>
                <span>123 Nguyễn Văn Linh<br/>Quận 7, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lumina-gold">📞</span>
                <span>1900 8888</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lumina-gold">✉️</span>
                <span>contact@lumina.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-lumina-gold">🕒</span>
                <span>10:00 - 23:00 hàng ngày</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="text-center pt-8 border-t border-white/5 text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} Lumina Restaurant & Banquet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
