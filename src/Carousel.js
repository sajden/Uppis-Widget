import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig'; // Ensure this path is correct
import './Carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // If you're using Swiper 6 or newer
import 'swiper/swiper-bundle.css'; // Import Swiper styles



const Carousel = ({ userId, categoryIndexToShow }) => {
  const [categories, setCategories] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [entries, setEntries] = useState([]);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [description, setDescription] = useState(0);
  const swiperRef = useRef(null);
  const [activeIndices, setActiveIndices] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(firestore, `users/${userId}`);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const categoriesData = docSnap.data().categories;
          console.log('Categories Data:', categoriesData); // Log to see all categories data
          setCategories(categoriesData);
          const categoryKeys = Object.keys(categoriesData);
  
          if (categoryKeys.length > categoryIndexToShow) {
            const selectedCategoryKey = categoryKeys[categoryIndexToShow];
            setSelectedCategory(selectedCategoryKey);
            const categoryEntries = categoriesData[selectedCategoryKey];
            console.log('Selected Category:', selectedCategoryKey); // Log to see the selected category key
            console.log('Selected Category Data:', categoriesData[selectedCategoryKey]); // Log to see selected category data
            
            setEntries(categoryEntries);
  
            
            
          }
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [userId, categoryIndexToShow]);


  const handleSlideChange = (entryIndex) => (swiper) => {
    // Update the active index for the current entry's Swiper
    setActiveIndices((prevIndices) => ({
      ...prevIndices,
      [entryIndex]: swiper.realIndex,
    }));
  };

  const calculateSize = (entryIndex, mediaIndex) => {
    const baseSize = 200; // Base size for the smallest slide
    const activeIndex = activeIndices[entryIndex];
    const slideIndex = mediaIndex; // Since each Swiper is independent, use mediaIndex directly
    let size = baseSize;
    if (slideIndex === activeIndex) {
      size = baseSize * 1.5; // Active slide is largest
    } else if (Math.abs(slideIndex - activeIndex) === 1) {
      size = baseSize * 1.2; // Slides next to the active slide are slightly smaller
    }
    return {
      width: `${size}px`,
      height: `${size}px`,
      transition: 'transform 0.3s, width 0.3s, height 0.3s',
    };
  };
  

  return (
    <div className="carousel">
      {entries.map((entry, entryIndex) => (
        <div key={entryIndex} className='entry-swiper'>
          <h3>{entry.description || 'No description'}</h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            navigation={true}
            onSlideChange={handleSlideChange(entryIndex)}
          >
            {entry.media && entry.media.map((mediaItem, mediaIndex) => (
              <SwiperSlide key={mediaIndex}>
                <div style={calculateSize(entryIndex, mediaIndex)}>
                  {mediaItem.type === 'image' ? (
                    <img src={mediaItem.url} alt={mediaItem.description || 'Carousel item'} style={calculateSize(entryIndex, mediaIndex)} />
                  ) : (
                    <video controls style={calculateSize(entryIndex, mediaIndex)}>
                      <source src={mediaItem.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default Carousel;

