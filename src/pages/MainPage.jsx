import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../config/supabaseClint";
import AboutusIcon from "../components/AboutusIcon";
import Header from "../components/Header";
import CoppyBtn from "../components/CoppyBtn";
import FileList from "../components/FileList";
import Textarea from "../components/Textarea";
import CrossBtn from "../components/CrossBtn";
import Container from "../components/Container";

function Mainpage() {
  const { id } = useParams();
  const [fileExists, setFileExists] = useState(null);
  const [showTextarea, setShowTextarea] = useState(true); // ✅ Show Textarea by default
  const [showUploadFile, setShowUploadFile] = useState(false);

  useEffect(() => {
    const checkFileInDB = async () => {
      const { data, error } = await supabase.storage
        .from("textfile")
        .list(`uploads/${id}`);

      if (error) {
        console.error("Error listing files:", error);
        setFileExists(false);
        return;
      }

      setFileExists(data && data.length > 0);
      if (data && data.length > 0) {
        setShowTextarea(false); // ✅ Hide Textarea if files exist
      }
    };

    if (id) {
      checkFileInDB();
    }
  }, [id]);

  return (
    <>
      <Header />
      <AboutusIcon />
      

      {showTextarea ? (
        <div className="relative">
          <CrossBtn onClick={() => setShowTextarea(false)} />
          <Textarea />
        </div>
      ) : showUploadFile ? (
        <div className="relative">
          <CrossBtn onClick={() => setShowUploadFile(false)} />
          <Container />
        </div>
      ) : fileExists ? (
        <FileList
          onShowTextarea={() => setShowTextarea(true)}
          onShowUploadFile={() => setShowUploadFile(true)}
        />
      ) : (
        <Container onShowTextarea={() => setShowTextarea(true)} />

      )}

      {fileExists ? <AboutusIcon /> : <CoppyBtn />}
    </>
  );
}

export default Mainpage;
