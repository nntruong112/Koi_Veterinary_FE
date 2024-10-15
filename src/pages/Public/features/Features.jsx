import React from "react";
import Footer from "../../../components/Footer";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaRegQuestionCircle } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
// import { MdOutlineSupportAgent } from "react-icons/md";
// import { PiUsersThreeFill } from "react-icons/pi";
// import { IoIosNotifications } from "react-icons/io";
// import { IoAccessibility, IoChatbubbles } from "react-icons/io5";
// import { FaPiggyBank } from "react-icons/fa";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

const Features = () => {
  return (
    <>
      <RolesNavbar />

      {/* ------------- FAQ SECTION ------------ */}
      <section className="text-center py-8 bg-[#f1faff]">
        <h1 className="text-5xl font-bold mt-0 mb-16 text-[#071e55]">
          Frequently Asked Questions
        </h1>

        <div className="grid grid-cols-2 grid-rows-3 gap-20">
          {/* Question 1 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <FaRegQuestionCircle className="text-6xl text-green-600" />
            <div>
              <h2 className="text-3xl">
                What are common koi diseases and treatments?
              </h2>
              <p className="text-xl text-gray-600 mt-2">
                Diseases like Ich, fin rot, and koi herpesvirus (KHV) can affect
                koi. Treatments include salt baths, antibacterial medications,
                and maintaining clean water. KHV prevention is crucial through
                quarantine and vaccination.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <AiOutlineInfoCircle className="text-6xl text-blue-600" />
            <div>
              <h2 className="text-3xl">How can I tell if my koi is sick?</h2>
              <p className="text-xl text-gray-600 mt-2">
                Signs include lethargy, loss of appetite, abnormal swimming, and
                visible spots or sores. Test water quality and consult a vet if
                needed.
              </p>
            </div>
          </div>

          {/* Question 3 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <IoMdHelpCircleOutline className="text-6xl text-red-600" />
            <div>
              <h2 className="text-3xl">What water conditions do koi need?</h2>
              <p className="text-xl text-gray-600 mt-2">
                Ideal conditions: pH 7.0-8.5, ammonia 0 ppm, nitrite 0 ppm,
                nitrate below 40 ppm, temperature 65-75°F (18-24°C). Regular
                testing and water maintenance are essential.
              </p>
            </div>
          </div>

          {/* Question 4 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <FaRegQuestionCircle className="text-6xl text-green-600" />
            <div>
              <h2 className="text-3xl">How often should I feed my koi?</h2>
              <p className="text-xl text-gray-600 mt-2">
                Feed once or twice daily with high-quality pellets, adjusting
                for water temperature and activity levels. Avoid overfeeding to
                keep the water clean.
              </p>
            </div>
          </div>

          {/* Question 5 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <AiOutlineInfoCircle className="text-6xl text-blue-600" />
            <div>
              <h2 className="text-3xl">What types of fish do you work with?</h2>
              <p className="text-xl text-gray-600 mt-2">
                We work with ALL types of fish, from tiny bettas to enormous
                koi. Our office is equipped to work on all fish species, even
                those with sharp teeth and pointy spines!
              </p>
            </div>
          </div>

          {/* Question 6 */}
          <div className="flex flex-1 justify-center items-center gap-4">
            <IoMdHelpCircleOutline className="text-6xl text-red-600" />
            <div>
              <h2 className="text-3xl">
                What do you charge for your services?
              </h2>
              <p className="text-xl text-gray-600 mt-2">
                Please{" "}
                <a
                  className="font-bold text-blue-600 hover:underline"
                  href="http://localhost:5173/contact"
                >
                  contact us{" "}
                </a>
                for more information. Estimates are available on request.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Features;
