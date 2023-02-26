import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import { padding } from "@mui/system";

export default class Carousel extends Component {
  render() {
    const items = this.props.items;
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      speed: 5000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      variableWidth: true,
      centerPadding: '5px',
      arrows: true,
    };
    return (
      <div style={{padding:"30px 80px 30px 80px", backgroundColor:"#2d2d2d"}}>
        <Slider {...settings}>
        {items.map((elem)=>{
        return (<div>
            <img src={elem} style={{marginLeft:"15px",marginRight:"15px",borderRadius:"5px"}}></img>
        </div>)
        })}
        </Slider>
      </div>
    );
  }
}