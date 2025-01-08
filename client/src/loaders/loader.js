import React from "react";
import "./loader.css"; // Assuming the CSS is saved in a separate file.

const Loader = () => {
  return (
    <div className="loader">
      <span className="loader-text">loading</span>
      <span className="load"></span>
    </div>
  );
};

export default Loader;
