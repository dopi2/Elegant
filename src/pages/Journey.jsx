// src/pages/Journey.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiPlay, FiPause, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';


gsap.registerPlugin(ScrollTrigger);

// 1. Magnetic Button Component
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

// 2. Hero Section with Video Background
const JourneyHero = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    gsap.from(".hero-content > *", {
      opacity: 1,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="/fabric-journey.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>

      <button 
        onClick={togglePlay}
        className="absolute bottom-8 right-8 z-20 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-colors"
      >
        {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
      </button>

      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10 hero-content">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
          Our Ethical Journey
        </h1>
        <p className="text-white/80 max-w-2xl mb-8">
          Trace the path of every garment from sustainable farms to your wardrobe
        </p>
        <MagneticButton>
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full group">
            Explore Transparency
            <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
          </button>
        </MagneticButton>
      </div>
    </section>
  );
};

// 3. Animated Timeline
const EthicalTimeline = () => {
  const milestones = [
    {
      year: "2012",
      title: "Founding Principles",
      description: "Committed to ethical production from day one with our first small collection",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
    },
    {
      year: "2015",
      title: "Organic Transition",
      description: "Switched to 100% organic cotton across all collections",
      image: "https://images.unsplash.com/photo-1618354691373-d8514fecaf3e"
    },
    {
      year: "2017",
      title: "Artisan Partnerships",
      description: "Established direct relationships with craft communities in India and Peru",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
    },
    {
      year: "2020",
      title: "Carbon Neutral",
      description: "Achieved carbon neutral certification for all operations",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
    },
    {
      year: "2023",
      title: "Regenerative Agriculture",
      description: "Launched regenerative cotton farming initiative",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9"
    }
  ];

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Milestones of Change</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Our decade-long commitment to responsible fashion
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-black/10 transform -translate-x-1/2"></div>
          
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className={`relative mb-16 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}
            >
              <div className={`absolute top-0 ${index % 2 === 0 ? '-right-1' : '-left-1'} w-4 h-4 bg-black rounded-full`}></div>
              
              <div className={`flex ${index % 2 === 0 ? 'flex-row-reverse' : ''} gap-8 mb-4`}>
                <div className="flex-1">
                  <h3 className="text-2xl font-light mb-2">{milestone.year}</h3>
                  <h4 className="text-lg font-medium mb-2">{milestone.title}</h4>
                  <p className="text-black/60">{milestone.description}</p>
                </div>
                <div className="w-32 h-32 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={milestone.image}
                    alt={milestone.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Material Journey Carousel
const MaterialJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef(null);

  const steps = [
    {
      title: "Organic Farming",
      description: "Our cotton is grown without synthetic pesticides using regenerative techniques",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
    },
    {
      title: "Ethical Harvesting",
      description: "Farm workers receive fair wages and safe working conditions",
      image: "https://images.unsplash.com/photo-1618354691373-d8514fecaf3e"
    },
    {
      title: "Natural Dyeing",
      description: "Traditional plant-based dyes create vibrant colors without toxins",
      image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
    },
    {
      title: "Artisan Crafting",
      description: "Skilled tailors construct garments using time-honored techniques",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
    },
    {
      title: "Quality Assurance",
      description: "Each piece undergoes rigorous inspection before shipping",
      image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9"
    }
  ];

  useEffect(() => {
    if (!carouselRef.current) return;

    gsap.to(carouselRef.current.querySelectorAll('.step-image'), {
      x: `-${activeStep * 100}%`,
      duration: 1,
      ease: "power3.out"
    });
  }, [activeStep]);

  const nextStep = () => {
    setActiveStep(prev => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setActiveStep(prev => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4">From Field to Fabric</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Trace the ethical journey of our materials through every step
        </p>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-xl">
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-1000 ease-out"
            style={{ width: `${steps.length * 100}%` }}
          >
            {steps.map((step, index) => (
              <div 
                key={index}
                className="step-image w-full aspect-video bg-gray-900 relative"
                style={{ flex: `0 0 ${100 / steps.length}%` }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-12 flex flex-col justify-end">
                  <h3 className="text-2xl font-light mb-2">{step.title}</h3>
                  <p className="text-white/80 max-w-md">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={prevStep}
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <FiChevronLeft size={24} />
          </button>
          
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === activeStep ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
          
          <button 
            onClick={nextStep}
            className="p-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
          >
            <FiChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

// 5. Artisan Spotlight
const ArtisanSpotlight = () => {
  const artisans = [
    {
      name: "Rajesh Kumar",
      craft: "Hand Block Printing",
      location: "Jaipur, India",
      story: "8th generation artisan preserving traditional textile techniques",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874"
    },
    {
      name: "Elena Morales",
      craft: "Backstrap Weaving",
      location: "Cusco, Peru",
      story: "Leads a women's cooperative revitalizing ancient Andean patterns",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
    },
    {
      name: "Amadou Diallo",
      craft: "Indigo Dyeing",
      location: "Bamako, Mali",
      story: "Master dyer using organic indigo grown in his village",
      image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f"
    }
  ];

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Meet the Makers</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            The skilled hands behind our collections
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white">{artisan.story}</p>
                </div>
              </div>
              <h3 className="text-xl font-medium">{artisan.name}</h3>
              <p className="text-black/60">{artisan.craft}</p>
              <p className="text-sm text-black/50">{artisan.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Sustainability Metrics
const SustainabilityMetrics = () => {
  const metrics = [
    {
      value: "98%",
      label: "Organic Materials",
      description: "Of our fabrics are certified organic or recycled"
    },
    {
      value: "45%",
      label: "Water Saved",
      description: "Through innovative dyeing and finishing processes"
    },
    {
      value: "100%",
      label: "Living Wages",
      description: "Paid to all workers in our supply chain"
    },
    {
      value: "72%",
      label: "Carbon Reduction",
      description: "Compared to conventional fashion production"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4">By the Numbers</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Measuring our impact across key sustainability metrics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl p-8 text-center"
          >
            <h3 className="text-5xl font-light mb-2">{metric.value}</h3>
            <h4 className="text-xl font-medium mb-2">{metric.label}</h4>
            <p className="text-white/60">{metric.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// 7. Call to Action
const JourneyCTA = () => {
  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-light mb-6">Join Our Movement</h2>
        <p className="text-black/60 max-w-2xl mx-auto mb-8">
          Every purchase supports ethical fashion and artisan communities worldwide
        </p>
        <MagneticButton>
          <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full group mx-auto">
            Shop Consciously
            <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
          </button>
        </MagneticButton>
      </div>
    </section>
  );
};

// 8. Journey Page Component
const Journey = () => {
  const sectionRefs = useRef([]);
  sectionRefs.current = [];

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      <main>
        <JourneyHero />
        
        <div ref={addToRefs}>
          <EthicalTimeline />
        </div>
        
        <div ref={addToRefs}>
          <MaterialJourney />
        </div>
        
        <div ref={addToRefs}>
          <ArtisanSpotlight />
        </div>
        
        <div ref={addToRefs}>
          <SustainabilityMetrics />
        </div>
        
        <div ref={addToRefs}>
          <JourneyCTA />
        </div>
      </main>

    </div>
  );
};

export default Journey;