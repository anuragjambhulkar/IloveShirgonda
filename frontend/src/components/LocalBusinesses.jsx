import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaUtensils, FaShoppingBag, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LocalBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Restaurant', 'Shop', 'Service', 'Grocery'];

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get(`${API}/businesses`);
      if (response.data.length > 0) {
        setBusinesses(response.data);
      } else {
        setBusinesses(mockBusinesses);
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      setBusinesses(mockBusinesses);
    } finally {
      setLoading(false);
    }
  };

  const mockBusinesses = [
    {
      id: '1',
      name: 'Shrigonda Sweets & Snacks',
      category: 'Restaurant',
      description: 'Traditional Maharashtrian sweets and authentic local snacks. Famous for puran poli and modak.',
      contact: '+91 98765 43210',
      address: 'Main Market Road, Shrigonda',
      image_url: 'https://images.pexels.com/photos/259780/pexels-photo-259780.jpeg'
    },
    {
      id: '2',
      name: 'Village Handicrafts',
      category: 'Shop',
      description: 'Authentic handmade crafts, traditional pottery, and local artwork by village artisans.',
      contact: '+91 98765 43211',
      address: 'Arts Colony, Shrigonda',
      image_url: 'https://images.unsplash.com/photo-1663513844814-5f2fd51e957a'
    },
    {
      id: '3',
      name: 'Shri Krishna General Store',
      category: 'Grocery',
      description: 'Your one-stop shop for daily essentials, fresh produce, and household items.',
      contact: '+91 98765 43212',
      address: 'Near Temple, Shrigonda',
      image_url: 'https://images.unsplash.com/photo-1672603586237-343746cfb8fe'
    },
    {
      id: '4',
      name: 'Traditional Tea House',
      category: 'Restaurant',
      description: 'Serving authentic chai, vada pav, and traditional breakfast items since 1980.',
      contact: '+91 98765 43213',
      address: 'Bus Stand Area, Shrigonda',
      image_url: 'https://images.unsplash.com/photo-1634874706682-3468a6e421ba'
    },
    {
      id: '5',
      name: 'Farm Fresh Produce',
      category: 'Shop',
      description: 'Organic vegetables and fruits directly from local farms to your table.',
      contact: '+91 98765 43214',
      address: 'Village Market, Shrigonda',
      image_url: 'https://images.unsplash.com/photo-1651678938586-affccc71c270'
    },
    {
      id: '6',
      name: 'Village Medical Center',
      category: 'Service',
      description: 'Quality healthcare services with experienced doctors available 24/7.',
      contact: '+91 98765 43215',
      address: 'Hospital Road, Shrigonda',
      image_url: 'https://images.unsplash.com/photo-1622354573449-ce732931783f'
    }
  ];

  const getIcon = (category) => {
    switch (category) {
      case 'Restaurant':
        return FaUtensils;
      case 'Shop':
        return FaShoppingBag;
      case 'Grocery':
        return FaStore;
      default:
        return FaStore;
    }
  };

  const filteredBusinesses = selectedCategory === 'All'
    ? businesses
    : businesses.filter(b => b.category === selectedCategory);

  return (
    <section id="businesses" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Local <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Support our local businesses and discover authentic village services
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#C9933E] to-[#E74C3C] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Businesses Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9933E]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBusinesses.map((business, index) => {
              const Icon = getIcon(business.category);
              return (
                <motion.div
                  key={business.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={business.image_url}
                      alt={business.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                        <Icon className="text-2xl text-[#C9933E]" />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-[#C9933E] text-white text-xs rounded-full font-medium">
                        {business.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{business.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{business.description}</p>
                    
                    {/* Contact Info */}
                    <div className="space-y-2 pt-2">
                      {business.contact && (
                        <div className="flex items-center space-x-2 text-sm text-gray-700">
                          <FaPhone className="text-[#C9933E]" />
                          <span>{business.contact}</span>
                        </div>
                      )}
                      {business.address && (
                        <div className="flex items-start space-x-2 text-sm text-gray-700">
                          <FaMapMarkerAlt className="text-[#E74C3C] mt-1" />
                          <span>{business.address}</span>
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 w-full py-2 bg-gradient-to-r from-[#C9933E] to-[#E74C3C] text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Contact Business
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default LocalBusinesses;