import React, { useState, useRef, useEffect } from "react";
import { Carousel } from "@material-tailwind/react";
import { useSwipeable } from "react-swipeable";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay"; // Import autoplay styles
import { Autoplay } from "swiper/modules";
import axios from "axios";

//Import WA Template
import { sendWhatsAppReservasiMessage } from "../../../../backend/controller/whatsappController.js";
import { sendWhatsAppProdukMessage } from "../../../../backend/controller/whatsappController.js";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import Navbar from "../auth/navbar";
import Footer from "../auth/footer";
import AboutCard from "../../components/AboutCard";
import CardJenisLayanan from "../../components/cardJenisLayanan.jsx";
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import UlasanCard from "../../components/cardUlasan.jsx";
import StarIcon from "../../assets/star.svg";

import ArrowRight from "../../../../admin/src/assets/icon/ArrowRight";

// IMAGES & ICONS ABOUT
import img1 from "../../assets/img-carousel/img1.png";
import img2 from "../../assets/img-carousel/img2.png";
import waBtn from "../../assets/whatsappBtn.svg";
import logo from "../../assets/logodrnich-white.svg";
import bgAbout from "../../assets/img-about/4.png";
import bgAbout2 from "../../assets/img-about/5.png";
import acneFace from "../../assets/img-about/A Lifetime In 60 Seconds-Photoroom 1.png";
import muka2 from "../../assets/img-about/gambar2.png";
import masker from "../../assets/img-about/masker.svg";
import pori from "../../assets/img-about/pori.svg";
import air from "../../assets/img-about/air.svg";

//  IMAGE & ICONS SERTIFKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

// IMAGE GALERI
import galeri1 from "../../assets/img-about/galeri1.png";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/autoplay";

import ulasan from "../../../../backend/models/ulasan/ulasanModels.js";

// Carousel Navigation Component
function CarouselNavigation({ setActiveIndex, activeIndex, length }) {
  return (
    <div className="absolute bottom-4 left-2/4 z-0 flex -translate-x-2/4 gap-2">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i
              ? "w-[19px] h-2.5 bg-[#c2a353]"
              : "w-2.5 h-2.5 bg-[#dcdcdc]"
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
}

// Custom Pagination Component
function CustomPagination({ progress, length, setProgress }) {
  return (
    <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`block h-1 cursor-pointer rounded-2xl transition-all ${
            progress === i
              ? "w-[19px] h-2.5 bg-[#c2a353]"
              : "w-2.5 h-2.5 bg-[#dcdcdc]"
          }`}
          onClick={() => setProgress(i)}
        />
      ))}
    </div>
  );
}

