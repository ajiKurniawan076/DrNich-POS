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

    const matchesType = filterType === "all" || item.type === filterType;
    const matchesSkin = filterSkin === "all" || item.skinType === filterSkin;
    console.log(
      `Filtering: ${item.name}, Type Match: ${matchesType}, Skin Match: ${matchesSkin}`
    );
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
            onClose={() => setIsFilterOpen(false)}>
            <div className="flex flex-col items-start w-[95vw] h-screen">
              <div className="flex flex-col items-start w-screen h-screen lg:w-[30vw] bg-white px-4">
                <div className="w-full flex justify-end items-center mt-10">
                  <button onClick={() => setIsFilterOpen(false)} className="">
                    <img
                      src={CloseIcon}
                      alt="Close"
                      className="w-7 lg:w-10 lg:h-10 h-7"
                    />
                  </button>
                </div>

                <div className="flex flex-col items-start space-y-2  w-[85%]">
                  <h1 className="text-base lg:text-xl font-medium font-SFPro text-secondary ">
                    Jenis Kulit
                  </h1>
                  <div className="grid grid-cols-2 w-[90%]">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="filterSkin"
                        value="all"
                        checked={filterSkin === "all"}
                        onChange={() => setFilterSkin("all")}
                      />
                      <label className="text-sm lg:text-base font-normal font-SFPro text-text">
                        All
                      </label>
                    </div>
                    {jenisKulit ? (
                      jenisKulit.map((item) => (
                        <div
                          className="flex items-center space-x-2"
                          key={item._id}>
                          <input
                            type="radio"
                            name="filterSkin"
                            value={item.name}
                            checked={filterSkin === item.name}
                            onChange={() => setFilterSkin(item.name)}
                          />
                          <label className="text-sm lg:text-base font-normal font-SFPro text-text">
                            {item.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">Loading...</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-2  w-[85%]">
                  <h1 className="text-base lg:text-lg font-medium font-SFPro text-secondary ">
                    Kategori
                  </h1>
                  <div className="grid grid-cols-2 w-[90%]">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="filterSkin"
                        value="all"
                        checked={filterType === "all"}
                        onChange={() => setFilterType("all")}
                      />
                      <label className="text-sm lg:text-base font-normal font-SFPro text-text">
                        All
                      </label>
                    </div>
                    {productType ? (
                      productType.map((item) => (
                        <div
                          className="flex items-center space-x-2"
                          key={item._id}>
                          <input
                            type="radio"
                            name="productType"
                            value={item.name}
                            onChange={(e) => setFilterType(e.target.value)}
                            checked={filterType === item.name}
                            key={item._id}
                          />
                          <label className="text-sm lg:text-base font-normal font-SFPro text-text">
                            {item.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">Loading...</div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="mt-2 w-[80%] lg:w-fit bg-secondary text-white rounded-md p-2">
                  Terapkan
                </button>
              </div>
            </div>
          </ConfirmPopUp>

          <div className="flex flex-col items-end w-[80%] mt-4">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition">
              <img src={FilterIcon} alt="Filter" className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-[90%] lg:w-[80%] gap-4 mt-[18px]">
            {loading ? (
              <div className="col-span-full text-center">
                Loading products...
              </div>
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
