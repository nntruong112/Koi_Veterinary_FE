// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const MyAppointment = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/appointments");
//         setAppointments(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAppointments();
//   }, []);

//   const handlePay = async (appointmentId) => {
//     try {
//       await axios.put(`http://localhost:8080/appointments/${appointmentId}`, {
//         status: "Paid",
//       });
//       alert("Payment Successful"); // Display alert first
//       // Redirect to the payment page with appointmentId
//       Navigate(`/pay/${appointmentId}`);
//     } catch (error) {
//       console.error("Error making payment:", error);
//     }
//   };

//   const handleCancel = async (appointmentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);
//       setAppointments(
//         appointments.filter((app) => app.appointmentId !== appointmentId)
//       );
//       alert("Appointment Canceled");
//     } catch (error) {
//       console.error("Error cancelling appointment:", error);
//     }
//   };
//   if (loading)
//     return (
//       <p className="text-center mt-12 text-lg font-light">
//         Loading appointments...
//       </p>
//     );
//   if (error)
//     return (
//       <p className="text-center text-red-500 font-semibold">Error: {error}</p>
//     );

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium border-b">My Appointments</p>
//       <div>
//         {appointments.map((item) => (
//           <div
//             className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md transition-transform transform hover:scale-105"
//             key={item.appointmentId}
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center">
//               <img
//                 className="w-24 h-24 rounded-full bg-gray-200 object-cover sm:mr-6 mb-4 sm:mb-0"
//                 src={item.image || "defaultImageURL"}
//                 alt="Vet"
//               />
//               <div className="flex-1 text-gray-700">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
//                   {/* <p>
//                     <strong>Appointment ID:</strong> {item.appointmentId}
//                   </p> */}
//                   <p>
//                     <strong>Date:</strong> {item.appointmentDate}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {item.appointmentType}
//                   </p>
//                   <p>
//                     <strong>Status:</strong> {item.status}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {item.startTime} - {item.endTime}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {item.location}
//                   </p>
//                   <p>
//                     <strong>Customer:</strong> {item.userInfo?.username}
//                   </p>
//                   <p>
//                     <strong>Veterinarian:</strong> {item.veterinarian?.name}
//                   </p>
//                   <p>
//                     <strong>Fish:</strong> {item.fish?.species}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-3 mt-4">
//               <button
//                 className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//                 onClick={() => handlePay(item.appointmentId)}
//               >
//                 Pay
//               </button>
//               <button
//                 className="py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
//                 onClick={() => handleCancel(item.appointmentId)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// const MyAppointment = ({ userId }) => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/appointments`, {
//           params: { userId },
//         });
//         setAppointments(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAppointments();
//   }, [userId]);

//   const handlePay = async (appointmentId) => {
//     try {
//       await axios.put(`http://localhost:8080/appointments/${appointmentId}`, {
//         status: "Paid",
//       });
//       alert("Payment Successful");
//       Navigate(`/pay/${appointmentId}`);
//     } catch (error) {
//       console.error("Error making payment:", error);
//     }
//   };

//   const handleCancel = async (appointmentId) => {
//     try {
//       await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);
//       setAppointments(
//         appointments.filter((app) => app.appointmentId !== appointmentId)
//       );
//       alert("Appointment Canceled");
//     } catch (error) {
//       console.error("Error cancelling appointment:", error);
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-12 text-lg font-light">
//         Loading appointments...
//       </p>
//     );
//   if (error)
//     return (
//       <p className="text-center text-red-500 font-semibold">Error: {error}</p>
//     );

//   return (
//     <div>
//       <p className="pb-3 mt-12 font-medium border-b">My Appointments</p>
//       <div>
//         {appointments.map((item) => (
//           <div
//             className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md transition-transform transform hover:scale-105"
//             key={item.appointmentId}
//           >
//             <div className="flex flex-col sm:flex-row items-start sm:items-center">
//               <img
//                 className="w-24 h-24 rounded-full bg-gray-200 object-cover sm:mr-6 mb-4 sm:mb-0"
//                 src={item.image || "defaultImageURL"}
//                 alt="Vet"
//               />
//               <div className="flex-1 text-gray-700">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
//                   <p>
//                     <strong>Date:</strong> {item.appointmentDate}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {item.appointmentType}
//                   </p>
//                   <p>
//                     <strong>Status:</strong> {item.status}
//                   </p>
//                   <p>
//                     <strong>Time:</strong> {item.startTime} - {item.endTime}
//                   </p>
//                   <p>
//                     <strong>Location:</strong> {item.location}
//                   </p>
//                   <p>
//                     <strong>Customer:</strong> {item.userInfo?.username}
//                   </p>
//                   <p>
//                     <strong>Veterinarian:</strong> {item.veterinarian?.name}
//                   </p>
//                   <p>
//                     <strong>Fish:</strong> {item.fish?.species}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex justify-end space-x-3 mt-4">
//               <button
//                 className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
//                 onClick={() => handlePay(item.appointmentId)}
//               >
//                 Pay
//               </button>
//               <button
//                 className="py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
//                 onClick={() => handleCancel(item.appointmentId)}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyAppointment;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useSelector } from "react-redux";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const token = useSelector((state) => state.auth.data?.token);
  const customerId = useSelector((state) => state.users?.data?.result?.userId);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/appointments/belonged_to_customerId/${customerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [customerId]);

  const handlePay = (appointmentId) => {
    // Điều hướng sang PaymentPage
    navigate(`/invoices/${appointmentId}`);
  };

  const handleCancel = async (appointmentId) => {
    try {
      await axios.delete(`http://localhost:8080/appointments/${appointmentId}`);
      setAppointments(
        appointments.filter((app) => app.appointmentId !== appointmentId)
      );
      alert("Appointment Canceled");
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-12 text-lg font-light">
        Loading appointments...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 font-semibold">Error: {error}</p>
    );

  return (
    <div>
      <p className="pb-3 mt-12 font-medium border-b">My Appointments</p>
      <div>
        {appointments.map((item) => (
          <div
            className="p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md transition-transform transform hover:scale-105"
            key={item.appointmentId}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <img
                className="w-24 h-24 rounded-full bg-gray-200 object-cover sm:mr-6 mb-4 sm:mb-0"
                src={item.image || "defaultImageURL"}
                alt="Vet"
              />
              <div className="flex-1 text-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <p>
                    <strong>Date:</strong> {item.appointmentDate}
                  </p>
                  <p>
                    <strong>Type:</strong> {item.appointmentType}
                  </p>
                  <p>
                    <strong>Status:</strong> {item.status}
                  </p>
                  <p>
                    <strong>Time:</strong> {item.startTime} - {item.endTime}
                  </p>
                  <p>
                    <strong>Location:</strong> {item.location}
                  </p>
                  <p>
                    <strong>Customer:</strong> {item.userInfo?.username}
                  </p>
                  <p>
                    <strong>Veterinarian:</strong> {item.veterinarian?.name}
                  </p>
                  <p>
                    <strong>Fish:</strong> {item.fish?.species}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                className="py-2 px-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
                onClick={() => handlePay(item.appointmentId)}
              >
                Pay
              </button>
              <button
                className="py-2 px-4 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors"
                onClick={() => handleCancel(item.appointmentId)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
