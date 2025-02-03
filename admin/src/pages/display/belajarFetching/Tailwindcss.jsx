import React, { useState } from "react";

const Tailwindcss = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  // Fungsi untuk toggle visibilitas dropdown
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 px-10 py-10 bg-white items-start place-items-center min-h-screen relative">
      <div className="bg-blue-300 w-full absolute bottom-0 rounded">
        <ul className="flex justify-center p-2 gap-5">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Gallery</a>
          </li>
          <li>
            <a
              onClick={toggleDropdown} // Menggunakan click untuk menampilkan/menyembunyikan dropdown
              href="#"
            >
              More
            </a>
          </li>
        </ul>
      </div>

      {/* Menampilkan dropdown jika isDropdownVisible true */}
      {isDropdownVisible && (
        <div className="absolute bottom-10 w-full bg-blue-400 flex justify-end transition-all duration-300 ease-in-out transform translate-y-2">
          <ul className="gap-2 flex flex-col w-28 mx-14">
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">
              Login
            </li>
            <li className="hover:bg-blue-500 p-2 rounded cursor-pointer">
              Sign In
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tailwindcss;
