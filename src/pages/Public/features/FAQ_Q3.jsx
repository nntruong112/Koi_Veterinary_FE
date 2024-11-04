import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { FaRegQuestionCircle } from "react-icons/fa";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const FAQ_Q3 = () => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => setShowDetails(!showDetails);

  return (
    <>
      <RolesNavbar />

      {/* ------------- FAQ News Style Section ------------ */}
      <section className="max-w-4xl mx-auto py-16 px-4 bg-white">
        <h1 className="text-4xl font-bold mb-6 text-[#071e55] text-left">
          Frequently Asked Questions
        </h1>
        <div className="mb-8 text-gray-600 text-sm">
          <span>Published on November 1, 2024</span>
          <span className="mx-4">|</span>
          <span>Author: Koi Health Center</span>
        </div>

        <article className="border-b pb-8 mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            What water conditions do koi need?
          </h2>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaRegQuestionCircle className="mr-2 text-blue-500" />
            <span>Koi Habitat</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Maintaining optimal water conditions is essential for the health and
            well-being of your koi. Here are the key factors to consider.
          </p>
          <button
            onClick={handleToggleDetails}
            className="mt-4 text-blue-600 hover:underline focus:outline-none"
          >
            {showDetails
              ? "Hide Detailed Water Conditions"
              : "Read Full Article"}
          </button>

          {showDetails && (
            <div className="mt-6 text-gray-700">
              <h3 className="text-2xl font-semibold mb-4">
                Ideal Water Conditions
              </h3>

              <h4 className="text-xl font-semibold mt-6">1. Temperature</h4>
              <p className="leading-relaxed">
                Koi thrive in water temperatures between 15°C to 25°C (59°F to
                77°F). Extreme temperatures can stress koi, so monitor the water
                temperature closely.
              </p>

              <h4 className="text-xl font-semibold mt-6">2. pH Level</h4>
              <p className="leading-relaxed">
                The ideal pH range for koi is between 7.0 and 8.5. Regularly
                test the pH level and make adjustments if necessary to prevent
                stress and health issues.
              </p>

              <h4 className="text-xl font-semibold mt-6">
                3. Ammonia and Nitrites
              </h4>
              <p className="leading-relaxed">
                Ammonia and nitrite levels should be kept at 0 ppm (parts per
                million) to avoid toxic conditions. Perform regular water
                changes and monitor these levels.
              </p>

              <h4 className="text-xl font-semibold mt-6">4. Nitrates</h4>
              <p className="leading-relaxed">
                Nitrate levels should be below 40 ppm for optimal health. Use
                aquatic plants or regular water changes to help manage nitrate
                levels.
              </p>

              <h4 className="text-xl font-semibold mt-6">5. Hardness</h4>
              <p className="leading-relaxed">
                Water hardness (GH) should ideally be between 100 to 200 ppm.
                This helps maintain good health and prevents stress in koi.
              </p>

              <h4 className="text-xl font-semibold mt-4">Additional Tips</h4>
              <ul className="list-disc list-inside">
                <li>
                  Use a quality water testing kit to monitor water conditions
                  regularly.
                </li>
                <li>
                  Consider using a good filtration system to maintain clean
                  water.
                </li>
                <li>
                  Introduce beneficial bacteria to help establish a healthy
                  ecosystem.
                </li>
                <li>
                  Perform regular water changes to maintain overall water
                  quality.
                </li>
              </ul>
            </div>
          )}
        </article>
      </section>

      <Footer />
    </>
  );
};

export default FAQ_Q3;
