// src/pages/Collections.jsx
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiArrowUpRight, 
  FiChevronDown, 
  FiFilter, 
  FiX, 
  FiShoppingBag,
  FiSearch,
  FiLoader,
  FiStar,
  FiHeart,
  FiChevronRight
} from 'react-icons/fi';
import { fetchProducts } from '../api/fakeStoreApi';
import Navbar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Component
const MagneticButton = ({ children, className = "" }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    let timeout;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = button.getBoundingClientRect();
      const x = e.clientX - (left + width/2);
      const y = e.clientY - (top + height/2);
      
      gsap.to(button, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.8,
        ease: "power3.out"
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        });
      }, 300);
    };

    button.addEventListener('mousemove', handleMouseMove);
    return () => button.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={buttonRef} className={`relative inline-block ${className}`}>
      {children}
    </div>
  );
};

// Collection Hero
const CollectionHero = ({ title, description, image }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.from(chars, {
      opacity: 1,
      y: 40,
      duration: 0.6,
      stagger: 0.03,
      ease: "power3.out"
    });

    gsap.from(heroRef.current.querySelectorAll('.hero-content > *:not(h1)'), {
      opacity: 1,
      y: 40,
      duration: 1,
      stagger: 0.2,
      delay: 0.4,
      ease: "power3.out"
    });
  }, []);

  const renderAnimatedChars = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block">{char}</span>
    ));
  };

  return (
    <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10 hero-content">
        <h1 ref={textRef} className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
          {renderAnimatedChars(title)}
        </h1>
        <p className="text-white/80 max-w-2xl mb-8">
          {description}
        </p>
        <MagneticButton>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full group">
            Explore Collection
            <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
          </button>
        </MagneticButton>
      </div>
    </section>
  );
};

