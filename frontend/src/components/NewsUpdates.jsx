import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaNewspaper, FaClock, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../data';
import { format } from 'date-fns';
import GoogleSheetService from '../services/googleSheetService';
import { SHEET_URLS } from '../sheetConfig';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsUpdates = () => {
  const t = data.news;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // 1. Try Google Sheet
        if (SHEET_URLS.news) {
          const sheetData = await GoogleSheetService.fetchData(SHEET_URLS.news);
          if (sheetData.length > 0) {
            setNews(sheetData);
            return; // Exit if successful
          }
        }

        // 2. Try Backend API
        const response = await axios.get(`${API}/news`);
        if (response.data && response.data.length > 0) {
          setNews(response.data);
        } else {
          setNews(t.items);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews(t.items);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [t.items]);

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
            {t.title} <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{t.subtitle}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.description}
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
                    <span>{t.button}</span>
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