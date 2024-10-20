// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const HealthRecordPage = () => {
//   const { fishId } = useParams(); // Get fishId
//   const [healthRecords, setHealthRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHealthRecords = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/health-records/fish/${fishId}`
//         ); //enpoing backend a may chu
//         setHealthRecords(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHealthRecords();
//   }, [fishId]);

//   if (loading) return <p>Loading health records...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-semibold mb-4">
//         Health Records for Fish ID: {fishId}
//       </h2>
//       {healthRecords.length === 0 ? (
//         <p>No health records available for this fish.</p>
//       ) : (
//         <div className="space-y-6">
//           {healthRecords.map((record) => (
//             <div
//               key={record.healthRecordId}
//               className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
//             >
//               <p>
//                 <strong>Date:</strong> {record.createdDate}
//               </p>
//               <p>
//                 <strong>Diagnosis:</strong> {record.diagnosis}
//               </p>
//               <p>
//                 <strong>Treatment:</strong> {record.treatment}
//               </p>
//               <p>
//                 <strong>Fish Species:</strong> {record.fish.species}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default HealthRecordPage;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const HealthRecordPage = () => {
//   const [healthRecords, setHealthRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const token = useSelector((state) => state.auth.data?.token);
//   const fishId = useSelector((state) => state.users.data?.fishId); // Ensure fishId is being retrieved correctly

//   useEffect(() => {
//     const fetchHealthRecords = async () => {
//       if (fishId) {
//         // Check if fishId is available
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/health_records/belonged_to_fishId/${fishId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setHealthRecords(response.data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setLoading(false);
//         }
//       } else {
//         setLoading(false);
//         setError("Fish ID is not available.");
//       }
//     };

//     fetchHealthRecords();
//   }, [fishId, token]);

//   const handleDelete = async (healthRecordId) => {
//     try {
//       await axios.delete(
//         `http://localhost:8080/health_records/${healthRecordId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setHealthRecords(
//         healthRecords.filter(
//           (record) => record.healthRecordId !== healthRecordId
//         )
//       );
//       alert("Health Record Deleted");
//     } catch (error) {
//       console.error("Error deleting health record:", error);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-12 text-lg font-light">
//         Loading health records...
//       </p>
//     );

//   if (error)
//     return (
//       <p className="text-center text-red-500 font-semibold">Error: {error}</p>
//     );

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium border-b">My Health Records</p>
//       <div>
//         {healthRecords.map((record) => (
//           <div
//             className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md transition-transform transform hover:scale-105"
//             key={record.healthRecordId}
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center">
//               <div className="flex-1 text-gray-700">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
//                   <p>
//                     <strong>Health Record ID:</strong> {record.healthRecordId}
//                   </p>
//                   <p>
//                     <strong>Date:</strong> {record.recordDate}
//                   </p>
//                   <p>
//                     <strong>Condition:</strong> {record.condition}
//                   </p>
//                   <p>
//                     <strong>Diagnosis:</strong> {record.diagnosis}
//                   </p>
//                   <p>
//                     <strong>Treatment:</strong> {record.treatment}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-3 mt-4">
//               <button
//                 className="py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
//                 onClick={() => handleDelete(record.healthRecordId)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HealthRecordPage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const HealthRecordPage = () => {
  const [fishList, setFishList] = useState([]); // List of all fish
  const [selectedFishId, setSelectedFishId] = useState(""); // Selected fish ID
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // Success message after form submission

  // Retrieve the logged-in user's data
  const token = useSelector((state) => state.auth.data?.token);
  const veterinarianId = useSelector((state) => state.auth.data?.user?.id); // Assuming user ID is stored here

  // Fetch list of all fish
  useEffect(() => {
    const fetchFish = async () => {
      try {
        const response = await axios.get("http://localhost:8080/fishes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFishList(response.data); // Store fish list in state
      } catch (err) {
        setError("Failed to fetch fish list");
      }
    };

    fetchFish();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFishId || !diagnosis || !treatment) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccessMessage(""); // Clear any previous success message

    try {
      const response = await axios.post(
        "http://localhost:8080/health_records/create",
        {
          fishId: selectedFishId,
          diagnosis: diagnosis,
          treatment: treatment,
          createdDate: new Date().toISOString().split("T")[0], // Get current date
          veterinarianId: veterinarianId, // Include the logged-in user's ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage("Health record created successfully!");
    } catch (error) {
      setError("Error creating health record.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Health Record</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Fish Selector */}
        <div>
          <label className="block font-medium mb-2">Select Fish:</label>
          <select
            className="border border-gray-300 p-2 rounded-md w-full"
            value={selectedFishId}
            onChange={(e) => setSelectedFishId(e.target.value)}
            required
          >
            <option value="">-- Select Fish --</option>
            {fishList.map((fish) => (
              <option key={fish.fishId} value={fish.fishId}>
                {fish.name} ({fish.species})
              </option>
            ))}
          </select>
        </div>

        {/* Diagnosis Input */}
        <div>
          <label className="block font-medium mb-2">Diagnosis:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>

        {/* Treatment Input */}
        <div>
          <label className="block font-medium mb-2">Treatment:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Health Record"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HealthRecordPage;
