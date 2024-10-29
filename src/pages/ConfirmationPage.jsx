import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ConfirmationPage = () => {
  const [nameCatalog, setNameCatalog] = useState("");
  // const [price, setPrice] = useState(0);
  const [dateTime, setDateTime] = useState("");
  const [typeCatalog, setType] = useState("");
  const navigate = useNavigate();

  // const storedExtraPrice = parseInt(localStorage.getItem("extraPrice"));
  // const totalPrice = parseInt(storedExtraPrice +  price)
  const totalPrice = parseInt(localStorage.getItem("price"));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Store the value in localStorage
    localStorage.setItem(name, value);
  };

  const handleSubmit = () => {
    navigate("/booking/payment");
  };

  useEffect(() => {
    const storedNameCatalog = localStorage.getItem("nameCatalog");
    const storedPrice = localStorage.getItem("price");
    const storedDateTime = localStorage.getItem("dateTime");
    const storedType = localStorage.getItem("typeCatalog");

    const savedFullName = localStorage.getItem("fullName") || "";
    const savedEmail = localStorage.getItem("email") || "";
    const savedPhoneNumber = localStorage.getItem("phoneNumber") || "";
    const savedNotes = localStorage.getItem("notes") || "";

    setFormData({
      fullName: savedFullName,
      email: savedEmail,
      phoneNumber: savedPhoneNumber,
      notes: savedNotes,
    });

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
    <div className="flex items-center justify-center min-h-screen h-screen">
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-full flex flex-col justify-center">
        <img
              src="https://i.ibb.co/9NNC7dY/image.png"
              alt="Houze Studio Logo"
              className="mx-auto mb-10"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          <div className="bg-gray-100 p-4 rounded-lg mb-6 shadow-inner">
            <p className="text-gray-700">
              {nameCatalog}, Paket {typeCatalog}
            </p>
            <p className="text-gray-700">{formattedDateTime}{console.log(formattedDateTime)}</p>
            <p className="text-gray-700">
              Total Harga:{" "}
              <span className="font-bold text-gray-900">Rp{totalPrice.toLocaleString()}{localStorage.setItem("totalPrice", totalPrice)}</span>

            </p>
          </div>
          <form className="space-y-4 flex-grow">
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-200"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-200"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Nomor Telepon (Contoh: 87732916000)
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-100 text-gray-600">
                  +62
                </span>
                <input
                  maxLength={12} // Batasi panjang input hingga 12 karakter
                  type="number"
                  className="w-full border border-gray-300 p-2 rounded-r focus:outline-none focus:ring-2 focus:ring-rose-200"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-600">
                Catatan pesanan
              </label>
              <textarea
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-rose-200"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#CDAB9E] text-white py-2 rounded hover:bg-[#A6887C] transition-colors"
              onClick={handleSubmit}
            >
              Konfirmasi Pesanan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
