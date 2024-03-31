import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';
import { firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Carousel = ({ userId, categoryIndexToShow, entryIndexToShow }) => {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entries, setEntries] = useState([]);
  const [currentEntryIndex, setCurrentEntryIndex] = useState(entryIndexToShow);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  // Define the scale based on the index
  const calculateScale = (index) => {
    const distance = Math.abs(index - currentMediaIndex);
    switch (distance) {
      case 0: return 1.5; // Active item
      case 1: return 1; // Items next to the active item
      case 2: return 0.8; // Items two places away from the active item
      default: return 0.6; // Items more than two places away
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, `users/${userId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const categoriesData = docSnap.data().categories;
          setCategories(categoriesData);
          const categoryKeys = Object.keys(categoriesData);
          if (categoryKeys.length > categoryIndexToShow) {
            const selectedCategoryKey = categoryKeys[categoryIndexToShow];
            setSelectedCategory(selectedCategoryKey);
            const categoryEntries = categoriesData[selectedCategoryKey];
            setEntries(categoryEntries);
            if (categoryEntries.length > entryIndexToShow) {
              setCurrentEntryIndex(entryIndexToShow);
            }
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();


    // Setup a resize event listener to update the carouselWidth
    const updateWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', updateWidth);

    // Call once to set the initial width
    updateWidth();

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('resize', updateWidth);
  }, [userId, categoryIndexToShow, entryIndexToShow]);

  const itemBaseWidth = 200; // Base width without scaling
  const margin = 10; // Margin for all items

  const goToPrevious = () => {
    setCurrentMediaIndex((prevMediaIndex) => prevMediaIndex > 0 ? prevMediaIndex - 1 : entries[currentEntryIndex].media.length - 1);
  };

  const goToNext = () => {
    setCurrentMediaIndex((prevMediaIndex) => prevMediaIndex < entries[currentEntryIndex].media.length - 1 ? prevMediaIndex + 1 : 0);
  };

  
  // Center the active item
  const centerOffset = carouselWidth / 2 - (itemBaseWidth * calculateScale(currentMediaIndex)) / 2;
  let containerOffset = centerOffset - (currentMediaIndex * (itemBaseWidth * calculateScale(currentMediaIndex) + margin * 2));

  return (
    <div className="carousel" ref={carouselRef}>
      <h2>{selectedCategory || 'Please select a category'}</h2>
      {entries.length > 0 && (
        <>
      <div className='carousel-content'>
      <div className="carousel-description">
        {entries[currentEntryIndex] && entries[currentEntryIndex].description}
      </div>
            <div className="carousel-media-container" style={{ transform: `translateX(${containerOffset}px)` }}>
              {entries[currentEntryIndex].media.map((mediaItem, index) => {
                const scale = calculateScale(index);
                const className = `carousel-media-item ${index === currentMediaIndex ? 'active' : ''}`;
                return (
                  <div key={index} className={className} style={{ transform: `scale(${scale})` }}>
                    {/* Render image or video based on type */}
                    {mediaItem.type === 'image' ? (
                      <img src={mediaItem.url} alt={mediaItem.description || 'Carousel item'} style={{ margin: `${margin}px` }} />
                    ) : (
                      <video controls style={{ margin: `${margin}px` }}>
                        <source src={mediaItem.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <div className="carousel-media-description">
                      {mediaItem.description}
                    </div>
                  </div>
                );
              })}
            </div>
      </div>
          <div className="carousel-nav">
            <button onClick={goToPrevious}>&lt;</button>
            <button onClick={goToNext}>&gt;</button>
          </div>
          <div className="carousel__description">
            {entries[currentEntryIndex].description}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
