import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeImage from "./home.png";
// 6 Brand Specific Collections Data
const slidesData = [
 
  {
    id: 1,
    title: "Unstitched Lawn Collection",
    desc: "Pure breathable fabrics featuring signature digital prints, intricate embroidery, and lightweight dupattas.",
    btnText: "SHOP UNSTITCHED",
    link: "/shop?collection=unstitched",
    image: homeImage
    
  },
  {
    id: 2,
    title: "Western Wear & Pret",
    desc: "Contemporary silhouettes, chic modern cuts, and tailored fits for effortless daily style.",
    btnText: "EXPLORE WESTERN WEAR",
    link: "/shop?collection=western-wear",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 3,
    title: "Luxury Accessories & Jewels",
    desc: "Handcrafted artisan jewelry, statement clutches, and luxury handbags to complete your look.",
    btnText: "SHOP ACCESSORIES",
    link: "/shop?collection=accessories",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 4,
    title: "Designer Footwear & Heels",
    desc: "Elegantly designed heels, handcrafted khussas, and stylish sandals for every formal occasion.",
    btnText: "EXPLORE FOOTWEAR",
    link: "/shop?collection=heels",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 5,
    title: "Signature Fragrance Edition",
    desc: "Long-lasting luxury perfumes and artisanal scents crafted for unforgettable presence.",
    btnText: "DISCOVER FRAGRANCE",
    link: "/shop?collection=fragrance",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 6,
    title: "Complete Fashion Catalog",
    desc: "Explore our entire range of premium apparel, accessories, and seasonal collections.",
    btnText: "VIEW ALL PRODUCTS",
    link: "/shop",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80"
  }

];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic Slide Change (4.5 Seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Sliding Main Container */}
      <div 
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-[85vh] min-h-[560px]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slidesData.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark Cinematic Gradient Overlay for Maximum Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Left Content Area - Clean Modern Typography */}
            <div className="absolute top-[35%] left-6 md:left-20 text-white max-w-xl z-20 px-2">
              {/* Clean Large Title */}
              <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wide text-white leading-tight drop-shadow-md">
                {slide.title}
              </h1>
              
              {/* Minimalist Sub-Description */}
              <p className="mt-4 text-sm md:text-base text-gray-300 font-light tracking-wide leading-relaxed max-w-md">
                {slide.desc}
              </p>
              
              {/* Modern Minimalist Button */}
              <div className="mt-8">
                <Link 
                  to={slide.link}
                  className="inline-block px-9 py-4 bg-white text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 hover:bg-black hover:text-white hover:border-white border border-white shadow-xl active:scale-95"
                >
                  {slide.btnText} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Slide Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Multi-Segment Horizontal Progress Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 w-11/12 max-w-xl px-4">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className="flex-1 h-[3px] bg-white/30 overflow-hidden cursor-pointer transition-all"
          >
            <div 
              className={`h-full bg-white transition-all duration-500 ${
                idx === current ? 'w-full' : 'w-0'
              }`} 
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;