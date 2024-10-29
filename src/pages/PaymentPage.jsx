import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const PaymentPage = () => {
  // Mendefinisikan state untuk menyimpan data dari localStorage
  const [nameCatalog, setNameCatalog] = useState("");
  const [price, setPrice] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [typeCatalog, setType] = useState("");

  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan pilihan metode pembayaran
  const handlePaymentChange = (e) => {
    const value = e.target.value;
    setSelectedPayment(value);
    // Simpan metode pembayaran ke localStorage
    localStorage.setItem("payment", value);
  };
  const handleClick = () => {
    navigate("/booking/payment/proof");
  }
  useEffect(() => {
    const storedNameCatalog = localStorage.getItem("nameCatalog");
    const storedPrice = localStorage.getItem("price");
    const storedDateTime = localStorage.getItem("dateTime");
    const storedType = localStorage.getItem("typeCatalog");

    const savedPayment = localStorage.getItem("payment");
    if (savedPayment) {
      setSelectedPayment(savedPayment);
    }

    if (storedNameCatalog) setNameCatalog(storedNameCatalog);
    if (storedPrice) setPrice(parseFloat(storedPrice)); // Parsing ke float
    if (storedDateTime) setDateTime(storedDateTime);
    if (storedType) setType(storedType);
  }, []);

  // Format tanggal dan waktu
  const dateObject = new Date(dateTime); // Mengonversi dateTime menjadi objek Date
  const formattedDate = dateObject.toLocaleString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Mengambil jam dan menit dalam UTC
  const hours = String(dateObject.getUTCHours()).padStart(2, '0');
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  const formattedDateTime = `${formattedDate} pukul ${formattedTime}`;

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen">
      <div id="root" className="h-full w-full flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md h-full flex flex-col justify-start">
          <div className="text-center mb-6">
            <img
              src="https://i.ibb.co/9NNC7dY/image.png"
              alt="Houze Studio Logo"
              className="mx-auto mb-10"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-inner">
            <p className="text-gray-700">
              {nameCatalog}, Paket {typeCatalog}
            </p>
            <p className="text-gray-700">{formattedDateTime}</p>
            <p className="text-gray-700">
              Total Harga:{" "}
              <span className="font-bold text-gray-900">Rp{parseInt(localStorage.getItem("totalPrice")).toLocaleString("id-ID")}</span>
            </p>
          </div>
          <p className="text-sm font-semibold mb-4">Pilih Metode Pembayaran</p>
          <div className="space-y-4">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="bca"
                checked={selectedPayment === "bca"}
                onChange={handlePaymentChange}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="flex items-center justify-center w-full h-14 bg-gray-100 p-3 rounded-lg">
                <img
                  src="https://i.ibb.co.com/dWf64FX/image-2024-10-05-12-35-42.png"
                  alt="BCA logo"
                  className="bg-cover h-16"
                />
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="mandiri"
                checked={selectedPayment === "mandiri"}
                onChange={handlePaymentChange}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="flex items-center justify-center w-full h-14 bg-gray-100 p-3 rounded-lg">
                <img
                  src="https://i.ibb.co.com/PQFvsjF/image-2024-10-05-12-33-34.png"
                  alt="Mandiri logo"
                  className="h-6"
                />
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="qris"
                checked={selectedPayment === "qris"}
                onChange={handlePaymentChange}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="flex items-center justify-center w-full h-14 bg-gray-100 p-3 rounded-lg">
                <img
                  src="https://i.ibb.co.com/f47rFf3/image-2024-10-05-12-35-51.png"
                  alt="QRIS logo"
                  className="h-6"
                />
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="payment"
                value="tunai"
                checked={selectedPayment === "tunai"}
                onChange={handlePaymentChange}
                className="form-radio h-5 w-5 text-gray-600"
              />
              <span className="flex items-center justify-center w-full h-14 bg-gray-100 p-3 rounded-lg">
                <img
                  src="https://i.ibb.co.com/Y2TcjRd/image-2024-10-05-12-35-23.png"
                  alt="Tunai logo"
                  className="bg-cover h-10"
                />
              </span>
            </label>
          </div>
          <button
            className="mt-6 w-full bg-[#CDAB9E] text-white py-2 rounded-lg hover:bg-opacity-80" onClick={handleClick}
          >
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
