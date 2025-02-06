import React, { useState } from "react";
import supabase from "../config/supabaseClint";
import { useParams } from "react-router-dom";

function Container({ onShowTextarea }) {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [saveStatus, setSaveStatus] = useState("idle");
  const { id } = useParams();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile?.name || ""); // Set file name when selected
  };

  const updateStatus = async () => {
    const { error } = await supabase
      .from("textit")
      .update({ type: "file" })
      .eq("filename", id);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Select a File First to Upload");
      return;
    }

    try {
      const filePath = `uploads/${id}/${file.name}`;
      setSaveStatus("saving");
      const { data, error } = await supabase.storage
        .from("textfile")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      updateStatus();
      console.log(`File uploaded with the filename: ${file.filePath}`, data);
      setSaveStatus("saved");
    } catch (error) {
      console.error(error);
      setSaveStatus("failed");
    }
  };

  const handleButtonClick = () => {
    if (!file) {
      document.getElementById("file-input").click();
    } else {
      handleUpload();
    }
  };

  return (
    <div className="file-container backdrop-blur-xl h-[580px] relative top-18 w-[1350px] left-24 p-4 text-white">
      <h1 className="text-2xl">
        Selected File: <br /> 📄 {fileName || "No File Selected"}
      </h1>

      {/* Hidden file input */}
      <input
        id="file-input"
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Centered and styled upload button */}
      <div className="flex justify-center items-center h-96">
        <button
          onClick={handleButtonClick}
          className="w-64 h-20 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 active:scale-95"
        >
          {!file ? "Choose File" : "Upload File"}
        </button>
      </div>

      {/* Display file status */}
      <div className="relative bottom-124 left-6">
        {saveStatus === "saving" && (
          <span style={{ color: "white" }}>
            <i className="fas fa-spinner fa-spin mr-2"></i>
          </span>
        )}
        {saveStatus === "saved" && (
          <span style={{ color: "green" }}>
            <i className="fas fa-check text-2xl"></i>
          </span>
        )}
        {saveStatus === "failed" && (
          <span style={{ color: "red" }}>
            <i className="fas fa-times text-2xl"></i>
          </span>
        )}
      </div>
      <div className="main-div">
        <div className="fixed top-2 right-344 z-10 flex items-center space-x-4">
          <button
            className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer"
            // Handle click event
            onClick={onShowTextarea} 
          >
            <i className="fas fa-t"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Container;