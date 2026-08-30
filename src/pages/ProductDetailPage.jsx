// // import React, { useState } from 'react';

// // const product = {
// //   id: 101,
// //   title: "Embroidered Lawn 3-Piece Suit",
// //   price: 4990,
// //   originalPrice: 6250,
// //   sku: "ZEL-2026-LAWN-08",
// //   inStock: true,
// //   images: [
// //     "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
// //     "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
// //     "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
// //     "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
// //   ],
// //   sizes: ["XS", "S", "M", "L", "XL"],
// //   description: "Intricately embroidered lawn shirt paired with a digitally printed chiffon dupatta and solid dyed trousers. Designed for contemporary summer elegance.",
// //   fabricCare: ["Fabric: 100% Premium Lawn", "Dupatta: Digital Chiffon", "Care: Dry Clean Recommended or Cold Hand Wash", "Do not bleach or tumble dry"]
// // };

// // const ProductDetailPage = ({ onAddToCart }) => {
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [selectedSize, setSelectedSize] = useState("M");
// //   const [quantity, setQuantity] = useState(1);
// //   const [openAccordion, setOpenAccordion] = useState("desc");

// //   const handleAddToCart = () => {
// //     onAddToCart({
// //       id: product.id,
// //       title: product.title,
// //       price: product.price,
// //       size: selectedSize,
// //       quantity: quantity,
// //       image: product.images[0]
// //     });
// //   };

// //   return (
// //     <div className="pt-24 pb-20 px-4 md:px-12 max-w-7xl mx-auto">
// //       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
// //         {/* Left Column: Image Gallery Thumbnails & Preview */}
// //         <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
// //           {/* Thumbnails */}
// //           <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[550px] shrink-0">
// //             {product.images.map((img, idx) => (
// //               <button
// //                 key={idx}
// //                 onClick={() => setSelectedImage(idx)}
// //                 className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
// //                   selectedImage === idx ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
// //                 }`}
// //               >
// //                 <img src={img} alt="" className="w-full h-full object-cover" />
// //               </button>
// //             ))}
// //           </div>

// //           {/* Main Focused Image */}
// //           <div className="flex-1 aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative shadow-sm border border-gray-100">
// //             <img
// //               src={product.images[selectedImage]}
// //               alt={product.title}
// //               className="w-full h-full object-cover transition-all duration-300"
// //             />
// //             <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
// //               20% OFF
// //             </span>
// //           </div>
// //         </div>

// //         {/* Right Column: Product Specs & Actions */}
// //         <div className="lg:col-span-5 flex flex-col justify-start">
// //           <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">SKU: {product.sku}</p>
// //           <h1 className="text-2xl md:text-3xl font-medium text-gray-900 tracking-tight mb-3">{product.title}</h1>

// //           {/* Pricing */}
// //           <div className="flex items-center gap-3 mb-6">
// //             <span className="text-xl font-bold text-gray-900">Rs. {product.price.toLocaleString()}</span>
// //             <span className="text-sm text-gray-400 line-through">Rs. {product.originalPrice.toLocaleString()}</span>
// //             <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded">In Stock</span>
// //           </div>

// //           <hr className="border-gray-100 mb-6" />

