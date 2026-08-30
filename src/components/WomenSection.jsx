import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopifyFetch } from '../utils/shopify';

// GraphQL query to fetch products by collection handle
const GET_PRODUCTS_BY_COLLECTION = `
  query GetCollectionProducts($handle: String!) {
    collection(handle: $handle) {
      title
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 2) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

const tabsConfig = [
  { label: "ACCESSORIES", handle: "accessories" },
  { label: "UNSTITCHED", handle: "unstitched" },
  { label: "WESTERN WEAR", handle: "western-wear" },
  { label: "HEELS", handle: "heels" }
];

const fallbackProductsData = {
  "accessories": [
    { id: "acc-1", handle: "luxury-leather-handbag", title: "Luxury Leather Handbag", price: "4,250", currency: "PKR", badge: "NEW", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80" },
    { id: "acc-2", handle: "minimalist-gold-sunglasses", title: "Minimalist Gold Sunglasses", price: "2,100", currency: "PKR", badge: "HOT", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" },
    { id: "acc-3", handle: "elegance-pearl-pendant", title: "Elegance Pearl Pendant", price: "1,850", currency: "PKR", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80" }
  ],
  "unstitched": [
    { id: "uns-1", handle: "3-piece-embroidered-lawn", title: "3-Piece Embroidered Lawn", price: "6,990", currency: "PKR", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
    { id: "uns-2", handle: "2-piece-digital-printed-lawn", title: "2-Piece Digital Printed Lawn", price: "4,500", currency: "PKR", badge: "NEW", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
    { id: "uns-3", handle: "3-piece-luxury-chiffon-suit", title: "3-Piece Luxury Chiffon Suit", price: "8,800", currency: "PKR", badge: "LUXURY", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80" }
  ],
  "western-wear": [
    { id: "west-1", handle: "oversized-denim-jacket", title: "Oversized Denim Jacket", price: "5,400", currency: "PKR", badge: "TRENDING", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80" },
    { id: "west-2", handle: "classic-cotton-crop-shirt", title: "Classic Cotton Crop Shirt", price: "2,990", currency: "PKR", badge: "HOT", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
    { id: "west-3", handle: "tailored-smart-blazer", title: "Tailored Smart Blazer", price: "7,200", currency: "PKR", badge: "EXCLUSIVE", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" }
  ],
  "heels": [
    { id: "heel-1", handle: "classic-pointed-stiletto-heels", title: "Classic Pointed Stiletto Heels", price: "5,800", currency: "PKR", badge: "BEST SELLER", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80" },
    { id: "heel-2", handle: "strappy-ankle-block-heels", title: "Strappy Ankle Block Heels", price: "4,600", currency: "PKR", badge: "NEW ARRIVAL", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80" },
    { id: "heel-3", handle: "velvet-evening-pump-heels", title: "Velvet Evening Pump Heels", price: "6,200", currency: "PKR", badge: "POPULAR", image: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80" }
  ]
};

const WomenSection = ({
  title = "Curated Spotlight",
  subtitle = "Explore top trending picks across our signature edits"
}) => {
  const [activeTab, setActiveTab] = useState(tabsConfig[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const fetchTabProducts = async () => {
      setLoading(true);
      try {
        const response = await shopifyFetch({
          query: GET_PRODUCTS_BY_COLLECTION,
          variables: { handle: activeTab.handle }
        });

        const fetchedItems = response?.data?.collection?.products?.edges?.map(({ node }) => ({
          id: node.id,
          handle: node.handle,
          title: node.title,
          price: Math.round(node.priceRange?.minVariantPrice?.amount || 0).toLocaleString(),
          currency: node.priceRange?.minVariantPrice?.currencyCode || "PKR",
          image: node.images?.edges[0]?.node?.url || "https://via.placeholder.com/600x800"
        })) || [];

        if (isMounted) {
          if (fetchedItems.length > 0) {
            setProducts(fetchedItems);
          } else {
            setProducts(fallbackProductsData[activeTab.handle] || fallbackProductsData["accessories"]);
          }
        }
      } catch (err) {
        console.error("Error fetching section products:", err);
        if (isMounted) {
          setProducts(fallbackProductsData[activeTab.handle] || fallbackProductsData["accessories"]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchTabProducts();
    return () => { isMounted = false; };
  }, [activeTab]);

  const handleProductClick = (item) => {
    const routeParam = item.handle || item.id;
    navigate(`/product/${routeParam}`);
  };

  const handleExploreClick = () => {
    navigate(`/shop?collection=${encodeURIComponent(activeTab.handle)}`);
  };

  return (
    <section className="py-20 px-4 md:px-12 bg-[#FAF8F5] text-stone-800 border-b border-stone-200/60 relative">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-amber-900/70 mb-2 block">
          Spotlight Selection
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-light text-stone-900 tracking-wide uppercase">
          {title}
        </h2>
        <p className="text-xs md:text-sm text-stone-500 mt-2 font-light">
          {subtitle}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center items-center gap-6 md:gap-10 border-b border-stone-200/80 max-w-2xl mx-auto mb-12 overflow-x-auto scrollbar-none">
        {tabsConfig.map((tab) => (
          <button
            key={tab.handle}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`text-xs md:text-sm font-medium tracking-widest transition-all relative pb-3 uppercase whitespace-nowrap ${
              activeTab.handle === tab.handle
                ? 'text-stone-900 font-semibold border-b-2 border-amber-900'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {loading ? (
          [1, 2, 3, 4].map((n) => (
            <div key={n} className="aspect-[3/4] bg-stone-200/60 rounded-2xl animate-pulse" />
          ))
        ) : (
          <>
            {/* Products (First 3) */}
            {products.slice(0, 3).map((item) => (
              <div 
                key={item.id} 
                onClick={() => handleProductClick(item)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden rounded-2xl border border-stone-200/80 mb-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-white text-[9px] font-semibold px-2.5 py-1 rounded-full tracking-widest uppercase">
                      {item.badge}
                    </span>
                  )}

                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      type="button"
                      className="w-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-medium py-2.5 rounded-xl shadow-md hover:bg-stone-900 hover:text-white transition-colors"
                    >
                      View Product
                    </button>
                  </div>
                </div>

                <div className="px-1 text-center sm:text-left">
                  <h3 className="text-xs md:text-sm font-medium text-stone-900 truncate tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs text-amber-900 font-semibold mt-1">
                    {item.currency} {item.price}
                  </p>
                </div>
              </div>
            ))}

            {/* 4th Card: Explore Collection */}
            <div 
              onClick={handleExploreClick}
              className="relative aspect-[3/4] bg-stone-900 overflow-hidden rounded-2xl group cursor-pointer border border-stone-800 shadow-md flex flex-col justify-between p-6"
            >
              <img
                src={products[0]?.image || "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80"}
                alt="Explore Category"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
              />

              <div className="relative z-10">
                <span className="text-[10px] text-amber-300 font-semibold uppercase tracking-widest block mb-1">
                  Collection Edit
                </span>
                <h4 className="text-white text-xl font-serif font-light tracking-wide uppercase">
                  Explore {activeTab.label}
                </h4>
              </div>

              <div className="relative z-10">
                <p className="text-stone-300 text-xs font-light mb-4">
                  View all items in {activeTab.label.toLowerCase()} collection.
                </p>
                <div className="w-full bg-white text-stone-900 text-xs font-semibold py-3 px-4 rounded-xl group-hover:bg-amber-100 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <span>Explore {activeTab.label}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default WomenSection;