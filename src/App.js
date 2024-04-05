import React, { useEffect } from 'react';
import './App.css';
import Carousel from './Carousel';

function App() {
  // This will be used only for local development
  useEffect(() => {
    // Check if the environment is development and if renderCarousel is defined
    if (process.env.NODE_ENV === 'development' && window.renderCarousel) {
      // Use the environment variables or default values
      const userId = process.env.REACT_APP_USER_ID || 'defaultUserId';
      const categoryIndexToShow = parseInt(process.env.REACT_APP_CATEGORY_INDEX_TO_SHOW, 10) || 0;

      window.renderCarousel('carousel-container', userId, categoryIndexToShow);
    }
  }, []);

  return (
    <div className="App">
      {/* This div will be used as the container for the carousel when running locally */}
      <Carousel userId="wBpsGC63YpdtAMRwD6Xy1hwtC613" categoryIndexToShow={1} />
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <Carousel userId="wBpsGC63YpdtAMRwD6Xy1hwtC613" categoryIndexToShow={1} />
//     </div>
//   );
// }


export default App;
