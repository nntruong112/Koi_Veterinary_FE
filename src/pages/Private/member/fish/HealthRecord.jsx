import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { path } from "../../../../utils/constant";

const HealthRecordPage = () => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const fishId = location.state?.fishId;

  const fetchHealthRecords = async (fishId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/health_records/belonged_to_fishId/${fishId}`
      );
      console.log(response.data);
      if (response.data && response.data.length > 0) {
        setHealthRecords(response.data);
      } else {
        toast.info("No health records found for this fish.");
      }
    } catch (err) {
      toast.error(
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
    } else {
      // Navigate back or handle case when fishId is not provided
      toast.error("No fish selected.");
      setLoading(false);
    }
  }, [fishId]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (healthRecords.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleCloseClick}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-2 transition duration-300 ease-in-out"
          >
            <AiOutlineClose />
          </button>
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Fish Health Records
        </h1>
        <p className="text-center text-gray-700">
          No health records found for this fish.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCloseClick}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-2 transition duration-300 ease-in-out"
          data-testid="close-button"
        >
          <AiOutlineClose />
        </button>
      </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Fish Health Records
      </h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
              Creation Date
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
              Diagnosis
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
              Treatment
            </th>
            <th className="border-b border-gray-300 px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
              Medicine
            </th>
          </tr>
        </thead>
        <tbody>
          {healthRecords.map((record) => (
            <tr
              key={record.healthRecordId}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700">
                {record.createdDate}
              </td>
              <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700">
                {record.diagnosis}
              </td>
              <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700">
                {record.treatment}
              </td>
              <td className="border-b border-gray-300 px-6 py-4 text-sm text-gray-700">
                {record.medicine || "None"}
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
