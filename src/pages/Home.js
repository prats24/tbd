import React from 'react';
import LeaderBoard from '../components/home/LeaderBoard';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Homemenu from '../components/home/Homemenu';
import SocietySearch from '../components/home/SocietySearch';
import Testimonialsection from '../components/home/Testimonialsection';

export default function Home() {
  return (
    <div>
      {/* <SocietySearch /> */}
      <LeaderBoard />
      <AboutSection />
      <WhyChooseUs />
      <Homemenu />
      <Testimonialsection />
    </div>
  );
}
