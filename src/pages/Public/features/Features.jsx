// import React from "react";
// import Footer from "../../../components/Footer";
// import { IoMdHelpCircleOutline } from "react-icons/io";
// import { FaRegQuestionCircle } from "react-icons/fa";
// import { AiOutlineInfoCircle } from "react-icons/ai";
// import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

// const Features = () => {
//   return (
//     <>
//       <RolesNavbar />

//       {/* ------------- FAQ SECTION ------------ */}
//       <section className="text-center py-16 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
//         <h1 className="text-5xl font-extrabold mb-16 text-[#071e55]">
//           Frequently Asked Questions
//         </h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
//           {/* Question 1 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <FaRegQuestionCircle className="text-6xl text-green-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               What are common koi diseases and treatments?
//             </h2>
//             <p className="text-lg text-gray-600">
//               Diseases like Ich, fin rot, and koi herpesvirus (KHV) can affect
//               koi. Treatments include salt baths, antibacterial medications, and
//               maintaining clean water. KHV prevention is crucial through
//               quarantine and vaccination.
//             </p>
//           </div>

//           {/* Question 2 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <AiOutlineInfoCircle className="text-6xl text-blue-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               How can I tell if my koi is sick?
//             </h2>
//             <p className="text-lg text-gray-600">
//               Signs include lethargy, loss of appetite, abnormal swimming, and
//               visible spots or sores. Test water quality and consult a vet if
//               needed.
//             </p>
//           </div>

//           {/* Question 3 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <IoMdHelpCircleOutline className="text-6xl text-red-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               What water conditions do koi need?
//             </h2>
//             <p className="text-lg text-gray-600">
//               Ideal conditions: pH 7.0-8.5, ammonia 0 ppm, nitrite 0 ppm,
//               nitrate below 40 ppm, temperature 65-75°F (18-24°C). Regular
//               testing and water maintenance are essential.
//             </p>
//           </div>

//           {/* Question 4 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <FaRegQuestionCircle className="text-6xl text-green-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               How often should I feed my koi?
//             </h2>
//             <p className="text-lg text-gray-600">
//               Feed once or twice daily with high-quality pellets, adjusting for
//               water temperature and activity levels. Avoid overfeeding to keep
//               the water clean.
//             </p>
//           </div>

//           {/* Question 5 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <AiOutlineInfoCircle className="text-6xl text-blue-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               What types of fish do you work with?
//             </h2>
//             <p className="text-lg text-gray-600">
//               We work with ALL types of fish, from tiny bettas to enormous koi.
//               Our office is equipped to work on all fish species, even those
//               with sharp teeth and pointy spines!
//             </p>
//           </div>

//           {/* Question 6 */}
//           <div className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105">
//             <IoMdHelpCircleOutline className="text-6xl text-red-600 mb-4" />
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">
//               What do you charge for your services?
//             </h2>
//             <p className="text-lg text-gray-600">
//               Please{" "}
//               <a
//                 className="font-bold text-blue-600 hover:underline"
//                 href="http://localhost:5173/contact"
//               >
//                 contact us
//               </a>{" "}
//               for more information. Estimates are available on request.
//             </p>
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default Features;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Sử dụng useParams để lấy appointmentId từ URL
import { useSelector } from "react-redux";

const Features = () => {
  // const { appointmentId } = useParams(); // Lấy appointmentId từ URL
  const [invoice, setInvoice] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const appointmentId = useSelector((state) => state.booking.data);
  console.log(appointmentId);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/payments/${appointmentId}`
        );
        setInvoice(response.data);
      } catch (err) {
        setError("Error fetching invoice.");
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [appointmentId]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please choose a payment method!");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/payments`, {
        appointmentId,
        paymentMethod,
      });
      alert("Payment successful!");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed! Please try again.");
    }
  };

  if (loading) {
    return <p>Loading invoice...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!invoice) {
    return <p>No invoice found.</p>;
  }

  return (
    <div className="payment-page w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Invoice Payment</h1>
      <div className="invoice-details mb-6">
        {/* <h2 className="text-lg font-medium">Invoice ID: {invoice.invoiceId}</h2>
        <p>Total Amount: ${invoice.total}</p>
        <p>Discount: ${invoice.discount}</p>
        <p>Final Amount: ${(invoice.total - invoice.discount).toFixed(2)}</p>
        <p>Payment Status: {invoice.paymentStatus}</p> */}
      </div>

      <div className="payment-method mb-6">
        <h3 className="text-lg font-medium mb-2">Choose Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-lg w-full"
        >
          <option value="">Select Payment Method</option>
          <option value="credit_card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bank_transfer">Bank Transfer</option>
        </select>
      </div>

      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Features;
