import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaUser, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CommunityStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get(`${API}/stories`);
      if (response.data.length > 0) {
        setStories(response.data);
      } else {
        setStories(mockStories);
      }
    } catch (error) {
      console.error('Error fetching stories:', error);
      setStories(mockStories);
    } finally {
      setLoading(false);
    }
  };

  const mockStories = [
    {
      id: '1',
      author_name: 'Ramesh Patil',
      title: 'Growing Up in Shrigonda',
      story: 'I have spent my entire life in this beautiful village. Every corner holds a memory, from playing cricket in the village grounds to attending festivals at our ancient temples. Shrigonda is not just a place, it\'s a feeling of belonging.',
      image_url: 'https://images.unsplash.com/photo-1634874706682-3468a6e421ba',
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      author_name: 'Sunita Deshmukh',
      title: 'The Heart of Our Community',
      story: 'What makes Shrigonda special is our unity. Whether it\'s helping during festivals or supporting each other in difficult times, our village spirit is unbreakable. I am proud to be a part of this wonderful community.',
      image_url: 'https://images.unsplash.com/photo-1622354573449-ce732931783f',
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      author_name: 'Prakash Jadhav',
      title: 'Preserving Our Heritage',
      story: 'As a local historian, I\'ve witnessed how our village has evolved while maintaining its cultural roots. Our temples, traditions, and festivals connect us to our glorious past while we embrace the future.',
      image_url: 'https://images.unsplash.com/photo-1704019541434-550af5403e7f',
      created_at: new Date().toISOString()
    }
  ];

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
            Community <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from the hearts of our community members
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
          <div className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Share Your Story</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Have a special memory or experience from Shrigonda? We'd love to hear from you!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-[#C9933E] rounded-full font-bold text-lg shadow-2xl hover:bg-amber-50 transition-all"
            >
              Submit Your Story
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStories;