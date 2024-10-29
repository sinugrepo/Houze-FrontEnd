// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InsertData = () => {
  const [catalogName, setCatalogName] = useState("");
  const [catalogType, setCatalogType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  // Handle Tab Key in Textarea
  const handleTab = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();

      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Set textarea value to: text before caret + tab + text after caret
      setDescription(
        description.substring(0, start) + "\t" + description.substring(end)
      );

      // Move the caret after the tab character
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("catalog_name", catalogName);
    formData.append("catalog_type", catalogType);
    formData.append("price", price);
    formData.append("description", description);

    for (let i = 0; i < images.length; i++) {
      formData.append("image", images[i]);
    }

    axios
      .post(
        "http://localhost:3000/api/v1/catalog/adds",
        formData,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Catalog added successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to add catalog!");
      });
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Tambah Katalog Baru</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catalogName"
          >
            Catalog Name
          </label>
          <input
            type="text"
            id="catalogName"
            value={catalogName}
            onChange={(event) => setCatalogName(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="catalogType"
          >
            Catalog Type
          </label>
          <input
            type="text"
            id="catalogType"
            value={catalogType}
            onChange={(event) => setCatalogType(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onKeyDown={handleTab}
            className="shadow appearance-none border rounded w-full pb-10 pt-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="images"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InsertData;
