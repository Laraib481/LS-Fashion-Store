import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onOpenMenu, onOpenSearch, onOpenCart, cartCount = 0 }) => {
  const navigate = useNavigate();

  const handleLogoKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-3 left-4 right-4 md:left-8 md:right-8 z-50 flex justify-between items-center px-4 md:px-6 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-sm text-gray-900 transition-all">
      
      {/* 2 Lines Header Button */}
      <button 
        type="button"
        onClick={onOpenMenu}
        aria-label="Open Navigation Menu"
        className="p-1 text-gray-900 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-lg"
        title="Menu"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" x2="20" y1="9" y2="9"/>
          <line x1="4" x2="20" y1="15" y2="15"/>
        </svg>
      </button>

      {/* Brand Logo */}
      <div 
        role="button"
        tabIndex={0}
        onClick={() => navigate('/')}
        onKeyDown={handleLogoKeyDown}
        className="text-base sm:text-xl md:text-2xl font-semibold tracking-[0.2em] text-gray-900 cursor-pointer select-none text-center focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-lg px-2"
      >
        LS FASHION STORE
      </div>

      {/* Right Action Icons (Search & Cart) */}
      <div className="flex items-center gap-3 md:gap-5 text-gray-900">
        
        {/* Search Icon */}
        <button 
          type="button"
          onClick={onOpenSearch} 
          aria-label="Open Search"
          className="p-1 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-lg"
          title="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
        </button>

        {/* Cart Icon with Dynamic Badge */}
        <button 
          type="button"
          onClick={onOpenCart}
          aria-label={`Shopping Cart with ${cartCount} items`}
          className="relative p-1 hover:opacity-75 transition-opacity focus:outline-none focus:ring-2 focus:ring-stone-400 rounded-lg"
          title="Cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
            <line x1="3" x2="21" y1="6" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>

          {/* Dynamic Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[10px] font-bold min-w-4 h-4 px-1 rounded-full flex items-center justify-center leading-none shadow-sm">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </button>

      </div>

    </nav>
  );
};

export default Navbar;