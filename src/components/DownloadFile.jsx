import React from "react";
import supabase from "../config/supabaseClint";
import "../App.css";

function DownloadFile({ filePath }) {
  const handleDownload = async () => {
    // Get public URL of the file
    const { data } = await supabase.storage
      .from("textfile")
      .getPublicUrl(filePath);

    if (data.publicUrl) {
      // Create a hidden <a> element to trigger download
      const a = document.createElement("a");
      a.href = data.publicUrl;
      a.download = filePath.split("/").pop(); // Extract filename correctly
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error("Failed to get file URL");
    }
  };

  return (
    <div className="main-div">
      <div className="fixed top-36 left-4 z-10 flex items-center space-x-4">
        <button
          className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer "
          onClick={handleDownload}
        >
          <i class="fas fa-arrow-down"></i>
        </button>
      </div>
    </div>
  );
}

export default DownloadFile;
