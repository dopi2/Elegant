// src/pages/Cart.jsx
import { motion } from 'framer-motion';
import { FiShoppingBag, FiX, FiArrowRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    subtotal,
    totalItems
  } = useCart();

  const shippingCost = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shippingCost + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-md mx-auto">
            <FiShoppingBag size={48} className="mx-auto mb-6 text-white/30" />
            <h2 className="text-2xl mb-4">Your bag is empty</h2>
            <p className="text-white/60 mb-8">
              Start shopping to add items to your bag
            </p>
            <Link
              to="/collections"
              className="inline-block px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:flex-1">
            <h1 className="text-3xl font-light mb-8">Your Bag ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>
            
            <div className="space-y-8">
              {cart.map(item => (
                <motion.div
                  key={`${item.id}-${item.color}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6 border-b border-white/10 pb-8"
                >
                  <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg mb-1">{item.name}</h3>
                        <p className="text-white/60 mb-2">{item.color} / {item.size}</p>
                        <p className="text-lg">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(`${item.id}-${item.color}-${item.size}`)}
                        className="text-white/60 hover:text-white"
                      >
                        <FiX />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center gap-2 border border-white/20 rounded-full px-3 py-1">
                        <button 
                          onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity - 1)}
                          className="text-white/60 hover:text-white"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(`${item.id}-${item.color}-${item.size}`, item.quantity + 1)}
                          className="text-white/60 hover:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button 
              onClick={clearCart}
              className="mt-8 text-white/60 hover:text-white underline"
            >
              Remove all items
            </button>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white/10 p-6 rounded-xl sticky top-28">
              <h2 className="text-xl mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white/60">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Shipping</span>
                  <span>
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between border-t border-white/20 pt-4 mb-8">
                <span>Total</span>
                <span className="text-xl">${total.toFixed(2)}</span>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-white text-black rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
              >
                Proceed to Checkout
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;