import React from "react";

function CopyBtn({textArea}) {
  const copyToClipboard = () => {
    const textArea = document.getElementById("comment_text");
    if (textArea) {
      textArea.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="main-div">
      <div className="fixed top-16 left-48 z-10 flex items-center space-x-4">
        <button
          className="p-2 text-white bg-gray-900 h-6 w-6 cursor-pointer"
          onClick={copyToClipboard}
        >
          <i className="fas fa-copy"></i>
        </button>
      </div>
    </div>
  );
}

export default CopyBtn;
