import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaClock, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsUpdates = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`${API}/news`);
      if (response.data.length > 0) {
        setNews(response.data);
      } else {
        setNews(mockNews);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const mockNews = [
    {
      id: '1',
      title: 'Annual Temple Festival Announced',
      content: 'The grand annual temple festival will be celebrated next month with traditional rituals, cultural programs, and community feasts. Everyone is invited to participate in this auspicious occasion.',
      image_url: 'https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde',
      published_at: new Date().toISOString()
    },
    {
      id: '2',
      title: 'New Community Center Opens',
      content: 'A state-of-the-art community center has been inaugurated, providing modern facilities for meetings, workshops, and cultural events. The center will serve as a hub for village activities.',
      image_url: 'https://images.unsplash.com/photo-1651678938586-affccc71c270',
      published_at: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Farming Workshop Success',
      content: 'The recent organic farming workshop attracted over 100 farmers from surrounding villages. Experts shared modern techniques while preserving traditional wisdom.',
      image_url: 'https://images.unsplash.com/photo-1672603586237-343746cfb8fe',
      published_at: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Youth Sports Tournament',
      content: 'Village youth showcased their talents in the inter-village sports tournament. The event promoted fitness and sportsmanship among young participants.',
      image_url: 'https://images.unsplash.com/photo-1622354573449-ce732931783f',
      published_at: new Date().toISOString()
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            News & <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Updates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest happenings in our village
          </p>
        </motion.div>

        {/* News Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9933E]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-[#E74C3C] text-white px-4 py-2 rounded-full flex items-center space-x-2">
                      <FaNewspaper />
                      <span className="text-sm font-bold">News</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <FaClock />
                    <span>
                      {item.published_at ? format(new Date(item.published_at), 'MMMM dd, yyyy') : 'Recently'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 hover:text-[#C9933E] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {item.content}
                  </p>

                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-2 text-[#C9933E] font-bold hover:text-[#E74C3C] transition-colors"
                  >
                    <span>Read More</span>
                    <FaArrowRight />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsUpdates;