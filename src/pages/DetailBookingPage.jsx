import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const DetailItemBooking = () => {
  const { id } = useParams();
  const [catalogData, setCatalogData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // const [currentPrice, setPrice] = useState(0);
  // const [currentCatalog, setCatalog] = useState("");
  const [count, setCount] = useState(1);
  const [basePrice, setBasePrice] = useState(0);
  const navigate = useNavigate();

  const priceTemp = localStorage.getItem("priceTemp") || "";

  const handleImageClick = (imageUrl) => {
    setIsPreviewOpen(true);
    setSelectedImage(imageUrl);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedImage("");
  };

  const handleNext = () => {
    localStorage.setItem("person", count);
    localStorage.setItem("price", basePrice);
    navigate(`/booking/${id}/time`); // Navigasi ke halaman 'time' dengan id yang sama
  };

  const handleNextImage = () => {
    setCurrentIndex(
      (currentIndex + 1 + catalogData.catalog_images.length) %
        catalogData.catalog_images.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex(
      (currentIndex - 1 + catalogData.catalog_images.length) %
        catalogData.catalog_images.length
    );
  };


  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if(newCount > 2){
        setBasePrice(priceTemp * (newCount - 1));
      }
      console.log(newCount);
      return newCount;
    });
  };  
  
  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        if (newCount < 3) {
          setBasePrice(priceTemp * 1);
        }else{
          setBasePrice(priceTemp * (newCount - 1));
        }
        console.log(newCount);
        return newCount;
      }
      return prevCount; // Return prevCount if no decrement happens
    });
  };


  useEffect(() => {
    console.log("Mengakses halaman detail");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/catalog/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Request API berhasil");
        localStorage.setItem("nameCatalog", response.data.data.catalog_name);
        localStorage.setItem("priceTemp", response.data.data.price);
        localStorage.setItem("typeCatalog", response.data.data.catalog_type);
        localStorage.setItem("catalog_id", id);
        setCatalogData(response.data.data);
        setBasePrice(response.data.data.price);
      })
      .catch((error) => {
        console.log("Request API gagal");
        console.log(error);
      });
  }, [id]);

  if (!catalogData) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="h-screen m-0">
        <div className="flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border border-gray-300 min-h-screen overflow-y-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold">
                {catalogData.catalog_name}
              </h1>
              <p className="text-sm">{catalogData.catalog_type}</p>
            </div>
            <div className="relative mb-6">
              <div className="flex justify-center slide-transition">
                {catalogData.catalog_images &&
                catalogData.catalog_images.length > 0 ? (
                  <img
                    src={catalogData.catalog_images[currentIndex].image_url}
                    alt={catalogData.catalog_name}
                    className="w-full rounded-lg"
                    onClick={() =>
                      handleImageClick(
                        catalogData.catalog_images[currentIndex].image_url
                      )
                    }
                  />
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700 ml-3 bg-gray-200 bg-opacity-50 hover:bg-gray-400 hover:bg-gray-200 p-2 rounded-full"
                  onClick={handlePrev}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  className="text-gray-500 hover:text-gray-700 mr-3 bg-gray-200 bg-opacity-50 hover:bg-gray-400 p-2 rounded-full"
                  onClick={handleNextImage}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {catalogData.catalog_name}
              </label>
              <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>Paket Reguler</option>
              </select>
            </div>
            <div className="text-gray-700 text-sm mb-4">
              <p>
                {catalogData.description ? (
                  catalogData.description.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </p>
            </div>
            <div className="text-center mb-4">
              <p className="text-gray-700 text-sm font-bold mb-2">
                Jumlah Orang
              </p>
              <div className="flex items-center justify-center">
                <button
                  className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l"
                  onClick={handleDecrement}
                >
                  -
                </button>
                <span className="bg-white text-gray-700 font-bold py-2 px-4 border-t border-b">
                  {count}
                </span>
                <button
                  className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r"
                  onClick={handleIncrement}
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-gray-700 text-lg font-bold mb-6">
              {/* Harga:{" "}
            {catalogData.price !== undefined && catalogData.price !== null
              ? catalogData.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })
              : "Harga tidak tersedia"} */}
              Harga:{" "}
              {basePrice.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
            </div>
            <button
              className="w-full bg-[#CDAB9E] text-white font-bold py-2 px-4 rounded hover:bg-[#A6887C]"
              onClick={handleNext}
            >
              Booking Sekarang!
            </button>
            {isPreviewOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-4 rounded-lg shadow-lg">
                  <img
                    src={selectedImage}
                    alt="A person sitting and smiling"
                    className="rounded-lg w-auto max-h-[80vh] rounded-lg object-contain"
                  />
                  {/* Button Close */}
                  <button
                    className="mt-4 bg-white p-2 shadow-md border border-gray-300 absolute left-1/2 transform -translate-x-1/2" // CSS untuk button close
                    onClick={handleClosePreview}
                  >
                    <i className="fas fa-times text-black"></i>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default DetailItemBooking;
