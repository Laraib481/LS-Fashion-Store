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