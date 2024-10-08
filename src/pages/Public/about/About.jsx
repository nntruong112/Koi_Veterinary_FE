import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { TiTick } from "react-icons/ti";
import { FaTasks, FaChartLine, FaNetworkWired, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [currentImage, setCurrentImage] = useState(assets.About_1);
  const navigate = useNavigate();

  const images = {
    workflow: assets.About_1,
    network: assets.BackgroundLogin,
    rocket: assets.Background,
  };
  return (
    <>
      <Navbar />
      {/* ------------- SECTION 1 ------------------- */}
      <section className="text-center py-8 bg-[#f1faff]">
        <h1 className="text-5xl font-bold mt-0 mb-8 text-[#071e55]">
          What We Do
        </h1>

        <p className="text-xl font-normal mb-8 text-[#7c8595]">
          Dicover how our amazing team can help your problem.
        </p>

        <div className="flex flex-col md:flex-row mt-16">
          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <FaTasks className="bg-blue-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Complete Pond/Tank Packages
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Receive a complete assessment of the health of your pond or tank.
              These packages include water quality testing and physical exams of
              your fish under sedation.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <FaTasks className="bg-red-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Complete Pond/Tank Packages
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Receive a complete assessment of the health of your pond or tank.
              These packages include water quality testing and physical exams of
              your fish under sedation.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <FaTasks className="bg-green-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Complete Pond/Tank Packages
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Receive a complete assessment of the health of your pond or tank.
              These packages include water quality testing and physical exams of
              your fish under sedation.
            </p>
          </div>
        </div>
      </section>

      {/* ------------- SECTION 2 ------------------- */}
      <section className="p-[20px] flex justify-center gap-y-0 gap-x-[50px]">
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img
            className="w-[600px] h-[440px] md:max-w-[360px]  rounded-lg object-cover shadow-[10px_12px_40px_rgba(0,0,0,0.2)] -translate-x-10"
            src={assets.KoiPool}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="text-4xl mb-8 mt-0 text-[#071e55] font-bold">
            Discover how we can help you to grow.
          </p>
          <p className="text-xl font-normal text-[#7c8595] mb-5">
            Velis demo enim ipsam voluptatem quia voluptas sit aspernatur netsum
            lorem fugit, seditum netis velas matrix net nesciunt.
          </p>

          <ul>
            <i>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Quias netus magni netsum eos qui ratione sequi.
              </li>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Venis ratione sequi netus enim quia tempor magni.
              </li>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Enim ipsam netus voluptatem quia voluptas.
              </li>
            </i>
            <button
              onClick={() => navigate("/work")}
              className="bg-primary w-60 h-20 rounded-lg text-2xl flex items-center justify-center hover:bg-primary/90 text-white"
            >
              Discover More
            </button>
          </ul>
        </div>
      </section>

      {/* ------------- SECTION 3 ------------------- */}
      <section className="p-[30px] flex justify-center gap-x-5 bg-[#f1faff]">
        <div className="flex flex-col items-center justify-center gap-10 ml-5">
          <div
            tabIndex={0}
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2]"
            onClick={() => setCurrentImage(images.workflow)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaChartLine className="text-8xl font-extrabold text-blue-500 p-6 text-center" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Customize your workflow.
              </b>
              <p className="text-xl text-[#7c8595]">
                Manage any process and be ready to address any challenge with
                total ease.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2]"
            onClick={() => setCurrentImage(images.network)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaNetworkWired className="text-8xl font-extrabold text-red-500 p-6 text-center" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Customize your workflow.
              </b>
              <p className="text-xl text-[#7c8595]">
                Manage any process and be ready to address any challenge with
                total ease.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2]"
            onClick={() => setCurrentImage(images.rocket)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaRocket className="text-8xl font-extrabold text-green-500 p-6" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Customize your workflow.
              </b>
              <p className="text-xl text-[#7c8595]">
                Manage any process and be ready to address any challenge with
                total ease.
              </p>
            </div>
          </div>
        </div>

        <div>
          <img
            className="rounded-md inline h-[30rem] max-w-[50vw]"
            src={currentImage}
            alt=""
          />
        </div>
      </section>

      {/* ------------- SECTION 4 ------------------- */}
      <section>
        <div className="text-3xl my-10 flex justify-center">
          <b className="font-semibold text-[#3d3c3c]">WHY CHOOSE US</b>
        </div>

        <div className="flex flex-col md:flex-row mb-14">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>EFFICIENCY</b>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <b>CONVENIENCE</b>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer">
            <b>PERSONALIZATION</b>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
