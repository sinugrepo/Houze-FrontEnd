import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DetailItemBooking = () => {
  const { id } = useParams();
  const [catalogData, setCatalogData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedType, setSelectedType] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [countType, setCountType] = useState(0);

  const [basePrice, setBasePrice] = useState(0);
  const [extras, setExtras] = useState({});
  const [extrasPrice, setExtrasPrice] = useState(0);
  const [isAddPersonOpen, setIsAddPersonOpen] = useState(false);
  const [isTypeAddPersonOpen, setIsTypeAddPersonOpen] = useState(false);

  const navigate = useNavigate();

  const sumPriceType = parseInt(localStorage.getItem("priceTypeTemp") || 0);
  const sumExtra = parseInt(localStorage.getItem("extraPrice") || 0);
  const sumBaseExtra = basePrice + sumExtra + sumPriceType;
  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setSelectedImage("");
  };

  const handleImageClick = (imageUrl) => {
    setIsPreviewOpen(true);
    setSelectedImage(imageUrl);
  };

  const handleNext = () => {
    const selectedExtras = catalogData.catalog_etc
      .filter((extra) => extras[extra.id_etc]) // hanya item yang dicentang
      .map((extra) => ({
        id: extra.id_etc,
        description: extra.description,
        price: extra.price,
      }));

    // Simpan array ke dalam localStorage dalam format JSON
    localStorage.setItem("selectedExtras", JSON.stringify(selectedExtras));
    
    console.log("TOTAL PRICE",sumBaseExtra);
    localStorage.setItem("person", count);
    localStorage.setItem("price", sumBaseExtra);
    navigate(`/booking/${id}/time`);
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

  const pricePerson = parseInt(localStorage.getItem("pricePerson")) || 0;

  const handleIncrement = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      const newExtraPrice = extrasPrice + pricePerson; // Tambahkan harga per orang

      setExtrasPrice(newExtraPrice);
      localStorage.setItem("extraPrice", newExtraPrice);

      return newCount;
    });
  };

  const handleDecrement = () => {
    setCount((prevCount) => {
      if (prevCount > 1) {
        // Cek agar tidak mencapai 0
        const newCount = prevCount - 1;
        const newExtraPrice = extrasPrice - pricePerson;

        setExtrasPrice(newExtraPrice);
        localStorage.setItem("extraPrice", newExtraPrice);

        return newCount;
      }
      return prevCount; // Tidak mengubah count jika sudah di 1
    });
  };

  const handleDecrementType = () => {
    setCountType((prevCount) => {
      if (prevCount > 1) {
        const newCount = prevCount - 1;
        const priceTemp = parseInt(localStorage.getItem("priceTemp"), 10);
        if (newCount > 0){
          const totalPriceType = priceTemp * (newCount - 1);

          // Update total price and base price
          localStorage.setItem("priceTypeTemp", totalPriceType);
          // setBasePrice(totalPriceType);
  
          console.log("Decrement:", newCount);
          console.log(newCount, "COUNT TYPE after decrement");
          console.log(totalPriceType, "TOTAL")
        }else{
          const totalPriceType = priceTemp * newCount;

          // Update total price and base price
          localStorage.setItem("priceTypeTemp", totalPriceType);
          // setBasePrice(totalPriceType);
  
          console.log("Decrement:", newCount);
          console.log(newCount, "COUNT TYPE after decrement");
          console.log(totalPriceType, "TOTAL")
        }
        return newCount;
      } else {
        // If countType is already at minimum (1)
        const priceTemp = parseInt(localStorage.getItem("priceTemp"), 10);

        localStorage.setItem("priceTypeTemp", 0);
        setBasePrice(priceTemp);

        console.log("Minimum count reached:", prevCount);
        prevCount = 0;
        return prevCount;
      }
    });
  };

  const handleIncrementType = () => {
    const selectedId = localStorage.getItem("catalog_type_id") || null;
    const typeItem = catalogData?.types?.find((type) => type.id === selectedId);
    console.log(selectedId, "tipe id");
    console.log(typeItem, "max");

    if (!typeItem) return;

    setCountType((prevCount) => {
      const newCount = prevCount + 1;

      if (typeItem.maxperson >= newCount) {
        if (newCount === 1) {
          // Pastikan `newCount` sesuai `maxperson`
          const totalPriceType = 0;
          localStorage.setItem("priceTypeTemp", totalPriceType);
          console.log("Increment:", newCount); // Debugging log
          console.log(totalPriceType, "TOTAL")
        } else {
          const priceTemp = localStorage.getItem("priceTemp");
          const totalPriceType = parseInt(priceTemp) * (newCount - 1);
          localStorage.setItem("priceTypeTemp", totalPriceType);
          console.log("Increment:", newCount); // Debugging log
          console.log(totalPriceType, "TOTAL")
        }
        return newCount;
      } else {
        Swal.fire({
          title: "Paket Ini Sudah Maksimal!",
          text:
            "Paket Ini Hanya Menampung " +
            prevCount +
            " Orang, Coba Ganti Paket Yang Lain atau Order Etc Tambah Orang!",
          icon: "warning",
        });
        console.log("Maximum person reached");
        return prevCount; // Tidak melebihi `maxperson`
      }
    });
  };

  const handleTypeChange = (event) => {
    const selectedId = event.target.value;
    const type = catalogData.types.find((t) => t.id === selectedId);
    if (type.addperson === true) {
      setIsTypeAddPersonOpen(true);
    } else {
      setIsTypeAddPersonOpen(false);
    }
    localStorage.setItem("catalog_type_id", selectedId);
    setBasePrice(type.price);
    setSelectedType(type);
  };

  const handleExtrasChange = (event, extraPrice, extraId) => {
    const { checked } = event.target;
    setExtras((prevExtras) => {
      const updatedExtras = { ...prevExtras, [extraId]: checked };

      // Cek apakah ada tambahan `addperson` yang aktif
      const selectedAddPerson = catalogData.catalog_etc.find(
        (extra) => extra.addperson && updatedExtras[extra.id_etc]
      );

      // Hitung ulang total harga dengan mempertimbangkan `addperson` berdasarkan `count`
      const total = catalogData.catalog_etc.reduce((acc, extra) => {
        if (updatedExtras[extra.id_etc]) {
          return acc + (extra.addperson ? extra.price * count : extra.price);
        }
        return acc;
      }, 0);

      // Kelola state dan localStorage untuk `addperson`
      if (selectedAddPerson) {
        setIsAddPersonOpen(true);
        localStorage.setItem("pricePerson", selectedAddPerson.price);
      } else {
        setIsAddPersonOpen(false);
        setCount(1); // Reset count jika tidak ada `addperson` yang dipilih
        localStorage.removeItem("pricePerson");
      }

      // Update localStorage dan state harga tambahan
      localStorage.setItem("extraPrice", total);
      setExtrasPrice(total);

      return updatedExtras;
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
        localStorage.setItem("priceTemp", response.data.data.types[0].price);
        localStorage.setItem("priceTypeTemp", 0)
        localStorage.setItem("extraPrice", 0);

        localStorage.setItem(
          "typeCatalog",
          response.data.data.types[0].catalog_type
        );

        if (response.data.data.types[0].addperson === true) {
          setIsTypeAddPersonOpen(true);
        }

        localStorage.setItem("catalog_type_id", response.data.data.types[0].id);
        localStorage.setItem("catalog_id", id);
        setCatalogData(response.data.data);
        console.log(response.data.data);
        setBasePrice(response.data.data.types[0].price);
        console.log(response.data.data.types[0].price);
        const initialExtras = {};
        response.data.data.catalog_etc.forEach((etc) => {
          initialExtras[etc.id_etc] = false;
        });
        setExtras(initialExtras);
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
              <p className="text-sm"></p>
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
              <select
                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleTypeChange}
              >
                {catalogData.types.map((type, index) => (
                  <option key={index} value={type.id}>
                    {type.catalog_type}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-700 text-sm mb-4">
              {selectedType ? (
                <p>
                  {selectedType.description.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              ) : (
                <p>
                  {catalogData.types[0].description
                    .split("\n")
                    .map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                </p>
              )}
            </div>
            {isTypeAddPersonOpen && (
              <div className="text-center mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">
                  Jumlah Orang
                </p>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l"
                    onClick={handleDecrementType}
                  >
                    -
                  </button>
                  <span className="bg-white text-gray-700 font-bold py-2 px-4 border-t border-b">
                    {countType}
                  </span>
                  <button
                    className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-r"
                    onClick={handleIncrementType}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            {/* Ripple Checkbox */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm font-bold mb-2">
                Tambahan Lainnya
              </p>
              {catalogData?.catalog_etc.map((extra) => (
                <div key={extra.id_etc} className="flex items-center mb-2">
                  <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor={extra.id_etc}
                    data-ripple-dark="true"
                  >
                    <input
                      id={extra.id_etc}
                      name={extra.id_etc}
                      type="checkbox"
                      className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-slate-400 before:opacity-0 before:transition-opacity checked:border-slate-800 checked:bg-slate-800 checked:before:bg-slate-400 hover:before:opacity-10"
                      checked={extras[extra.id_etc]}
                      onChange={(e) =>
                        handleExtrasChange(e, extra.price, extra.id_etc)
                      }
                    />
                    <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  </label>
                  <label
                    className="cursor-pointer text-slate-600 text-sm"
                    htmlFor={extra.id_etc}
                  >
                    {extra.description}{" "}
                    <b>(Rp.{extra.price.toLocaleString("id-ID")})</b>
                  </label>
                </div>
              ))}
            </div>

            {isAddPersonOpen && (
              <div className="text-center mb-4">
                <p className="text-gray-700 text-sm font-bold mb-2">
                  Tambah Orang
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
            )}
            <div className="text-gray-700 text-lg font-bold mb-6">
              Harga: {basePrice ? sumBaseExtra.toLocaleString("id-ID") : 0}
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
