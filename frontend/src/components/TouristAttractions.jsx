import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaMountain, FaWater, FaTree } from 'react-icons/fa';

const TouristAttractions = () => {
  const attractions = [
    {
      id: 1,
      name: 'Shrigonda Lake',
      category: 'Nature',
      icon: FaWater,
      description: 'A serene lake perfect for morning walks, bird watching, and peaceful reflection. A favorite spot for locals and visitors alike.',
      image: 'https://images.unsplash.com/photo-1622354573449-ce732931783f',
      highlights: ['Bird Watching', 'Boating', 'Sunrise Views']
    },
    {
      id: 2,
      name: 'Historic Temples',
      category: 'Religious',
      icon: FaTree,
      description: 'Ancient temples with stunning architecture showcasing the spiritual and artistic heritage of the region.',
      image: 'https://images.unsplash.com/photo-1524229648276-e66561fe45a9',
      highlights: ['Architecture', 'Spirituality', 'History']
    },
    {
      id: 3,
      name: 'Village Trails',
      category: 'Adventure',
      icon: FaMountain,
      description: 'Scenic trails through lush farmlands and countryside, offering authentic village experience and natural beauty.',
      image: 'https://images.unsplash.com/photo-1651678938586-affccc71c270',
      highlights: ['Nature Walks', 'Photography', 'Rural Life']
    },
    {
      id: 4,
      name: 'Local Markets',
      category: 'Culture',
      icon: FaMapMarkedAlt,
      description: 'Vibrant local markets offering fresh produce, traditional crafts, and authentic village experience.',
      image: 'https://images.unsplash.com/photo-1672603586237-343746cfb8fe',
      highlights: ['Shopping', 'Local Food', 'Handicrafts']
    }
  ];

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
            Tourist <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Attractions</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the must-visit places and hidden gems of Shrigonda
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
                  className="mt-4 w-full py-3 bg-gradient-to-r from-[#C9933E] to-[#E74C3C] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Visit Now
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