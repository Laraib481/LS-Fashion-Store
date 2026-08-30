import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopifyFetch } from '../utils/shopify';

const GET_COLLECTION_WITH_PRODUCTS = `
  query GetCollectionWithProducts($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      image {
        url
        altText
      }
      products(first: 1) {
        edges {
          node {
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
`;

const MainProductShowcase = ({
  collectionHandle = "western-wear", // Matched with ShopPage categoryToHandle
  subtitle = "New Season"
}) => {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShowcaseData = async () => {
      setLoading(true);
      try {
        const response = await shopifyFetch({
          query: GET_COLLECTION_WITH_PRODUCTS,
          variables: { handle: collectionHandle },
        });

        if (response?.data?.collection) {
          setCollection(response.data.collection);
        }
      } catch (error) {
        console.error("Error fetching collection showcase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseData();
  }, [collectionHandle]);

  const handleAction = () => {
    const activeHandle = collection?.handle || collectionHandle;
    // Navigates to /shop?collection=western-wear
    navigate(`/shop?collection=${encodeURIComponent(activeHandle)}`);
  };

  if (loading) {
    return (
      <section className="w-full bg-[#FAF8F5] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[550px]">
          <div className="w-full h-[450px] md:h-[600px] bg-stone-200 animate-pulse" />
          <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-12 md:py-0 space-y-4">
            <div className="h-4 w-24 bg-stone-200 animate-pulse rounded" />
            <div className="h-8 w-3/4 bg-stone-200 animate-pulse rounded" />
            <div className="h-16 w-full bg-stone-200 animate-pulse rounded" />
            <div className="h-10 w-32 bg-stone-200 animate-pulse rounded" />
          </div>
        </div>
      </section>
    );
  }

  const displayImage = 
    collection?.image?.url || 
    collection?.products?.edges[0]?.node?.featuredImage?.url || 
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80";

  const displayTitle = collection?.title || "Western Wear";
  const displayDescription = collection?.description || "Explore our latest western collection designed for contemporary fashion and everyday comfort.";

  return (
    <section className="w-full bg-[#FAF8F5] overflow-hidden border-b border-stone-200/60">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[550px]">
        
        {/* Left Side: Image */}
        <div 
          onClick={handleAction}
          className="w-full h-[450px] md:h-[600px] overflow-hidden cursor-pointer"
        >
          <img
            src={displayImage}
            alt={displayTitle}
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>

        {/* Right Side: Showcase Content */}
        <div className="flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 py-12 md:py-0">
          <span className="text-xs md:text-sm text-stone-500 font-light tracking-wide mb-3">
            {subtitle}
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-stone-900 tracking-tight leading-snug mb-4 max-w-md font-serif">
            {displayTitle}
          </h2>

          <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-light mb-8 max-w-sm">
            {displayDescription}
          </p>

          <button 
            type="button"
            onClick={handleAction}
            className="px-7 py-3 bg-stone-900 text-white text-xs font-medium tracking-wider uppercase rounded-full hover:bg-stone-800 transition-all shadow-md"
          >
            Shop Western Wear
          </button>
        </div>

      </div>
    </section>
  );
};

export default MainProductShowcase;