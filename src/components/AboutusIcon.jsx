import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AboutusIcon() {
  const navigate = useNavigate();

  return (
    <div className="main-div">
      <div className="fixed top-50 left-4 z-10 flex items-center space-x-4">
        <button
          onClick={() => navigate("/aboutus")}
          className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer "
        >
          <i className="fas fa-info text-white"></i>
        </button>
      </div>
    </div>
  );
}

export default AboutusIcon;
