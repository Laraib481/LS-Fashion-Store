import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopifyFetch } from '../utils/shopify';

// Category (product_type), Tag اور Title تینوں میں سرچ کرنے کے لیے Query
const SEARCH_PRODUCTS_QUERY = `
  query SearchProducts($query: String!) {
    products(first: 4, query: $query) {
      edges {
        node {
          id
          title
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;

const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  // Escape key press support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Fast & Dynamic API Search with AbortController
  useEffect(() => {
    if (!isOpen) return;

    // اگر پچھلی کوئی Request اب بھی چل رہی ہے تو اسے Cancel کر دیں
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const term = searchTerm.trim();
    
    // Title, Category (product_type), اور Tag تینوں پر Match کرے گا
    const searchQuery = term 
      ? `(title:*${term}* OR product_type:*${term}* OR tag:*${term}*)` 
      : "";

    setLoading(true);

    const timer = setTimeout(async () => {
      try {
        const response = await shopifyFetch({
          query: SEARCH_PRODUCTS_QUERY,
          variables: { query: searchQuery },
          signal: controller.signal // Signal pass for fast cancellation
        });

        if (!controller.signal.aborted) {
          const fetchedProducts = response?.data?.products?.edges.map(edge => edge.node) || [];
          setProducts(fetchedProducts);
          setLoading(false);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Error fetching Shopify products:", error);
          setLoading(false);
        }
      }
    }, 250); // Fast 250ms debounce delay

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, isOpen]);

  if (!isOpen) return null;

  const handleProductClick = (handle) => {
    setSearchTerm("");
    onClose();
    navigate(`/product/${handle}`);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-6 md:pt-14 px-4">
      {/* Background Dimmed Blurred Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Glassmorphism Centered Search Card */}
      <div className="relative w-full max-w-2xl bg-white/35 backdrop-blur-2xl border border-white/50 rounded-2xl shadow-2xl p-4 md:p-6 z-10 overflow-hidden">

        {/* Top Search Input Bar */}
        <div className="relative flex items-center mb-4">
          <span className="absolute left-4 text-gray-700">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>

          <input
            type="text"
            placeholder="Search products or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full bg-white/40 backdrop-blur-md border border-white/60 rounded-full py-2.5 pl-11 pr-10 text-sm text-gray-900 placeholder-gray-600 focus:outline-none focus:bg-white/60 transition-all shadow-inner"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-xs text-gray-700 hover:bg-black/20 hover:text-black transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Category Header Bar */}
        <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg py-2 px-4 mb-4 text-center">
          <span className="text-xs font-semibold text-gray-800 tracking-wide">
            {searchTerm ? `Results for "${searchTerm}"` : "Featured Collection"}
          </span>
        </div>

        {/* Dynamic Product Grid / Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="p-1">
                <div className="aspect-[3/4] bg-gray-300/40 rounded-lg mb-2" />
                <div className="h-3 bg-gray-300/40 rounded w-3/4 mb-1" />
                <div className="h-3 bg-gray-300/40 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {products.map((product) => {
              const price = product.priceRange?.minVariantPrice;
              const formattedPrice = price
                ? `Rs. ${parseFloat(price.amount).toLocaleString()}`
                : '';

              return (
                <div 
                  key={product.id} 
                  onClick={() => handleProductClick(product.handle)}
                  className="group cursor-pointer p-1 rounded-lg hover:bg-white/20 transition-all"
                >
                  <div className="aspect-[3/4] bg-gray-200/50 rounded-lg overflow-hidden mb-2 border border-white/30 shadow-sm">
                    <img
                      src={product.featuredImage?.url || '/placeholder.jpg'}
                      alt={product.featuredImage?.altText || product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h4 className="text-[11px] font-medium text-gray-900 truncate group-hover:underline">
                    {product.title}
                  </h4>
                  {product.productType && (
                    <span className="text-[9px] text-gray-500 block truncate">
                      {product.productType}
                    </span>
                  )}
                  <p className="text-[10px] font-bold text-gray-700 mt-0.5">
                    {formattedPrice}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-gray-600 font-medium">
            No products or categories found matching "{searchTerm}"
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchModal;