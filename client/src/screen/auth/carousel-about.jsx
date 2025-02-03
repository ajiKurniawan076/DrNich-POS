// import React, { useEffect, useState } from "react";
// import { Carousel } from "@material-tailwind/react";

// // IMAGES & ICONS
// import img1 from "../../assets/img-carousel/img1.png";
// import img2 from "../../assets/img-carousel/img2.png";
// import waBtn from "../../assets/whatsappBtn.svg";
// import logo from "../../assets/logodrnich-white.svg";

// // ABOUT IMAGES
// import bgAbout from "../../assets/img-about/4.png";
// import bgAbout2 from "../../assets/img-about/5.png";
// import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
// import muka2 from "../../assets/img-about/gambar2.png";

// // COMPONENTS
// import Navbar from "../auth/navbar";
// import Footer from "../auth/footer";

// // Carousel Navigation Component
// function CarouselNavigation({ setActiveIndex, activeIndex, length }) {
//   return (
//     <div className="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
//       {new Array(length).fill("").map((_, i) => (
//         <span
//           key={i}
//           className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
//             activeIndex === i
//               ? "w-[19px] h-2.5 bg-[#c2a353]"
//               : "w-2.5 h-2.5 bg-[#dcdcdc]"
//           }`}
//           onClick={() => setActiveIndex(i)}
//         />
//       ))}
//     </div>
//   );
// }

// // MAIN FUNCTION
// export default function Beranda() {

//   // DATA CAROUSEL ABOUT
//   const [activeIndex, setActiveIndex] = useState(0);
//   const slides = [
//     {
//       id: 1,
//       logo: logo,
//       image: bgAbout,
//       overlayImage: acneFace,
//       title: "Kurang percaya diri dengan masalah kulit wajah?",
//       description:
//         "Jangan biarkan masalah kulit mengganggu Kamu. Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!",
//       quote: "Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya.",
//       buttonText: "Konsultasi Sekarang",
//       buttonLink: "/consult",
//       textPosition: "text-left px-[20px] pt-[33px]",
//       titleColor: "text-white",
//       descriptionColor: "text-gray-800",
//       italicColor: "text-gray-700",
//     },
//     {
//       id: 2,
//       logo: logo,
//       image: bgAbout2,
//       overlayImage: muka2,
//       imgPosition: "right-0 w-auto h-[267px]  object-cover",
//       title: "Percayakan perawatan kulitmu pada kami!",
//       description:
//         "Kami menyediakan berbagai perawatan kulit yang sesuai dengan kebutuhanmu. Jadwalkan konsultasi sekarang dan rasakan perbedaannya!",
//       buttonText: "Pelajari Lebih Lanjut",
//       buttonLink: "/learn-more",
//       textPosition: "text-center px-[30px] pt-[40px]",
//       titleColor: "text-red-900",
//       descriptionColor: "text-gray-900",
//       italicColor: "text-gray-800",
//     },
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval);
//   }, [slides.length]);

//   return (
//     <div>
//       <Navbar />

//       {/* Carousel Component */}
//       <Carousel
//         className="pb-10"
//         autoplay={true}
//         autoplayDelay={3000}
//         loop={true} // Enable looping
//         navigation={CarouselNavigation} // Use the CarouselNavigation component
//       >
//         {[img1, img2, img1].map((src, index) => (
//           <div key={index} className="relative">
//             <img
//               src={src}
//               alt={`Slide ${index + 1}`}
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
//           </div>
//         ))}
//       </Carousel>

//       {/* WhatsApp Button */}
//       <div>
//         <img
//           src={waBtn}
//           className="fixed z-50 right-0 px-[18px] bottom-[21.71px]"
//           alt="WhatsApp Button"
//         />
//       </div>

//       {/* ABOUT Section */}
//       <div className="carousel w-full h-[409px] mx-auto overflow-y-auto">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`carousel-item relative w-full ${
//               index === activeIndex ? "block" : "hidden"
//             }`}
//           >
//             <div className="flex items-center justify-between w-full h-full">
//               <img
//                 src={slide.image}
//                 className={`absolute w-full h-full z-0 ${slide.bgPosition}`}
//                 alt="Background"
//               />
//               <img
//                 src={slide.overlayImage}
//                 className={`absolute right-0 bottom-0 h-full ${slide.imgPosition}`}
//                 alt="Overlay"
//               />
//               {/* Text Section */}
//               <div className={`max-w-md z-10 ${slide.textPosition}`}>
//                 <img src={slide.logo} alt="Logo" className="mb-4 mt-[-30px]" /> {/* Adjusted logo position */}
//                 <h2 className={`w-[257px] text-2xl font-bold mb-4 ${slide.titleColor}`}>
//                   {slide.title}
//                 </h2>
//                 <p className={`w-56 text-xs mb-6 ${slide.descriptionColor}`}>
//                   {slide.description}
//                 </p>
//                 <p className={`w-[218px] text-xs italic mb-6 ${slide.italicColor}`}>
//                   {slide.quote}
//                 </p>
//                 <a
//                   href={slide.buttonLink}
//                   className="text-[#c2a353] bg-white text-xs font-normal leading-tightq h-10 px-5 py-2.5 rounded-[10px] border border-white justify-center items-center gap-2.5 inline-flex"
//                 >
//                   {slide.buttonText}
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// }



// <div className="swiper
//        justify-center items-center">
//         <div className="swiper-wrapper">
//           <div className="swiper-slide">
//             {/* slide pertama */}
//             <div className="relative w-full h-[409px] mx-auto overflow-y-auto">
//               <img src={bgAbout} className="absolute w-full h-full z-0" alt="" />
//               <img src={acneFace} className="absolute right-0 z-10" alt="" />

//               <div className="relative mx-[21px] mt-[25px]">
//                 <img src={logo} alt="" />
//               </div>
//               <div className="relative mx-[20px] mt-[20.41px] z-20">
//                 <h2 className="w-[257px] text-white text-xl font-semibold leading-[25px] tracking-tight">
//                   Kurang Percaya diri dengan masalah kulit wajah
//                 </h2>
//               </div>
//               <div className="relative mx-[20px] mt-[16px] z-20">
//                 <p className="w-[250px] text-white text-sm font-normal leading-normal tracking-tight">Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!</p>
//               </div>
//               <div className="relative mx-[20px] mt-[15px] z-20">
//                 <p className="w-[232px] italic text-white text-xs font-semibold leading-[15px] tracking-wide">Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya.</p>
//               </div>
//               <div className="relative w-[147px] h-10 px-5 py-2.5 bg-white rounded-[10px] border border-white justify-center items-center gap-2.5 inline-flex mx-[20px] mt-[22px] z-20">
//                 <button className="text-[#c2a353] text-xs font-normal leading-tight tracking-tight">Konsultasi Sekarang</button>
//               </div>
//             </div>
//           </div>

//           {/* slide kedua */}
//           <div className="swiper-slide">Slide 2</div>
//         </div>
//       </div>
//         <div className="swiper-pagination"></div>
      