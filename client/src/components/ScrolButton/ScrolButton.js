import React, { useState, useEffect } from "react";

export const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`fixed right-0 bottom-0 mb-10 mr-10 ${isVisible ? "block" : "hidden"}`}>
      <button onClick={scrollToTop} className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
        <i className="fa-solid fa-up-long text-2xl"></i>
      </button>
    </div>
  );
};
