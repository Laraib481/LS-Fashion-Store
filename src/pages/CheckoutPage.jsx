import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems = [], onClearCart }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Lahore',
    paymentMethod: 'cod',
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 250;
  const grandTotal = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    
    setIsSubmitted(true);
    if (onClearCart) onClearCart();
  };

  if (isSubmitted) {
    return (
      <div className="pt-28 pb-16 px-4 max-w-lg mx-auto text-center min-h-[70vh] flex flex-col justify-center items-center">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4 shadow-sm">
          ✓
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-xs md:text-sm text-gray-600 mb-6">
          Thank you, <span className="font-bold text-black">{formData.firstName}</span>. Your order has been placed successfully and will be delivered to <span className="font-bold text-black">{formData.city}</span> soon.
        </p>
        <div className="bg-gray-50 p-4 rounded-2xl border text-left w-full text-xs space-y-1 mb-6">
          <p><span className="font-semibold text-gray-500">Payment Method:</span> {formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Card'}</p>
          <p><span className="font-semibold text-gray-500">Contact Phone:</span> {formData.phone}</p>
          <p><span className="font-semibold text-gray-500">Delivery Address:</span> {formData.address}</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-black text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors shadow-md"
        >
          Back To Home
        </button>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4 md:px-12 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-2xl md:text-3xl font-light tracking-tight text-gray-900 uppercase mb-8 text-center md:text-left">
        Checkout Shipping & Payment
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-sm font-semibold text-gray-600 mb-4">Your bag is currently empty.</p>
          <Link
            to="/shop"
            className="inline-block bg-black text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Explore Shop First
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Side */}
          <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b pb-3">
                1. Contact & Shipping Details
              </h2>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none"
                    placeholder="Ali"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none"
                    placeholder="Khan"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none"
                    placeholder="ali@example.com"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none"
                    placeholder="03001234567"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">Full Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none"
                  placeholder="House #, Street name, Area"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">City *</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-xl text-xs focus:ring-2 focus:ring-black outline-none bg-white"
                >
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Multan">Multan</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b pb-3">
                2. Payment Method
              </h2>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Cash on Delivery (COD)</p>
                    <p className="text-gray-500 text-[10px]">Pay cash upon delivery at your doorstep.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="accent-black"
                  />
                  <div className="text-xs">
                    <p className="font-bold text-gray-900">Credit / Debit Card</p>
                    <p className="text-gray-500 text-[10px]">Visa, Mastercard, or UnionPay.</p>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
            >
              Place Order Now (Rs. {grandTotal.toLocaleString()})
            </button>
          </form>

          {/* Order Summary Side */}
          <div className="lg:col-span-5">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 sticky top-24 space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 border-b pb-3">
                Order Summary ({cartItems.length} Items)
              </h2>

              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center text-xs">
                    <img src={item.image} alt="" className="w-12 h-14 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 line-clamp-1">{item.title}</p>
                      <p className="text-gray-500 text-[10px]">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-900">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Fee</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t pt-2">
                  <span>Total Amount</span>
                  <span>Rs. {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;