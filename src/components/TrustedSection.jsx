import React, { useState } from 'react';

const TrustedSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    // Simulating newsletter signup delay
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 800);
  };

  return (
    <section className="relative py-24 px-4 md:px-12 bg-[#FAF8F5] text-stone-800 border-t border-b border-stone-200/60 overflow-hidden">
      
      {/* Warm Glow Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        
        {/* Top Tagline */}
        <span className="inline-block bg-stone-900 text-white text-[9px] md:text-[10px] font-semibold px-4 py-1.5 rounded-full tracking-[0.25em] uppercase mb-6">
          THE LS EXPERIENCE
        </span>

        {/* Brand Promise Heading */}
        <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-900 mb-4 tracking-wide leading-tight">
          Style that <em className="italic font-normal text-amber-900">defines</em> your movement.
        </h2>

        {/* Story Subtitle */}
        <p className="text-xs md:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed font-light mb-12">
          We craft modern fashion for everyday confidence — prioritizing premium fabric, immaculate stitching, and effortless elegance.
        </p>

        {/* Real Trust Perks (Replaces Fake Stats) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16 text-left">
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-amber-900/10 flex items-center justify-center text-amber-900 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
            </div>
            <h4 className="text-xs md:text-sm font-semibold text-stone-900 mb-1">Cash on Delivery</h4>
            <p className="text-[11px] text-stone-500 font-light leading-snug">Pay conveniently at your doorstep across Pakistan.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-amber-900/10 flex items-center justify-center text-amber-900 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h4 className="text-xs md:text-sm font-semibold text-stone-900 mb-1">Nationwide Shipping</h4>
            <p className="text-[11px] text-stone-500 font-light leading-snug">Swift 3-5 working days express delivery.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-amber-900/10 flex items-center justify-center text-amber-900 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </div>
            <h4 className="text-xs md:text-sm font-semibold text-stone-900 mb-1">Hassle-Free Exchange</h4>
            <p className="text-[11px] text-stone-500 font-light leading-snug">Easy 7-day size & design exchange guarantee.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 rounded-xl bg-amber-900/10 flex items-center justify-center text-amber-900 mb-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="text-xs md:text-sm font-semibold text-stone-900 mb-1">100% Quality Checked</h4>
            <p className="text-[11px] text-stone-500 font-light leading-snug">Inspected before packaging for premium finish.</p>
          </div>

        </div>

        {/* Newsletter VIP Club Box */}
        <div className="bg-stone-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-stone-800 relative overflow-hidden text-center max-w-2xl mx-auto">
          
          <div className="relative z-10">
            <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-[0.3em] block mb-2">
              JOIN THE LS CLUB
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-light mb-3">
              Get <span className="font-semibold text-amber-300">10% OFF</span> Your First Order
            </h3>
            <p className="text-xs md:text-sm text-stone-300 font-light mb-8 max-w-md mx-auto">
              Subscribe to unlock private sales, early access to new collection drops, and exclusive style updates.
            </p>

            {subscribed ? (
              <div className="bg-amber-900/40 border border-amber-500/30 text-amber-200 py-3 px-6 rounded-xl text-xs font-medium inline-block animate-fade-in">
                ✓ Thank you for joining! Use code <span className="font-bold underline">LSFIRST10</span> at checkout.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-stone-800/90 border border-stone-700 text-white placeholder-stone-400 text-xs px-4 py-3.5 rounded-xl focus:outline-none focus:border-amber-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white text-stone-900 hover:bg-amber-100 text-xs font-semibold px-6 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap shadow-sm disabled:opacity-50"
                >
                  {loading ? 'Subscribing...' : 'Claim 10% Off'}
                </button>
              </form>
            )}

            <p className="text-[10px] text-stone-400 font-light mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TrustedSection;