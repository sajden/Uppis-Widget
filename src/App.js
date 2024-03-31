// src/App.js
import React from 'react';
import './App.css';
import Carousel from './Carousel'; // Import the Carousel component

function App() {
  const userId = 'wBpsGC63YpdtAMRwD6Xy1hwtC613'; // Replace with the actual user ID

  return (
    <div className="App">
      {/* ...other components or HTML you want to include */}
      <Carousel userId={userId} categoryIndexToShow={1} entryIndexToShow={0} />
      
      {/* ...rest of your app */}
    </div>
  );
}

export default App;
