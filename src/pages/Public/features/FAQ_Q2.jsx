import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { FaRegQuestionCircle } from "react-icons/fa";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const FAQ_Q2 = () => {
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
            How can I tell if my koi is sick?
          </h2>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <FaRegQuestionCircle className="mr-2 text-blue-500" />
            <span>Koi Health</span>
          </div>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            To determine if your koi is sick, check for physical symptoms,
            behavioral changes, and water quality.
          </p>
          <button
            onClick={handleToggleDetails}
            className="mt-4 text-blue-600 hover:underline focus:outline-none"
          >
            {showDetails ? "Hide Detailed Symptoms" : "Read Full Article"}
          </button>

          {showDetails && (
            <div className="mt-6 text-gray-700">
              <h3 className="text-2xl font-semibold mb-4">Detailed Symptoms</h3>

              <h4 className="text-xl font-semibold mt-6">
                1. Physical Symptoms
              </h4>
              <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Changes in Appearance:</strong> Look for any unusual
                  physical changes such as discoloration, lesions, fraying fins,
                  or swelling.
                </li>
                <li>
                  <strong>Skin and Fins:</strong> Check for spots, ulcers, or
                  any abnormalities on the skin and fins. Look for signs of
                  parasites like anchor worms or flukes.
                </li>
                <li>
                  <strong>Gills:</strong> Observe the gills for discoloration,
                  swelling, or excessive mucus, which can indicate respiratory
                  issues or infections.
                </li>
                <li>
                  <strong>Body Shape:</strong> A swollen belly or abnormal body
                  shape may suggest issues like dropsy or internal parasites.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-6">
                2. Behavioral Changes
              </h4>
              <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Lethargy:</strong> If your koi is less active than
                  usual and spends more time at the bottom or hiding, it may be
                  sick.
                </li>
                <li>
                  <strong>Feeding Habits:</strong> A decrease in appetite or
                  refusal to eat can be a strong indicator of illness.
                </li>
                <li>
                  <strong>Aggression or Isolation:</strong> Increased aggression
                  towards tank mates or isolation from the rest of the fish can
                  signal stress or sickness.
                </li>
                <li>
                  <strong>Scratching:</strong> If your koi is frequently rubbing
                  or scratching against surfaces in the tank, it may be dealing
                  with parasites or skin irritation.
                </li>
                <li>
                  <strong>Surface Breathing:</strong> If your koi is frequently
                  gulping air at the surface, it may be experiencing respiratory
                  distress.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-6">
                3. Water Quality Issues
              </h4>
              <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Environmental Factors:</strong> Poor water quality can
                  lead to stress and illness in koi. Test the water for ammonia,
                  nitrites, nitrates, pH levels, and temperature.
                </li>
                <li>
                  <strong>Unusual Odors or Cloudiness:</strong> Cloudy water or
                  foul odors can indicate an underlying problem, which may be
                  affecting your fish.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-6">4. Signs of Stress</h4>
              <ul className="list-disc list-inside ml-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Overcrowding:</strong> Ensure your pond or tank isn't
                  overcrowded, as this can lead to increased stress and
                  aggression.
                </li>
                <li>
                  <strong>Sudden Changes in Environment:</strong> Sudden shifts
                  in temperature, pH, or water quality can cause stress and
                  trigger illness.
                </li>
              </ul>

              <h4 className="text-xl font-semibold mt-4">Prevention Tips</h4>
              <ul className="list-disc list-inside">
                <li>Regularly monitor water parameters.</li>
                <li>Avoid overcrowding to reduce stress.</li>
                <li>Quarantine new fish before adding them.</li>
                <li>Perform regular water changes and maintain cleanliness.</li>
                <li>Contact Us to book an appointment.</li>
              </ul>
            </div>
          )}
        </article>
      </section>

      <Footer />
    </>
  );
};

export default FAQ_Q2;
