import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Heritage', 'Festivals', 'Nature', 'People', 'Events', 'Food'];

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(`${API}/gallery`);
      if (response.data.length > 0) {
        setImages(response.data);
      } else {
        // Mock data if API returns empty
        setImages(mockImages);
      }
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setImages(mockImages);
    } finally {
      setLoading(false);
    }
  };

  const mockImages = [
    {
      id: '1',
      title: 'Village Lake View',
      category: 'Collage',
      image_url: 'https://images.unsplash.com/photo-1622354573449-ce732931783f',
      description: 'Beautiful village landscape with serene lake'
    },
    {
      id: '2',
      title: 'Rural Roads',
      category: 'Collage',
      image_url: 'https://images.unsplash.com/photo-1651678938586-affccc71c270',
      description: 'Scenic rural road surrounded by nature'
    },
    {
      id: '3',
      title: 'Village Life',
      category: 'collage',
      image_url: 'https://images.unsplash.com/photo-1634874706682-3468a6e421ba',
      description: 'Traditional village life with cattle'
    },
    {
      id: '4',
      title: 'Traditional Architecture',
      category: 'StBusstand',
      image_url: 'https://images.pexels.com/photos/259780/pexels-photo-259780.jpeg',
      description: 'Beautiful traditional village architecture'
    },
    {
      id: '5',
      title: 'Kanheri Caves',
      category: 'Dharmveerford',
      image_url: 'https://images.unsplash.com/photo-1751964383659-27cd4c303bdb',
      description: 'Ancient Maharashtra heritage site'
    },
    {
      id: '6',
      title: 'Temple Architecture',
      category: 'shrisantshaikhmohmomadmaharaj',
      image_url: 'https://images.unsplash.com/photo-1704019541434-550af5403e7f',
      description: 'Traditional temple in the village'
    },
    {
      id: '7',
      title: 'Hawa Mahal',
      category: 'Heritage',
      image_url: 'https://images.unsplash.com/photo-1524229648276-e66561fe45a9',
      description: 'Historic Indian architecture'
    },
    {
      id: '8',
      title: 'Traditional Door',
      category: 'Heritage',
      image_url: 'https://images.unsplash.com/photo-1663513844814-5f2fd51e957a',
      description: 'Beautiful ornate traditional door'
    },
    {
      id: '9',
      title: 'Diwali Celebration',
      category: 'Festivals',
      image_url: 'https://images.unsplash.com/photo-1592843997881-cab3860b1067',
      description: 'Festival of lights celebration'
    },
    {
      id: '10',
      title: 'Festival Lighting',
      category: 'Festivals',
      image_url: 'https://images.unsplash.com/photo-1721924275114-2c4d3e8a0fde',
      description: 'Traditional festival lighting ceremony'
    },
    {
      id: '11',
      title: 'Durga Puja',
      category: 'Festivals',
      image_url: 'https://images.unsplash.com/photo-1603646315726-5aad1908e00d',
      description: 'Durga Puja celebration'
    },
    {
      id: '12',
      title: 'Village Festival',
      category: 'Festivals',
      image_url: 'https://images.pexels.com/photos/31203526/pexels-photo-31203526.jpeg',
      description: 'Community festival celebration'
    }
  ];

  const filteredImages = selectedCategory === 'All'
    ? images
    : images.filter(img => img.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Photo <span className="bg-gradient-to-r from-[#C9933E] to-[#E74C3C] bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the beauty and culture of Shrigonda through our lens
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-[#C9933E] to-[#E74C3C] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9933E]"></div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(image)}
                  className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg aspect-square"
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg">{image.title}</h3>
                      <p className="text-white/80 text-sm">{image.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                      {image.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <FiX className="text-2xl" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
              />
              <div className="mt-4 text-center">
                <h3 className="text-white text-2xl font-bold">{selectedImage.title}</h3>
                <p className="text-white/70 mt-2">{selectedImage.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;