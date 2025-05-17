// src/components/Product360View.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Product360View = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
    setCurrentX(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = (e.clientX || e.touches[0].clientX) - startX;
    setCurrentX(x);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    if (currentX > 50) {
      handlePrev();
    } else if (currentX < -50) {
      handleNext();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      }
    }, 150);

    return () => clearInterval(interval);
  }, [images.length, isDragging]);

  return (
    <div className="absolute inset-0 bg-black z-10">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
      >
        <FiX size={24} />
      </button>

      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <motion.img
          src={images[currentIndex]}
          alt={`360 view - ${currentIndex + 1}`}
          className="w-full h-full object-contain"
          style={{ x: currentX }}
          drag="x"
          dragConstraints={containerRef}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        />

        <button 
          onClick={handlePrev}
          className="absolute left-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
        >
          <FiChevronLeft size={24} />
        </button>

        <button 
          onClick={handleNext}
          className="absolute right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10"
        >
          <FiChevronRight size={24} />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product360View;