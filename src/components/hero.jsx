import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Higher quality images with optimized formats
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1615228939091-5896650a1400?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80&auto=webp",
      placeholder: "https://images.unsplash.com/photo-1615228939091-5896650a1400?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20&blur=20",
      title: "Elevated Essentials",
      subtitle: "Crafted for Modernity",
      cta: "Explore Collection"
    },
    {
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80&auto=webp",
      placeholder: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20&blur=20",
      title: "Silhouette Perfected",
      subtitle: "Spring/Summer Edition",
      cta: "Discover"
    },
    {
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80&auto=webp",
      placeholder: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=20&blur=20",
      title: "Timeless Elegance",
      subtitle: "Luxury Redefined",
      cta: "Shop Now"
    }
  ];

  // Preload images on component mount
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = slides.map(slide => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        setImagesLoaded(true); // Continue even if some images fail
      }
    };

    loadImages();
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  // Auto-advance slides
  useEffect(() => {
    if (!imagesLoaded) return;
    
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide, imagesLoaded]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen max-h-[100vh] overflow-hidden bg-black"
    >
      {/* Preconnect to image CDN */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />

      {/* Parallax Backgrounds */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{ y: index === currentSlide ? y : 0 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {imagesLoaded ? (
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading="eager"
                fetchpriority={index === 0 ? "high" : "auto"}
              />
            ) : (
              <img
                src={slide.placeholder}
                alt="Loading..."
                className="w-full h-full object-cover object-center blur-md"
                loading="eager"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[0.9]">
              {slides[currentSlide].title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Interactive CTA Buttons */}
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              whileHover={{ 
                backgroundColor: "#ffffff",
                color: "#000000",
                x: 5
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 flex items-center gap-3 group"
            >
              <span>{slides[currentSlide].cta}</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FiArrowRight className="text-xl" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ 
                backgroundColor: "#ffffff20",
                x: 5
              }}
              className="text-white px-8 py-4 border-2 border-transparent"
            >
              Lookbook '24
            </motion.button>
          </motion.div>
        </div>

        {/* Animated Slide Indicators */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <motion.div
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="h-[2px] bg-white/30 cursor-pointer relative overflow-hidden"
              style={{ width: 40 }}
              whileHover={{ backgroundColor: "#ffffff80" }}
            >
              {index === currentSlide && (
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, linear: true }}
                  onAnimationComplete={() => nextSlide()}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating Product Preview */}
        {imagesLoaded && (
          <motion.div 
            className="absolute right-12 top-1/3 hidden xl:block"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-white/05 backdrop-blur-lg p-8 border border-white/10 space-y-4 w-64">
              <motion.div 
                className="bg-gray-100 aspect-square relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src={slides[currentSlide].image} 
                  className="absolute inset-0 object-cover" 
                  alt="Preview" 
                  loading="lazy"
                />
              </motion.div>
              <h3 className="text-white font-medium">Featured Piece</h3>
              <p className="text-white/70 text-sm">From the {slides[currentSlide].title} collection</p>
              <div className="flex gap-2">
                {['#F5F5F5', '#2A2A2A', '#C4B7A6'].map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 rounded-full border-2 border-white/20 cursor-pointer"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Animated Scrolling Text */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-16 bg-black/70 backdrop-blur-sm border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div 
            className="flex items-center h-full gap-12"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 text-white/80 uppercase text-sm tracking-widest">
                <span>Handcrafted Excellence</span>
                <span className="text-white/30">/</span>
                <span>Ethically Produced</span>
                <span className="text-white/30">/</span>
                <span>Sustainable Materials</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6">
        <motion.button
          onClick={prevSlide}
          className="p-4 text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <FiChevronLeft size={32} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="p-4 text-white/80 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <FiChevronRight size={32} />
        </motion.button>
      </div>

      {/* Floating Badge */}
      <motion.div
        className="absolute top-8 left-8 flex items-center gap-3 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="h-[1px] w-8 bg-white" />
        <span className="text-sm tracking-widest">Since 1998</span>
      </motion.div>
    </section>
  );
};

export default Hero;