import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { home_carousel } from '../../Data/home_carousel';


const items = home_carousel.map((item)=><img src={item.image} alt={item.alt} style={{ height: 560 , width: '100%', objectFit: 'fill' }} role='presentation'/>)

const MainCarousel = () => (
        <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
    />

    
);

export default MainCarousel;