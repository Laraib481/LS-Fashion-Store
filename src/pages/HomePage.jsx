import React from 'react';
import HeroSlider from '../components/HeroSlider';
import TopCollections from '../components/TopCollections';
import WomenSection from '../components/WomenSection';
import MainProductShowcase from '../components/MainProductShowcase';
import TrustedSection from '../components/TrustedSection';

const HomePage = () => {
  return (
    <>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Top Collections */}
      <TopCollections />

      {/* 3. Women Section */}
      <WomenSection />

      {/* 4. Main Product Showcase */}
      <MainProductShowcase />

      {/* 5. Trusted Section */}
      <TrustedSection />
    </>
  );
};

export default HomePage;