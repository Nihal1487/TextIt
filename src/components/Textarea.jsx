import React, { useEffect, useState, useRef } from "react";
import supabase from "../config/supabaseClint";
import "../App.css";
import FloatingDownloadButton from "./DownloadButton";
import { useParams } from "react-router-dom";
import CopyBtn from "./CoppyBtn";

function Textarea() {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [text, setText] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const textAreaRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    getData();
    const channel = supabase
      .channel("realtime-text-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "textit",
          filter: `filename=eq.${id}`,
        },
        (payload) => {
          if (
            payload.eventType === "INSERT" ||
            payload.eventType === "UPDATE"
          ) {
            setText(payload.new.content);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  async function getData() {
    const { data, error } = await supabase
      .from("textit")
      .select("*")
      .eq("filename", id);

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setDetail(data);
      if (data && data.length > 0) {
        setText(data[0].content);
      }
    }
  }

  async function postData() {
    setSaveStatus("saving");
    const { error } = await supabase
      .from("textit")
      .upsert({ content: text, filename: id }, { onConflict: "filename" });

    if (error) {
      console.error("Error updating or inserting data:", error);
      setSaveStatus("error");
    } else {
      setSaveStatus("success");
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim() !== "") {
        postData();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
    <div className="app-wrapper">
      <div className="status-container">
        {saveStatus === "saving" && (
          <span className="spinner">
            <i className="fas fa-spinner"></i>
          </span>
        )}
        {saveStatus === "success" && (
          <span className="tick">
            <i className="fas fa-check"></i>
          </span>
        )}
        {saveStatus === "error" && <span className="error">Error</span>}
      </div>

      <div className="container">
        <textarea
          ref={textAreaRef}
          placeholder={
            isMobile ? "Start typing..." : "Type Your Text Here....."
          }
          onChange={handleChange}
          value={text}
          name="comment[text]"
          id="comment_text"
          className="responsive-textarea"
          autoComplete="off"
          role="textbox"
          aria-autocomplete="list"
          aria-haspopup="true"
        />
        <FloatingDownloadButton text={text} id={id} />

        <CopyBtn textAreaRef={textAreaRef} />
      </div>
    </div>
  </>  
);
}

export default Textarea;
