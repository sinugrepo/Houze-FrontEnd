import { useEffect, useState } from "react";
import axios from "axios"; // Import axios untuk submit data
import qris from "../assets/img/qris.jpg";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const ProofPayment = () => {
  const [image, setImage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    nameSender: "",
    numberBankAccount: "",
    transfer: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const savedNameSender = localStorage.getItem("nameSender") || "";
    const savedNumberBankAccount = localStorage.getItem("numberBankAccount") || "";
    const savedTransfer = localStorage.getItem("transfer") || "";

    setFormData({
      nameSender: savedNameSender,
      numberBankAccount: savedNumberBankAccount,
      transfer: savedTransfer,
    });

    const storedTotalPrice = localStorage.getItem("price");
    storedTotalPrice ? setTotalPrice(storedTotalPrice) : setTotalPrice(0);

    const storedPaymentMethod = localStorage.getItem("payment");
    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    localStorage.setItem(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire({
        title: "Bukti Transfer Kosong!",
        text: "Anda harus mengunggah bukti transfer sebelum melanjutkan.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return; // Hentikan eksekusi jika image kosong
    }
    // Buat FormData untuk mengirim data ke server
    const data = new FormData();

    // Tambahkan data dari localStorage
    data.append("customer_name", localStorage.getItem("fullName") || "");
    data.append("email", localStorage.getItem("email") || "");
    data.append("phone_number", localStorage.getItem("phoneNumber") || "");
    data.append("person", localStorage.getItem("person") || "");
    data.append("price", localStorage.getItem("price") || ""); // Total harga dari state
    data.append("notes", localStorage.getItem("notes") || "");
    data.append("schedule", localStorage.getItem("dateTime") || "");
    data.append("catalog_id", localStorage.getItem("catalog_id") || ""); // Bisa disesuaikan sesuai ID katalog yang dimiliki
    data.append("payment_method", paymentMethod); // Dari state
    data.append("transfer_nominal", formData.transfer);
    data.append("account_name", formData.nameSender);
    data.append("account_number", formData.numberBankAccount);
    data.append('image', image); // Gambar
    // Validasi apakah gambar sudah diunggah

    
    Swal.fire({
      title: "Pastikan Informasi yang dimasukan benar!",
      text: "Jika terjadi kesalahan maka tidak bisa dirubah lagi!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sudah benar, konfirmasi pembayaran!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Kirim POST request ke server
          const response = await axios.post("http://localhost:3000/api/v1/booking/add", data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
  
          if (response.status === 200) {
            Swal.fire({
              title: "Success!",
              text: "Booking berhasil!",
              icon: "success",
              confirmButtonText: "OK!",
            });
            navigate("/booking");
            // Reset form atau alihkan pengguna ke halaman lain jika diperlukan
          } else {
            Swal.fire({
              title: "Failed!",
              text: "Failed to add booking.",
              icon: "error",
              confirmButtonText: "Retry",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while adding booking. Please try again later.",
            icon: "error",
            confirmButtonText: "Close",
          });
          console.error("Error saat mengirim booking:", error);
        }
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen overflow-y-auto">
      <div className="w-full flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md overflow-y-auto">
          <div className="text-center mb-6">
            <img
              src="https://i.ibb.co/9NNC7dY/image.png"
              alt="Houze Studio Logo"
              className="mx-auto mb-10"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          {/* Menampilkan elemen berdasarkan metode pembayaran */}
          {paymentMethod === "qris" ? (
            <div className="text-center mb-6">
              <img
                src={qris}
                alt="QRIS Payment"
                className="mx-auto mb-10"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              <p className="text-center">
                Silakan scan QRIS untuk melakukan pembayaran
              </p>
              <p className="text-center">
                Transfer Sebesar <b>Rp.{totalPrice}</b>
              </p>
            </div>
          ) : paymentMethod === "bca" ? (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-center">Total Harga Rp.{totalPrice}</p>
              <p className="text-center mt-2">Nomor Rekening BCA: 0461403505</p>
              <p className="text-center mt-2">A/N: Widi Hardhanu</p>
            </div>
          ) : paymentMethod === "mandiri" ? (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-center">Total Harga Rp.{totalPrice}</p>
              <p className="text-center mt-2">Nomor Rekening Mandiri: 1390009952676</p>
              <p className="text-center mt-2">A/N: Widi Hardhanu</p>
            </div>
          ) : (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <p className="text-center">{totalPrice}</p>
              <p className="text-center mt-2">
                Pilih metode pembayaran di halaman sebelumnya.
              </p>
            </div>
          )}
          <form className="flex flex-col flex-grow" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Nominal Transfer</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="transfer"
                value={formData.transfer}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nama Pengirim</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="nameSender"
                value={formData.nameSender}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Nomor Rekening/Nomor E-Wallet</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="numberBankAccount"
                value={formData.numberBankAccount}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Bukti Transfer</label>
              <div className="w-full p-2 border rounded flex items-center justify-center">
                <input
                  type="file"
                  className="w-full p-2 border rounded"
                  onChange={handleImageChange}
                />
              </div>
              {image && (
                <div className="mt-4 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="rounded"
                    style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-[#CDAB9E] hover:bg-opacity-80 text-white rounded mb-10"
            >
              Bayar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProofPayment;