// //           {/* Size Selector */}
// //           <div className="mb-6">
// //             <div className="flex justify-between items-center mb-2.5">
// //               <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider">Select Size</span>
// //               <button className="text-xs text-gray-500 underline hover:text-black">Size Guide</button>
// //             </div>
// //             <div className="flex gap-2.5">
// //               {product.sizes.map((size) => (
// //                 <button
// //                   key={size}
// //                   onClick={() => setSelectedSize(size)}
// //                   className={`w-11 h-11 rounded-lg text-xs font-semibold transition-all border ${
// //                     selectedSize === size
// //                       ? 'bg-black text-white border-black shadow-md'
// //                       : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
// //                   }`}
// //                 >
// //                   {size}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Quantity Selector */}
// //           <div className="mb-6">
// //             <span className="text-xs font-semibold text-gray-900 uppercase tracking-wider block mb-2.5">Quantity</span>
// //             <div className="flex items-center border border-gray-200 rounded-lg w-32 bg-white">
// //               <button
// //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                 className="w-10 py-2 text-gray-600 hover:bg-gray-100 text-sm font-bold rounded-l-lg"
// //               >-</button>
// //               <span className="flex-1 text-center text-xs font-semibold">{quantity}</span>
// //               <button
// //                 onClick={() => setQuantity(quantity + 1)}
// //                 className="w-10 py-2 text-gray-600 hover:bg-gray-100 text-sm font-bold rounded-r-lg"
// //               >+</button>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex flex-col gap-3 mb-8">
// //             <button
// //               onClick={handleAddToCart}
// //               className="w-full py-3.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-colors shadow-md"
// //             >
// //               Add to Shopping Bag
// //             </button>
// //             <button className="w-full py-3.5 bg-gray-100 text-gray-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors">
// //               Buy Now
// //             </button>
// //           </div>

// //           {/* Collapsible Accordions */}
// //           <div className="border-t border-gray-100 pt-4 space-y-3">
// //             {/* Description Accordion */}
// //             <div className="border-b border-gray-100 pb-3">
// //               <button
// //                 onClick={() => setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')}
// //                 className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-900 py-1"
// //               >
// //                 <span>Product Description</span>
// //                 <span>{openAccordion === 'desc' ? '−' : '+'}</span>
// //               </button>
// //               {openAccordion === 'desc' && (
// //                 <p className="text-xs text-gray-600 leading-relaxed mt-2 font-light">{product.description}</p>
// //               )}
// //             </div>

// //             {/* Fabric & Care Accordion */}
// //             <div className="border-b border-gray-100 pb-3">
// //               <button
// //                 onClick={() => setOpenAccordion(openAccordion === 'fabric' ? '' : 'fabric')}
// //                 className="w-full flex justify-between items-center text-xs font-bold uppercase tracking-wider text-gray-900 py-1"
// //               >
// //                 <span>Fabric & Care Instructions</span>
// //                 <span>{openAccordion === 'fabric' ? '−' : '+'}</span>
// //               </button>
// //               {openAccordion === 'fabric' && (
// //                 <ul className="text-xs text-gray-600 leading-relaxed mt-2 space-y-1 font-light list-disc pl-4">
// //                   {product.fabricCare.map((item, idx) => (
// //                     <li key={idx}>{item}</li>
// //                   ))}
// //                 </ul>
// //               )}
// //             </div>
// //           </div>

// //         </div>

// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductDetailPage;
// import React, { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// const dummyProducts = [
//   { id: 101, title: "Embroidered Lawn 3-Piece Suit", category: "Unstitched", price: 4990, description: "Premium quality lawn suit featuring rich embroidery work with breathable fabric designed for comfort and style.", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
//   { id: 102, title: "Embroidered Cotton Kurta", category: "Ready To Wear", price: 2890, description: "Classic ethnic kurta styled with precision stitching and subtle embroidery accents.", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80" },
//   { id: 103, title: "Chiffon Dupatta Suit", category: "Unstitched", price: 5490, description: "Elegant 3-piece attire paired with a light chiffon printed dupatta.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80" },
//   { id: 104, title: "Solid Fusion Top", category: "Western Wear", price: 1990, description: "Modern western top tailored with soft viscose blend for modern daily wear.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" },
// ];

// const ProductDetailPage = ({ onAddToCart }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const product = dummyProducts.find((p) => p.id === parseInt(id)) || dummyProducts[0];

//   const [selectedSize, setSelectedSize] = useState('M');
//   const [quantity, setQuantity] = useState(1);

//   const handleAdd = () => {
//     onAddToCart({
//       ...product,
//       size: selectedSize,
//       quantity: quantity
//     });
//   };

