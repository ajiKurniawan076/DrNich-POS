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
import StarIcon from "../../assets/star.svg";
import YTicon from "../../assets/logos_youtube-icon.svg";

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
import banner1bg from "../../assets/img-carousel/banner1bg.svg";
import bannerMobile1 from "../../assets/img-about/bannerMobile1.svg";
import bannerMobile2 from "../../assets/img-about/bannerMobile2.svg";

import banner2bg from "../../assets/img-carousel/banner2bg.svg";
//  IMAGE & ICONS SERTIFKAT
import sertifikat1 from "../../assets/img-about/sertifikat1.png";

// IMAGE GALERI
import galeri1 from "../../assets/img-about/galeri1.png";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useDeviceType from "../../components/CheckDevice.jsx";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/autoplay";

import ulasan from "../../../../backend/models/ulasan/ulasanModels.js";
import CardPaketTreatmentBeranda from "../../components/CardPaketTreatmentBeranda.jsx";

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

  const [progress, setProgress] = useState(1);
  const swiperRef = useRef(null);
  const deviceType = useDeviceType();

  const fetchData = async () => {
    setLoading(true);

    try {
      // Check localStorage for cached data
      const cachedData = [
        "promo",
        "jenisLayanan",
        "fotoMesin",
        "fotoSertif",
        "gallery",
        "ulasan",
      ].reduce((acc, key) => {
        const item = localStorage.getItem(key);
        if (item) {
          const parsed = JSON.parse(item);
          const currentTime = new Date().getTime();
          if (currentTime - parsed.timestamp < 3600000) {
            acc[key] = parsed.data;
          }
        }
        return acc;
      }, {});

      // If all data is cached, use it and return early
      if (Object.keys(cachedData).length === 7) {
        setPromo(cachedData.promo);

        setJenisLayanan(cachedData.jenisLayanan);
        setFotoMesin(cachedData.fotoMesin);
        setFotoSertif(cachedData.fotoSertif);
        setGallery(cachedData.gallery);
        setUlasan(cachedData.ulasan);
        setLimitGallery(
          cachedData.gallery.length > 5 ? 5 : cachedData.gallery.length + 1
        );
        setLimitCarousel(
          cachedData.jenisLayanan.length > 3
            ? 3
            : cachedData.jenisLayanan.length + 1
        );
        setLimitUlasan(
          cachedData.ulasan.length > 3 ? 3 : cachedData.ulasan.length + 1
        );
        setLoading(false);
        return;
      }

      // Fetch fresh data if cache is expired or missing
      await fetchPromoData();

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

      const timestamp = new Date().getTime();

      // Process and set jenis layanan
      const sortedJenisLayanan = jenisLayananResponse.data.sort(
        (b, a) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setJenisLayanan(sortedJenisLayanan);
      localStorage.setItem(
        "jenisLayanan",
        JSON.stringify({ data: sortedJenisLayanan, timestamp })
      );

      // Save and set other data
      const saveToLocalStorage = (key, data) => {
        localStorage.setItem(key, JSON.stringify({ data, timestamp }));
      };

      setFotoMesin(fotoMesinResponse.data);
      saveToLocalStorage("fotoMesin", fotoMesinResponse.data);

      setFotoSertif(fotoSertifResponse.data);
      saveToLocalStorage("fotoSertif", fotoSertifResponse.data);

      setGallery(galeriResponse.data);
      saveToLocalStorage("gallery", galeriResponse.data);

      if (Array.isArray(ulasanResponse.data)) {
        setUlasan(ulasanResponse.data);
        saveToLocalStorage("ulasan", ulasanResponse.data);
      }

      // Set UI limits
      setLimitGallery(
        galeriResponse.data.length > 5 ? 5 : galeriResponse.data.length + 1
      );
      setLimitCarousel(
        sortedJenisLayanan.length > 3 ? 3 : sortedJenisLayanan.length + 1
      );
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
      const cachedPromo = localStorage.getItem("promo");
      console.log(cachedPromo);

      if (cachedPromo) {
        console.log("using chaced....");
        const parsedPromo = JSON.parse(cachedPromo);
        const currentTime = new Date().getTime();
        if (currentTime - parsedPromo.timestamp < 3600000) {
          setPromo(parsedPromo.data);
          console.log("data promo", promo);
          return;
        }
      }

      console.log("Fetching promo...");

      const promoResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/promo/getAllPromo`
      );
      if (Array.isArray(promoResponse.data)) {
        setPromo(promoResponse.data);
        console.log("data promo", promo);
        localStorage.setItem(
          "promo",
          JSON.stringify({
            data: promoResponse.data,
            timestamp: new Date().getTime(),
          })
        );
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
    fetchData();
    fetchPromoData();
  }, []);

  const aboutCards = [
    {
      bg: banner1bg,
      bg2: bannerMobile1,
      // img: acneFace,
      // logo: logo,
      // title: "Kurang percaya diri dengan masalah kulit?",
      // description:
      //   "Jadwalkan konsultasi sekarang dan dapatkan analisis menyeluruh dari spesialis kami!",
      // text: "Biar Wajahmu Bercerita, Kamu Bahagia Bersama Ahlinya",
      button: "Konsultasi Sekarang",
    },
    {
      bg: banner2bg,
      bg2: bannerMobile2,
      // img: muka2,
      // logo: logo,
      // title: "Mau punya kulit sehat dan terawat?",
      // bene1: "Kulit lebih cerah dan merata",
      // iconBene1: masker,
      // bene2: "Menyamarkan noda hitam",
      // iconBene2: pori,
      // bene3: "Menutrisi kulit agar lebih sehat",
      // iconBene3: air,
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

  function CustomPagination({ progress, length, setProgress, itemsPerSlide }) {
    const slides = Math.ceil(length / itemsPerSlide);

    return (
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {Array.from({ length: slides }).map((_, i) => (
          <span
            key={i}
            className={`block cursor-pointer rounded-2xl transition-all ${
              Math.ceil(progress / itemsPerSlide) === i
                ? "w-[19px] h-2.5 bg-[#c2a353]"
                : "w-2.5 h-2.5 bg-[#dcdcdc]"
            }`}
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.slideTo(i * itemsPerSlide);
              }
            }}
          />
        ))}
      </div>
    );
  }

  const itemsPerSlide =
    deviceType === "mobile" ? 1 : deviceType === "tablet" ? 2 : 3;

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden">
      <div className="fixed w-full z-30">
        {" "}
        <Navbar selected={"Beranda"} />
      </div>

      {/* Carousel Component */}
      <Carousel
        className="pb-10 pt-[70px]"
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
              <picture>
                {/* Show fotoDesktop on screens larger than 1024px */}
                <source media="(min-width: 1024px)" srcSet={item.fotoDesktop} />
                {/* Default to fotoMobile for smaller screens */}
                <img
                  src={item.fotoMobile}
                  alt={`Slide ${index + 1}`}
                  className="h-[70vh] lg:h-[80vh] w-full object-cover relative lg:object-center"
                />
              </picture>
              {/* <div className="absolute lg:hidden bottom-5 left-5 flex items-center justify-center z-10 gap-4">
                <button className="text-base font-SFPro tracking-tight text-white bg-secondary py-3 px-8 rounded-3xl">
                  Ambil Promo
                </button>
                <button
                  className="text-base font-SFPro tracking-tight text-secondary bg-transparent border border-secondary py-3 px-6 rounded-3xl"
                  onClick={() => navigate(`/promo/detail/${item._id}`)}>
                  Detail
                </button>
              </div> */}

              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#ffffff] via-transparent to-transparent opacity-100 translate-y-1"></div>
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
        className="relative flex flex-col items-center  w-full  mx-auto mt-8"
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
            <div className="w-[325px] h-[283px]  lg:h-[437px] lg:w-[504px] bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
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
            <div className="w-[325px] h-[283px] lg:h-[437px] lg:w-[504px] bg-white rounded-lg border border-gray-200 p-[22px] flex flex-col justify-center items-center shadow-md">
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
                Paket Treatment
              </h1>
              <button
                className="font-SFPro text-xs text-secondary font-medium lg:text-base tracking-tight"
                onClick={() => navigate("/layanan")}>
                Lihat semua
              </button>
            </div>
            {loading ? (
              <div className="h-full w-full flex items-center justify-center">
                <h1 className="font-SFPro text-base text-secondary font-medium">
                  Loading..
                </h1>
              </div>
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
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Loading..
                    </h1>
                  </div>
                )}
              </div>
            )}
          </main>
        </section>

        <section className="lg:w-[80%] w-[90%]">
          <CardPaketTreatmentBeranda />
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
              className="font-SFPro text-xs text-secondary font-medium lg:text-base cursor-pointer  tracking-tight"
              onClick={() => navigate("/galeri")}>
              Lihat Semua
            </h1>
          </main>

          {/* Carousel */}
          <div className="flex flex-col lg:w-full pt-[15px]">
            <div className="flex lg:justify-start justify-center items-center ">
              <div className="carousel carousel-center w-80 lg:w-full space-x-8 h-auto py-5 px-2">
                {/* Conditional Rendering of Carousel Items */}
                {loading ? (
                  <div className="h-full w-full flex items-center justify-center">
                    <h1 className="font-SFPro text-base text-secondary font-medium">
                      Loading..
                    </h1>
                  </div>
                ) : gallery && gallery.length > 0 ? (
                  gallery.slice(0, limitGallery).map((item) => (
                    <div
                      key={item._id}
                      className="carousel-item transition-all duration-300 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = item.link; // Consider using `useNavigate`
                      }}>
                      <div className="w-72 h-auto relative flex flex-col items-start justify-start">
                        <div className="absolute rounded-[10px] h-[74%] top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
                          <img
                            src={YTicon}
                            className="w-[30px] h-[21px]"
                            alt="YouTube Icon"
                          />
                        </div>
                        {/* Dynamic Image */}
                        <img
                          src={item.thumbnail} // Assuming `imageUrl` is the correct property
                          className="mx-auto rounded-[10px] h-auto w-full aspect-video object-cover"
                          alt={item.judul || "Product Image"} // Fallback alt text
                        />

                        {/* Dynamic Product Name */}
                        <p className="w-full hover:text-secondary mt-2 transition-all duration-150 text-text text-left text-sm font-normal font-SFPro leading-[25px] tracking-tight">
                          {item.judul}
                        </p>

                        {/* Dynamic Product Type */}
                        <div className="flex items-center gap-2 text-[#bdbdbd] text-xs font-medium font-SFPro leading-[25px] tracking-tight">
                          <p>{item.sosmed}</p>
                          <div className="w-[5px] h-[5px] bg-[#efefef] rounded-full" />
                          <p>{item.channel}</p>
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
        </section>
        <section className="relative  w-full py-10 mx-auto ">
          <main className="w-full flex lg:px-0 px-6 justify-center pb-[25px]">
            <div className="w-[90%] lg:w-[80%]">
              <h1 className="text-[#464646]  text-base lg:text-xl font-medium font-SFPro leading-tight tracking-tight">
                Customer Punya Cerita
              </h1>
            </div>
          </main>

          <div className=" flex justify-start items-center ml-10 flex-shrink-0">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000 }}
              loop={true}
              slidesPerView={deviceType === "mobile" ? "auto" : itemsPerSlide} // ✅ Mobile fix
              slidesPerGroup={deviceType === "mobile" ? 1 : itemsPerSlide}
              centeredSlides={deviceType === "mobile"}
              spaceBetween={deviceType === "mobile" ? 10 : 20} // ✅ Reduced space for mobile
              breakpoints={{
                320: {
                  slidesPerView: "auto",
                  slidesPerGroup: 1,
                  spaceBetween: 10,
                }, // ✅ Fix mobile
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 10,
                },
              }}
              onSlideChange={(swiper) => setProgress(swiper.realIndex)}
              className="py-10 w-full flex-shrink-0">
              {ulasan.map((item) => (
                <SwiperSlide
                  key={item.id}
                  className="flex justify-center flex-shrink-0 w-[265px] max-w-[280px] lg:max-w-screen-lg py-2 " // ✅ Fixed width
                >
                  <div className="bg-white w-[265px] h-[188px] flex-shrink-0 lg:w-[341px] lg:h-[214px] rounded-xl shadow-md p-6 border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                      <img
                        src={item.foto}
                        alt={item.nama}
                        className="!w-12 !h-12 rounded-full"
                      />
                      <div>
                        <p className="text-gray-800 text-sm font-medium">
                          {item.nama}
                        </p>
                        <div className="flex items-center gap-0">
                          {Array.from({ length: item.rating }, (_, index) => (
                            <img
                              key={index}
                              src={StarIcon}
                              className="!w-5 !h-5 flex-shrink-0 "
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Review Content */}
                    <p className="mt-4 text-sm text-gray-600 line-clamp-4 lg:line-clamp-5">
                      {item.ulasan}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Swiper Carousel */}

          {/* ✅ Fixed Pagination */}
          <CustomPagination
            progress={progress}
            length={ulasan.length}
            setProgress={setProgress}
            itemsPerSlide={itemsPerSlide}
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
