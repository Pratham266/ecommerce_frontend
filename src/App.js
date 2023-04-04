import { createContext, useContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

import About from "./Components/About";
import AddItem from "./Components/AddItem";
import DisplayItem from "./Components/DisplayItem";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import MyCart from "./Components/MyCart";
import Navbar from "./Components/Navbar";
import PageNotFound from "./Components/PageNotFound";
import SearchedProduct from "./Components/SearchedProduct";
import Signup from "./Components/Signup";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./Context/UserContext";

function App() {
  const { user, setUser } = useContext(UserContext);

  const callUserData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKENDURL}/about`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if(res.status === 201){
          setUser(null);
      }else if (res.ok){
        const data = await res.json();
        setUser(data);
      } else {
        throw new Error(res.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    callUserData();
  }, []);
    return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/displayitem" element={<DisplayItem />} />
            <Route exact path="/searchitem" element={<SearchedProduct />} />
            <Route exact path="/additems" element={<AddItem/>}/>
        <Route exact path="/mycart" element={<MyCart/>}/>
  
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
        <ToastContainer style={{ width: "400px" }} />
      </>
    );
  }
// }

export default App;
