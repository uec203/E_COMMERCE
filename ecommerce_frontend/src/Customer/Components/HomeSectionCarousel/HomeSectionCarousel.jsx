import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { Button, Slide } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useState } from 'react';

const HomeSectionCarousel = ({item: { title, products }}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const responsive = {
        0: { items: 2 },
        720: { items: 4 },
        1024: { items: 5.5 },
    };

    console.log("Products in HomeSectionCarousel:", products);

    const fontButton = () => {
        return (activeIndex!==0 && <Button variant='contained' onClick={sildePrev} className='z-50' sx={{ position: 'absolute', top: '8rem', left: '0rem', transform: "translateX(-50%) rotate(90deg)", bgcolor: "white" }}>
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(-90deg)", color: "black" }} />
        </Button>);
    }
    const backButton = () => {
        return (activeIndex!==items.length-5 && <Button variant='contained' onClick={sildeNext} className='z-50' sx={{ position: 'absolute', top: '8rem', right: '0rem', transform: "translateX(50%) rotate(90deg)", bgcolor: "white" }}>
            <KeyboardArrowLeftIcon sx={{ transform: "rotate(90deg)", color: "black" }} />
        </Button>);
    }
    const sildeNext = () => setActiveIndex(activeIndex + 1);
    const sildePrev = () => setActiveIndex(activeIndex - 1);

    const items = (products).map((product) => <HomeSectionCard product={product} />);
    return (
        <div className='relative px-4 lg:px-8'>
            <h2 className='text-2xl font-extrabold text-grey-800 py-5 text-left'>{title}</h2>
            <div className='relative p-5 border'>
                <AliceCarousel
                    items={items}
                    responsive={responsive}
                    disableDotsControls
                    keyboardNavigation={true}
                    renderPrevButton={fontButton}
                    renderNextButton={backButton}
                />
            </div>
        </div>)
};
export default HomeSectionCarousel;