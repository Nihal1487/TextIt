import React, { useState } from "react";
import Container from "./Container";
import Textarea from "./Textarea";

function Uploadfile() {
  const [showContainer, setShowContainer] = useState(false); // State to track if container is shown

  const handleButtonClick = () => {
    setShowContainer((prev) => !prev); // Toggle between Container and Textarea
  };

  return (
    <>
      <div className="fixed top-28 left-4 z-10 flex items-center space-x-4">
        <button
          onClick={handleButtonClick}
          className="sm: p-2 text-white border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer flex items-center justify-center hover:bg-blue-950"
        >
          <i className={`fas ${showContainer ? "fa-times" : "fa-file"} text-white`}></i>
        </button>
      </div>

      {/* Conditionally render Container or Textarea based on state */}
      {showContainer ? <Container /> : <Textarea />}
    </>
  );
}

export default Uploadfile;
