import React from "react";
import "../App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FloatingDownloadButton = ({ text, id }) => {
  // Function to handle TXT download
  const handleDownloadTXT = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${id || "text"}.txt`; // Use the filename from the URL or a default name
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="main-div">
      <div className="fixed top-16 left-38 z-10 flex items-center space-x-4">
        <button
          className="p-2 text-white  bg-gray-900  h-6 w-6 cursor-pointer "
          onClick={handleDownloadTXT}
        >
          <i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
};

export default FloatingDownloadButton;
