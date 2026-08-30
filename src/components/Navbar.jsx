import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenMenu, onOpenSearch, onOpenCart, cartCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-3 left-4 right-4 md:left-8 md:right-8 z-50 flex justify-between items-center px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-sm text-gray-900 transition-all">
      
      {/* 2 Lines Header Button */}
      <button 
        onClick={onOpenMenu}
        className="text-gray-900 hover:opacity-75 transition-opacity focus:outline-none"
        title="Menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="9" y2="9"/>
          <line x1="4" x2="20" y1="15" y2="15"/>
        </svg>
      </button>

      {/* Brand Logo */}
      <div 
        onClick={() => navigate('/')}
        className="text-xl md:text-2xl font-semibold tracking-[0.2em] text-gray-900 cursor-pointer select-none"
      >
        LS FASHION STORE
      </div>

      {/* Right Action Icons (Only Search & Cart) */}
      <div className="flex items-center gap-4 md:gap-5 text-gray-900">
        
        {/* Search Icon */}
        <button 
          onClick={onOpenSearch} 
          className="hover:opacity-75 transition-opacity focus:outline-none"
          title="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>

        {/* Cart Icon with Dynamic Red Badge */}
        <button 
          onClick={onOpenCart}
          className="relative hover:opacity-75 transition-opacity focus:outline-none"
          title="Cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <line x1="3" x2="21" y1="6" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>

          {/* Red Badge Dot */}
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-sm">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;