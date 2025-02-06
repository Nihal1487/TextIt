import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Mainpage from "./pages/MainPage";
import AboutUs from "./pages/AboutUs";


function App() {
  // Function to generate a random string
  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  // Component to handle redirection if `id` is missing
  const RedirectToRandom = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const randomString = generateRandomString(6); // Generate random string
      navigate(`/${randomString}`); // Redirect to /mainpage/:randomString
    }, [navigate]);

    return null; // This component does not render anything
  };

  return (
 <>
 <Router>
      <Routes>
        {/* Handle route without an `id` */}
        <Route path="/" element={<RedirectToRandom />} />

        {/* Handle route with an `id` */}
        <Route path="/:id" element={<Mainpage />} />

        {/* Redirect root to mainpage */}
        <Route path="*" element={<Navigate to="/mainpage" />} />

        
        <Route path="/aboutus" element={<AboutUs to="/aboutus" />} />
      </Routes>
         
         {/* for Aobut us page */}

      
       

    </Router>

   

</>
 
);
}

export default App;
