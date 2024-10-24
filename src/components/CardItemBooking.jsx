import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CardItemBooking() {
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/catalogs",
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        setCatalogData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 ">
      {catalogData.map((catalog) => (
        <Link to={`/booking/${catalog.id}`} key={catalog.id}>
          <div
            key={catalog.id}
            className="border rounded-lg overflow-hidden shadow-lg w-full md:w-72"
          >
            <img
              src={catalog.catalog_images[0].image_url}
              alt={catalog.catalog_name}
              className="w-full h-64 object-cover hover:object-cover"
            />
            <div className="p-4 text-center">
              <p>{catalog.catalog_name}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
