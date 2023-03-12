import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { Component } from "react";
import Slider from "react-slick";
import { padding } from "@mui/system";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

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
      centerPadding: "3px",
      arrows: true,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    const styles = {
      root: {
        padding: "20px 60px 20px 60px",
        backgroundColor: "#f3c149",
      },
      image: {
        borderRadius: "5px",
        width: "200px",
        height: "200px",
      },
      "@media (max-width: 600px)": {
        root: {
          padding: "20px",
        },
        image: {
          width: "100%",
          height: "auto",
        },
      },
    };

    return (
      <div style={styles.root}>
        <Slider {...settings}>
          {items.map((elem) => {
            return (
              <div>
                <Button component={Link} to="/carouselkitchen">
                  <img src={elem} style={styles.image}></img>
                </Button>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}
