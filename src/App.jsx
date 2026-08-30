// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// // Layout Components
// import Navbar from './components/Navbar';
// import SidebarDrawer from './components/SidebarDrawer';
// import SearchModal from './components/SearchModal';
// import CartDrawer from './components/CartDrawer';
// import Footer from './components/Footer';

// // Page Components
// import HomePage from './pages/HomePage';
// import ShopPage from './pages/ShopPage';
// import ProductDetailPage from './pages/ProductDetailPage';
// import CheckoutPage from './pages/CheckoutPage';

// // Automatic Scroll To Top Helper
// const ScrollToTop = () => {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: 'instant'
//     });
//   }, [pathname]);

//   return null;
// };

// function App() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const handleAddToCart = (newItem) => {
//     setCartItems((prev) => {
//       const idx = prev.findIndex(item => item.id === newItem.id && item.size === newItem.size);
//       if (idx > -1) {
//         const updated = [...prev];
//         updated[idx].quantity += newItem.quantity || 1;
//         return updated;
//       }
//       return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
//     });
//     setIsCartOpen(true);
//   };

//   const handleUpdateQuantity = (id, delta) => {
//     setCartItems(prev =>
//       prev
//         .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
//         .filter(item => item.quantity > 0)
//     );
//   };

//   return (
//     <Router>
//       {/* Scroll Position Reset On Navigation */}
//       <ScrollToTop />

//       <div className="w-full min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
//         <div>
//           {/* Header */}
//           <Navbar 
//             onOpenMenu={() => setIsMenuOpen(true)} 
//             onOpenSearch={() => setIsSearchOpen(true)}
//             onOpenCart={() => setIsCartOpen(true)}
//             cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
//           />
          
//           {/* Drawers & Modals */}
//           <SidebarDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//           <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
//           <CartDrawer 
//             isOpen={isCartOpen} 
//             onClose={() => setIsCartOpen(false)} 
//             cartItems={cartItems}
//             onUpdateQuantity={handleUpdateQuantity}
//           />

//           {/* Page Routes with smooth fade transition container */}
//           <main className="transition-all duration-300">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/shop" element={<ShopPage onAddToCart={handleAddToCart} />} />
//               <Route path="/product/:id" element={<ProductDetailPage onAddToCart={handleAddToCart} />} />
//               <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} onClearCart={() => setCartItems([])} />} />
//             </Routes>
//           </main>
//         </div>

//         {/* Footer */}
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/Navbar';
import SidebarDrawer from './components/SidebarDrawer';
import SearchModal from './components/SearchModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

// Page Components
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';

// Automatic Scroll To Top Helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

// Animated Routes Component for Framer Motion Page Transitions
const AnimatedRoutes = ({ cartItems, handleAddToCart, setCartItems }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/shop" 
          element={
            <PageTransition>
              <ShopPage onAddToCart={handleAddToCart} />
            </PageTransition>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <PageTransition>
              <ProductDetailPage onAddToCart={handleAddToCart} />
            </PageTransition>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <PageTransition>
              <CheckoutPage cartItems={cartItems} onClearCart={() => setCartItems([])} />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Smart Add To Cart (Handles same product & size quantity increment)
  const handleAddToCart = (newItem) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(item => item.id === newItem.id && item.size === newItem.size);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].quantity += newItem.quantity || 1;
        return updated;
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  // Quantity Update & Remove Handler
  const handleUpdateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  return (
    <Router>
      {/* Reset Scroll Position On Every Route Navigation */}
      <ScrollToTop />

      <div className="w-full min-h-screen bg-white font-sans text-gray-900 flex flex-col justify-between">
        <div>
          {/* Main Navigation Header */}
          <Navbar 
            onOpenMenu={() => setIsMenuOpen(true)} 
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenCart={() => setIsCartOpen(true)}
            cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
          />
          
          {/* Interactive Drawers & Modals */}
          <SidebarDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <CartDrawer 
            isOpen={isCartOpen} 
            onClose={() => setIsCartOpen(false)} 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
          />

          {/* Page Routes wrapped in AnimatedRoutes */}
          <main>
            <AnimatedRoutes 
              cartItems={cartItems} 
              handleAddToCart={handleAddToCart} 
              setCartItems={setCartItems} 
            />
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;