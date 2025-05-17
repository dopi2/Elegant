// src/pages/Contact.jsx
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiMail, FiPhone, FiMapPin, FiClock, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';
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

// 2. Contact Hero with Interactive Map
const ContactHero = () => {
  const [activeTab, setActiveTab] = useState('stores');
  const mapRef = useRef(null);

  useEffect(() => {
    gsap.from(".hero-content > *", {
      opacity: 1,
      y: 40,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });

    // Map pin animation
    gsap.to(".map-pin", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const locations = {
    stores: [
      { city: "Paris", address: "18 Rue du Faubourg Saint-Honoré, 75008", hours: "Mon-Sat: 10AM-7PM", phone: "+33 1 42 60 32 24" },
      { city: "New York", address: "450 Madison Avenue, NY 10022", hours: "Mon-Sat: 10AM-8PM", phone: "+1 212-555-0199" },
      { city: "Tokyo", address: "5-4-30 Minami-Aoyama, Minato-ku", hours: "Mon-Sun: 11AM-8PM", phone: "+81 3-3475-3121" }
    ],
    offices: [
      { city: "London", address: "30 Savile Row, W1S 3PT", hours: "Mon-Fri: 9AM-6PM", phone: "+44 20 7493 8621" },
      { city: "Milan", address: "Via Monte Napoleone, 21", hours: "Mon-Fri: 9:30AM-6:30PM", phone: "+39 02 7602 1553" }
    ]
  };

  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Map placeholder - replace with your actual map component */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/20 text-2xl">
              Interactive Map Here
            </div>
            
            {/* Map pins */}
            {activeTab === 'stores' && (
              <>
                <div className="map-pin absolute top-[40%] left-[48%] w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
                <div className="map-pin absolute top-[45%] left-[20%] w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
                <div className="map-pin absolute top-[50%] left-[75%] w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
              </>
            )}
            {activeTab === 'offices' && (
              <>
                <div className="map-pin absolute top-[42%] left-[45%] w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
                <div className="map-pin absolute top-[48%] left-[52%] w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                  <FiMapPin />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-24 relative z-10 hero-content">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
          Connect With Us
        </h1>
        
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('stores')}
            className={`px-6 py-2 rounded-full border transition-colors ${
              activeTab === 'stores' 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-white border-white/20 hover:border-white/50'
            }`}
          >
            Our Stores
          </button>
          <button
            onClick={() => setActiveTab('offices')}
            className={`px-6 py-2 rounded-full border transition-colors ${
              activeTab === 'offices' 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-white border-white/20 hover:border-white/50'
            }`}
          >
            Offices
          </button>
        </div>
      </div>
    </section>
  );
};

// 3. Location Cards
const LocationCards = ({ activeTab }) => {
  const locations = {
    stores: [
      { city: "Paris", address: "18 Rue du Faubourg Saint-Honoré, 75008", hours: "Mon-Sat: 10AM-7PM", phone: "+33 1 42 60 32 24" },
      { city: "New York", address: "450 Madison Avenue, NY 10022", hours: "Mon-Sat: 10AM-8PM", phone: "+1 212-555-0199" },
      { city: "Tokyo", address: "5-4-30 Minami-Aoyama, Minato-ku", hours: "Mon-Sun: 11AM-8PM", phone: "+81 3-3475-3121" }
    ],
    offices: [
      { city: "London", address: "30 Savile Row, W1S 3PT", hours: "Mon-Fri: 9AM-6PM", phone: "+44 20 7493 8621" },
      { city: "Milan", address: "Via Monte Napoleone, 21", hours: "Mon-Fri: 9:30AM-6:30PM", phone: "+39 02 7602 1553" }
    ]
  };

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {locations[activeTab].map((location, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-xl p-8"
          >
            <h3 className="text-2xl font-light mb-4">{location.city}</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <p>{location.address}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <FiClock className="mt-1 flex-shrink-0" />
                <p>{location.hours}</p>
              </div>
              
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 flex-shrink-0" />
                <p>{location.phone}</p>
              </div>
            </div>
            
            <MagneticButton className="mt-6">
              <button className="flex items-center gap-2 px-4 py-2 border border-white rounded-full group">
                Get Directions
                <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
              </button>
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// 4. Contact Form with Animations
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4">Send Us a Message</h2>
            <p className="text-black/60">
              Our team typically responds within 24 hours
            </p>
          </motion.div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <label className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black focus:outline-none"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <label className="block mb-2 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black focus:outline-none"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <label className="block mb-2 text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black focus:outline-none"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <label className="block mb-2 text-sm">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-transparent border-b border-black/20 py-2 focus:border-black focus:outline-none"
              ></textarea>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2 flex justify-center mt-8"
            >
              <MagneticButton>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 rounded-full flex items-center gap-2 group ${
                    isSubmitting 
                      ? 'bg-gray-300 text-gray-500' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
                    </>
                  )}
                </button>
              </MagneticButton>
            </motion.div>
            
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:col-span-2 text-center text-green-600 mt-4"
              >
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

// 5. Social Connect Section
const SocialConnect = () => {
  const socialPlatforms = [
    { icon: <FiInstagram size={24} />, name: "Instagram", handle: "@elegance.official" },
    { icon: <FiTwitter size={24} />, name: "Twitter", handle: "@elegance" },
    { icon: <FiFacebook size={24} />, name: "Facebook", handle: "/elegance.official" }
  ];

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-light mb-6"
        >
          Connect Digitally
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          viewport={{ once: true }}
          className="text-white/60 mb-12 max-w-2xl mx-auto"
        >
          Follow us for the latest collections, behind-the-scenes content, and exclusive offers
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialPlatforms.map((platform, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-gray-900 rounded-xl p-8 flex flex-col items-center group"
            >
              <div className="text-white group-hover:text-gray-300 transition-colors mb-4">
                {platform.icon}
              </div>
              <h3 className="text-xl font-light mb-2">{platform.name}</h3>
              <p className="text-white/60">{platform.handle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// 6. Press Inquiries
const PressSection = () => {
  return (
    <section className="bg-white text-black py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4">Press Inquiries</h2>
            <p className="text-black/60">
              For media requests, interviews, or press materials
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-light mb-4">Contact</h3>
              <div className="flex items-start gap-3 mb-4">
                <FiMail className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Press Team</p>
                  <p className="text-black/60">press@elegance.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">International</p>
                  <p className="text-black/60">+44 20 7493 8621</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-light mb-4">Press Kit</h3>
              <p className="text-black/60 mb-6">
                Download our brand assets, logos, and executive bios for media use
              </p>
              <MagneticButton>
                <button className="flex items-center gap-2 px-6 py-3 border border-black rounded-full group">
                  Download Assets
                  <FiArrowUpRight className="transform group-hover:rotate-45 transition-transform"/>
                </button>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 7. Contact Page Component
const Contact = () => {
  const [activeTab, setActiveTab] = useState('stores');
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
        <ContactHero />
        
        <div ref={addToRefs}>
          <LocationCards activeTab={activeTab} />
        </div>
        
        <div ref={addToRefs}>
          <ContactForm />
        </div>
        
        <div ref={addToRefs}>
          <SocialConnect />
        </div>
        
        <div ref={addToRefs}>
          <PressSection />
        </div>
      </main>

    
    </div>
  );
};

export default Contact;