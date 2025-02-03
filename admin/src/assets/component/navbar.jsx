/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../icon/logodrnich.svg";

function Navbar({ selected }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu toggle

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // Close menu on navigation
  };

  return (
    <nav className="flex fixed left-0 justify-between w-full p-4 items-center ">
      <img
        src={logo}
        alt="Logo"
        className="w-fit h-fit cursor-pointer p-4 bg-white rounded-2xl "
        onClick={() => navigate("/")}
      />

      {/* Hamburger Menu Button for small screens */}
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="focus:outline-none">
          <span
            className={`block w-6 h-1 bg-gray-700 mb-1 transition-transform duration-300 ease-in-out transform ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}></span>
          <span
            className={`block w-6 h-1 bg-gray-700 mb-1 transition-opacity duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : ""
            }`}></span>
          <span
            className={`block w-6 h-1 bg-gray-700 transition-transform duration-300 ease-in-out transform ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}></span>
        </button>
      </div>

      {/* Menu */}
      <div
        className={`flex flex-col lg:flex-row gap-4 lg:gap-4 lg:static lg:w-auto lg:bg-transparent lg:shadow-none lg:items-center transition-all duration-500 ease-in-out bg-white shadow-md absolute top-20 left-0 w-full p-4 lg:p-0 items-start lg:items-center z-50 ${
          menuOpen ? "top-[85%]" : "top-[-100rem]"
        }`}>
        {[
          { path: "/layanan", label: "Layanan" },
          { path: "/listpromo", label: "Promo" },
          { path: "/galeri", label: "Galeri" },
          { path: "/sertifikat", label: "Sertifikat" },
          { path: "/mesin", label: "Mesin" },
          { path: "/produk", label: "Produk" },
          { path: "/ulasan", label: "Ulasan" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => handleNavigate(item.path)}
            className={`text-gray-700 p-3 rounded-2xl text-base transition-colors duration-300 ease-in-out ${
              selected === item.path
                ? "text-white bg-green-900"
                : "hover:text-green-500"
            }`}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
