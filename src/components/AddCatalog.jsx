import { useEffect, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Swal from "sweetalert2";

const AddCatalog = () => {
  const [showNewCatalog, setShowNewCatalog] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [image, setImages] = useState([]);
  const [nameCatalog, setNameCatalog] = useState([]);
  const [idCatalog, setIdCatalog] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);


  const [formData, setFormData] = useState({
    catalogType: "",
    description: "",
    price: 0,
    duration: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Untuk mengubah nilai price dan duration ke tipe number
    const newValue =
      name === "price" || name === "duration" ? Number(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  // const [catalogType, setCatalogType] = useState("");
  // const [description, setDescription] = useState("");
  // const [price, setPrice] = useState(0);
  // const [duration, setDuration] = useState(0);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/catalogs/",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setCatalogs(response.data.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refreshTrigger]);

  const handleImageChange = (event) => {
    setImages(event.target.files);
  };

  const handleNameCatalogChange = (event) => {
    setNameCatalog(event.target.value);
  };

  const handleIdCatalogChange = (event) => {
    setIdCatalog(event.target.value);
  };

  const handleAddCatalog = (e) => {
    Swal.fire({
      title: "Apa anda ingin menambahkan catalog baru?",
      text: "Pastikan tidak ada typo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Tambahkan Data",
    }).then((result) => {
      if (result.isConfirmed) {
        e.preventDefault();

        let data = new FormData();
        data.append("catalog_name", nameCatalog);

        for (let i = 0; i < image.length; i++) {
          data.append("image", image[i]);
        }

        Swal.fire({
          title: 'Loading...',
          text: 'Please wait while we process your request',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading(); // Show loading spinner
          }
        });
        axios
          .post(
            "http://localhost:3000/api/v1/catalog/add",
            data,
            {
              withCredentials: true, // Pastikan ini ada jika perlu
              maxBodyLength: Infinity,
            },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((response) => {
            Swal.close();
            Swal.fire({
              title: "SUKSES!",
              text: "Data Tersimpan di Database",
              icon: "success",
            });
            setRefreshTrigger(!refreshTrigger);
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            Swal.fire({
              title: "GAGAL!",
              text: "Cek Koneksi Anda!",
              icon: "error",
            });
            console.log(error);
          });
      }
    });
  };

  const handleAddCatalogType = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("catalog_id", idCatalog);
    data.append("catalog_type", formData.catalogType);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("duration", formData.duration);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/catalog/addtype",
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json' 
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleShowNewCatalog = () => {
    setShowNewCatalog(!showNewCatalog);
    setRefreshTrigger(!refreshTrigger);
  }

  const handleRefreshId = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/catalogs/",
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setCatalogs(response.data.data);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="p-8">
      {/* <h1 className="text-3xl font-bold mb-8">Katalog</h1> */}

      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4"
        onClick={handleShowNewCatalog}
      >
        {showNewCatalog
          ? "Sembunyikan Tambahkan Katalog Baru"
          : "Tampilkan Tambahkan Katalog Baru"}
      </button>

      {showNewCatalog && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Tambahkan Katalog Baru</h2>
          <div className="mb-4">
            <label className="block mb-2">Nama Catalog</label>
            <input
              type="text"
              className="w-full border border-gray-400 p-2 rounded-md"
              onChange={handleNameCatalogChange}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Foto Catalog (Up To 5 Gambar)</label>
            <input
              type="file"
              id="images"
              className="w-full border border-gray-400 p-2 rounded-md"
              multiple
              onChange={handleImageChange}
            />
          </div>
          <button
            className="bg-orange-500 text-white px-4 py-2"
            onClick={handleAddCatalog}
          >
            Tambahkan
          </button>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Tambahkan Tipe Catalog</h2>
        <div className="mb-4" onClick={handleRefreshId}>
          <label className="block mb-2">Nama Catalog</label>
          <select
            className="w-full border border-gray-400 p-2 rounded-md"
            onChange={handleIdCatalogChange}
          >
            {catalogs.map((catalog, index) => (
              <option key={index} value={catalog.id}>
                {catalog.catalog_name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nama Tipe Catalog</label>
          <input
            type="text"
            name="catalogType"
            className="w-full border border-gray-400 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Harga</label>
          <input
            type="text"
            name="price"
            className="w-full border border-gray-400 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Deskripsi</label>
          <input
            type="text"
            name="description"
            className="w-full border border-gray-400 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Durasi</label>
          <input
            type="text"
            name="duration"
            className="w-full border border-gray-400 p-2 rounded-md"
            onChange={handleChange}
          />
        </div>
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded-md"
          onClick={handleAddCatalogType}
        >
          Tambahkan Tipe
        </button>
      </div>
    </div>
  );
};

export default AddCatalog;
