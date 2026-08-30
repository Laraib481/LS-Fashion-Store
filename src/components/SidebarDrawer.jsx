import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const categories = ["Unstitched", "Western Wear", "Footwear", "Accessories", "Fragrance"];

const collectionMapping = {
  "Unstitched": "unstitched",
  "Western Wear": "western-wear",
  "Footwear": "heels",
  "Accessories": "accessories",
  "Fragrance": "fragrance"
};

const SidebarDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCategoryClick = (categoryName) => {
    onClose();
    const handle = collectionMapping[categoryName] || categoryName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/shop?collection=${handle}`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex">
      {/* Dimmed Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main Glass Drawer */}
      <div className="relative w-80 md:w-96 bg-white/50 backdrop-blur-2xl text-gray-900 h-full flex flex-col z-10 shadow-2xl border-r border-white/60 transition-all">
        
        {/* Top Header */}
        <div className="p-5 border-b border-gray-900/10 flex justify-between items-center bg-white/30 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-black/70 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-gray-800 uppercase">
              Navigation Menu
            </span>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/20 text-gray-900 flex items-center justify-center transition-all font-bold text-sm hover:rotate-90"
          >
            ✕
          </button>
        </div>

        {/* Quick Main Route Buttons */}
        <div className="p-4 grid grid-cols-3 gap-2.5 bg-white/20 border-b border-gray-900/10">
          <Link
            to="/"
            onClick={onClose}
            className="py-2.5 text-center bg-white/60 hover:bg-black hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            🏠 Home
          </Link>
          <Link
            to="/shop"
            onClick={onClose}
            className="py-2.5 text-center bg-white/60 hover:bg-black hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            🛍️ Shop All
          </Link>
          <Link
            to="/checkout"
            onClick={onClose}
            className="py-2.5 text-center bg-white/60 hover:bg-black hover:text-white rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border border-white/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            💳 Checkout
          </Link>
        </div>

        {/* Clean Category List */}
        <div className="flex-1 py-5 px-5 overflow-y-auto space-y-4">
          <div>
            <p className="text-[10px] tracking-widest text-gray-500 font-extrabold uppercase mb-3 px-1">
              Explore Collections
            </p>
            <ul className="space-y-2">
              {categories.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(item)}
                    className="w-full flex justify-between items-center py-3 px-4 rounded-xl bg-white/30 hover:bg-white/80 text-xs md:text-sm font-semibold text-gray-800 hover:text-black transition-all duration-200 group border border-white/50 hover:border-white shadow-sm hover:shadow-md text-left"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item}</span>
                    <svg 
                      className="w-4 h-4 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sleek Minimalist Footer */}
        <div className="p-4 bg-white/30 border-t border-gray-900/10 text-center">
          <p className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
            Premium Apparel & Accessories
          </p>
        </div>

      </div>
    </div>
  );
};

export default SidebarDrawer;