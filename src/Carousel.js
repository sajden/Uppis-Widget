import React, { useState, useEffect, useRef } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig'; // Ensure this path is correct
import './Carousel.css';
import { Swiper, SwiperSlide } from 'swiper/react'; // If you're using Swiper 6 or newer
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';




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
  

  return (
    <div className="carousel">
      {entries.map((entry, entryIndex) => (
        <div key={entryIndex} className='entry-swiper'>
          <h3 className='description'>{entry.description || 'No description'}</h3>
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: true, // Continues autoplay after user interaction
            }}
            
            pagination={{ clickable: true }}

            keyboard={{
              enabled: true,
              onlyInViewport: true,
            }}
            
            mousewheel={{
              forceToAxis: true,
            }}
            
            zoom={{ maxRatio: 5 }}

            effect="coverflow"
            coverflowEffect={{
              rotate: -20,           // No rotation for simplicity
              stretch: 0,         // Distance between slides
              depth: 100,          // Depth value for perspective
              modifier: 1,         // Effect multiplier
              slideShadows: false, // Disable slide shadows for flat design
            }}
            loop={true}
            navigation={true}
            onSlideChange={handleSlideChange(entryIndex)}
            centeredSlides = {true}
            centeredSlidesBounds={true}
            breakpoints={{
              // when window width is >= 320px
              480: {
                slidesPerView: 1,
                spaceBetween: 0,
                effect: 'slide', // Ensuring standard slide effect without extra movement

              },
              // when window width is >= 320px
              490: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              // when window width is >= 1024px
              1024: {
                slidesPerView: 3,
                spaceBetween: 20
              },
             
            }}

          >
            {entry.media && entry.media.map((mediaItem, mediaIndex) => {
          // Function to toggle fullscreen
          const toggleFullscreen = (event) => {
            const elem = event.currentTarget; // Get current target element
            if (!document.fullscreenElement) {
              if (elem.requestFullscreen) {
                elem.requestFullscreen().catch(err => {
                  console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
                });
              }
            } else {
              if (document.exitFullscreen) {
                document.exitFullscreen();
              }
            }
          };

          return (
            <SwiperSlide key={mediaIndex}>
              {mediaItem.type === 'image' ? (
                <img src={mediaItem.url} alt={mediaItem.description || 'Carousel item'} onClick={toggleFullscreen} />
              ) : (
                <video controls onClick={toggleFullscreen}>
                  <source src={mediaItem.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </SwiperSlide>
          );
        })}

        </Swiper>
        </div>
      ))}
    </div>
  );
};

export default Carousel;

