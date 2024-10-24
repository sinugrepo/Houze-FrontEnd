import { useEffect, useState } from "react";
import axios from "axios";
const DashboardContent = () => {
    const [totalCount, setTotalCount] = useState([]);

    useEffect(() => {
        const fetchTotalCount = async () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/v1/bookings/count',
            withCredentials: true
          };
          
          axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setTotalCount(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
        };
        fetchTotalCount();
    },[])

    return (
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500 text-white p-4 md:p-8 rounded">
            <h2 className="text-sm md:text-lg">Today Total Order</h2>
            <p className="text-2xl md:text-4xl font-bold">{totalCount?.data?.totalBookings || 0}</p>
          </div>
          <div className="bg-yellow-500 text-white p-4 md:p-8 rounded">
            <h2 className="text-sm md:text-lg">Pending Order</h2>
            <p className="text-2xl md:text-4xl font-bold">{totalCount?.data?.pendingBookings || 0}</p>
          </div>
          <div className="bg-green-500 text-white p-4 md:p-8 rounded">
            <h2 className="text-sm md:text-lg">Complete Order</h2>
            <p className="text-2xl md:text-4xl font-bold">{totalCount?.data?.completedBookings || 0}</p>
          </div>
          <div className="bg-red-500 text-white p-4 md:p-8 rounded">
            <h2 className="text-sm md:text-lg">Cancel Order</h2>
            <p className="text-2xl md:text-4xl font-bold">{totalCount?.data?.canceledBookings || 0}</p>
          </div>
        </div>
      );
}

export default DashboardContent;
