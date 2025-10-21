import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown, FaMapMarkerAlt, FaUsers, FaHeart } from 'react-icons/fa';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToGallery = () => {
    document.querySelector('#gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B6F3B] via-[#C9933E] to-[#E74C3C]">
        {/* Animated mesh gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
              opacity: [null, Math.random() * 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
      </div>

      {/* Hero Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1622354573449-ce732931783f)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo Image */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white rounded-full blur-3xl opacity-40"></div>
              <img 
                src="https://customer-assets.emergentagent.com/job_interactive-portal-1/artifacts/q7xfvvgj_logo.jpg" 
                alt="I Love Shrigonda Logo" 
                className="w-48 h-48 sm:w-64 sm:h-64 object-contain relative drop-shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold text-white drop-shadow-2xl"
            >
              Welcome to <span className="block mt-2 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">Shrigonda</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium max-w-3xl mx-auto"
            >
              Discover the heart and soul of our beautiful village
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 sm:gap-12 pt-8"
          >
            {[
              { icon: FaMapMarkerAlt, label: 'Maharashtra, India', value: 'Ahmednagar District' },
              { icon: FaUsers, label: 'Community', value: '10,000+ People' },
              { icon: FaHeart, label: 'Heritage', value: 'Rich Culture' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <stat.icon className="text-4xl text-white" />
                <p className="text-white/80 text-sm">{stat.label}</p>
                <p className="text-white font-bold text-lg">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGallery}
              className="px-8 py-4 bg-white text-[#C9933E] rounded-full font-bold text-lg shadow-2xl hover:bg-amber-50 transition-all"
            >
              Explore Gallery
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
            className="pt-12"
          >
            <FaArrowDown className="text-white text-3xl mx-auto animate-bounce cursor-pointer" onClick={scrollToGallery} />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;