export default function Beranda() {
  const navigate = useNavigate();
  const [jenisLayanan, setJenisLayanan] = useState([]);
  const [limitCarousel, setLimitCarousel] = useState(0);
  const [ulasan, setUlasan] = useState([]);
  const [limitUlasan, setLimitUlasan] = useState(0);
  const [limitGallery, setLimitGallery] = useState(0);
  const [gallery, setGallery] = useState([]);
  const [promo, setPromo] = useState([]);
  const [fotoMesin, setFotoMesin] = useState();
  const [fotoSertif, setFotoSertif] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    setLoading(true);

    try {
      // Fetch promo data
      await fetchPromoData();

      // Fetch other data in parallel
      const [
        jenisLayananResponse,
        fotoMesinResponse,
        fotoSertifResponse,
        galeriResponse,
        ulasanResponse,
      ] = await Promise.all([
        axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/layanan/getAllJenisLayanan`
        ),
        axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllMesin`
        ),
        axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/foto/getAllSertif`
        ),
        axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/gallery/getAllGaleri`
        ),
        axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/ulasan/getAllUlasan`
        ),
      ]);

      // Process and set jenis layanan
      const sortedJenisLayanan = jenisLayananResponse.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setJenisLayanan(sortedJenisLayanan);

      // Store in local storage with timestamp
      const dataWithTimestamp = {
        data: sortedJenisLayanan,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("jenisLayanan", JSON.stringify(dataWithTimestamp));

      // Set other state
      if (Array.isArray(ulasanResponse.data)) {
        setUlasan(ulasanResponse.data);
      }
      setFotoMesin(fotoMesinResponse.data);
      setFotoSertif(fotoSertifResponse.data);
      setGallery(galeriResponse.data);

      // Limit gallery and carousel based on data length
      setLimitGallery(
        galeriResponse.data.length > 5 ? 5 : galeriResponse.data.length + 1
      );
      // setLimitCarousel(promo.length > 3 ? 3 : promo.length);
      setLimitCarousel(
        sortedJenisLayanan.length > 3 ? 3 : sortedJenisLayanan.length + 1
      );
      //limit ulasan
      setLimitUlasan(
        ulasanResponse.data.length > 3 ? 3 : ulasanResponse.data.length + 1
      );
    } catch (error) {
      setError(
        `Failed to fetch data. Please try again later (${error.message})`
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchPromoData = async () => {
    try {
      const promoResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
      );
      if (Array.isArray(promoResponse.data)) {
        setPromo(promoResponse.data);
        console.log("PROMO DATA : " + promoResponse.data);
        setError("");
      } else {
        throw new Error("Invalid response format for promo data");
      }
    } catch (error) {
      console.error("Error fetching promo:", error.message);
      setError("Failed to fetch promo. Please try again later.");
    }
  };

  useEffect(() => {
    // const cachedDataLayanan = localStorage.getItem("jenisLayanan");

    // if (!cachedDataLayanan) {
    //   const parsedData = JSON.parse(cachedDataLayanan);
    //   const currentTime = new Date().getTime();

    //   if (currentTime - parsedData.timestamp < 3600000) {
    //     setJenisLayanan(parsedData.data);
    //   } else {
    //     fetchData();
    //   }
    // } else {
    //   fetchData();
    // }

    fetchData();
  }, []);

  const aboutCards = [
    {
      bg: bgAbout,
      img: acneFace,
      logo: logo,
      title: "Kurang percaya diri dengan masalah kulit?",
      description:
        "Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!",
      text: "Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya",
      button: "Konsultasi Sekarang",
    },
    {
      bg: bgAbout2,
      img: muka2,
      logo: logo,
      title: "Mau punya kulit sehat dan terawat?",
      bene1: "Kulit lebih cerah dan merata",
      iconBene1: masker,
      bene2: "Menyamarkan noda hitam",
      iconBene2: pori,
      bene3: "Menutrisi kulit agar lebih sehat",
      iconBene3: air,
      button2: "Konsultasi Sekarang",
    },
  ];

  const nextSlide = () =>
    setActiveIndex((prevIndex) => (prevIndex + 1) % aboutCards.length);
  const prevSlide = () =>
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + aboutCards.length) % aboutCards.length
    );

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
    trackTouch: true,
  });

  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (s, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white">
      <div className="fixed w-full z-30">
        {" "}
        <Navbar selected={"Beranda"} />
      </div>

      {/* Carousel Component */}
      <Carousel
        className="pb-10 pt-20"
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        autoplayDelay={3000}
        loop={true} // Enable looping
        navigation={CarouselNavigation} // Use the CarouselNavigation component
      >
        {promo &&
          promo.map((item, index) => (
            <div key={item._id} className="relative">
              <img
                src={item.foto}
                alt={`Slide ${index + 1}`}
                className="h-full lg:h-[80vh] w-full object-cover relative lg:object-center"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ffffff] via-transparent to-transparent opacity-100"></div>
            </div>
          ))}
      </Carousel>

      {/* WhatsApp Button */}
      <div>
        <img
          src={waBtn}
          className="fixed z-50 right-0 px-[18px] bottom-[21.71px]"
          alt="WhatsApp Button"
          onClick={sendWhatsAppReservasiMessage}
        />
      </div>

      {/* ABOUT Section */}
      <div
        className="relative flex flex-col items-center  w-full  mx-auto"
        {...handlers}>
        <div className="relative max-w-3xl w-full lg:max-w-full lg:w-[70%] lg:h-[410px]  mx-auto ">
          {/* Active Card */}
          <AboutCard card={aboutCards[activeIndex]} />

          {/* Pagination Indicators */}
          <div className="flex justify-center mt-4 gap-2">
            {aboutCards.map((_, index) => (
              <span
                key={index}
                className={` rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "w-[19px] h-2.5 bg-[#c2a353]"
                    : "w-2.5 h-2.5 bg-[#dcdcdc]"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Sertifikasi Section */}
        <div className="flex flex-col w-[90%] lg:w-[80%] items-center justify-center pt-10 lg:mt-12 ">
          {/* Section Title */}
          <div className="w-full mx-auto text-left text-[#464646] lg:text-2xl text-base font-medium font-SFPro leading-tight tracking-tight">
            Mengapa memilih Dr. Nich?
          </div>

          {/* Carousel Container */}
          <div className="flex flex-col w-full lg:flex-row lg:space-x-8 lg:justify-between  mt-4 lg:mt-0  gap-[15px] justify-center items-center pt-4 pb-4">
            <div className="w-[325px] lg:h-[437px] lg:w-[504px] h-auto bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
              <h1 className="pb-4 text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight lg:text-secondary lg:text-xl">
                Berpengalaman dan Bersertifikat
              </h1>
              <Carousel
                className="lg:w-[400px] lg:h-[283px] w-full rounded-lg overflow-hidden "
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                nextArrow={false}
                prevArrow={false}
                autoplayDelay={2000}
                slidesPerView={1}
                spaceBetween={20}
                loop={true} // Enable looping
                navigation={false}>
                {fotoSertif && fotoSertif.length > 0 ? (
                  fotoSertif.map((item) => (
                    <div key={item._id} className="relative px-2">
                      <div className="h-[250px] lg:h-[350px] w-full">
                        <img
                          className="object-cover bg-yellow-200"
                          src={item.foto}
                          alt={item.nama}
                        />
                      </div>
                    </div>
                  ))
                ) : loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>loading . . .</h1>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>No data found</h1>
                  </div>
                )}
              </Carousel>
            </div>

            {/* Teknologi */}
            <div className="w-[325px] lg:h-[437px] lg:w-[504px] h-auto bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
              <h1 className="pb-4 text-[#464646] text-sm font-medium font-SFPro leading-[25px] tracking-tight lg:text-secondary lg:text-xl">
                Teknologi Terkini & Produk Berkualitas
              </h1>
              <Carousel
                className="lg:w-[400px] lg:h-[283px] w-full rounded-lg [&_.carousel-navigation]:hidden overflow-hidden"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                }}
                slidesPerView={1}
                spaceBetween={20}
                autoplayDelay={2000}
                loop={true}
                nextArrow={false}
                prevArrow={false}
                navigation={({ nextEl: "hidden", prevEl: "hidden" }, false)} // Use the CarouselNavigation component
              >
                {fotoMesin && fotoMesin.length > 0 ? (
                  fotoMesin.map((item) => (
                    <div key={item._id} className="relative px-2">
                      <img
                        className="h-[198px] lg:h-full w-full object-cover bg-blue-500 text-white text-lg font-semibold"
                        src={item.foto}
                        alt={item.nama}
                      />
                    </div>
                  ))
                ) : loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>loading . . .</h1>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1>No data found</h1>
                  </div>
                )}
              </Carousel>
            </div>
          </div>
        </div>

        {/* Jenis Layanan Section */}
        <section className="flex flex-col my-8 w-full items-center">
          <main className="w-[90%] flex flex-col items-center lg:w-[80%]   ">
            <div className="flex w-full justify-between items-center lg:py-6  ">
              <h1 className="font-SFPro font-normal text-base lg:text-xl leading-[25px] tracking-tight">
                Layanan
              </h1>
              <button
                className="font-SFPro text-xs text-secondary font-medium lg:text-base tracking-tight"
                onClick={() => navigate("/layanan")}>
                Lihat semua
              </button>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid w-full  grid-cols-2 gap-4 items-center justify-center xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 mt-4 lg:gap-12 ">
                {jenisLayanan && jenisLayanan.length > 0 ? (
                  jenisLayanan.slice(0, 8).map((item) => (
                    <div key={item._id}>
                      <CardJenisLayanan item={item} />
                    </div>
                  ))
                ) : (
                  <p className="text-center col-span-2">No data available</p>
                )}
                {loading && (
                  <p className="text-center col-span-2">Loading...</p>
                )}
              </div>
            )}
          </main>
        </section>

        <section className="lg:w-[80%] w-[90%]">
          <LayananPopuler />
        </section>
        <section className="lg:w-[80%] w-[90%]">
          <ProdukTerbaru />
        </section>

        {/* Galeri Section */}
        <section className="lg:w-[80%] flex flex-col my-[26px] w-full items-center">
          {/* Header */}
          <main className="w-full flex lg:px-0 px-6 justify-between">
            <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-[25px] tracking-tight">
              Galeri
            </h1>
            <h1
              className="font-SFPro text-xs text-secondary font-medium lg:text-base cursor-pointer tracking-tight"
              onClick={() => navigate("/galeri")}>
              Lihat Semua
            </h1>
          </main>

          {/* Carousel */}
          <div className="flex flex-col lg:w-full pt-[15px]">
            <div className="flex lg:justify-start justify-center items-center pt-[15px]">
              <div className="carousel carousel-center w-80 lg:w-full space-x-8 h-auto py-5 px-2">
                {/* Conditional Rendering of Carousel Items */}
                {gallery && gallery.length > 0 ? (
                  gallery.slice(0, limitGallery).map((item, index) => (
                    <div
                      key={item._id}
                      className="carousel-item  transition-all duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `${item.link}`;
                      }}>
                      <div className="w-72 h-auto  relative flex flex-col items-start justify-start">
                        {/* Dynamic Image */}
                        <img
                          src={item.thumbnail} // Assuming `imageUrl` is the property for image source
                          className="mx-auto rounded-[10px] h-auto w-full aspect-video object-cover"
                          alt={item.judul || "Product Image"} // Fallback alt text
                        />

                        {/* Dynamic Product Name */}
                        <p className="w-full hover:text-secondary mt-2 transition-all duration-150 text-text text-left text-sm font-normal font-SFPro leading-tight tracking-tight">
                          {item.judul}
                        </p>

                        {/* Dynamic Product Type */}
                        <div className="flex items-center gap-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-[25px] tracking-tight ">
                          <p>{item.sosmed}</p>{" "}
                          {/* Assuming `type` holds the product type */}
                          <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full font-SFPro" />
                          <p>{item.channel}</p>{" "}
                          {/* Assuming `category` holds the product category */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">
                    No items available
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ulasan */}
          <main className="w-full flex lg:px-0 px-6 justify-between pt-[25px] pb-[25px]">
            <h1 className="text-[#464646] text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
              Customer Punya Cerita
            </h1>
          </main>
          {/* Carousel Component */}
          <Swiper
            className="py-10"
            modules={[Autoplay, Navigation]}
            swipeHandler={true}
            autoplay={{ delay: 3000 }}
            loop={true}
            slidesPerView={window.innerWidth >= 1024 ? 3 : "auto"}
            spaceBetween={1} // Set gap to 15px
            centeredSlides={true}
            onSlideChange={(swiper) => setProgress(swiper.realIndex)} // Update active index
          >
            {ulasan &&
              ulasan.map((item, dex) => (
                <SwiperSlide
                  key={item.id}
                  className="w-full flex-shrink-0 max-w-[280px]" // Fixed card width
                >
                  <div className="bg-white w-[265px] rounded-lg shadow-md p-6 border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="w-12 h-12 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          {item.nama}
                        </p>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: item.rating }, (_, index) => (
                            <img
                              key={index}
                              src={StarIcon}
                              className="min-w-5 min-h-5" // Adjust size
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="mt-4 text-sm text-gray-600 line-clamp-5">
                      {item.ulasan}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>

          <CustomPagination
            progress={progress}
            length={ulasan.length}
            setProgress={(dex) => {
              setProgress(dex);
              document.querySelector(".swiper").swiper.slideToLoop(dex); // Slide to the clicked pagination
            }}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
