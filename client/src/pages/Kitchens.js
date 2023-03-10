import React from 'react';
import KitchenCard from '../layouts/home/KitchenCard';
import Testimonialsection from '../layouts/home/Testimonialsection';
import Carousel from '../layouts/home/Carousel'

export default function Kitchen() {
  return (
    <div>
      <Carousel items={['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','mymithai5.jpg']}/>
      <KitchenCard />
      {/* <Testimonialsection /> */}
    </div>
  );
}
