// src/pages/ProductDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShoppingBag,
  FiHeart,
  FiStar,
  FiChevronLeft,
  FiShare2,
  FiMinus,
  FiPlus,
  FiCheck
} from 'react-icons/fi';
import { fetchProductById } from '../api/fakeStoreApi';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error("Error loading product:", error);
        navigate('/collections');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;
    
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity: quantity
    });
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-32 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiLoader size={32} className="text-white/60" />
          </motion.div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 py-32 text-center">
          <h3 className="text-2xl mb-4">Product not found</h3>
          <button 
            onClick={() => navigate('/collections')}
            className="px-6 py-3 border border-white rounded-full"
          >
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  // Create mock gallery images (in a real app, this would come from the API)
  const galleryImages = [
    product.image,
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e4"
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      
      <main>
        <div className="container mx-auto px-6 py-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8"
          >
            <FiChevronLeft />
            Back to Collections
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden mb-4">
                <img
                  src={galleryImages[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Product badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.isNew && (
                    <span className="text-xs bg-white text-black px-2 py-1 rounded-full">New</span>
                  )}
                  {product.isBestSeller && (
                    <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Bestseller</span>
                  )}
                </div>

                {/* Wishlist button */}
                <button 
                  className={`absolute top-4 right-4 p-2 rounded-full ${isWishlist ? 'bg-red-500 text-white' : 'bg-white/10 text-white/80 hover:text-white'}`}
                  onClick={() => setIsWishlist(!isWishlist)}
                >
                  <FiHeart className={isWishlist ? 'fill-current' : ''} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-gray-900 rounded-md overflow-hidden ${activeImage === index ? 'ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="flex-1">
                <h1 className="text-3xl font-light mb-2">{product.title}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar 
                        key={i} 
                        className={`text-sm ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-white/30'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-white/60 text-sm">({product.rating}.0)</span>
                </div>

                <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>

                <p className="text-white/80 mb-8">{product.description}</p>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Color</h3>
                    <div className="flex gap-2">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-white' : 'border-transparent'}`}
                          style={{ 
                            backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                           color.toLowerCase() === 'black' ? '#000000' : 
                                           color.toLowerCase() === 'blue' ? '#3b82f6' :
                                           color.toLowerCase() === 'red' ? '#ef4444' :
                                           color.toLowerCase() === 'green' ? '#10b981' : '#ffffff'
                          }}
                          aria-label={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Size</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {product.sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2 px-3 rounded-md text-center ${selectedSize === size ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Selector */}
                <div className="mb-8">
                  <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={decreaseQuantity}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <FiMinus />
                    </button>
                    <span className="text-lg w-8 text-center">{quantity}</span>
                    <button 
                      onClick={increaseQuantity}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20"
                    >
                      <FiPlus />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to cart button */}
              <div className="space-y-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || !selectedColor}
                  className={`w-full py-4 rounded-full flex items-center justify-center gap-2 ${!selectedSize || !selectedColor ? 'bg-white/20 text-white/60 cursor-not-allowed' : 'bg-white text-black hover:bg-white/90'}`}
                >
                  <FiShoppingBag />
                  Add to Bag - ${(product.price * quantity).toFixed(2)}
                </button>

                <button className="w-full py-4 rounded-full border border-white/20 flex items-center justify-center gap-2 hover:bg-white/10">
                  <FiShare2 />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-24 border-t border-white/10 pt-12">
            <h2 className="text-2xl mb-6">Product Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Materials</h3>
                <p className="text-white/80">100% Premium {product.category === "Jewelery" ? "Gold" : "Cotton"}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Care Instructions</h3>
                <p className="text-white/80">Machine wash cold with like colors. Tumble dry low.</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider mb-3 text-white/60">Shipping & Returns</h3>
                <p className="text-white/80">Free shipping on all orders. Easy 30-day returns.</p>
              </div>
            </div>
          </div>

          {/* You May Also Like */}
          <div className="mt-24 border-t border-white/10 pt-12">
            <h2 className="text-2xl mb-12">You May Also Like</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden mb-4">
                    <img
                      src={`https://images.unsplash.com/photo-${1551232864 + item}-1ac1a9f0c9a0`}
                      alt={`Similar product ${item}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <button className="w-full py-2 bg-white text-black rounded-full">
                        Quick Add
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg">Similar Product {item}</h3>
                  <p className="text-white/60">${(product.price * (0.8 + Math.random() * 0.4)).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;