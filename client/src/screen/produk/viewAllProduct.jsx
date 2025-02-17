import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Navbar and Footer
import Navbar from "../auth/navbar.jsx";
import Footer from "../auth/footer.jsx";

// Other Components
import LayananPopuler from "../../components/layananPopuler.jsx";
import ProdukTerbaru from "../../components/ProdukTerbaru.jsx";
import ArrowRightDisable from "../../components/ArrowRight-Disable.jsx";
import LoadingSpinner from "../../components/LoadingSpinner.jsx";
import ProdukCard from "../../components/ProductCard2.jsx";
import CloseIcon from "../../assets/close-circle.svg";
import ConfirmPopUp from "../../components/confirmPopUp.jsx";
import FilterIcon from "../../components/FILTERICON.svg";
import bgFilterMobile from "../../components/bg-filter-mobile.svg";
import bgFilterDesktop from "../../components/bg-filter-dekstop.svg";

function ViewAllProduct() {
  const navigate = useNavigate();

  const [productType, setProductType] = useState([]);
  const [jenisKulit, setJenisKulit] = useState([]);

  const [filterType, setFilterType] = useState("all"); // Filter for product type
  const [filterSkin, setFilterSkin] = useState("all"); // Filter for skin type

  const [content, setContent] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(""); // Clear any previous error

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAllProduk`
      );

      const productType = (
        await axios.get(
          `${
            import.meta.env.VITE_BASE_URL_BACKEND
          }/api/produk/getAllproductType`
        )
      ).data;
      const tipeKulit = (
        await axios.get(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/api/produk/getAlltipeKulit`
        )
      ).data;

      setProductType(productType);
      setJenisKulit(tipeKulit);
      const sorted = response.data.sort(
        (a, b) => b.reservedCount - a.reservedCount
      );
      setContent(sorted);
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Derived state for filtered products
  const filteredContent = content.filter((item) => {
    // Filtering logic for products
    console.log(`Filtering: ${item.name}`);
    const matchesType =
      filterType === "all" ||
      (item.tipeProduk !== null && item.tipeProduk.name === filterType);
    const matchesSkin =
      filterSkin === "all" ||
      (item.tipeKulit !== null && item.tipeKulit.name === filterSkin);

    console.log(`Matches type: ${matchesType}, Matches skin: ${matchesSkin}`);

    return matchesType && matchesSkin;
  });

  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full fixed z-30">
        <Navbar selected="Produk" />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          <div className="flex items-center w-[90%] lg:w-4/5 justify-start space-x-2 mt-4 pt-20 ">
            <a
              onClick={() => navigate("/")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Beranda
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate("/produk")}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Produk
            </a>
            <ArrowRightDisable />
            <a
              onClick={() => navigate(`/produk/AllProduct`)}
              className="cursor-pointer text-xs lg:text-sm text-disable-text font-normal">
              Semua Produk
            </a>
          </div>
          <ConfirmPopUp
            open={isFilterOpen}
            onClose={() => setIsFilterOpen(!isFilterOpen)}>
            <div className="flex flex-col  items-start w-screen lg:w-full h-screen opacity-90">
              <div className="flex flex-col space-y-3 items-center w-screen h-screen lg:w-[462px] bg-white px-4">
                <div className="absolute z-50 mt-14  flex flex-col items-center w-full h-full ">
                  {/* Close Button */}
                  <div className="w-full flex justify-end items-center mt-10 lg:hidden">
                    <button onClick={() => setIsFilterOpen(false)}>
                      <img
                        src={CloseIcon}
                        alt="Close"
                        className="w-7 lg:w-10 lg:h-10 h-7"
                      />
                    </button>
                  </div>
                  {/* Skin Type Filter */}
                  <div className="flex flex-col items-center  lg:items-start space-y-2 w-[85%]">
                    <h1 className="text-base lg:text-lg font-medium font-SFPro text-secondary leading-snug tracking-normal">
                      Jenis Kulit
                    </h1>
                    <div className="grid grid-cols-2 w-[90%] gap-4">
                      {/* ALL Skin Types Option */}
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="filterSkin"
                          value="all"
                          className="hidden"
                          checked={filterSkin === "all"}
                          onChange={() => setFilterSkin("all")}
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all 
              ${
                filterSkin === "all" ? "border-[#B2955B]" : "border-[#DCDCDC]"
              }`}>
                          {filterSkin === "all" && (
                            <div className="w-3 h-3 rounded-full bg-[#B2955B]"></div>
                          )}
                        </div>
                        <span className="text-sm lg:text-base font-normal font-SFPro text-text leading-tight tracking-tight">
                          All
                        </span>
                      </label>

                      {/* Dynamic Skin Types */}
                      {jenisKulit?.map((item) => (
                        <label
                          className="flex items-center space-x-2 cursor-pointer"
                          key={item._id}>
                          <input
                            type="radio"
                            name="filterSkin"
                            className="hidden"
                            value={item.name}
                            checked={filterSkin === item.name}
                            onChange={() => setFilterSkin(item.name)}
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all 
                ${
                  filterSkin === item.name
                    ? "border-[#B2955B]"
                    : "border-[#DCDCDC]"
                }`}>
                            {filterSkin === item.name && (
                              <div className="w-3 h-3 rounded-full bg-[#B2955B]"></div>
                            )}
                          </div>
                          <span className="text-sm lg:text-base font-normal font-SFPro text-text leading-tight tracking-tight">
                            {item.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Category Filter */}
                  <div className="flex flex-col items-start space-y-2 w-[85%] mt-12">
                    <h1 className="text-base lg:text-lg  font-medium font-SFPro text-secondary leading-snug tracking-normal">
                      Kategori
                    </h1>
                    <div className="grid grid-cols-2 w-[90%]  gap-4">
                      {/* ALL Categories Option */}
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="filterType"
                          value="all"
                          className="hidden"
                          checked={filterType === "all"}
                          onChange={() => setFilterType("all")}
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all 
              ${
                filterType === "all" ? "border-[#B2955B]" : "border-gray-400"
              }`}>
                          {filterType === "all" && (
                            <div className="w-3 h-3 rounded-full bg-[#B2955B]"></div>
                          )}
                        </div>
                        <span className="text-sm lg:text-base font-normal font-SFPro text-text leading-tight tracking-tigh">
                          All
                        </span>
                      </label>

                      {/* Dynamic Product Types */}
                      {productType?.map((item) => (
                        <label
                          className="flex items-center space-x-2 cursor-pointer"
                          key={item._id}>
                          <input
                            type="radio"
                            name="filterType"
                            className="hidden"
                            value={item.name}
                            checked={filterType === item.name}
                            onChange={() => setFilterType(item.name)}
                          />
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all 
                ${
                  filterType === item.name
                    ? "border-[#B2955B]"
                    : "border-gray-400"
                }`}>
                            {filterType === item.name && (
                              <div className="w-3 h-3 rounded-full bg-[#B2955B]"></div>
                            )}
                          </div>
                          <span className="text-sm lg:text-base font-normal font-SFPro text-text leading-tight tracking-tigh">
                            {item.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Apply Button */}
                  <div className="w-[85%] flex items-center justify-start mt-12">
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="mt-2 w-[80%] lg:w-fit bg-secondary text-white lg:text-base text-sm rounded-lg lg:px-5 lg:py-3 p-2
                      hover:shadow-[0px_4px_4px_0px_rgba(0,0,0,0.30)]  ">
                      Terapkan
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 z-0 w-fit h-fit">
                  <picture>
                    {/* Show fotoDesktop on screens larger than 1024px */}
                    <source
                      media="(min-width: 1024px)"
                      srcSet={bgFilterDesktop}
                    />
                    {/* Default to fotoMobile for smaller screens */}
                    <img
                      src={bgFilterMobile}
                      className="w-screen lg:w-full h-fit object-cover"
                    />
                  </picture>
                </div>
              </div>
            </div>
          </ConfirmPopUp>

          <div className="flex items-center justify-between w-[80%] mt-4">
            <h1
              className="font-SFPro font-medium text-base tracking-tight leading-tight text-secondary
            lg:text-2xl lg:leading-[30px] lg:tracking-wide">
              Semua Produk
            </h1>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center p-1 rounded-md hover:bg-gray-300 transition">
              <img src={FilterIcon} alt="Filter" className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-[90%] lg:w-[80%] gap-4 mt-[18px]">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="col-span-full text-center text-red-500">
                {error}
              </div>
            ) : filteredContent.length > 0 ? (
              filteredContent.map((item) => (
                <div key={item._id}>
                  <ProdukCard item={item} />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center">
                No products available
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 items-center w-[90%] lg:w-[80%] mx-auto justify-center space-x-2 mt-28 lg:mx-[120px]">
            {/* Popular Services */}
            <section className="lg:w-full w-full">
              <LayananPopuler />
            </section>

            {/* Latest Products */}
            <section className="lg:w-full w-full">
              <ProdukTerbaru />
            </section>
          </div>
        </>
      )}

      <Footer />
    </main>
  );
}

export default ViewAllProduct;
