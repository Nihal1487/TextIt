import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";

function AboutUs() {
  const [runTour, setRunTour] = useState(false);
  const [steps] = useState([
    {
      target: ".heading", // Target your heading element
      content: "Welcome to Textit! This is our brand header",
      placement: "bottom",
      disableBeacon: true, // Start immediately
      styles: {
        options: {
          primaryColor: "#4f46e5", // Match your theme color
        },
      },
    },
   
    
  ]);

  // Auto-start tour on component mount
  useEffect(() => {
    setRunTour(true);
  }, []);

  return (
    <>
      <div className="text-white flex h-lvh w-full backdrop-blur-lg relative">
        <Joyride
          steps={steps}
          run={runTour}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          styles={{
            options: {
              zIndex: 10000, // Ensure tour appears above blur
              textColor: "#ffffff",
              backgroundColor: "#1f2937", // Match dark background
              primaryColor: "#4f46e5",
            },
            tooltip: {
              fontSize: "1.1rem",
              padding: "1.5rem",
            },
            buttonNext: {
              color: "#fff",
            },
          }}
          callback={({ action }) => {
            if (action === "close" || action === "skip") {
              setRunTour(false);
            }
          }}
        />

        <div className="heading flex items-center justify-center border-2 h-16 w-full text-4xl">
          Textit
        </div>

        {/* Optional manual trigger */}
      
      </div>
    </>
  );
}

export default AboutUs;
