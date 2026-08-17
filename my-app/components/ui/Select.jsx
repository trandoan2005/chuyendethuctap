import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, id, options = [], className = '', ...props }) {
  return (
    <div className={`relative mb-6 ${className}`}>
      <select
        id={id}
        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-inter appearance-none focus:outline-none focus:bg-white/10 focus:border-lumina-gold transition-all duration-300"
        {...props}
      >
        <option value="" disabled selected hidden>{label}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value} className="bg-lumina-gray text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <ChevronDown size={20} />
      </div>
    </div>
  );
}
