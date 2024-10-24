import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import qs from "qs";
import Swal from "sweetalert2";

const CancelBooking = () => {
  const [bookingStatus, setBookingStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/booking/${id}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setBookingStatus(response.data.data.booking_status);
        setPaymentStatus(response.data.data.payment_status);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const handleValidateCancel = () => {
    Swal.fire({
        title: "Anda ingin membatalkan booking?",
        text: "Jika anda sudah transfer maka hubungi admin untuk menerima refund!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Anda yakin?, batalkan Booking!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            // Kirim POST request ke server
            let data = qs.stringify({
              booking_id: id,
              booking_status: "Cancelled",
              payment_status: "Refund",
            });
  
            const response = await axios.put(
              "http://localhost:3000/api/v1/booking/update",
              data,
              {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            );
  
            if (response.status === 200) {
              Swal.fire({
                title: "Success!",
                text: "Membatalkan Booking berhasil!",
                icon: "success",
                confirmButtonText: "OK!",
              });
              window.location.reload();
            } else {
              Swal.fire({
                title: "Failed!",
                text: "Failed update status",
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Booked":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      case "Cancelled":
        return "text-red-500";
      case "Pending":
        return "text-orange-500";
      case "Paid":
        return "text-green-500";
      default:
        return "text-black";
    }
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen">
      <div className="text-center">
        <img
          src="https://i.ibb.co/9NNC7dY/image.png"
          alt="Houze Studio Logo"
          className="mx-auto mb-8"
        />
        <div className="bg-white text-lg p-4 mb-4 shadow-md">
          ID Booking: B0001
        </div>
        <div
          className={`bg-white text-lg p-4 mb-4 shadow-md ${getStatusColor(
            bookingStatus
          )}`}
        >
          Booking Status: {bookingStatus}
        </div>
        <div
          className={`bg-white text-lg p-4 mb-8 shadow-md ${getStatusColor(
            paymentStatus
          )}`}
        >
          Payment Status: {paymentStatus}
        </div>
        <div className="mt-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={handleValidateCancel}>
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;
