import React from 'react';
import KitchenCard from '../components/home/KitchenCard';
import Testimonialsection from '../components/home/Testimonialsection';
import Carousel from '../components/home/Carousel'

export default function Kitchen() {
  return (
    <div>
      <Carousel items={['c1.jpeg','c2.jpeg','c3.jpeg','c4.jpeg']}/>
      <KitchenCard />
      <Testimonialsection />
    </div>
  );
}
