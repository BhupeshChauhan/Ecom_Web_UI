import { useState, useEffect } from "react";

const useScrollBackground = (transparent: boolean | undefined) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [transparent]);

  const backgroundColor = () => {
    if (transparent) {
      const opacity = Math.min(scrollPosition / 500, 1);
      return `rgba(255, 255, 255, ${opacity})`;
    } else {
      return "none";
    }
  };

  return backgroundColor();
};

export default useScrollBackground;
