import React from 'react';
import LeaderBoard from '../layouts/home/LeaderBoard';
import AboutSection from '../layouts/home/AboutSection';
import WhyChooseUs from '../layouts/home/WhyChooseUs';
import Homemenu from '../layouts/home/Homemenu';
import SocietySearch from '../layouts/home/SocietySearch';
import Testimonialsection from '../layouts/home/Testimonialsection';


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
