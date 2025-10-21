import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PhotoGallery from '../components/PhotoGallery';
import CulturalHeritage from '../components/CulturalHeritage';
import TouristAttractions from '../components/TouristAttractions';
import LocalBusinesses from '../components/LocalBusinesses';
import CommunityStories from '../components/CommunityStories';
import NewsUpdates from '../components/NewsUpdates';
import EventsCalendar from '../components/EventsCalendar';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <PhotoGallery />
      <CulturalHeritage />
      <TouristAttractions />
      <LocalBusinesses />
      <CommunityStories />
      <NewsUpdates />
      <EventsCalendar />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default HomePage;