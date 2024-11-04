import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { FaRegQuestionCircle } from "react-icons/fa";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const FAQ_Q4 = () => {
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
            How often should I feed my koi?
          </h2>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaRegQuestionCircle className="mr-2 text-blue-500" />
            <span>Koi Nutrition</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Proper feeding is crucial for the health and growth of your koi. Koi
            should be fed regularly but not excessively.
          </p>
          <button
            onClick={handleToggleDetails}
            className="mt-4 text-blue-600 hover:underline focus:outline-none"
          >
            {showDetails ? "Hide Detailed Feeding Guide" : "Read Full Article"}
          </button>

          {showDetails && (
            <div className="mt-6 text-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Feeding Guide</h3>

              <h4 className="text-xl font-semibold mt-6">1. Frequency</h4>
              <p className="leading-relaxed">
                Koi should be fed 2 to 3 times a day. This frequency can vary
                depending on the size of the fish and water temperature. In
                warmer months, when the water temperature is above 15°C (59°F),
                koi may eat more, while in winter, you should reduce feeding
                frequency.
              </p>

              <h4 className="text-xl font-semibold mt-6">2. Amount</h4>
              <p className="leading-relaxed">
                When feeding, provide only enough food that the fish can consume
                in about 5 to 10 minutes. This helps prevent leftover food in
                the pond, which can pollute the water.
              </p>

              <h4 className="text-xl font-semibold mt-6">3. Types of Food</h4>
              <p className="leading-relaxed">
                Use specialized koi food, including pellets, natural food, and
                live food such as worms or shrimp. Ensure that the food is of
                high quality and suitable for the size and age of your fish.
              </p>

              <h4 className="text-xl font-semibold mt-6">
                4. Seasonal Adjustments
              </h4>
              <p className="leading-relaxed">
                In winter, when water temperatures drop below 10°C (50°F), koi
                will reduce their food intake. You can feed them less and use
                easily digestible food. If the water is colder than 4°C (39°F),
                stop feeding altogether until the water warms up.
              </p>

              <h4 className="text-xl font-semibold mt-4">Additional Tips</h4>
              <ul className="list-disc list-inside">
                <li>
                  Always monitor the behavior and health of your koi after
                  feeding.
                </li>
                <li>Keep the pond clean and regularly check water quality.</li>
                <li>
                  Consult an expert if you have any doubts about the feeding
                  regimen.
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

export default FAQ_Q4;
