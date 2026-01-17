import React from 'react';
import { motion } from 'framer-motion';
import { FaLandmark, FaVihara, FaWater, FaGopuram } from 'react-icons/fa';
import { data } from '../data';

const TouristAttractions = () => {
  const t = data.attractions;

  // Icons mapping for the items
  const iconMap = [FaLandmark, FaVihara, FaWater, FaGopuram];

  const attractions = t.items.map((item, index) => ({
    ...item,
    icon: iconMap[index] || FaLandmark
  }));

  return (
    <section id="attractions" className="py-20 bg-gradient-to-b from-amber-50 to-white">
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

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {attractions.map((attraction, index) => (
            <motion.div
              key={attraction.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  src={attraction.image}
                  alt={attraction.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl">
                    <attraction.icon className="text-2xl text-[#C9933E]" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-[#C9933E]">
                    {attraction.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#C9933E] transition-colors">
                  {attraction.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {attraction.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {attraction.highlights.map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-amber-50 text-[#8B6F3B] text-sm rounded-full font-medium"
                    >
                      {highlight}
                    </span>
                  ))}
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
      </div>
    </section>
  );
};

export default TouristAttractions;