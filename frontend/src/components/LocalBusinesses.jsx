import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStore, FaUtensils, FaShoppingBag, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../data';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LocalBusinesses = () => {
  const t = data.businesses;
  const [businesses, setBusinesses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Restaurant', 'Shop', 'Service', 'Grocery'];

  const categoryMap = {
    'All': t.categories.all,
    'Restaurant': t.categories.restaurant,
    'Shop': t.categories.shop,
    'Service': t.categories.service,
    'Grocery': t.categories.grocery
  };

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/businesses`);
        if (response.data && response.data.length > 0) {
          setBusinesses(response.data);
        } else {
          setBusinesses(t.items);
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
        setBusinesses(t.items);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinesses();
  }, [t.items]);

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
            {t.title} <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{t.subtitle}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.description}
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
              className={`px-6 py-3 rounded-full font-medium transition-all ${selectedCategory === category
                ? 'bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
            >
              {categoryMap[category] || category}
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
                        {categoryMap[business.category] || business.category}
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
                      className="mt-4 w-full py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      {t.button}
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