// Sidebar Component
const Sidebar = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="hidden lg:block w-64 pr-8">
      <div className="sticky top-28 space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors ${activeCategory === category ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                >
                  <span>{category}</span>
                  <FiChevronRight className="text-sm" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Featured Collections</h3>
          <div className="space-y-4">
            {[
              { title: "New Arrivals", image: "https://images.unsplash.com/photo-1551232864-1ac1a9f0c9a0" },
              { title: "Best Sellers", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9" },
              { title: "Limited Edition", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" }
            ].map((collection, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden mb-2">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <h4 className="text-sm">{collection.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Trending Now</h3>
          <div className="space-y-2">
            {['Oversized Blazers', 'Cashmere Knits', 'Leather Accessories', 'Silk Dresses'].map((trend, index) => (
              <div key={index} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-white/10"></div>
                <span className="text-sm">{trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Filter Component
const FilterSection = ({ 
  filters, 
  activeFilters, 
  setActiveFilters,
  searchQuery,
  setSearchQuery,
  isLoading 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[category]) {
        newFilters[category] = [value];
      } else if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(v => v !== value);
        if (newFilters[category].length === 0) {
          delete newFilters[category];
        }
      } else {
        newFilters[category].push(value);
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
  };

  useEffect(() => {
    if (isSearchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <div className="sticky top-20 z-30 bg-black py-4 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <FiFilter />
              <span>Filters</span>
              {Object.keys(activeFilters).length > 0 && (
                <span className="text-xs bg-white text-black rounded-full w-5 h-5 flex items-center justify-center">
                  {Object.values(activeFilters).flat().length}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <FiSearch />
              <span>Search</span>
            </button>
            
            {Object.keys(activeFilters).length > 0 || searchQuery ? (
              <button 
                onClick={clearAllFilters}
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Clear all
              </button>
            ) : null}
          </div>
          
          <div className="flex items-center gap-4">
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <FiLoader className="text-white/60" />
              </motion.div>
            )}
            <span className="text-white/60 text-sm">Sort by:</span>
            <select className="bg-transparent border-0 text-white focus:ring-0 focus:border-white text-sm">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Search Input */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full bg-white/10 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-white/30"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  <FiX />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filters Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {Object.entries(filters).map(([category, options]) => (
                <div key={category}>
                  <h4 className="text-sm uppercase tracking-wider mb-3 text-white/60">{category}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {options.map(option => (
                      <motion.button
                        key={option}
                        onClick={() => toggleFilter(category, option)}
                        className={`text-left text-sm py-1 px-2 rounded transition-colors ${
                          activeFilters[category]?.includes(option) 
                            ? 'bg-white text-black' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters */}
        {Object.keys(activeFilters).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap gap-2"
          >
            {Object.entries(activeFilters).map(([category, values]) => (
              values.map(value => (
                <div 
                  key={`${category}-${value}`} 
                  className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full text-xs"
                >
                  <span className="text-white/60">{category}:</span>
                  {value}
                  <button 
                    onClick={() => toggleFilter(category, value)}
                    className="text-white/60 hover:text-white"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              ))
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Product Grid
const ProductGrid = ({ products, isLoading }) => {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.product-item');
    
    gsap.from(items, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        grid: [3, Math.ceil(products.length / 3)],
        from: "center"
      },
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 70%"
      }
    });
  }, [products]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-24 flex justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader size={32} className="text-white/60" />
        </motion.div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h3 className="text-2xl mb-4">No products found</h3>
        <p className="text-white/60">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {products.map(product => (
        <motion.div
          key={product.id}
          className="product-item group cursor-pointer"
          whileHover={{ y: -10 }}
          onClick={() => navigate(`/product/${product.id}`)}
          layout
        >
          <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <button 
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
              onClick={(e) => handleAddToCart(e, product)}
            >
              <FiShoppingBag />
              Add to Bag
            </button>
            
            {/* Product badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {product.isNew && (
                <span className="text-xs bg-white text-black px-2 py-1 rounded-full">New</span>
              )}
              {product.isBestSeller && (
                <span className="text-xs bg-black text-white px-2 py-1 rounded-full">Bestseller</span>
              )}
            </div>

            {/* Color options */}
            {product.colors && product.colors.length > 0 && (
              <div className="absolute top-4 right-4 flex gap-1">
                {product.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                     color.toLowerCase() === 'black' ? '#000000' : 
                                     color.toLowerCase() === 'blue' ? '#3b82f6' :
                                     color.toLowerCase() === 'red' ? '#ef4444' :
                                     color.toLowerCase() === 'green' ? '#10b981' : '#ffffff'
                    }}
                  />
                ))}
              </div>
            )}

            {/* Rating */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/80 rounded-full px-2 py-1">
              <FiStar className="text-yellow-400 text-xs" />
              <span className="text-xs">{product.rating}</span>
            </div>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg">{product.title}</h3>
              <p className="text-white/60">{product.category}</p>
            </div>
            <p className="text-lg">${product.price.toFixed(2)}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Collection Spotlight
const CollectionSpotlight = () => {
  const spotlights = [
    {
      title: "The Traveler's Edit",
      description: "Versatile pieces designed for the modern nomad",
      image: "https://images.unsplash.com/photo-1551232864-1ac1a9f0c9a0",
      cta: "Shop Now"
    },
    {
      title: "Evening Essentials",
      description: "Elevated looks for after-dark occasions",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9",
      cta: "Discover"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-light mb-16 text-center">Collection Spotlights</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {spotlights.map((spotlight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative aspect-[16/9] bg-gray-900 rounded-xl overflow-hidden group"
          >
            <img
              src={spotlight.image}
              alt={spotlight.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end">
              <h3 className="text-2xl mb-2">{spotlight.title}</h3>
              <p className="text-white/80 mb-6">{spotlight.description}</p>
              <MagneticButton>
                <button className="flex items-center gap-2 px-6 py-3 border border-white rounded-full group">
                  {spotlight.cta}
                  <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
                </button>
              </MagneticButton>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// Collections Page
const Collections = () => {
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filters
  const filters = {
    Category: [...new Set(products.map(product => product.category))],
    Size: ["XS", "S", "M", "L", "XL"],
    Color: ["Black", "White", "Blue", "Red", "Green"],
    Price: ["$0 - $50", "$50 - $100", "$100 - $200", "$200+"]
  };

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Filter products based on active filters, search query, and active category
  useEffect(() => {
    if (products.length === 0) return;

    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      let result = [...products];

      // Apply category filter
      if (activeCategory !== 'All') {
        result = result.filter(product => product.category === activeCategory);
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(product => 
          product.title.toLowerCase().includes(query) || 
          product.category.toLowerCase().includes(query)
        );
      }

      // Apply category filters
      if (activeFilters.Category) {
        result = result.filter(product => 
          activeFilters.Category.includes(product.category)
        );
      }

      // Apply color filters
      if (activeFilters.Color) {
        result = result.filter(product => 
          activeFilters.Color.some(color => 
            product.colors?.includes(color)
          )
        );
      }

      // Apply size filters
      if (activeFilters.Size) {
        result = result.filter(product => 
          activeFilters.Size.some(size => 
            product.sizes?.includes(size)
          )
        );
      }

      // Apply price filters
      if (activeFilters.Price) {
        result = result.filter(product => 
          activeFilters.Price.includes(product.priceRange)
        );
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [activeFilters, searchQuery, products, activeCategory]);

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      <main>
        <CollectionHero 
          title={activeCategory === 'All' ? "All Collections" : activeCategory}
          description={activeCategory === 'All' ? "Explore our curated selection of premium products" : `Discover our ${activeCategory} collection`}
          image={activeCategory === 'All' ? "https://images.unsplash.com/photo-1551232864-1ac1a9f0c9a0" : 
                activeCategory === "Men's Clothing" ? "https://images.unsplash.com/photo-1551232864-3f0890e580d9" :
                activeCategory === "Women's Clothing" ? "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" :
                activeCategory === "Jewelery" ? "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908" :
                "https://images.unsplash.com/photo-1551232864-1ac1a9f0c9a0"}
        />

        <FilterSection 
          filters={filters} 
          activeFilters={activeFilters} 
          setActiveFilters={setActiveFilters}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
        />

        <div className="container mx-auto px-6 flex">
          <Sidebar 
            categories={categories} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          
          <div className="flex-1">
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>

        <CollectionSpotlight />

        {/* Featured Categories Section */}
        <section className="container mx-auto px-6 py-24">
          <h2 className="text-4xl font-light mb-16 text-center">Featured Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.filter(cat => cat !== 'All').slice(0, 3).map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
                onClick={() => setActiveCategory(category)}
              >
                <div className="relative aspect-[4/5] bg-gray-900 rounded-xl overflow-hidden mb-4">
                  <img
                    src={
                      category === "Men's Clothing" ? "https://images.unsplash.com/photo-1551232864-3f0890e580d9" :
                      category === "Women's Clothing" ? "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" :
                      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908"
                    }
                    alt={category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <h3 className="text-2xl mb-1">{category}</h3>
                      <p className="text-white/80">
                        {products.filter(p => p.category === category).length} Items
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lookbook Section */}
        <section className="container mx-auto px-6 pb-24">
          <h2 className="text-4xl font-light mb-16 text-center">The Lookbook</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Urban Explorer", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" },
              { title: "Weekend Escape", image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4" },
              { title: "Evening Affairs", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9" },
              { title: "Work From Anywhere", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea" }
            ].map((look, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <h3 className="text-xl">{look.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Collections;