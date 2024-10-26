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

import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentByUserId } from "../../../../services/userService";
import { unwrapResult } from "@reduxjs/toolkit";
import { path } from "../../../../utils/constant";
import { FaArrowLeft } from "react-icons/fa6";
import ClipLoader from "react-spinners/ClipLoader";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../../../redux/slices/userSlice";

const MyAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedAppointment = useSelector(
    (state) => state.users.data.selectedAppointment
  );
  const [isOutletOpen, setIsOutletOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const appointmentList =
    useSelector((state) => state.users.data.myAppointment) || [];

  useEffect(() => {
    const appointmentListAction = dispatch(getAppointmentByUserId());
    unwrapResult(appointmentListAction);
  }, [dispatch]);

  const handleViewDetail = (appointment) => {
    dispatch(setSelectedAppointment(appointment));
    setIsOutletOpen(false);
  };

  const handleBackToList = () => {
    dispatch(clearSelectedAppointment());
    setIsOutletOpen(false);
    setIsLoading(false);
  };

  const handlePay = () => {
    setIsOutletOpen(true);
    setIsLoading(true);
    navigate(path.PAYMENT_PAGE, {
      state: { selectedAppointment: selectedAppointment },
    });
  };
  const handlePayDetails = () => {
    setIsOutletOpen(true);
    setIsLoading(true);
    navigate(path.PAYMENT_DETAILS, {
      state: { selectedAppointment: selectedAppointment },
    });
  };

  if (selectedAppointment) {
    return (
      <div className="p-5">
        <div className="flex items-center gap-10">
          <FaArrowLeft
            onClick={handleBackToList}
            className="text-2xl mb-2 hover:text-primary cursor-pointer"
          />
          <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
        </div>

        <div className="flex items-center justify-between w-full border rounded-xl p-5 shadow-lg  text-lg bg-white">
          <div className="grid grid-cols-3 gap-y-5 w-4/5">
            <p>
              <strong>Date: </strong> {selectedAppointment.appointmentDate}
            </p>
            <p>
              <strong>Service: </strong>
              {selectedAppointment.appointmentType?.appointmentService}
            </p>
            <p>
              <strong>Location: </strong> {selectedAppointment.location}
            </p>
            <p>
              <strong>Start Time: </strong> {selectedAppointment.startTime}
            </p>
            <p>
              <strong>End Time: </strong> {selectedAppointment.endTime}
            </p>
            <p>
              <strong>Status: </strong> {selectedAppointment.status}
            </p>
            <p>
              <strong>Veterinarian: </strong>
              {`${selectedAppointment.veterinarian?.firstname} ${selectedAppointment.veterinarian?.lastname}`}
            </p>
            <p>
              <strong>Fish:</strong> {selectedAppointment.fish?.species}
            </p>
            <p>
              <strong>Payment status: </strong>
              {selectedAppointment?.paymentStatus}
            </p>
          </div>

          <div className="flex flex-col w-1/5">
            <button
              onClick={handlePay}
              className="mt-4 mr-4 px-4 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90"
            >
              {isLoading ? (
                <ClipLoader size={20} color={"#ffffff"} loading={isLoading} />
              ) : (
                "Pay"
              )}
            </button>
            <button className="mt-4 mr-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-600/80">
              Cancel
            </button>
          </div>
        </div>

        {isOutletOpen && <Outlet />}
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto rounded-2xl p-5">
      <table className="w-full text-base text-left bg-white text-gray-500 dark:text-gray-400 overflow-y-scroll shadow-lg rounded-2xl table-auto">
        <thead className="text-sm text-gray-700 uppercase dark:text-gray-400 border-b bg-gray-200">
          <tr>
            <th className="px-3 py-3 rounded-tl-2xl">Date</th>
            <th className="px-3 py-3">Service</th>
            <th className="px-3 py-3">Location</th>
            <th className="px-3 py-3">Start time</th>
            <th className="px-3 py-3">End time</th>
            <th className="px-3 py-3">Status</th>
            <th className="px-3 py-3">Payment status</th>
            <th className="px-3 py-3 rounded-tr-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.map((appointment) => (
            <tr
              key={appointment.appointmentId}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-3 py-4 whitespace-normal">
                {appointment.appointmentDate}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment?.appointmentType?.appointmentService}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.location}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.startTime}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.endTime}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                {appointment.status}
              </td>
              <td className="px-3 py-4 whitespace-normal">
                <p
                  className={`w-16 rounded-full text-white p-2 text-sm text-center ml-5 ${
                    appointment.paymentStatus === "unpaid"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {appointment.paymentStatus}
                </p>
              </td>

              <td className="px-3 py-4 whitespace-normal">
                {appointment.paymentStatus !== "paid" && (
                  <button
                    onClick={() => handleViewDetail(appointment)}
                    className="bg-primary rounded-full p-2 text-white hover:bg-primary/90"
                  >
                    View detail
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
