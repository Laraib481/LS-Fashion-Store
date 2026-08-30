import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopifyFetch } from '../utils/shopify';

// Shopify collections GraphQL query
const GET_STORE_COLLECTIONS = `
  query GetStoreCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          image {
            url
            altText
          }
        }
      }
    }
  }
`;

// Fallback collections array if Shopify dynamic fetch is loading or empty
const fallbackCollections = [
  {
    id: "col-1",
    rank: "1",
    tag: "MOST POPULAR",
    title: "UNSTITCHED",
    handle: "unstitched",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "col-2",
    rank: "2",
    tag: "TRENDING",
    title: "WESTERN WEAR",
    handle: "western-wear",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "col-3",
    rank: "3",
    tag: "NEW ARRIVAL",
    title: "FOOTWEAR",
    handle: "heels",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "col-4",
    rank: "4",
    tag: "ESSENTIALS",
    title: "ACCESSORIES",
    handle: "accessories",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "col-5",
    rank: "5",
    tag: "SIGNATURE",
    title: "FRAGRANCE",
    handle: "fragrance",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
  }
];

const TopCollections = ({ title = "Our Featured Collections" }) => {
  const [collectionsList, setCollectionsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  // Dynamic fetch directly from Shopify Storefront API
  useEffect(() => {
    const fetchCollections = async () => {
      setLoading(true);
      try {
        const response = await shopifyFetch({ query: GET_STORE_COLLECTIONS });
        const fetchedCols = response?.data?.collections?.edges?.map((edge, index) => ({
          id: edge.node.id,
          rank: `${index + 1}`,
          tag: index === 0 ? "FEATURED" : "COLLECTION",
          title: edge.node.title,
          handle: edge.node.handle,
          image: edge.node.image?.url || "https://via.placeholder.com/600x800"
        })) || [];

        if (fetchedCols.length > 0) {
          setCollectionsList(fetchedCols);
        } else {
          setCollectionsList(fallbackCollections);
        }
      } catch (err) {
        console.error("Error loading top collections:", err);
        setCollectionsList(fallbackCollections);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (handle) => {
    navigate(`/shop?collection=${encodeURIComponent(handle)}`);
  };

  return (
    <section className="relative py-20 bg-[#FAF8F5] text-stone-800 overflow-hidden border-b border-stone-200/60">
      
      {/* Warm Ambient Glow Effects */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-100/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/30 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-12 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.25em] text-amber-900/70 mb-2 block">
            Curated Edits
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-stone-900 uppercase font-serif">
            {title}
          </h2>
        </div>

        {/* Carousel Slider Wrapper */}
        <div className="relative">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-300 border border-stone-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          {/* Horizontal Scroll Track */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-7 overflow-x-auto scrollbar-none scroll-smooth py-6 px-3"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loading ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="flex-shrink-0 w-64 h-80 rounded-2xl bg-white/60 border border-stone-200 animate-pulse" />
              ))
            ) : (
              collectionsList.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => handleCardClick(item.handle)}
                  className="relative flex-shrink-0 w-60 md:w-64 group cursor-pointer"
                >
                  
                  {/* Stylized Rank Watermark */}
                  <span className="absolute -left-5 -bottom-2 text-[120px] font-serif font-extrabold text-stone-300/40 select-none z-0 leading-none pointer-events-none">
                    {item.rank}
                  </span>

                  {/* Card Main Body */}
                  <div className="relative z-10 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 aspect-[3/4] bg-stone-100 border border-stone-200/80 group-hover:border-amber-900/20">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent pt-16 pb-5 px-4 text-center flex flex-col items-center">
                      
                      <span className="bg-stone-900/90 backdrop-blur-md text-white text-[8px] font-semibold px-2.5 py-0.5 rounded-full tracking-widest uppercase mb-2 border border-white/10">
                        {item.tag}
                      </span>

                      <h3 className="text-white text-xs md:text-sm font-medium tracking-widest uppercase font-serif">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-stone-800 hover:bg-stone-900 hover:text-white transition-all duration-300 border border-stone-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

        </div>

      </div>
    </section>
  );
};

export default TopCollections;