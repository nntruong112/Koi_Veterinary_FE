import React from "react";
import Footer from "../../../components/Footer";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { Link } from "react-router-dom";
import Q1 from "./FAQ_Q1";

const Features = () => {
  return (
    <>
      <RolesNavbar />

      {/* ------------- FAQ SECTION ------------ */}
      <section className="text-center py-16 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
        <h1 className="text-5xl font-extrabold mb-16 text-[#071e55]">
          Frequently Asked Questions
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Question 1 */}
          <Link
            to="/q1"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <FaRegQuestionCircle className="text-6xl text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What are common koi diseases and treatments?
            </h2>
            <p className="text-lg text-gray-600">
              Diseases like Ich, fin rot, and koi herpesvirus (KHV) can affect
              koi. Treatments include salt baths, antibacterial medications, and
              maintaining clean water. KHV prevention is crucial through
              quarantine and vaccination.
            </p>
          </Link>

          {/* Question 2 */}
          <Link
            to="/q2"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <AiOutlineInfoCircle className="text-6xl text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How can I tell if my koi is sick?
            </h2>
            <p className="text-lg text-gray-600">
              Signs include lethargy, loss of appetite, abnormal swimming, and
              visible spots or sores. Test water quality and consult a vet if
              needed.
            </p>
          </Link>

          {/* Continue with the same pattern for the remaining questions */}
          {/* Question 3 */}
          <Link
            to="/q3"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <IoMdHelpCircleOutline className="text-6xl text-red-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What water conditions do koi need?
            </h2>
            <p className="text-lg text-gray-600">
              Ideal conditions: pH 7.0-8.5, ammonia 0 ppm, nitrite 0 ppm,
              nitrate below 40 ppm, temperature 65-75°F (18-24°C). Regular
              testing and water maintenance are essential.
            </p>
          </Link>

          {/* Question 4 */}
          <Link
            to="/q4"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <FaRegQuestionCircle className="text-6xl text-green-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              How often should I feed my koi?
            </h2>
            <p className="text-lg text-gray-600">
              Feed once or twice daily with high-quality pellets, adjusting for
              water temperature and activity levels. Avoid overfeeding to keep
              the water clean.
            </p>
          </Link>

          {/* Question 5 */}
          <Link
            to="/faq/fish-types"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <AiOutlineInfoCircle className="text-6xl text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What types of fish do you work with?
            </h2>
            <p className="text-lg text-gray-600">
              We work with ALL types of fish, from tiny bettas to enormous koi.
              Our office is equipped to work on all fish species, even those
              with sharp teeth and pointy spines!
            </p>
          </Link>

          {/* Question 6 */}
          <Link
            to="/faq/service-charges"
            className="flex flex-col items-center text-left p-8 shadow-lg bg-white rounded-lg transform transition-transform hover:scale-105"
          >
            <IoMdHelpCircleOutline className="text-6xl text-red-600 mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              What do you charge for your services?
            </h2>
            <p className="text-lg text-gray-600">
              Please{" "}
              <a
                className="font-bold text-blue-600 hover:underline"
                href="http://localhost:5173/contact"
              >
                contact us
              </a>{" "}
              for more information. Estimates are available on request.
            </p>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Features;
