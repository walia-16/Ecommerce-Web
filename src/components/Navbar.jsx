import React, { useState, useContext } from "react"
import { assets } from "../assets/assets"
import { NavLink, useNavigate, Link } from "react-router-dom"
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const navigate = useNavigate();
  const { setShowSearch, getCartCount } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/collection", label: "COLLECTION" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const dropdownItems = [
    { label: "My Profile", action: () => {} },
    { label: "Orders", action: () => navigate("/orders") },
    { label: "Logout", action: () => {} },
  ];

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <Link to = '/'> <img src={assets.logo} className="w-36" alt="Logo" /> </Link>

      {/* Navigation Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {navLinks.map(({ path, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => (isActive ? "text-red-300" : "text-gray-700")}
          >
            {label}
          </NavLink>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => (setShowSearch(true), navigate("/collection"))}
          className="w-5 cursor-pointer"
          src={assets.search_icon}
          alt="Search Icon"
        />

        {/* Profile and Dropdown Menu */}
        <div className="relative group">
          <img
            onClick={() => navigate("/login")}
            className="w-5 cursor-pointer"
            src={assets.profile_icon}
            alt="Profile"
          />

          {/* Dropdown Menu */}
          <div className="hidden group-hover:block absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              {dropdownItems.map(({ label, action }) => (
                <p
                  key={label}
                  className="cursor-pointer hover:text-black"
                  onClick={action}
                >
                  {label}
                </p>
              ))}
            </div>
          </div>
        </div>

        <NavLink to="/cart" className="relative">
          <img className="w-5" src={assets.cart_icon} alt="Cart Icon" />
          <span className="absolute right-[-5px] bottom-[-5px] w-4 bg-black text-white rounded-full text-[8px] flex items-center justify-center">
            {/* {getCartCount()} */}
          {getCartCount()}</span>
        </NavLink>

        <img
          onClick={() => setVisible(true)}
          className="w-5 cursor-pointer sm:hidden"
          src={assets.menu_icon}
          alt="Menu Icon"
        />
      </div>

      {/* Sidebar for Small Screens */}
      {visible && (
        <div className="absolute top-0 right-0 bottom-0 bg-white w-full transition-all">
          <div className="flex flex-col text-gray-600">
            
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-3"
            >
              <img
                className="h-4 rotate-180"
                src={assets.dropdown_icon}
                alt="Back"
              />
              <p>Back</p>
            </div>
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                onClick={() => setVisible(false)}
                to={path}
                className="py-2 pl-6 border"
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
