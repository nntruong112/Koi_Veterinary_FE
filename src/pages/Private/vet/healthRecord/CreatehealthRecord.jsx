// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify"; // Import Toastify
// import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

// const HealthRecordPage = () => {
//   const [fishList, setFishList] = useState([]); // List of all fish
//   const [selectedFishId, setSelectedFishId] = useState(""); // Selected fish ID
//   const [diagnosis, setDiagnosis] = useState("");
//   const [treatment, setTreatment] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Retrieve the logged-in user's data
//   const token = useSelector((state) => state.auth.data?.token);
//   const veterinarianId = useSelector(
//     (state) => state.users.data?.result?.userId
//   );

//   // Fetch list of all fish
//   useEffect(() => {
//     const fetchFish = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/fishes", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setFishList(response.data); // Store fish list in state
//       } catch (err) {
//         setError("Failed to fetch fish list");
//       }
//     };

//     fetchFish();
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFishId || !diagnosis || !treatment) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post(
//         "http://localhost:8080/health_records/create",
//         {
//           fishId: selectedFishId,
//           diagnosis: diagnosis,
//           treatment: treatment,
//           createdDate: new Date().toISOString().split("T")[0],
//           veterinarianId: veterinarianId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Show success toast notification
//       toast.success("Health record created successfully!");
//     } catch (error) {
//       setError("Error creating health record.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         Create Health Record
//       </h1>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Fish Selector */}
//         <div>
//           <label className="block font-medium mb-2">Select Fish:</label>
//           <select
//             className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={selectedFishId}
//             onChange={(e) => setSelectedFishId(e.target.value)}
//             required
//           >
//             <option value="">-- Select Fish --</option>
//             {fishList.map((fish) => (
//               <option key={fish.fishId} value={fish.fishId}>
//                 {fish.name} ({fish.species})
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Diagnosis Input */}
//         <div>
//           <label className="block font-medium mb-2">Diagnosis:</label>
//           <input
//             type="text"
//             className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={diagnosis}
//             onChange={(e) => setDiagnosis(e.target.value)}
//             required
//           />
//         </div>

//         {/* Treatment Input */}
//         <div>
//           <label className="block font-medium mb-2">Treatment:</label>
//           <input
//             type="text"
//             className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={treatment}
//             onChange={(e) => setTreatment(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit Button */}
//         <div>
//           <button
//             type="submit"
//             className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Create Health Record"}
//           </button>
//         </div>
//       </form>
//       <ToastContainer /> {/* Add ToastContainer to the component */}
//     </div>
//   );
// };
// export default HealthRecordPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateHealthRecord = () => {
  const vetId = useSelector((state) => state.users.data?.result?.userId);
  const [fishList, setFishList] = useState([]);
  const [selectedFishId, setSelectedFishId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.data?.token);

  // Fetch danh sách fishId
  useEffect(() => {
    const fetchFishIds = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/belonged_to_vetId/${vetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const fishIds = response.data.map(
          (appointment) => appointment.fish.fishId
        );
        setFishList(fishIds); // Lưu danh sách fishId vào state
      } catch (err) {
        setError("Failed to fetch fish list for appointments.");
      }
    };

    fetchFishIds();
  }, [vetId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFishId || !diagnosis || !treatment) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await axios.post(
        "http://localhost:8080/health_records/create",
        {
          healthRecordId: null,
          createdDate: new Date().toISOString().split("T")[0],
          diagnosis: diagnosis,
          treatment: treatment,
          fishId: selectedFishId,
          veterinarianId: vetId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Health record created successfully!");
    } catch (error) {
      setError("Error creating health record.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">
        Create Health Record
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-2">Select Fish ID:</label>
          <select
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={selectedFishId}
            onChange={(e) => setSelectedFishId(e.target.value)}
            required
          >
            <option value="">-- Select Fish ID --</option>
            {fishList.map((fishId) => (
              <option key={fishId} value={fishId}>
                {fishId}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Diagnosis:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Treatment:</label>
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Health Record"}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateHealthRecord;
