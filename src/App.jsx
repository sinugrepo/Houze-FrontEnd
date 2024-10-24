import "./index.css"
import banner from "./assets/img/banner.jpg";
import logo from "./assets/img/logo.png";
import family from "./assets/img/familyphoto.png";
import graduation from "./assets/img/graduationphoto.png";
import passphoto from "./assets/img/passphoto.png";
import group from "./assets/img/groupphoto.png";
import selfphoto from "./assets/img/selfphoto.png";
import product from "./assets/img/productphoto.png";

export default function App() {
  return (
    <div>
      <header className="text-center py-8">
        <div className="flex justify-center items-center"><img src={logo} alt="Logo Houze Studio" className="" /></div>
        {/* <h1 className="text-4xl font-bold">Houze Studio</h1> */}
      </header>
      <section className="relative">
        <img src={banner} alt="Group of people smiling a  nd posing" className="w-full h-96 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white">
          <p className="bg-red-500 px-4 py-2 rounded-full mb-4">Sudah lebih dari 1000+ order selesai</p>
          <h2 className="text-3xl font-bold mb-4">Kami Mengabadikan Esensi Anda, dengan Sentuhan Profesional.</h2>
          <Link to="/booking"><button className="bg-red-500 px-6 py-2 rounded-full">Booking Sekarang!</button></Link>
        </div>
      </section>
      <section className="py-16 bg-[#F5F5F5]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Beberapa Hasil Karya Kami</h2>
          <p className="text-gray-600">Karya-karya di bawah ini adalah bukti kepuasan klien kami. Jangan ragu untuk melihat lebih banyak karya kami mengabadikan esensi berbagai momen.</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={selfphoto} alt="Portrait of a woman posing" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Self Photo</h3>
              <p className="text-gray-600 mb-4">Abadikan momen terbaik Anda dengan gaya terbaik.</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={group} alt="Group of people posing together" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Group Photo</h3>
              <p className="text-gray-600 mb-4">Ciptakan kenangan bersama dengan teman, keluarga, atau rekan kerja Anda.</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={passphoto} alt="Portrait of a woman in a formal outfit" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Pass Photo</h3>
              <p className="text-gray-600 mb-4">Cetak pasfoto Anda dengan hasil terbaik untuk keperluan resmi.</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={graduation} alt="Graduation photo of a person in a cap and gown" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Graduation Photo</h3>
              <p className="text-gray-600 mb-4">Abadikan momen kelulusan Anda dengan foto terbaik yang akan dikenang selamanya.</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={family} alt="Family photo of a group of people posing together" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Family Photo</h3>
              <p className="text-gray-600 mb-4">Rekam kebersamaan keluarga Anda dengan foto yang penuh cinta.</p>
              <p>&nbsp;</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <img src={product} alt="Product photo of a bottle" className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-xl font-bold">Product Photo</h3>
              <p className="text-gray-600 mb-4">Tingkatkan penjualan Anda dengan foto produk yang menarik dan berkualitas tinggi.</p>
              <button className="text-red-500 font-bold">Buka Gallery <i className="fas fa-arrow-right"></i></button>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#D7C1B3] py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-gray-600">Houze Studio berkomitmen memberikan layanan fotografi berkualitas dengan harga yang terjangkau. Kami menjaga kepuasan pelanggan dengan memberikan hasil terbaik untuk setiap momen yang Anda abadikan. Hubungi kami untuk konsultasi yang lebih lanjut.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-600"><i className="fas fa-phone-alt"></i> (0341) 435-2730</p>
            <p className="text-gray-600"><i className="fas fa-map-marker-alt"></i> Jl. Ahmad Yani, Ruko Tanjlig No. 5, Karangjengkol, Sokanegara, Kec Purwokerto Tim, Karangjengkol, Sokanegara, Purwokerto Barat, Banyumas Regency, Central Java 53131</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Find Us</h3>
            <p className="text-gray-600"><i className="fab fa-instagram"></i> @houzestudio</p>
          </div>
        </div>
      </footer>
    </div>
  );
};