//   return (
//     <div className="pt-24 pb-16 px-4 md:px-12 max-w-6xl mx-auto min-h-screen">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="text-xs font-bold text-gray-500 hover:text-black mb-6 flex items-center gap-1"
//       >
//         ← Back to products
//       </button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* Product Image */}
//         <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border">
//           <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
//         </div>

//         {/* Product Specs */}
//         <div className="flex flex-col justify-center space-y-6">
//           <div>
//             <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{product.category}</span>
//             <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-1">{product.title}</h1>
//             <p className="text-xl font-bold text-gray-900 mt-2">Rs. {product.price.toLocaleString()}</p>
//           </div>

//           <p className="text-xs text-gray-600 leading-relaxed">{product.description}</p>

//           {/* Size Selector */}
//           <div>
//             <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">Select Size</label>
//             <div className="flex gap-2">
//               {["S", "M", "L", "XL"].map((size) => (
//                 <button
//                   key={size}
//                   onClick={() => setSelectedSize(size)}
//                   className={`w-10 h-10 text-xs font-bold rounded-xl border transition-all ${
//                     selectedSize === size
//                       ? 'bg-black text-white border-black shadow-md'
//                       : 'bg-white text-gray-700 hover:border-gray-400'
//                   }`}
//                 >
//                   {size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Quantity Selector */}
//           <div>
//             <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-2">Quantity</label>
//             <div className="flex items-center gap-3 border border-gray-200 rounded-xl w-fit p-1 bg-white">
//               <button 
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
//               >
//                 -
//               </button>
//               <span className="text-xs font-bold px-2">{quantity}</span>
//               <button 
//                 onClick={() => setQuantity(quantity + 1)}
//                 className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-100 rounded-lg"
//               >
//                 +
//               </button>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="space-y-3 pt-2">
//             <button
//               onClick={handleAdd}
//               className="w-full bg-black text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
//             >
//               Add To Bag
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductById } from '../services/shopify';

const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      loadProductData(decodeURIComponent(id));
    }
  }, [id]);

  const loadProductData = async (productId) => {
    setLoading(true);
    const data = await fetchProductById(productId);
    if (data) {
      setProduct(data);
      setSelectedImage(data.images[0] || "https://via.placeholder.com/600x800");
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product.id,
      variantId: selectedVariant ? selectedVariant.id : product.id,
      title: product.title,
      variantTitle: selectedVariant && selectedVariant.title !== 'Default Title' ? selectedVariant.title : null,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: selectedImage || product.images[0],
      quantity: quantity
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-semibold text-gray-500">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-16 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-sm text-gray-500 mt-2">The requested item could not be loaded from Shopify.</p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-6 px-6 py-2.5 bg-black text-white text-xs font-bold rounded-xl"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:underline">Shop</Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Left Column: Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === imgUrl ? 'border-black opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase font-extrabold text-gray-400 tracking-wider">
                Shopify Live Item
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1">
                {product.title}
              </h1>
              <p className="text-xl font-extrabold text-gray-900 mt-3">
                Rs. {(selectedVariant ? selectedVariant.price : product.price).toLocaleString()}
              </p>
            </div>

            {/* Variants / Sizes (If available) */}
            {product.variants.length > 1 && product.variants[0].title !== 'Default Title' && (
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  Select Option / Size:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        selectedVariant?.id === v.id
                          ? 'bg-black text-white border-black shadow-md'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                Quantity:
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 border border-gray-200"
                >
                  -
                </button>
                <span className="w-12 text-center text-xs font-bold text-gray-900">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100 border border-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Product Description */}
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                Product Details
              </h3>
              {product.descriptionHtml ? (
                <div 
                  className="text-xs text-gray-600 leading-relaxed space-y-2"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                />
              ) : (
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.description || "No description provided for this product."}
                </p>
              )}
            </div>
          </div>

          {/* Add To Cart CTA Button */}
          <div className="pt-6 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md ${
                added 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {added ? '✓ Added To Cart!' : 'Add To Cart'}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetailPage;