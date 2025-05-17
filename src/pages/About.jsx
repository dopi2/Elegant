// src/pages/About.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);

// 1. Magnetic Button Component (reusable)
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

// 2. Our Story Section
const OurStory = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const elements = sectionRef.current.querySelectorAll('.story-element');
    
    gsap.from(elements, {
      opacity: 1,
      y: 50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%"
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 story-element">
          <h2 className="text-4xl font-light">Our Humble Beginnings</h2>
          <p className="text-white/80 leading-relaxed">
            Founded in 2012 in a small Parisian atelier, ÉLÉGANCE began as a passion project between two design school graduates. 
            What started as custom pieces for friends quickly evolved into a movement redefining modern luxury.
          </p>
          <p className="text-white/80 leading-relaxed">
            Today, we maintain that artisanal spirit while embracing sustainable innovation. Each collection honors our heritage 
            while pushing boundaries of contemporary design.
          </p>
          <MagneticButton>
            <button className="flex items-center gap-2 px-6 py-3 border border-white rounded-full group">
              Read Our Manifesto
              <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
            </button>
          </MagneticButton>
        </div>
        
        <div className="relative story-element">
          <div className="aspect-square bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
              alt="Our atelier"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-white bg-black p-4 flex items-center justify-center">
            <span className="text-sm text-center">Since 2012</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// 3. Team Section with Floating Cards
const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sophie Laurent",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      fact: "Former ballet dancer turned textile innovator"
    },
    {
      name: "Jean Moreau",
      role: "Head Designer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
      fact: "Specializes in zero-waste pattern making"
    },
    {
      name: "Amara Diallo",
      role: "Sustainability Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      fact: "Pioneer in organic dye technologies"
    },
    {
      name: "Luca Bianchi",
      role: "Production Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      fact: "Ensures ethical manufacturing standards"
    }
  ];

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">The Minds Behind</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Our interdisciplinary team brings together decades of experience in fashion, sustainability, and craftsmanship.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-black/60 mb-2">{member.role}</p>
              <p className="text-sm text-black/50">{member.fact}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 4. Craftsmanship Section with Parallax
const CraftsmanshipSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll('.craft-image');
    
    images.forEach((image, index) => {
      gsap.to(image, {
        yPercent: index % 2 === 0 ? -20 : 20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }, []);

  return (
    <section ref={containerRef} className="container mx-auto px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-light">The Art of Making</h2>
          <p className="text-white/80 leading-relaxed">
            Every ÉLÉGANCE piece undergoes 87 meticulous steps from concept to completion. Our artisans combine 
            centuries-old techniques with cutting-edge technology to create garments meant to last generations.
          </p>
          <ul className="space-y-4">
            {[
              "Hand-cut patterns from premium materials",
              "Each stitch placed with intention",
              "Natural dye processes only",
              "72-hour quality inspection"
            ].map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <span className="inline-block w-1 h-1 mt-3 bg-white rounded-full"></span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="craft-image aspect-square bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618354691373-d8514fecaf3e"
              alt="Textiles"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="craft-image aspect-square bg-gray-900 rounded-xl overflow-hidden mt-8">
            <img
              src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c"
              alt="Sewing"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="craft-image aspect-square bg-gray-900 rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0"
              alt="Dyeing"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="craft-image aspect-square bg-gray-900 rounded-xl overflow-hidden mt-8">
            <img
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9"
              alt="Finishing"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// 5. Sustainability Timeline
const SustainabilityTimeline = () => {
  const milestones = [
    {
      year: "2012",
      title: "Founding Principles",
      description: "Committed to ethical production from day one"
    },
    {
      year: "2015",
      title: "Organic Cotton Initiative",
      description: "Transitioned to 100% organic cotton sources"
    },
    {
      year: "2018",
      title: "Carbon Neutral",
      description: "Achieved carbon neutral certification"
    },
    {
      year: "2020",
      title: "Closed Loop System",
      description: "Implemented fabric recycling program"
    },
    {
      year: "2023",
      title: "Regenerative Agriculture",
      description: "Partnered with regenerative cotton farms"
    }
  ];

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Our Sustainability Journey</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Continuous improvement is at the heart of our environmental commitment.
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
              className={`relative mb-12 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}
            >
              <div className={`absolute top-0 ${index % 2 === 0 ? '-right-1' : '-left-1'} w-4 h-4 bg-black rounded-full`}></div>
              <h3 className="text-2xl font-light mb-2">{milestone.year}</h3>
              <h4 className="text-lg font-medium mb-2">{milestone.title}</h4>
              <p className="text-black/60">{milestone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Values Section with Animated Icons
const ValuesSection = () => {
  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We design with the planet in mind at every step"
    },
    {
      icon: "✋",
      title: "Craftsmanship",
      description: "Time-honored techniques meet modern innovation"
    },
    {
      icon: "💡",
      title: "Transparency",
      description: "Clear insight into our materials and processes"
    },
    {
      icon: "❤️",
      title: "Community",
      description: "Supporting artisans and customers alike"
    }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-light mb-4">Our Core Values</h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          These principles guide every decision we make as a company.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 1, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-gray-900 rounded-xl p-8 text-center"
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl mb-4"
            >
              {value.icon}
            </motion.div>
            <h3 className="text-xl font-medium mb-2">{value.title}</h3>
            <p className="text-white/60">{value.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// 7. About Page Component
const About = () => {
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
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen max-h-[900px] overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae"
              alt="Our atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6"
              >
                Crafting Tomorrow's Heritage
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/80 mb-8 max-w-lg"
              >
                Discover the people, processes, and principles behind ÉLÉGANCE
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* All Sections */}
        <div ref={addToRefs}>
          <OurStory />
        </div>
        
        <div ref={addToRefs}>
          <TeamSection />
        </div>
        
        <div ref={addToRefs}>
          <CraftsmanshipSection />
        </div>
        
        <div ref={addToRefs}>
          <SustainabilityTimeline />
        </div>
        
        <div ref={addToRefs}>
          <ValuesSection />
        </div>
      </main>

   
    </div>
  );
};

export default About;