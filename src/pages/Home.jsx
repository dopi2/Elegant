// src/pages/Home.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import SectionDivider from '../components/SectionDivider';

gsap.registerPlugin(ScrollTrigger);

// 1. Magnetic Button Animation
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

// 2. Material Showcase Component (previously missing)
const MaterialShowcase = () => {
  const materials = [
    {
      name: "Organic Cotton",
      description: "Grown without harmful pesticides, our cotton offers breathability and softness.",
      swatch: "#F5F5F5",
      texture: "https://images.unsplash.com/photo-1618354691373-d8514fecaf3e"
    },
    {
      name: "Japanese Denim",
      description: "14oz selvedge denim woven on traditional shuttle looms in Okayama.",
      swatch: "#2A3547",
      texture: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
    },
    {
      name: "Cashmere Blend",
      description: "Mongolian cashmere combined with silk for unparalleled softness.",
      swatch: "#D4C8BE",
      texture: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
    }
  ];

  const [activeMaterial, setActiveMaterial] = useState(0);

  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-light mb-16">Material Integrity</h2>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {materials.map((material, index) => (
            <div
              key={index}
              onMouseEnter={() => setActiveMaterial(index)}
              className="border-b border-white/10 pb-8 cursor-pointer hover:opacity-100 opacity-80 transition-opacity"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-6 h-6 rounded-full mt-1 border border-white/20"
                  style={{ backgroundColor: material.swatch }}
                />
                <div>
                  <h3 className="text-xl mb-2">{material.name}</h3>
                  <p className="text-white/60">{material.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden">
          <img
            src={materials[activeMaterial].texture}
            alt={materials[activeMaterial].name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

// 3. Floating Product Card Component
const FloatingProductCard = ({ product }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.to(cardRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative group overflow-hidden rounded-xl aspect-[3/4] bg-gray-900"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-6 flex flex-col justify-end">
        <h3 className="text-xl">{product.title}</h3>
        <p className="text-white/60">{product.price}</p>
      </div>
    </div>
  );
};

// 4. Staggered Grid Component
const StaggeredGrid = ({ items, columns = 3 }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.grid-item');
    
    gsap.from(items, {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: {
        amount: 0.6,
        grid: [columns, Math.ceil(items.length / columns)],
        from: "center"
      },
      scrollTrigger: {
        trigger: gridRef.current,
        start: "top 70%"
      }
    });
  }, []);

  return (
    <div 
      ref={gridRef}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}
    >
      {items.map((item, index) => (
        <div key={index} className="grid-item opacity-0">
          {item}
        </div>
      ))}
    </div>
  );
};

