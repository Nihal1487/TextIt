import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/supabaseClint";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function FileList({ onShowTextarea, onShowUploadFile }) {
  const { id } = useParams();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const bucketName = "textfile";

  useEffect(() => {
    const fetchFiles = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase.storage
          .from(bucketName)
          .list(`uploads/${id}`);
        if (error) throw error;
        setFiles(data || []);
      } catch (error) {
        console.error("Error listing files:", error);
        setFiles([]);
      }
      setIsLoading(false);
    };

    if (id) {
      fetchFiles();
    }
  }, [id]);

  const downloadFilesAsZip = async () => {
    if (files.length === 0) {
      alert("No files to download.");
      return;
    }

    const zip = new JSZip();
    for (const file of files) {
      const filePath = `uploads/${id}/${file.name}`;
      const { data, error } = await supabase.storage
        .from(bucketName)
        .download(filePath);

      if (error) {
        console.error(`Error downloading ${file.name}:`, error);
        continue;
      }

      const blob = new Blob([data], { type: data.type });
      zip.file(file.name, blob);
    }

    zip.generateAsync({ type: "blob" }).then((zipBlob) => {
      saveAs(zipBlob, `files_${id}.zip`);
    });
  };

  return (
    <>
      <div className="file-container backdrop-blur-xl h-[580px] relative top-18 w-[1350px] left-24 p-4">
        <div className="relative left-6">
          <h2 className="text-3xl text-white mb-4">Files:</h2>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : files.length === 0 ? (
            <p className="text-white">No files found.</p>
          ) : (
            <ul className="text-2xl text-white">
              {files.map((file) => (
                <li key={file.name} className="mb-2">
                  {file.name}
                </li>
              ))}
            </ul>
          )}

          {!isLoading && files.length > 0 && (
            <div className="main-div">
              <div className="fixed bottom-151 left-18 z-10 flex items-center space-x-4">
                <button
                  className="p-2 text-white bg-gray-900 h-6 w-6 cursor-pointer"
                  onClick={downloadFilesAsZip}
                >
                  <i className="fas fa-arrow-down"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button to show Textarea */}
      <div className="main-div">
        <div className="fixed top-30 left-4 z-10 flex items-center space-x-4">
          <button
            className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer"
            onClick={onShowTextarea}
          >
            <i className="fas fa-t"></i>
          </button>
        </div>

        {/* Button to show Uploadfile */}
        <div className="fixed top-70 left-4 z-10 flex items-center space-x-4">
          <button
            className="p-2 text-white hover:bg-blue-950 border-1 bg-transparent rounded-full h-14 w-14 cursor-pointer"
            onClick={onShowUploadFile} // Calls the function from Mainpage.js
          >
            <i className="fas fa-file"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default FileList;
