import React from 'react';
import ReactDOM from 'react-dom/client';
import Carousel from './Carousel'; // Importing Carousel directly
import { register } from 'swiper/element/bundle';
import './firebaseConfig'; 

// Register Swiper custom elements
register();

// Function to render the Carousel, exposed globally for widget embedding
window.renderCarousel = (elementId, userId, categoryIndexToShow) => {
  const root = ReactDOM.createRoot(document.getElementById(elementId));
  root.render(
    <React.StrictMode>
      <Carousel userId={userId} categoryIndexToShow={categoryIndexToShow} />
    </React.StrictMode>
  );
};
