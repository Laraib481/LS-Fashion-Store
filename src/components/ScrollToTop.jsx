import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har bar route/pathname badalne par page top par scroll ho jayega
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // Instant top scrolling for smooth page feel
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;