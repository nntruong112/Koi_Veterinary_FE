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
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const CreateHealthRecord = () => {
//   const vetId = useSelector((state) => state.users.data?.result?.userId);
//   const [fishList, setFishList] = useState([]);
//   const [selectedFishId, setSelectedFishId] = useState("");
//   const [diagnosis, setDiagnosis] = useState("");
//   const [treatment, setTreatment] = useState("");
//   const [selectedMedicine, setSelectedMedicine] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const token = useSelector((state) => state.auth.data?.token);

//   // Danh sách thuốc có sẵn tự tạo bên FE
//   const medicineOptions = [
//     { id: 1, name: "Antibiotic A" },
//     { id: 2, name: "Antibiotic B" },
//     { id: 3, name: "Vitamin C" },
//     // Thêm các loại thuốc khác nếu cần
//   ];

//   // Fetch fish species and customer username
//   useEffect(() => {
//     const fetchFishDetails = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/appointments/belonged_to_vetId/${vetId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         const fishDetails = response.data.map((appointment) => ({
//           fishId: appointment.fish.fishId,
//           species: appointment.fish.species,
//           customerUsername: appointment.customer.username,
//         }));

//         setFishList(fishDetails); // Lưu thông tin cá
//       } catch (err) {
//         setError("Failed to fetch fish list for appointments.");
//       }
//     };

//     fetchFishDetails();
//   }, [vetId, token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFishId || !diagnosis || !selectedMedicine || !treatment) {
//       setError("Please fill in all fields.");
//       return;
//     }
//     setLoading(true);
//     setError(null);

//     try {
//       await axios.post(
//         "http://localhost:8080/health_records/create",
//         {
//           healthRecordId: null,
//           createdDate: new Date().toISOString().split("T")[0],
//           diagnosis,
//           medicine: selectedMedicine,
//           treatment,
//           fishId: selectedFishId,
//           veterinarianId: vetId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success("Health record created successfully!");
//     } catch (error) {
//       setError("Error creating health record.");
//       console.error("Error:", error);
//     } finally {
//       setLoading(false);
//       // Reset các field sau khi submit
//       setSelectedFishId("");
//       setDiagnosis("");
//       setTreatment("");
//       setSelectedMedicine("");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
//       <h1 className="text-2xl font-bold text-center mb-4">
//         Create Health Record
//       </h1>

//       {error && <p className="text-red-500 mb-4">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-2">Select Fish:</label>
//           <select
//             className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={selectedFishId}
//             onChange={(e) => setSelectedFishId(e.target.value)}
//             required
//           >
//             <option value="">-- Select Fish to Create--</option>
//             {fishList.map((fish) => (
//               <option key={fish.fishId} value={fish.fishId}>
//                 {fish.species} - owned by {fish.customerUsername}
//               </option>
//             ))}
//           </select>
//         </div>

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

//         <div>
//           <label className="block font-medium mb-2">Select Medicine:</label>
//           <select
//             className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//             value={selectedMedicine}
//             onChange={(e) => setSelectedMedicine(e.target.value)}
//             required
//           >
//             <option value="">-- Select Medicine --</option>
//             {medicineOptions.map((medicine) => (
//               <option key={medicine.id} value={medicine.name}>
//                 {medicine.name}
//               </option>
//             ))}
//           </select>
//         </div>

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
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateHealthRecord;
// src/pages/Private/vet/healthRecord/CreateHealthRecord.jsx
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
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.auth.data?.token);

  // Danh sách thuốc có sẵn tự tạo bên FE
  const medicineOptions = [
    { id: 1, name: "Antibiotic A" },
    { id: 2, name: "Antibiotic B" },
    { id: 3, name: "Vitamin C" },
  ];

  // Fetch fish species and customer username
  useEffect(() => {
    const fetchFishDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/belonged_to_vetId/${vetId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fishDetails = response.data.map((appointment) => ({
          fishId: appointment.fish.fishId,
          species: appointment.fish.species,
          customerUsername: appointment.customer.username,
        }));

        setFishList(fishDetails); // Lưu thông tin cá
      } catch (err) {
        setError("Failed to fetch fish list for appointments.");
      }
    };

    fetchFishDetails();
  }, [vetId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFishId || !diagnosis || !selectedMedicine || !treatment) {
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
          diagnosis,
          medicine: selectedMedicine,
          treatment,
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
      // Reset các field sau khi submit
      setSelectedFishId("");
      setDiagnosis("");
      setTreatment("");
      setSelectedMedicine("");
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
          <label htmlFor="fish-select" className="block font-medium mb-2">
            Select Fish:
          </label>
          <select
            id="fish-select" // Thêm id cho select
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={selectedFishId}
            onChange={(e) => setSelectedFishId(e.target.value)}
            required
          >
            <option value="">-- Select Fish to Create--</option>
            {fishList.map((fish) => (
              <option key={fish.fishId} value={fish.fishId}>
                {fish.species} - owned by {fish.customerUsername}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="diagnosis-input" className="block font-medium mb-2">
            Diagnosis:
          </label>
          <input
            id="diagnosis-input" // Thêm id cho input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="treatment-input" className="block font-medium mb-2">
            Treatment:
          </label>
          <input
            id="treatment-input" // Thêm id cho input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="medicine-select" className="block font-medium mb-2">
            Select Medicine:
          </label>
          <select
            id="medicine-select" // Thêm id cho select
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            required
          >
            <option value="">-- Select Medicine --</option>
            {medicineOptions.map((medicine) => (
              <option key={medicine.id} value={medicine.name}>
                {medicine.name}
              </option>
            ))}
          </select>
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
