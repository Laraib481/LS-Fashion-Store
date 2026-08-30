import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-8 border-t border-stone-800/80 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        
        {/* Column 1: Brand & Developer Profile */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white text-xl font-serif tracking-widest uppercase font-light">
              LS FASHION
            </h3>
            <span className="bg-amber-900/40 text-amber-300 border border-amber-700/40 text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wider">
              PORTFOLIO
            </span>
          </div>
          <p className="text-xs text-stone-400 font-light leading-relaxed">
            A luxury full-stack e-commerce experience crafted with React, Tailwind CSS, and Shopify Storefront API integration.
          </p>
          <div className="pt-2">
            <p className="text-[11px] font-medium text-stone-400">
              Designed & Engineered by <span className="text-white font-semibold">Laraib Sarwar</span>
            </p>
          </div>
        </div>

        {/* Column 2: Quick Store Navigation */}
        <div>
          <h4 className="text-stone-100 text-xs font-semibold tracking-widest uppercase mb-4 font-serif">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs text-stone-400 font-light">
            <li><Link to="/" className="hover:text-amber-200 transition-colors">Home</Link></li>
            <li><Link to="/shop" className="hover:text-amber-200 transition-colors">Explore Shop</Link></li>
            <li><Link to="/shop?collection=accessories" className="hover:text-amber-200 transition-colors">Accessories</Link></li>
            <li><Link to="/shop?collection=western-wear" className="hover:text-amber-200 transition-colors">Western Wear</Link></li>
            <li><Link to="/shop?collection=heels" className="hover:text-amber-200 transition-colors">Heels Collection</Link></li>
          </ul>
        </div>

        {/* Column 3: Tech Stack Highlights */}
        <div>
          <h4 className="text-stone-100 text-xs font-semibold tracking-widest uppercase mb-4 font-serif">
            Project Architecture
          </h4>
          <ul className="space-y-2 text-xs text-stone-400 font-light">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> React.js & Hooks
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Tailwind CSS Styling
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Shopify GraphQL API
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Dynamic Cart & Checkout
            </li>
          </ul>
        </div>

        {/* Column 4: Developer Connect & Links */}
        <div>
          <h4 className="text-stone-100 text-xs font-semibold tracking-widest uppercase mb-4 font-serif">
            Connect With Developer
          </h4>
          <p className="text-xs text-stone-400 font-light mb-5">
            Check out my GitHub repositories or connect with me on LinkedIn for software engineering projects.
          </p>

          <div className="flex flex-col gap-3">
            {/* GitHub Link
            <a
              href="https://github.com/Laraib481"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-stone-900 border border-stone-800 hover:border-amber-900/50 text-stone-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-all group"
            >
              <svg className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              <span>GitHub / Laraib481</span>
            </a> */}

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/laraib-sarwar-a248a2379"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-stone-900 border border-stone-800 hover:border-amber-900/50 text-stone-200 hover:text-white px-4 py-2.5 rounded-xl text-xs font-medium transition-all group"
            >
              <svg className="w-4 h-4 text-stone-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
              </svg>
              <span>LinkedIn / Laraib Sarwar</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Developer Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row justify-between items-center text-[11px] text-stone-500 font-light gap-3">
        <p>© 2026 LS FASHION STORE. Designed & Developed by <span className="text-stone-300 font-medium">Laraib Sarwar</span>.</p>
        <div className="flex gap-4 text-stone-400">
          <span>React.js</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Shopify API</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;