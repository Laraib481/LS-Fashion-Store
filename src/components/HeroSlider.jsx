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

  // Automatic Slide Change (3.5 Seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
    }, 3500);

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
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-full h-[75vh] min-h-[500px] md:h-[85vh] md:min-h-[580px]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            {/* Dark Cinematic Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content Container - Vertically Centered */}
            <div className="absolute inset-0 flex items-center justify-start px-6 md:px-20 z-20">
              <div className={`max-w-xl text-white transition-all duration-700 ${index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                
                {/* Large Title */}
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-light tracking-wide text-white leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-stone-300 font-light tracking-wide leading-relaxed max-w-md">
                  {slide.desc}
                </p>
                
                {/* Action CTA Button */}
                <div className="mt-6 md:mt-8">
                  <Link 
                    to={slide.link}
                    className="inline-block px-7 md:px-9 py-3.5 md:py-4 bg-white text-black font-semibold text-[11px] md:text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-black hover:text-white hover:border-white border border-white shadow-xl active:scale-95"
                  >
                    {slide.btnText} →
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 active:scale-90"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 active:scale-90"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Progress Bar Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30 w-11/12 max-w-xl px-4">
        {slidesData.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
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