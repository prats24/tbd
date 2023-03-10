import React, { useState } from 'react';
import KitchenCard from '../layouts/home/KitchenCard';
import Testimonialsection from '../layouts/home/Testimonialsection';
import Carousel from '../layouts/home/Carousel'
import Api from '../helpers/api'


export default function Kitchen() {
  const [carousels,setCraousels] = useState([]);

  React.useEffect(async()=>{
    let res = await Api.getCarousels()
    console.log(res.data.data)
    setCraousels(res.data.data)
    },[])

    const itemsArray = []
    carousels.map((e)=>{
      itemsArray.push(e.carouselPhoto)
    })

  return (
    <div>
      <Carousel items={itemsArray} />
      <KitchenCard />
      {/* <Testimonialsection /> */}
    </div>
  );
}
