import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EventsCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      if (response.data.length > 0) {
        setEvents(response.data);
      } else {
        setEvents(mockEvents);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const mockEvents = [
    {
      id: '1',
      title: 'Diwali Festival Celebration',
      description: 'Grand Diwali celebration with traditional rituals, fireworks, and community feast. Join us for this spectacular festival of lights.',
      event_date: '2025-10-25',
      location: 'Village Temple',
      image_url: 'https://images.unsplash.com/photo-1592843997881-cab3860b1067'
    },
    {
      id: '2',
      title: 'Farmers Market',
      description: 'Weekly farmers market featuring fresh organic produce, traditional handicrafts, and local delicacies.',
      event_date: '2025-09-15',
      location: 'Main Market Square',
      image_url: 'https://images.unsplash.com/photo-1672603586237-343746cfb8fe'
    },
    {
      id: '3',
      title: 'Cultural Music Night',
      description: 'Evening of traditional Maharashtrian music and dance performances by local artists and visiting performers.',
      event_date: '2025-09-20',
      location: 'Community Center',
      image_url: 'https://images.unsplash.com/photo-1603646315726-5aad1908e00d'
    },
    {
      id: '4',
      title: 'Heritage Walk',
      description: 'Guided tour of historic temples and monuments with insights into village history and architecture.',
      event_date: '2025-09-10',
      location: 'Temple Complex',
      image_url: 'https://images.unsplash.com/photo-1704019541434-550af5403e7f'
    },
    {
      id: '5',
      title: 'Sports Tournament',
      description: 'Inter-village cricket tournament with teams from neighboring villages. Refreshments and prizes for winners.',
      event_date: '2025-09-30',
      location: 'Village Grounds',
      image_url: 'https://images.unsplash.com/photo-1622354573449-ce732931783f'
    },
    {
      id: '6',
      title: 'Craft Fair',
      description: 'Showcase of traditional handicrafts, pottery, and artwork by local artisans. Opportunity to purchase unique pieces.',
      event_date: '2025-10-05',
      location: 'Arts Colony',
      image_url: 'https://images.unsplash.com/photo-1663513844814-5f2fd51e957a'
    }
  ];

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Events <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Calendar</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upcoming festivals, cultural events, and community gatherings
          </p>
        </motion.div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9933E]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                {/* Date Badge */}
                <div className="relative">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white rounded-xl p-3 shadow-lg text-center min-w-[70px]">
                      <div className="text-3xl font-bold text-[#E74C3C]">
                        {format(new Date(event.event_date), 'dd')}
                      </div>
                      <div className="text-sm font-medium text-[#C9933E]">
                        {format(new Date(event.event_date), 'MMM')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-3 text-sm text-gray-700">
                      <FaCalendarAlt className="text-[#C9933E]" />
                      <span>{format(new Date(event.event_date), 'EEEE, MMMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-start space-x-3 text-sm text-gray-700">
                      <FaMapMarkerAlt className="text-[#E74C3C] mt-1" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-[#C9933E] to-[#E74C3C] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsCalendar;