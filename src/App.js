import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Carousel'; // Your Carousel component
import { register } from 'swiper/element/bundle';
// Ensure Firebase is initialized as needed
import './firebaseConfig'; 

// register Swiper custom elements
register();

// Function to render the Carousel, exposed globally
function renderCarousel(elementId, userId, categoryIndexToShow) {
  ReactDOM.render(
    <Carousel userId={userId} categoryIndexToShow={categoryIndexToShow} />,
    document.getElementById(elementId)
  );
}

// Expose to the global scope
window.renderCarousel = renderCarousel;
