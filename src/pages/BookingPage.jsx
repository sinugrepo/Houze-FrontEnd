import CardItemBooking from "../components/CardItemBooking";
import logo from "./../assets/img/logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export default function BookingPage() {
  useEffect(() =>  {
    localStorage.clear();
  },[])

  return (
    <div className="flex flex-col items-center py-10 px-4 md:px-10">
      <div className="flex justify-center items-center mb-10">
        <Link to="/">
          <img src={logo} alt="Logo Houze Studio" className="" />
        </Link>
      </div>
      <CardItemBooking />
    </div>
  );
}
