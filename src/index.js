import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Carousel from './Carousel'; // Importing Carousel directly
import { register } from 'swiper/element/bundle';
import './firebaseConfig'; 

// Register Swiper custom elements
register();

// Environment variables for local development
const localUserId = process.env.REACT_APP_USER_ID || 'wBpsGC63YpdtAMRwD6Xy1hwtC613';
const localCategoryIndexToShow = parseInt(process.env.REACT_APP_CATEGORY_INDEX_TO_SHOW, 10) || 0;

// Function to render the Carousel, exposed globally for widget embedding
window.renderCarousel = (elementId, userId, categoryIndexToShow) => {
  const root = ReactDOM.createRoot(document.getElementById(elementId));
  root.render(
    <React.StrictMode>
      <Carousel userId={userId} categoryIndexToShow={categoryIndexToShow} />
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));

// If the environment is development, render the Carousel with the local variables
// If the environment is not development (e.g. production), render the App which will be configured to use the renderCarousel function
if (process.env.NODE_ENV === 'development') {
  window.renderCarousel('root', localUserId, localCategoryIndexToShow);
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
