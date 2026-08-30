// Example Page Component
const Shop = () => {
  return (
    <div className="animate-fade-in transition-all duration-500">
      {/* Page Content */}
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { fetchShopifyProducts, fetchCollectionProducts } from '../services/shopify';

// Real Shopify collections list
const categories = ["All", "Unstitched", "Western Wear", "Footwear", "Accessories", "Fragrance"];

// Collection Name -> Shopify Handle Mapping
const categoryToHandle = {
  "Unstitched": "unstitched",
  "Western Wear": "western-wear",
  "Footwear": "heels",
  "Accessories": "accessories",
  "Fragrance": "fragrance"
};

const ShopPage = ({ onAddToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionParam = searchParams.get('collection');

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activeCategory = "All";

    if (collectionParam) {
      const foundCategory = Object.keys(categoryToHandle).find(
        (key) => categoryToHandle[key].toLowerCase() === collectionParam.toLowerCase()
      );
      activeCategory = foundCategory || collectionParam;
    }

    setSelectedCategory(activeCategory);
    loadData(activeCategory, collectionParam);
  }, [collectionParam]);

  const loadData = async (cat, rawHandle) => {
    setLoading(true);
    let data = [];
    
    const handle = categoryToHandle[cat] || rawHandle;

    if (cat !== "All" && handle) {
      data = await fetchCollectionProducts(handle);
    } else {
      data = await fetchShopifyProducts();
    }
    
    setProducts(data || []);
    setLoading(false);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      setSearchParams({});
    } else {
      const handle = categoryToHandle[cat] || cat.toLowerCase().replace(/\s+/g, '-');
      setSearchParams({ collection: handle });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF8F5] text-stone-800 pt-28 pb-20 px-4 md:px-12 overflow-hidden">
      
      {/* Soft Cream & Warm Ambient Background Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-amber-100/60 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-orange-100/40 rounded-full blur-[140px] pointer-events-none animate-pulse delay-1000" />
      <div className="absolute bottom-10 left-1/3 w-[350px] h-[350px] bg-stone-200/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Light Glass Header Card */}
        <div className="text-center mb-10 py-10 px-6 rounded-3xl bg-white/60 backdrop-blur-xl border border-stone-200/70 shadow-sm">
          <h1 className="text-3xl md:text-5xl font-light tracking-widest text-stone-900 uppercase font-serif">
            {selectedCategory === "All" ? "Our Collections" : selectedCategory}
          </h1>
          <p className="text-xs md:text-sm text-stone-500 mt-3 font-light tracking-wide max-w-lg mx-auto">
            Discover our curated luxury apparel and seasonal edits, crafted for elegant everyday wear.
          </p>
        </div>

        {/* Category Pills (Warm Glass Theme) */}
        <div className="flex justify-start md:justify-center gap-3 mb-12 overflow-x-auto pb-4 scrollbar-none px-2">
          {categories.map((cat) => {
            const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 py-2.5 text-xs font-medium tracking-wider rounded-full transition-all duration-300 backdrop-blur-md whitespace-nowrap ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-md scale-105'
                    : 'bg-white/70 text-stone-600 border border-stone-200/80 hover:bg-white hover:text-stone-900 hover:border-stone-400'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white/50 border border-stone-200/60 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-lg rounded-3xl border border-stone-200/70 shadow-sm">
            <p className="text-sm font-light text-stone-600">No products found in "{selectedCategory}"</p>
            <button
              onClick={() => handleCategorySelect("All")}
              className="mt-5 px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-stone-800 transition-all shadow-md"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative flex flex-col justify-between bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-stone-200/80 hover:border-amber-900/20 hover:shadow-xl hover:bg-white/90 transition-all duration-500 shadow-sm"
              >
                <div>
                  <Link 
                    to={`/product/${encodeURIComponent(product.id)}`} 
                    className="aspect-[3/4] bg-stone-100 rounded-xl overflow-hidden relative block"
                  >
                    <img 
                      src={product.image || "https://via.placeholder.com/400x500"} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-white text-[9px] font-semibold px-2.5 py-1 rounded-md tracking-widest uppercase">
                      NEW
                    </span>
                  </Link>

                  <div className="mt-4 px-1">
                    <span className="text-[9px] uppercase font-semibold text-stone-400 tracking-widest">
                      {selectedCategory !== "All" ? selectedCategory : "COLLECTION"}
                    </span>
                    <Link 
                      to={`/product/${encodeURIComponent(product.id)}`} 
                      className="block text-xs font-medium text-stone-900 hover:text-amber-900 mt-1 line-clamp-1 transition-colors"
                    >
                      {product.title}
                    </Link>
                    <p className="text-sm text-stone-900 font-bold mt-1">
                      Rs. {product.price ? product.price.toLocaleString() : '0'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart && onAddToCart(product)}
                  className="mt-4 w-full py-2.5 bg-stone-900 text-white hover:bg-amber-900 text-xs font-medium tracking-wider rounded-xl transition-all duration-300 shadow-sm"
                >
                  Add To Cart +
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ShopPage;