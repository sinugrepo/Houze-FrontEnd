import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCookie = (cookieName) => {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null;
  };

  useEffect(() => {
    const isAuthenticated = () => {
      const sessionCookie = getCookie("connect.sid");
      return sessionCookie ? true : false;
    };

    return isAuthenticated() ? navigate("/dashboard") : navigate("/login");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.status === "success") {
        console.log("Login Successfull!");
        toast.success("Login Successfull!")
        navigate("/dashboard");
      }
    } catch (error) {
      // setMessage("Login Failed! Please Check Email or Password!");
      toast.error("Please Check Email or Your Password!")
      console.error("Error during login:", error);
    }
  };

  return (
    <body className="bg-[#F8F7F4]">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden w-full max-w-4xl">
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-3xl font-bold mb-6">Log In</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <a
                  className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-800"
                  href="#"
                ></a>
                <a
                  className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-800"
                  href="#"
                >
                  Lupa Password?
                </a>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-[#c9a18b] hover:bg-[#b58f7a] text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>

            {message && (
              <p style={{ color: error ? "red" : "green" }}>{message}</p>
            )}
          </div>
          <div className="hidden md:block w-1/2 bg-[#c9a18b] relative">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
            >
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#ffffff", stopOpacity: 0.5 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#c9a18b", stopOpacity: 0.5 }}
                  />
                </linearGradient>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b2f2f", stopOpacity: 0.5 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#c9a18b", stopOpacity: 0.5 }}
                  />
                </linearGradient>
              </defs>
              <circle cx="200" cy="200" r="150" fill="url(#grad1)" />
              <circle cx="600" cy="600" r="200" fill="url(#grad2)" />
              <circle cx="400" cy="400" r="100" fill="url(#grad1)" />
              <circle cx="700" cy="300" r="50" fill="url(#grad2)" />
            </svg>
          </div>
        </div>
      </div>
    </body>
  );
}
