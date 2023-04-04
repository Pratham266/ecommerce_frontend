import React, { useContext} from "react";

import { NavLink } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "../Css/Navbar.css";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  
  return (
    <>
      <nav
        className="px-2 sm:px-4 py-2.5  z-20 top-0 left-0  w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "rgb(7 18 41)" }}
      >
        <div className="flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest">
          <img
            src="logo.png"
            style={{ width: "35px" }}
            alt="logo"
            className="w-full mr-2"
          />
          <span className="font-semibold text-xl text-white tracking-tight">
            RaoEcommerce
          </span>
        </div>

        <input className="menu-btn hidden" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon  block cursor-pointer md:hidden px-2 py-4 relative select-none"
          htmlFor="menu-btn"
        >
          <span className="navicon bg-grey-darkest flex items-center relative"></span>
        </label>

        <ul className="menu ml-6 border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto">
          <li className="border-t md:border-none pr-2 pl-2">
            <NavLink
              to="/"
              className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
            >
              Home
            </NavLink>
          </li>

          <li className="border-t md:border-none pr-2 pl-2">
            <NavLink
              to="/about"
              className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
            >
              About Us
            </NavLink>
          </li>
          {user && user.customer === "seller" ? (
            <>
              <li className="border-t md:border-none pr-2 pl-2">
                <NavLink
                  to="/additems"
                  className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
                >
                  Add Items
                </NavLink>
              </li>
            </>
          ) : (
            ""
          )}
          {user ? (
            <>
              <li className="border-t md:border-none pr-2 pl-2 pr-2 pl-2 ">
                <NavLink
                  to="/logout"
                  className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="border-t md:border-none pr-2 pl-2">
                <NavLink
                  to="/login"
                  className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
                >
                  Login
                </NavLink>
              </li>
              <li className="border-t md:border-none pr-2 pl-2">
                <NavLink
                  to="/signup"
                  className="block hover:underline decoration-teal-900 hover:text-teal-400 hover:font-bold md:inline-block text-white px-4 py-3 "
                >
                  Signup
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
