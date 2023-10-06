import { useState, useEffect, SetStateAction, FormEvent } from 'react';

function useResize() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    screenWidth,
    isScreenLaptop: screenWidth >= 768,
    isScreenTablet: screenWidth < 768 && screenWidth >= 480,
    isScreenMobile: screenWidth < 480,
  };
}

export default useResize;
