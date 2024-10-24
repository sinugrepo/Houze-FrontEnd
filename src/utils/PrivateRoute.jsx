import React from 'react';
import { Navigate } from 'react-router-dom';

const getCookie = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
  for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length);
      }
  }
  return null;
};
// Fungsi untuk mengecek token di localStorage
const isAuthenticated = () => {
  const sessionCookie = getCookie('connect.sid');
  return sessionCookie ? true : false;
};

// Komponen PrivateRoute untuk melindungi halaman privat
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
