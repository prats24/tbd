import React from 'react';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import SocietySearch from '../components/home/SocietySearch';
import Testimonialsection from '../components/home/Testimonialsection';

export default function Society() {
  return (
    <div>
      <SocietySearch />
      <AboutSection />
      <WhyChooseUs />
      <Testimonialsection />
    </div>
  );
}
