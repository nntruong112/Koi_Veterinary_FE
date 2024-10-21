// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import AppointmentList from "../../admin/appointmentList/AppointmentList";

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Assuming appointmentTypeId is the correct identifier for the API call
//   const appointmentP = location.state?.selectedAppointment;
//   const appointmentTypeId = appointmentP.appointmentId;
//   console.log(appointmentP);
//   console.log(appointmentTypeId);

//   const [invoice, setInvoice] = useState({
//     total: "0",
//     discount: "0",
//     paymentStatus: "pending", // Default status
//     paymentMethod: "VnPay",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch Appointment Type Price
//   useEffect(() => {
//     const fetchAppointmentType = async () => {
//       try {
//         // Fetch the appointment type using the correct appointmentTypeId
//         const response = await axios.get(
//           `http://localhost:8080/appointment-types/${appointmentTypeId}`
//         );
//         const appointmentType = response.data;

//         // Set the total if the price is available
//         if (appointmentType && appointmentType.price) {
//           setInvoice((prev) => ({
//             ...prev,
//             total: Number(appointmentType.price),
//           }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch appointment type:", error);
//         setError("Failed to fetch appointment type. Please try again.");
//       }
//     };

//     if (appointmentTypeId) {
//       fetchAppointmentType();
//     }
//   }, [appointmentTypeId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInvoice({ ...invoice, [name]: value });
//   };

//   const handleCreateInvoice = async () => {
//     if (!invoice.total || !invoice.paymentMethod) {
//       alert("Please enter the total amount and payment method!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `http://localhost:8080/invoices/create`,
//         {
//           ...invoice,
//           appointmentTypeId, // Make sure to pass the correct ID
//         }
//       );
//       alert("Invoice created successfully!");
//       navigate("/some-success-page"); // Redirect after successful creation
//     } catch (error) {
//       console.error("Failed to create invoice:", error);
//       setError("Failed to create invoice. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payment-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
//         Create Invoice
//       </h1>

//       {error && (
//         <p className="text-center text-red-500 font-semibold">{error}</p>
//       )}

//       <div className="invoice-creation mb-10">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6">
//           Enter Invoice Details
//         </h2>

//         <label className="block text-gray-600 mb-3">
//           <strong>Total Amount:</strong>
//           <input
//             type="number"
//             name="total"
//             value={appointmentP.appointmentType?.price}
//             onChange={handleInputChange}
//             className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Enter total amount"
//             readOnly // Make this read-only since it gets the value from the API
//           />
//         </label>

//         <label className="block text-gray-600 mb-3">
//           <strong>Discount:</strong>
//           <input
//             type="number"
//             name="discount"
//             value={invoice.discount}
//             disabled
//             onChange={handleInputChange}
//             className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
//             placeholder="Enter discount"
//           />
//         </label>

//         <div className="flex justify-end">
//           <button
//             onClick={handleCreateInvoice}
//             className="py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
//             disabled={loading}
//           >
//             {loading ? "Creating Invoice..." : "Create Invoice"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";

// // const PaymentPage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const appointmentId =
// //     location.state?.appointmentId ||
// //     useSelector((state) => state.users.data?.result?.appointmentId);

// //   const [invoice, setInvoice] = useState({
// //     total: "0",
// //     discount: 0,
// //     paymentStatus: "pending", // Default status
// //     paymentMethod: "VnPay",
// //   });

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setInvoice({ ...invoice, [name]: value });
// //   };

// //   const handleCreateInvoice = async () => {
// //     if (!invoice.total || !invoice.paymentMethod) {
// //       alert("Please enter the total amount and payment method!");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const response = await axios.post(
// //         `http://localhost:8080/invoices/create`,
// //         {
// //           ...invoice,
// //           appointmentId,
// //         }
// //       );
// //       alert("Invoice created successfully!");
// //     } catch (error) {
// //       console.error("Failed to create invoice:", error);
// //       setError("Failed to create invoice. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="payment-page w-full mx-auto p-10 bg-white shadow-xl rounded-xl my-10 border">
// //       <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
// //         Create Invoice
// //       </h1>

// //       {error && (
// //         <p className="text-center text-red-500 font-semibold">{error}</p>
// //       )}

// //       <div className="invoice-creation mb-10">
// //         <h2 className="text-2xl font-semibold text-gray-700 mb-6">
// //           Enter Invoice Details
// //         </h2>

// //         <label className="block text-gray-600 mb-3">
// //           <strong>Total Amount:</strong>
// //           <input
// //             type="number"
// //             name="total"
// //             value={invoice.total}
// //             onChange={handleInputChange}
// //             className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
// //             placeholder="Enter total amount"
// //           />
// //         </label>

// //         <label className="block text-gray-600 mb-3">
// //           <strong>Discount:</strong>
// //           <input
// //             type="number"
// //             name="discount"
// //             value={invoice.discount}
// //             onChange={handleInputChange}
// //             className="p-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
// //             placeholder="Enter discount"
// //           />
// //         </label>

// //         <div className="flex justify-end">
// //           <button
// //             onClick={handleCreateInvoice}
// //             className="py-4 px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 ease-in-out"
// //             disabled={loading}
// //           >
// //             {loading ? "Creating Invoice..." : "Create Invoice"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PaymentPage;
// // //
