import React from 'react';

export default function Input({ label, id, className = '', ...props }) {
  return (
    <div className={`relative mb-6 ${className}`}>
      <input
        id={id}
        className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-inter placeholder-transparent focus:outline-none focus:bg-white/10 focus:border-lumina-gold transition-all duration-300 peer"
        placeholder={label}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-6 top-4 text-gray-400 text-sm font-inter transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:text-lumina-gold peer-focus:bg-lumina-black px-1"
      >
        {label}
      </label>
    </div>
  );
}
