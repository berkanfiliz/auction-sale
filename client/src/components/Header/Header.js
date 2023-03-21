import React from "react";

export const Header = () => {
  return (
    <div className="flex h-7 shadow-md" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container flex justify-between">
        <ul className="basis-1/4 flex space-x-8">
          <li>
            <a href="https://www.facebook.com">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
