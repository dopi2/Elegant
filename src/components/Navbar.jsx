// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiSearch, 
  FiShoppingBag,
  FiUser,
  FiChevronDown
} from 'react-icons/fi';
import { Squash as Hamburger } from 'hamburger-react';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // In a real app, you would fetch search results here
    setSearchResults([]);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed w-full z-50 ${scrolled ? 'bg-black/90' : 'bg-transparent'} backdrop-blur-md transition-all duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/" className="text-2xl font-light tracking-widest text-white">
              ÉLÉGANCE
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {['Collections', 'About', 'Journal', 'Contact'].map((item) => (
              <motion.div key={item} whileHover={{ scale: 1.05 }}>
                <Link
                  to={`/${item.toLowerCase()}`}
                  className="text-sm uppercase tracking-widest text-white/80 hover:text-white transition-colors relative group"
                >
                  {item}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"
                    initial={{ width: 0 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="relative hidden lg:block">
              <div className="flex items-center border-b border-white/20 py-1">
                <FiSearch className="text-white/80 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                  className="bg-transparent border-none outline-none text-white w-40"
                />
              </div>
              
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 w-64 bg-black border border-white/20 mt-2 rounded-lg shadow-lg z-50">
                  {searchResults.map(product => (
                    <div 
                      key={product.id}
                      className="p-3 hover:bg-white/10 cursor-pointer border-b border-white/10 last:border-0"
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setShowSearchResults(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 object-cover"
                        />
                        <div>
                          <p className="text-sm">{product.name}</p>
                          <p className="text-xs text-white/60">${product.price?.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              className="relative text-white/80 hover:text-white"
              onClick={() => navigate('/cart')}
            >
              <FiShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.button>

            {/* Auth */}
            <div className="hidden lg:flex gap-2">
              <button 
                onClick={() => navigate('/login')}
                className="px-3 py-1 text-sm text-white/80 hover:text-white"
              >
                Login
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="px-3 py-1 text-sm bg-white text-black rounded hover:bg-white/90"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={setIsOpen}
                size={24}
                color="#ffffff"
                rounded
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
        >
          <div className="py-4 space-y-4 border-t border-white/10">
            {/* Mobile Search */}
            <div className="px-4">
              <div className="flex items-center border-b border-white/20 py-1">
                <FiSearch className="text-white/80 mr-2" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="bg-transparent border-none outline-none text-white flex-1"
                />
              </div>
            </div>

            {/* Navigation Links */}
            {['Collections', 'About', 'Journal', 'Contact'].map((item) => (
              <motion.div
                key={item}
                whileHover={{ x: 10 }}
                className="px-4 py-2 text-white/80 hover:text-white"
              >
                <Link to={`/${item.toLowerCase()}`} onClick={() => setIsOpen(false)}>
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Auth */}
            <div className="px-4 pt-4 border-t border-white/10 flex gap-4">
              <button 
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="flex-1 py-2 text-center text-white/80 hover:text-white"
              >
                Login
              </button>
              <button 
                onClick={() => {
                  navigate('/signup');
                  setIsOpen(false);
                }}
                className="flex-1 py-2 text-center bg-white text-black rounded hover:bg-white/90"
              >
                Sign Up
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Navbar;