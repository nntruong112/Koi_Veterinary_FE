import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { path } from "../../../../utils/constant";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

const HealthRecordPage = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetching veterinarianId from Redux store

  const location = useLocation();
  const fishId = location.state?.fishId; // Get fishId from state
  console.log(fishId);
  // Function to fetch health records based on fishId
  const fetchHealthRecords = async (fishId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/health_records/belonged_to_fishId/${fishId}`
      );
      setHealthRecords(response.data);
    } catch (err) {
      setError(
        "This fish does not have health records, please booking appointment for this fish to have health record from us. Thank you."
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCloseClick = () => {
    navigate(`${path.MEMBER}/${path.FISH}`);
  };

  useEffect(() => {
    if (fishId) {
      fetchHealthRecords(fishId);
    }
  }, [fishId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-end">
        <button
          onClick={handleCloseClick}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-2 "
        >
          <AiOutlineClose />
        </button>
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">
        Fish Health Records
      </h1>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Record ID</th>
            <th className="border border-gray-300 px-4 py-2">Creation Date</th>
            <th className="border border-gray-300 px-4 py-2">Diagnosis</th>
            <th className="border border-gray-300 px-4 py-2">Treatment</th>
            <th className="border border-gray-300 px-4 py-2">Veterinarian</th>
          </tr>
        </thead>
        <tbody>
          {healthRecords.map((record) => (
            <tr key={record.healthRecordId} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {record.healthRecordId}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.createdDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.diagnosis}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {record.treatment}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {record.veterinarianId?.veterinarian.username || "Unknown"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default HealthRecordPage;
