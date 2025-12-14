import React from 'react';
import { motion } from 'framer-motion';
import { FaLandmark, FaHistory, FaChurch } from 'react-icons/fa';

const CulturalHeritage = () => {
  const heritageItems = [
    {
      id: 1,
      icon: FaHistory,
      title: 'Shri Sant Shaikh Mohmand Maharaj',
      description: 'Shri Sant Shaikh Mohmand Maharaj was a revered spiritual leader known for his deep wisdom, compassion, and guidance. Celebrated for his teachings on devotion, selflessness, and service to humanity, he inspired countless followers to lead a life of righteousness and inner peace. His life and works continue to be a beacon of spiritual enlightenment, drawing devotees from far and wide to seek blessings and spiritual knowledge.',
      image: '/asset/SHRI SANT SHAIKH MOHAMMAD MAHARAJ.jpeg',
      facts: [
        'Renowned spiritual leader',
        'Guided followers in devotion and selfless service',
        'Inspires spiritual seekers across the region'
      ]
    },
    {
      id: 2,
      icon: FaHistory, // Suitable icon for fort/historical site
      title: 'Pedgaon Fort (Bahadurgad/Dharmaveergad)',
      description: 'Situated approximately 22 km south of Shrigonda, Pedgaon Fort stands as a testament to the region\'s strategic importance. The fort houses five temples, including the Lakshmi Narayan and Baleshwar temples, showcasing intricately carved pillars and historical remnants from bygone eras.',
      image: '/asset/Dharmveer_ford.jpg',
      facts: [
        'Historical fort with 5 temples',
        'Intricate architecture and carvings',
        'Strategically important in history'
      ]
    },
    {
      id: 3,
      icon: FaLandmark,
      title: 'Hemadpanti Temples',
      description: 'Shrigonda is home to four Hemadpanti temples, showcasing the distinctive Hemadpanthi architectural style characterized by black stone construction without mortar. These 13th-century temples reflect the region\'s rich cultural and religious heritage.',
      image: '/asset/SHRIGONDA MANDIR.jpeg',
      facts: [
        'Distinctive Hemadpanthi architecture',
        'Built using black stone without mortar',
        'Dating back to 13th century'
      ]
    }
  ];

  return (
    <section id="heritage" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Cultural <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">Heritage</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the rich cultural tapestry and historical significance of Shrigonda
          </p>
        </motion.div>

        {/* Heritage Items */}
        <div className="space-y-20">
          {heritageItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } gap-8 items-center`}
            >
              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full lg:w-1/2 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C9933E] to-[#E74C3C] rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative w-full h-80 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg">
                    <item.icon className="text-4xl text-[#C9933E]" />
                  </div>
                </div>
              </motion.div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Facts */}
                <div className="space-y-3">
                  {item.facts.map((fact, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{fact}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CulturalHeritage;