import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import axios from 'axios';
import { data } from '../data';
import { format } from 'date-fns';
import GoogleSheetService from '../services/googleSheetService';
import { SHEET_URLS } from '../sheetConfig';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EventsCalendar = () => {
  const t = data.events;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // 1. Try Google Sheet
        if (SHEET_URLS.events) {
          const sheetData = await GoogleSheetService.fetchData(SHEET_URLS.events);
          if (sheetData.length > 0) {
            setEvents(sheetData);
            return;
          }
        }

        // 2. Try Backend API
        const response = await axios.get(`${API}/events`);
        if (response.data && response.data.length > 0) {
          setEvents(response.data);
        } else {
          setEvents(t.items);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents(t.items);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [t.items]);

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
            {t.title} <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">{t.subtitle}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.description}
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
                    {t.button}
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