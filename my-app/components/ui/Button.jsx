import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  isLoading = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-inter uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-lumina-gold text-black border border-lumina-gold hover:bg-transparent hover:text-lumina-gold',
    secondary: 'bg-transparent text-white border border-white/20 hover:border-lumina-gold hover:text-lumina-gold',
    ghost: 'bg-transparent text-gray-300 hover:text-white',
  };

  const sizes = {
    sm: 'text-xs py-2 px-4',
    md: 'text-sm py-3 px-8',
    lg: 'text-base py-4 px-10',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
