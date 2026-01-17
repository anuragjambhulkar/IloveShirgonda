import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { data } from '../data';

const Footer = () => {
  const t = data.footer;
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: data.navbar.menu.home, href: '#hero' },
    { name: data.navbar.menu.gallery, href: '#gallery' },
    { name: data.navbar.menu.heritage, href: '#heritage' },
    { name: data.navbar.menu.attractions, href: '#attractions' },
    { name: data.navbar.menu.businesses, href: '#businesses' },
    { name: data.navbar.menu.events, href: '#events' }
  ];

  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: FaYoutube, href: '#', label: 'YouTube', color: 'hover:text-red-500' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-[#8B6F3B] to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 blur-lg opacity-30 rounded-full"></div>
                <FaHeart className="text-3xl text-[#E74C3C] relative" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{t.brand}</h3>
                <p className="text-sm text-white/70">{t.tagline}</p>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              {t.description}
            </p>
            {/* Social Links */}
            <div className="flex space-x-3 pt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-bold mb-6">{t.quickLinks}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-[#C9933E] transition-colors hover:translate-x-2 inline-block transform duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-bold mb-6">{data.contact.title} {data.contact.subtitle}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#E74C3C] mt-1 flex-shrink-0" />
                <span className="text-white/80">
                  Shrigonda, Ahmednagar<br />Maharashtra, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#C9933E] flex-shrink-0" />
                <a href="tel:+919307840449" className="text-white/80 hover:text-[#C9933E] transition-colors">
                  +91 93078 40449
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#E74C3C] flex-shrink-0" />
                <a href="mailto:iloveshrigonda96@gmail.com" className="text-white/80 hover:text-[#C9933E] transition-colors">
                  iloveshrigonda96@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-xl font-bold mb-6">{t.stayUpdated}</h4>
            <p className="text-white/80 mb-4">
              {t.newsletterDesc}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t.placeholderEmail}
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:border-[#C9933E] text-white placeholder-white/50"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-r-lg font-bold hover:shadow-lg transition-all"
              >
                {t.subscribe}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {new Date().getFullYear()} {data.navbar.brand}. {t.rights} I {' '}
              <FaHeart className="inline text-[#E74C3C] animate-pulse" /> {data.navbar.brand}
            </p>
            <div className="flex space-x-6 text-sm">
              <button className="text-white/60 hover:text-white transition-colors">
                {t.privacy}
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                {t.terms}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;