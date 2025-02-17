import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendWhatsAppReservasiMessage } from "../../../../backend/controller/whatsappController";

// Logo & images
import logo from "../../assets/logodrnich.svg";
import logo2 from "../../assets/logodrnich-white.svg";
import bag from "../../assets/bag-2-md.svg";
import bagLg from "../../assets/bag-2.svg";
import search from "../../assets/search-normal.svg";
import hamburger from "../../assets/hamburger.svg";
import bgHamburger from "../../assets/bgHamburger.png";
import arrow from "../../assets/arrow-left.svg";

// Logo hamburger
import alamat from "../../assets/logo-footer/location.svg";
import kontak from "../../assets/logo-footer/call.svg";
import clock from "../../assets/logo-footer/clock.svg";
import email from "../../assets/logo-footer/email.svg";

// Logo sosmed
import yt from "../../assets/YouTube.png";
import linkedIn from "../../assets/LinkedIn.png";
import tt from "../../assets/TikTok.png";
import fb from "../../assets/Facebook.png";
import ig from "../../assets/Instagram.png";

// logo search
import searchWhite from "../../assets/search-normal-white.svg";

export default function Navbar({ selected }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const setSearch = () => {
    console.log(query);
    setQuery(searchRef.current.value);
  };

  // Close nav menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsNavOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleNavigation = (path, text) => {
    if (path === "/reservasi") {
      sendWhatsAppReservasiMessage();
    } else {
      navigate(path);
      setIsNavOpen(false);
    }
  };

  return (
    <div className="w-full h-[70px] shadow-sm bg-white flex items-center relative">
      <div className="mx-auto flex items-center justify-between w-[90%] lg:w-[80%] px-2">
        {/* Left Navigation */}
        <div className="flex items-center gap-4">
          <button
            aria-label={isNavOpen ? "Close menu" : "Open menu"}
            className="focus:outline-none"
            onClick={() => setIsNavOpen((prev) => !prev)}>
            <img src={hamburger} alt="Menu Icon" />
          </button>
        </div>

        {/* Overlay */}
        {isNavOpen && (
          <div
            onClick={() => setIsNavOpen(false)}
            aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10"
          />
        )}

        {/* Hamburger Menu */}
        {isNavOpen && (
          <div
            ref={navRef}
            className="bg-[#c2a353] w-[253px] h-screen fixed top-0 left-0 z-50 lg:w-[462px]">
            <img
              src={bgHamburger}
              className="absolute bottom-0 w-full h-auto object-cover"
              alt="Background"
            />
            <div className="flex flex-col relative top-0 items-start px-[25px] pt-8 lg:pt-11 justify-start h-full gap-4">
              <div>
                <img
                  src={logo2}
                  alt="Drnich Logo"
                  className="w-[150px] lg:w-32 lg:h-12 h-[58px] object-contain"
                />
              </div>

              {/* Menu Links */}
              <div className="flex flex-col w-full text-sm font-normal tracking-tight lg:grid lg:grid-cols-2 z-50">
                {[
                  { text: "Beranda", path: "/" },
                  { text: "Profile", path: "/profil" },
                  { text: "Konsultasi", path: "/underdevelop" },
                  { text: "Produk", path: "/produk" },
                  { text: "Layanan", path: "/layanan" },
                  { text: "Reservasi", path: "/reservasi" },
                  { text: "Promo", path: "/promo" },
                  { text: "Galeri", path: "/galeri" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between w-full cursor-pointer hover:bg-primary hover:bg-opacity-30  p-2 rounded-xl transition-all duration-300"
                    onClick={() => handleNavigation(item.path, item.text)}>
                    <span
                      className={`font-SFPro font-medium text-sm ${
                        selected === item.text ? "text-primary" : "text-white"
                      }`}>
                      {item.text}
                    </span>
                    <img
                      src={arrow}
                      className={`w-[15px] h-[15px] ${
                        selected === item.text ? "hidden" : "opacity-100"
                      }`}
                      alt="Arrow Icon"
                    />
                  </div>
                ))}
              </div>

              {/* Contact Information */}
              <div className="flex flex-col pt-2 lg:pt-0">
                <h1 className="text-white font-SFPro text-base font-medium tracking-tight lg:text-xl">
                  Kontak Kami
                </h1>
                <div className="flex flex-col w-[173px] space-y-4 pt-[26.59px] lg:w-[358px] lg:text-base">
                  <div className="flex items-center space-x-2">
                    <img
                      src={alamat}
                      className="w-[15px] h-[15px] relative -top-4 lg:translate-y-2"
                      alt="Location"
                    />
                    <a
                      href=""
                      className="text-left font-SFPro text-[#e8ebe0] text-xs font-normal leading-tight">
                      Jl. Pringgodani Jl. Saparua Gg. Buntu, Tegalrejo, Kec.
                      Argomulyo, Kota Salatiga, Jawa Tengah 50733
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={email} className="w-[15px] h-[15px]" alt="Icon" />
                    <a
                      href="#"
                      className="text-left font-SFPro text-[#e8ebe0] text-xs font-normal leading-tight">
                      drnich@email.com
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img
                      src={kontak}
                      className="w-[15px] h-[15px]"
                      alt="Icon"
                    />
                    <a
                      href="#"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">
                      +6289632517280
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <img src={clock} className="w-[15px] h-[15px]" alt="Icon" />
                    <a
                      href="#"
                      className="text-left text-[#e8ebe0] text-xs font-normal leading-tight">
                      10.00 - 19.00
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex flex-col items-center w-full pt-[30px]">
                <div className="w-[126px] flex items-center space-x-4">
                  {[yt, linkedIn, tt, fb, ig].map((icon, index) => (
                    <img
                      key={index}
                      src={icon}
                      className="w-[15px] h-[15px]"
                      alt="Social Icon"
                    />
                  ))}
                </div>
                <p className="text-white text-xs mt-[19px]">
                  ©2024 | Dr. Nich Beauty Aesthetic
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Overlay for Search */}
        {isSearchOpen && (
          <div
            onClick={() => setIsSearchOpen(false)}
            aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-25 z-10 lg:hidden"
          />
        )}

        {/* Search Menu */}
        {isSearchOpen && (
          <div
            className={`bg-white w-full h-[90px] fixed top-0 left-0 z-50 flex items-center justify-center ${
              isSearchOpen ? "block" : "hidden"
            } lg:flex`}>
            <div className="flex items-center border-b border-[#c2a353] w-[326px] h-[45px]">
              <img src={searchWhite} alt="Search Icon" className="px-[10px]" />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = `/pencarian?query=${query}`;
                }}>
                <input
                  ref={searchRef}
                  type="text"
                  onChange={() => {
                    setSearch();
                  }}
                  placeholder="Search..."
                  className="w-full h-full px-[10px] focus:outline-none"
                />
              </form>
            </div>
          </div>
        )}

        {/* Logo (Center) */}
        <div
          className="absolute left-1/2 transform -translate-x-1/2"
          onClick={() => navigate("/")}>
          <img
            src={logo}
            className=" w-[100px] h-[38.59px] lg:w-[130px] lg:h-[56.39px] "
            alt="Logo"
          />
        </div>

        {/* Right Navigation */}
        <div className="flex items-center gap-4">
          {/* Search Icon for Mobile */}
          <button
            aria-label="Search"
            className="focus:outline-none lg:hidden"
            onClick={() => setIsSearchOpen((prev) => !prev)}>
            <img src={search} alt="Search Icon" className="w-[20px] h-[20px]" />
          </button>

          {/* Search Bar */}
          <div
            className={`flex items-center border-b border-[#c2a353] ${
              isSearchOpen ? "block" : "hidden"
            } lg:flex`}>
            <a href={`/pencarian?query=${query}`}>
              <img
                src={searchWhite}
                alt="Search Icon"
                className="w-[20px] h-[20px] mx-2"
              />
            </a>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/pencarian?query=${query}`;
              }}>
              <input
                ref={searchRef}
                type="text"
                onChange={() => {
                  setSearch();
                }}
                placeholder="Search..."
                className="w-full h-[38px] px-2 focus:outline-none"
              />
            </form>
          </div>

          {/* Bag Icon */}
          <a
            href=""
            onClick={(e) => {
              e.preventDefault();
              navigate("/underdevelop");
            }}
            aria-label="Bag"
            className="flex items-center">
            {/* Icon untuk Mobile */}
            <img
              src={bag}
              alt="Bag Icon Mobile"
              className="w-[20px] h-[20px] lg:hidden"
            />

            {/* Icon untuk Desktop */}
            <img
              src={bagLg}
              alt="Bag Icon Desktop"
              className="w-[20px] h-[20px] hidden lg:block"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
