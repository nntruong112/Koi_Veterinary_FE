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
// import { useLocation } from "react-router-dom";

// const HealthRecordPage = () => {
//   const location = useLocation();
//   const appointmentP = location.state?.selectedAppointment; // Lấy thông tin cuộc hẹn
//   const fishId = appointmentP?.fishId;

//   const [fishList, setFishList] = useState([]); // Danh sách tất cả các cá
//   const [selectedFishId, setSelectedFishId] = useState(fishId || ""); // Mã cá đã chọn
//   const [diagnosis, setDiagnosis] = useState("");
//   const [treatment, setTreatment] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Lấy thông tin người dùng đang đăng nhập
//   const token = useSelector((state) => state.auth.data?.token);
//   const veterinarianId = useSelector(
//     (state) => state.users.data?.result?.userId
//   );

//   // Fetch danh sách các cá
//   useEffect(() => {
//     const fetchFish = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/fishes", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setFishList(response.data); // Lưu danh sách cá vào state
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
//       // Tạo request theo HealthRecordCreationRequest từ backend
//       await axios.post(
//         "http://localhost:8080/health_records/create",
//         {
//           healthRecordId: null, // Sử dụng null vì healthRecordId có thể được backend tự động tạo
//           createdDate: new Date().toISOString().split("T")[0],
//           diagnosis: diagnosis,
//           treatment: treatment,
//           fishId: selectedFishId,
//           veterinarianId: veterinarianId,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Hiển thị thông báo thành công
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
//         {/* Chọn cá */}
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
//                 {fish.name} ({fish.species}) - owned by {fish.customer.username}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Chẩn đoán */}
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

//         {/* Điều trị */}
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

//         {/* Nút submit */}
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

// export default HealthRecordPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateHealthRecord = () => {
  const [fishList, setFishList] = useState([]); // Danh sách cá từ cuộc hẹn
  const [selectedFishId, setSelectedFishId] = useState(null); // Mã cá đã chọn
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Lấy thông tin người dùng đang đăng nhập
  const token = useSelector((state) => state.auth.data?.token);
  const veterinarianId = useSelector(
    (state) => state.users.data?.result?.userId
  );

  // Fetch danh sách cá liên quan đến cuộc hẹn
  useEffect(() => {
    const fetchFishForAppointment = async () => {
      // if (!fishId) {
      //   setError("Không tìm thấy cá nào trong cuộc hẹn.");
      //   return; // Ngừng xử lý nếu không có fishId
      // }

      try {
        const response = await axios.get(
          `http://localhost:8080/fishes/${fishIda}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFishList([response.data]); // Chỉ lấy danh sách cá từ cuộc hẹn
      } catch (err) {
        setError("Failed to fetch fish for appointment");
      }
    };

    fetchFishForAppointment();
  }, [token]);

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
          veterinarianId: veterinarianId,
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
        {/* Chọn cá */}
        <div>
          <label className="block font-medium mb-2">Select Fish:</label>
          <select
            className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={selectedFishId}
            onChange={(e) => setSelectedFishId(e.target.value)}
            required
          >
            <option value="">-- Select Fish --</option>
            {fishList.map((fish) => (
              <option key={fish.fishId} value={fish.fishId}>
                {fish.name} ({fish.species}) - owned by {fish.customer.username}
              </option>
            ))}
          </select>
        </div>

        {/* Chẩn đoán */}
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

        {/* Điều trị */}
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

        {/* Nút submit */}
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
