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
      title: 'Weekly Market (Athawadi Bazar)',
      description: 'The vibrant weekly market where farmers and traders sell fresh produce, groceries, and household items. A central event for the local community.',
      event_date: '2025-11-02', // Assuming it happens on a Sunday
      location: 'Main Market Square, Shrigonda',
      image_url: '/asset/SHRIGONDA.jpeg'
    },
    {
      id: '2',
      title: 'Shaikh Mohammad Maharaj Yatra',
      description: 'The annual yatra (pilgrimage) to honor Shri Sant Shaikh Mohammad Maharaj. The event includes a palanquin procession, kirtans, and a large fair.',
      event_date: '2025-11-15', // Placeholder date
      location: 'Shri Sant Shaikh Mohammad Maharaj Temple, Shrigonda',
      image_url: '/asset/SHRI SANT SHAIKH MOHAMMAD MAHARAJ.jpeg'
    },
    {
      id: '3',
      title: 'Diwali Pahat',
      description: 'A special morning celebration on the first day of Diwali, with music, cultural programs, and community gatherings to welcome the festival of lights.',
      event_date: '2025-10-31', // Diwali date
      location: 'Shrigonda Town Center',
      image_url: '/asset/images (7).jpeg'
    },
    {
      id: '4',
      title: 'Pedgaon Fort Heritage Walk',
      description: 'A guided tour of the historic Pedgaon Fort (Bahadurgad), exploring its temples, architecture, and strategic importance in Maratha history.',
      event_date: '2025-11-22',
      location: 'Pedgaon Fort, Shrigonda',
      image_url: '/asset/Dharmveer_ford.jpg'
    },
    {
      id: '5',
      title: 'Krishi Pradarshan (Agricultural Exhibition)',
      description: 'An exhibition for farmers showcasing the latest agricultural technology, seeds, and fertilizers. Includes workshops and demonstrations.',
      event_date: '2025-12-05',
      location: 'Krishi Utpanna Bazar Samiti, Shrigonda',
      image_url: '/asset/Dharmveer Gad pedgoan 1.jpg' // Using a generic nature image
    },
    {
      id: '6',
      title: 'Siddheshwar Temple Festival',
      description: 'The annual festival at the ancient Siddheshwar Temple in Mandavgan, featuring religious ceremonies and a local fair.',
      event_date: '2025-12-12',
      location: 'Siddheshwar Temple, Mandavgan',
      image_url: '/asset/SHRIGONDA MANDIR.jpeg'
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
            Events <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Calendar</span>
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
                    className="mt-4 w-full py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-xl font-bold hover:shadow-lg transition-all"
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