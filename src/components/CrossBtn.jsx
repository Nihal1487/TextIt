import React from "react";

function CrossBtn({ onClick }) {
  return (
    <>
      <div className="main-div">
        <div className="fixed top-30 left-4 z-10 flex items-center space-x-4">
          <button
            className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer"
            onClick={onClick} // Handle click event
          >
            <i className="fas fa-file"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default CrossBtn;
