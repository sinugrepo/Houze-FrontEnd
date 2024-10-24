import { useEffect, useState } from "react";
import logo from "../assets/img/logo.png";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TimeBooking = () => {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Initialize selectedDate from local storage or default to today's date
    const storedDate = localStorage.getItem("selectedDate") || "";
    if (!storedDate === "") {
      return storedDate.split("T")[0]; // Use the date part only
    }else{
      const today = new Date();
      return today.toLocaleDateString("en-CA"); // Format en-CA produces 'YYYY-MM-DD'
    }

  });

  const [selectedTime, setSelectedTime] = useState(() => {
    const storedDate = localStorage.getItem("dateTime") || ""; // Default to empty string if no time is stored
    if (storedDate === ""){
      return "";
    }else{
      const timePart = storedDate.split("T")[1]; // Memisahkan berdasarkan 'T' dan mengambil bagian kedua
      const formattedTime = timePart.split(":").slice(0, 2).join(":"); // Mengambil jam dan menit, lalu menggabungkannya
      return formattedTime;
    }
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Initialize flatpickr when the component mounts
  useEffect(() => {
    const today = new Date();
    const maxBookingDate = new Date();
    maxBookingDate.setDate(today.getDate() + 7);

    flatpickr("#datePicker", {
      dateFormat: "d/m/Y",
      minDate: today,
      maxDate: maxBookingDate,
      defaultDate: today,
      onChange: (selectedDates) => {
        // Convert directly to the desired format without changing time zone
        const date = selectedDates[0];
        const formattedDate = date.toLocaleDateString("en-CA"); // Format en-CA results in 'YYYY-MM-DD'
        setSelectedDate(formattedDate);
        // Store the selected date in local storage
        localStorage.setItem("selectedDate", formattedDate);
      },
    });
  }, []);

  const times = [
    "10:10",
    "10:20",
    "10:30",
    "10:40",
    "10:50",
    "11:10",
    "11:20",
    "11:30",
    "11:40",
    "11:50",
    "12:00",
    "12:10",
    "12:20",
    "12:30",
    "12:40",
    "12:50",
    "13:00",
    "13:10",
    "13:20",
    "13:30",
    "13:40",
    "13:50",
    "14:00",
    "14:10",
    "14:20",
    "14:30",
    "14:40",
    "14:50",
    "15:00",
    "15:10",
    "15:20",
    "15:30",
    "15:40",
    "15:50",
    "16:00",
    "16:10",
    "16:20",
    "16:30",
  ];

  const handleTimeClick = (time) => {
    setSelectedTime(time); // Save the selected time
    localStorage.setItem("selectedTime", time); // Store in local storage
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      // Split the selected date and time
      const [year, month, day] = selectedDate.split("-");
      const [hours, minutes] = selectedTime.split(":");

      // Create a date object with local timezone
      const localDate = new Date(
        `${year}-${month}-${day}T${hours}:${minutes}:00`
      );

      // Convert date to UTC
      const utcDate = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );

      // Format the date and time to ISO string
      const formattedDateTimeString = utcDate
        .toISOString()
        .replace(/\.000Z$/, "Z"); // Replace '.000Z' with 'Z'

      localStorage.setItem("dateTime", formattedDateTimeString);
      console.log(formattedDateTimeString); // Output: 2024-09-30T13:00:00Z
      navigate(`/booking/${id}/confirmation`); // Navigate to confirmation page
    } else {
      console.log("Please select a date and time first.");
      Swal.fire({
        title: "You haven't selected a date!",
        text: "Please select one first!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
  };

  return (
    <div className="h-screen m-0">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-300 h-full md:h-full">
          <img
            src={logo} // Use your logo if necessary
            alt="Houze Studio Logo"
            className="mx-auto mb-10"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <div className="relative mb-6">
            <input
              id="datePicker"
              className="bg-[#CDAB9E] text-white py-2 px-4 rounded-lg w-full cursor-pointer"
              readOnly
            />
            <i className="fas fa-calendar-alt absolute right-4 top-1/2 transform -translate-y-1/2 text-white"></i>
          </div>
          <div className="grid grid-cols-5 gap-2 text-center text-sm">
            {times.map((time) => (
              <div
                key={time}
                onClick={() => handleTimeClick(time)}
                className={`py-2 rounded-lg cursor-pointer transition duration-200 ${
                  selectedTime === time
                    ? "bg-gray-400 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {time}
                {console.log(selectedTime)}
              </div>
            ))}
          </div>
          <button
            className="bg-[#CDAB9E] text-white py-2 px-4 rounded-lg mt-6 w-full hover:bg-[#A6887C] transition duration-200"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeBooking;
