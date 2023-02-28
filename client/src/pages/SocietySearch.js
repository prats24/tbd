import React from 'react';
import AboutSection from '../layouts/home/AboutSection';
import WhyChooseUs from '../layouts/home/WhyChooseUs';
import SocietySearch from '../layouts/home/SocietySearch';
import Testimonialsection from '../layouts/home/Testimonialsection';


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
