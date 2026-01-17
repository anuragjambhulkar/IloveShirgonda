import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { data } from '../data';

const Navbar = () => {
  const t = data.navbar;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: t.menu.home, href: '#hero' },
    { name: t.menu.gallery, href: '#gallery' },
    { name: t.menu.heritage, href: '#heritage' },
    { name: t.menu.attractions, href: '#attractions' },
    { name: t.menu.businesses, href: '#businesses' },
    { name: t.menu.stories, href: '#stories' },
    { name: t.menu.events, href: '#events' },
    { name: t.menu.contact, href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/65 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              <div className="relative flex items-center">
                <h1 className={`text-3xl font-bold font-serif bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent`}>
                  I &nbsp;
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 blur-lg opacity-30 rounded-full"></div>
                <FaHeart className="text-3xl text-[#E74C3C] relative" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold font-serif bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent`}>
                  {t.brand}
                </h1>
                <p className="text-xs font-serif text-gray-600">{t.tagline}</p>
              </div>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${isScrolled
                    ? 'text-gray-700 hover:text-[#C9933E] hover:bg-[#C9933E]/10'
                    : 'text-white hover:bg-white/20'
                    }`}
                >
                  {item.name}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FiX className={`text-2xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              ) : (
                <FiMenu className={`text-2xl ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-[#C9933E]/10 hover:text-[#C9933E] transition-all font-medium"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;