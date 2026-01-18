import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUser, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../data';
import { format } from 'date-fns';
import GoogleSheetService from '../services/googleSheetService';
import { SHEET_URLS } from '../sheetConfig';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CommunityStories = () => {
  const t = data.stories;
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);

        // 1. Try Google Sheet
        if (SHEET_URLS.stories) {
          const sheetData = await GoogleSheetService.fetchData(SHEET_URLS.stories);
          if (sheetData.length > 0) {
            setStories(sheetData);
            return;
          }
        }

        // 2. Try Backend API
        const response = await axios.get(`${API}/stories`);
        if (response.data && response.data.length > 0) {
          setStories(response.data);
        } else {
          setStories(t.items);
        }
      } catch (error) {
        console.error('Error fetching stories:', error);
        setStories(t.items);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, [t.items]);

  return (
    <section id="stories" className="py-20 bg-gradient-to-b from-white to-amber-50">
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

        {/* Stories Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9933E]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Quote Icon */}
                <div className="p-6 pb-0">
                  <div className="inline-flex p-4 bg-gradient-to-br from-[#C9933E] to-[#E74C3C] rounded-2xl">
                    <FaQuoteLeft className="text-3xl text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900">{story.title}</h3>
                  <p className="text-gray-600 leading-relaxed line-clamp-4">
                    {story.story}
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#C9933E] to-[#E74C3C] rounded-full flex items-center justify-center">
                        <FaUser className="text-white text-xl" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{story.author_name}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FaClock />
                        <span>
                          {story.created_at ? format(new Date(story.created_at), 'MMM dd, yyyy') : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Footer */}
                {story.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Share Your Story CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-500 to-red-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">{t.cta.title}</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t.cta.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-[#C9933E] rounded-full font-bold text-lg shadow-2xl hover:bg-amber-50 transition-all"
            >
              {t.cta.button}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStories;