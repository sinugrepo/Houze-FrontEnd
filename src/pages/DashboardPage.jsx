import { useEffect, useState } from "react";
import logo from "./../assets/img/logo.png";
import axios from "axios";
import CatalogTable from "../components/CatalogTable.jsx";
import { useNavigate } from "react-router-dom";
import InsertData from "../components/InsertData.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardContent from "../components/DashboardContent.jsx";
import AddCatalog from "../components/AddCatalog.jsx";

export default function DashboardPage() {
  const [isNavOpen, setIsNavOpen] = useState(window.innerWidth >= 768);
  const [activePage, setActivePage] = useState("Dashboard");
  const [addData, setAddData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsNavOpen(false);
      } else {
        setIsNavOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/login");
        toast.success("Logged out successfully!");
        console.log("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Error Logout, Please Check Your Internet");
        console.error("Error logging out:", error);
      });
  };

  const handleAddData = () => {
    setAddData(addData + 1);
  };

  const handleResetAddData = () => {
    setAddData(addData === 0);
  };

  const renderContent = () => {
    switch (activePage) {
      case "Dashboard":
        return <DashboardContent />;
      case "E-Booking":
        return (
          <>
            <div className="text-2xl">E-Booking Content</div>
          </>
        );
      case "Katalog":
        // return <div className="text-2xl">Katalog Content</div>;
        return (
          <>
            <div className="container mx-auto p-4">
              <div className="flex justify-start"></div>
              {addData > 0 ? (
                <>
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={handleResetAddData}
                  >
                    KEMBALI
                  </button>
                  <AddCatalog />
                </>
              ) : (
                <>
                  <button
                    className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    onClick={handleAddData}
                  >
                    TAMBAH DATA
                  </button>
                  <CatalogTable />
                </>
              )}
            </div>
          </>
        );
      case "Report":
        return <div className="text-2xl">Report Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {isNavOpen && (
        <div className="w-full md:w-1/4 bg-zinc-100 shadow-xl p-4 fixed md:relative h-full md:h-auto z-50">
          <div className="flex items-center justify-between mb-8">
            <img
              src={logo}
              alt="Logo"
              className="bg-cover w-40 h-20 ml-[20%]"
            />
            <i
              className="fas fa-times text-xl cursor-pointer"
              onClick={() => setIsNavOpen(false)}
            ></i>
          </div>
          <div className="text-black">
            <h2 className="text-lg font-bold mb-4">MENU</h2>
            <ul>
              <li
                className={`flex items-center mb-4 cursor-pointer text-lg ${
                  activePage === "Dashboard"
                    ? "bg-white text-black p-2 rounded"
                    : ""
                }`}
                onClick={() => {
                  setActivePage("Dashboard");
                  if (window.innerWidth < 768) setIsNavOpen(false);
                }}
              >
                <i className="fas fa-home mr-2"></i>
                <span>Dashboard</span>
              </li>
              <li
                className={`flex items-center mb-4 cursor-pointer text-lg ${
                  activePage === "E-Booking"
                    ? "bg-white text-black p-2 rounded"
                    : ""
                }`}
                onClick={() => {
                  setActivePage("E-Booking");
                  if (window.innerWidth < 768) setIsNavOpen(false);
                }}
              >
                <i className="fas fa-calendar-alt mr-2"></i>
                <span>E-Booking</span>
              </li>
              <li
                className={`flex items-center mb-4 cursor-pointer text-lg ${
                  activePage === "Katalog"
                    ? "bg-white text-black p-2 rounded"
                    : ""
                }`}
                onClick={() => {
                  setActivePage("Katalog");
                  if (window.innerWidth < 768) setIsNavOpen(false);
                }}
              >
                <i className="fas fa-list-alt mr-2"></i>
                <span>Katalog</span>
              </li>
              <li
                className={`flex items-center mb-4 cursor-pointer text-lg ${
                  activePage === "Report"
                    ? "bg-white text-black p-2 rounded"
                    : ""
                }`}
                onClick={() => {
                  setActivePage("Report");
                  if (window.innerWidth < 768) setIsNavOpen(false);
                }}
              >
                <i className="fas fa-file-alt mr-2"></i>
                <span>Report</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          isNavOpen ? "hidden md:block md:w-3/4" : "w-full"
        } p-8 relative`}
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {!isNavOpen && (
              <i
                className="fas fa-bars text-xl cursor-pointer mr-4"
                onClick={() => setIsNavOpen(true)}
              ></i>
            )}
            <h1 className="text-2xl md:text-3xl font-bold ml-4 md:ml-0">
              {activePage.toUpperCase()}
            </h1>
          </div>
          <button
            className="bg-red-500 text-white px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-base float-right"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