// 5. Featured Collection Component
const FeaturedCollection = () => {
  const items = [
    {
      id: 1,
      title: "The Atlas Overshirt",
      price: "$385",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea"
    },
    {
      id: 2,
      title: "Linen Travel Blazer",
      price: "$420",
      image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e4"
    },
    {
      id: 3,
      title: "Cashmere Lounge Set",
      price: "$695",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24 overflow-hidden">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl font-light">Season's Curated</h2>
        <MagneticButton className="group">
          <button className="flex items-center gap-2 px-6 py-3 border border-white rounded-full">
            View All
            <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
          </button>
        </MagneticButton>
      </div>

      <StaggeredGrid 
        items={items.map(item => (
          <FloatingProductCard key={item.id} product={item} />
        ))} 
        columns={3}
      />
    </section>
  );
};

// 6. Journal Preview Component
const JournalPreview = () => {
  const articles = [
    {
      title: "The Art of Slow Fashion",
      excerpt: "Exploring the movement towards mindful consumption and lasting quality.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
    },
    {
      title: "Crafting in Kyoto",
      excerpt: "Behind the scenes with our indigo dye masters in Japan's cultural capital.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl font-light">From Our Journal</h2>
        <MagneticButton className="group">
          <button className="flex items-center gap-2 px-6 py-3 border border-white rounded-full">
            Read All
            <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
          </button>
        </MagneticButton>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {articles.map((article, index) => (
          <div key={index} className="group relative overflow-hidden rounded-xl">
            <div className="aspect-video bg-gray-900 group-hover:scale-105 transition-transform duration-500">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl mb-2">{article.title}</h3>
              <p className="text-white/80 mb-4">{article.excerpt}</p>
              <button className="flex items-center gap-1 text-sm hover:translate-x-1 transition-transform">
                Read Story
                <FiArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 7. Sustainability Component
const Sustainability = () => {
  const stats = [
    { value: 98, label: "Organic Materials" },
    { value: 45, label: "Reduced Water Usage" },
    { value: 100, label: "Ethical Factories" }
  ];

  const [animatedValues, setAnimatedValues] = useState([0, 0, 0]);

  useEffect(() => {
    const durations = [2000, 2200, 2400];
    const intervals = stats.map((stat, i) => {
      const increment = stat.value / (durations[i] / 16);
      return setInterval(() => {
        setAnimatedValues(prev => {
          const newValues = [...prev];
          if (newValues[i] < stat.value) {
            newValues[i] += increment;
            if (newValues[i] > stat.value) newValues[i] = stat.value;
            return newValues;
          }
          return prev;
        });
      }, 16);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-light mb-16">Our Commitment</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-4">
              <p className="text-6xl font-serif">
                {Math.round(animatedValues[index])}%
              </p>
              <p className="text-black/60">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-16 border-t border-black/10">
          <p className="text-xl max-w-2xl">
            We measure our success not just by what we create, but by how we create it.
            Every decision is made with consideration for people and planet.
          </p>
        </div>
      </div>
    </section>
  );
};

// 8. Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="bg-gray-900 rounded-2xl p-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-light mb-6">Stay Connected</h2>
          
          {submitted ? (
            <div className="space-y-4">
              <p className="text-xl">Thank you for joining our community.</p>
              <p className="text-white/60">
                You'll receive our next journal entry and collection preview.
              </p>
            </div>
          ) : (
            <>
              <p className="text-white/80 mb-8">
                Subscribe for exclusive previews, journal entries, and invitations to private events.
              </p>
              
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 hover:scale-[1.01] transition-transform">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-black/30 border border-white/20 rounded-full px-6 py-4 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-[1.05] active:scale-95 transition-transform"
                >
                  Subscribe
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

// 9. Footer Component
const Footer = () => {
  const links = [
    { title: "Shop", items: ["New Arrivals", "Best Sellers", "Collections", "Accessories"] },
    { title: "About", items: ["Our Story", "Sustainability", "Press", "Careers"] },
    { title: "Help", items: ["Contact Us", "Shipping", "Returns", "FAQ"] }
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-light mb-6">ÉLÉGANCE</h3>
            <p className="text-white/60 mb-6">
              Crafting timeless pieces for the modern individual.
            </p>
            <div className="flex gap-4">
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Icon size={20} />
                </motion.button>
              ))}
            </div>
          </div>
          
          {links.map((link, i) => (
            <div key={i}>
              <h4 className="text-sm uppercase tracking-wider mb-6">{link.title}</h4>
              <ul className="space-y-3">
                {link.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-white/60 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div>
            <h4 className="text-sm uppercase tracking-wider mb-6">Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white"
              />
              <button 
                type="submit"
                className="bg-white text-black p-2 rounded-full hover:bg-white/90 transition-colors"
              >
                <FiArrowUpRight />
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} ÉLÉGANCE. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// 10. Home Component
const Home = () => {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Initialize GSAP animations
    sectionRefs.current.forEach((el, index) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        y: 50,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.2
      });
    });

    // Floating cart animation
    gsap.to(".floating-cart", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      <main>
        <Hero />
        <SectionDivider />
        
        <div ref={addToRefs}>
          <FeaturedCollection />
        </div>
        <SectionDivider />
        
        <div ref={addToRefs}>
          <MaterialShowcase />
        </div>
        <SectionDivider />
        
        <div ref={addToRefs}>
          <JournalPreview />
        </div>
        
        <div ref={addToRefs}>
          <Sustainability />
        </div>
        <SectionDivider />
        
        <div ref={addToRefs}>
          <Newsletter />
        </div>
      </main>

      <Footer />

      {/* Floating Shopping Cart */}
      <MagneticButton className="fixed bottom-8 right-8 z-50 floating-cart">
        <button className="bg-white text-black p-4 rounded-full shadow-xl hover:shadow-2xl transition-all">
          <HiOutlineShoppingBag size={24} />
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            3
          </span>
        </button>
      </MagneticButton>
    </div>
  );
};

export default Home;