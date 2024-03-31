// src/Carousel.js

import React, { useState } from 'react';
import './Carousel.css'; // Make sure to create a corresponding CSS file

const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstItem = currentIndex === 0;
        const newIndex = isFirstItem ? items.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastItem = currentIndex === items.length - 1;
        const newIndex = isLastItem ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="carousel">
            <button onClick={goToPrevious}>{'<'}</button>
            <div className="carousel__item">
                {items[currentIndex]}
            </div>

            <div className="carousel__description">
                {/* Static or dynamic description here */}
                {items[currentIndex].description}
            </div>

            <button onClick={goToNext}>{'>'}</button>
        </div>
    );
};

export default Carousel;
