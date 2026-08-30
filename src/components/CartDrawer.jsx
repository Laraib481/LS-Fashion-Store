import React from 'react';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Dimmed Overlay */}
      <div 
        onClick={onClose} 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
      />

      {/* Main Glass Drawer - Fully Responsive Width */}
      <div className="relative w-full sm:w-80 md:w-96 bg-white/50 backdrop-blur-2xl text-gray-900 h-full flex flex-col z-10 shadow-2xl border-l border-white/60 transition-all duration-300">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-gray-900/10 flex items-center justify-between bg-white/30">
          <span className="text-xs sm:text-sm font-bold tracking-widest text-gray-800 uppercase">
            Your Shopping Bag ({cartItems.length})
          </span>
          <button 
            type="button"
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 text-gray-900 transition-colors font-bold text-sm active:scale-95"
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 sm:py-20 px-4">
              <p className="text-xs font-medium text-gray-500 mb-4">Your shopping bag is currently empty.</p>
              <button 
                onClick={() => { onClose(); navigate('/shop'); }}
                className="bg-white/80 hover:bg-black hover:text-white border border-white text-gray-900 text-xs font-bold px-6 py-3 rounded-xl uppercase tracking-wider transition-all shadow-sm active:scale-95"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-3 bg-white/40 backdrop-blur-md p-3 rounded-2xl border border-white/80 shadow-sm transition-all hover:bg-white/60"
              >
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-20 sm:w-20 sm:h-24 object-cover rounded-xl border border-white/80 flex-shrink-0" 
                />
                
                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex justify-between items-start gap-1">
                      <h3 className="text-xs font-bold text-gray-900 leading-tight line-clamp-1">{item.title}</h3>
                      
                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onRemoveItem ? onRemoveItem(item.id) : onUpdateQuantity(item.id, -item.quantity)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 -mt-1 -mr-1 flex-shrink-0"
                        title="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 font-semibold mt-0.5">Size: {item.size || 'M'}</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-900 mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 bg-white/70 border border-white/90 rounded-xl w-fit px-1 py-0.5 shadow-sm mt-2">
                    <button 
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, -1)} 
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-black hover:text-white rounded-lg transition-colors active:scale-95"
                    >
                      -
                    </button>
                    <span className="text-xs font-bold px-2 text-gray-900">{item.quantity}</span>
                    <button 
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, 1)} 
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-gray-700 hover:bg-black hover:text-white rounded-lg transition-colors active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Subtotal & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-gray-900/10 bg-white/40 space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold text-gray-800">
              <span>Subtotal</span>
              <span className="text-sm sm:text-base font-extrabold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-gray-500">Taxes and shipping calculated at checkout.</p>
            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-md active:scale-98"
            >
              Proceed to Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartDrawer;