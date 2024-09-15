import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Friends from "./pages/home/Friend";

function App() {
  const isLoggedIn = () => {
    //  alert("ewe")
    let user = localStorage.getItem("user");
    if (user) {
      if (user == "9999") {
        console.log("set but not logged");
        return 0;
      } else {
        console.log("setand  logged");
        return 1;
      }
    } else {
      console.log("first");
      localStorage.setItem("user", "9999");
      return 0;
    }
  };

  // useEffect(() => {
  //  let user = localStorage.getItem("secret");
  //   if (!user) {
  //     localStorage.setItem("secret", "9999");
  //   }
  // }, []);

  return (
    <>
      <div>
        {isLoggedIn() ? (
          <BrowserRouter>
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/frnds" element={<Friends />} />
              <Route path="/" element={<Home />} />

              {/* <Route path= "/login" element={isLoggedIn()?<Login /> : <Navigate to="/signup" />} /> */}
            </Routes>
          </BrowserRouter>
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* <Route path= "/login" element={isLoggedIn()?<Login /> : <Navigate to="/signup" />} /> */}
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </>
  );
}

export default App;
