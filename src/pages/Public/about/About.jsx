import React, { useState } from "react";
import { assets } from "../../../assets/assets";
import Footer from "../../../components/Footer";
import { TiTick } from "react-icons/ti";
import { FaTasks, FaChartLine, FaNetworkWired, FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";

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
      <RolesNavbar />
      {/* ------------- SECTION 1 ------------------- */}
      <section className="text-center py-8 bg-[#f1faff]">
        <h1 className="text-5xl font-bold mt-0 mb-8 text-[#071e55]">
          What We Do
        </h1>

        <p className="text-xl font-normal mb-8 text-[#7c8595]">
          Discover how our amazing team can help solve your problems and enhance
          the health of your koi.
        </p>

        <div className="flex flex-col md:flex-row mt-16">
          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10 hover:bg-white transition-all duration-300 py-4 border">
            <FaTasks className="bg-blue-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Comprehensive Health Assessments
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Our packages provide thorough assessments of your pond or tank,
              including water quality testing and physical examinations of your
              fish under sedation.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10 hover:bg-white transition-all duration-100 py-4 border">
            <FaTasks className="bg-red-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Tailored Treatment Plans
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Receive personalized treatment plans designed specifically for the
              health needs of your fish, ensuring the best possible care and
              recovery.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10 hover:bg-white transition-all duration-100 py-4 border">
            <FaTasks className="bg-green-500 rounded-2xl text-8xl text-white p-5" />
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Expert Advice and Support
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Our experienced team is here to provide expert advice and support,
              helping you make informed decisions about your koi’s health and
              well-being.
            </p>
          </div>
        </div>
      </section>

      {/* ------------- SECTION 2 ------------------- */}
      <section className="p-[20px] flex justify-center gap-y-0 gap-x-[50px]">
        <div className="my-10 flex flex-col md:flex-row gap-12">
          <img
            className="w-[600px] h-[440px] md:max-w-[360px] rounded-lg object-cover shadow-[10px_12px_40px_rgba(0,0,0,0.2)] -translate-x-10"
            src={assets.KoiPool}
            alt="Koi Pool"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="text-4xl mb-8 mt-0 text-[#071e55] font-bold">
            Discover how we can help you grow.
          </p>
          <p className="text-xl font-normal text-[#7c8595] mb-5">
            Our goal is to ensure the health and happiness of your koi through
            comprehensive services and a dedicated team that understands your
            needs.
          </p>

          <ul>
            <i>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Expert consultations to assess your koi’s health.
              </li>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Tailored solutions for a variety of health issues.
              </li>
              <li className="flex mb-4 text-xl font-normal text-[#7c8595]">
                <TiTick className="text-red-500 text-2xl my-1 mr-2" />
                Ongoing support to ensure long-term wellness.
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
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2] items-stretch"
            onClick={() => setCurrentImage(images.workflow)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaChartLine className="text-8xl font-extrabold text-blue-500 p-6 text-center" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Customize Your Workflow
              </b>
              <p className="text-xl text-[#7c8595]">
                Manage any process with ease and adapt quickly to challenges to
                maintain your koi's health.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2] items-stretch"
            onClick={() => setCurrentImage(images.network)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaNetworkWired className="text-8xl font-extrabold text-red-500 p-6 text-center" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Build a Supportive Network
              </b>
              <p className="text-xl text-[#7c8595]">
                Connect with trusted professionals and fellow koi enthusiasts to
                share experiences and tips.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            className="flex flex-col md:flex-row gap-12 cursor-pointer p-5 focus:bg-white focus:shadow-[0_0_3px_1px_#e4e2e2] items-stretch"
            onClick={() => setCurrentImage(images.rocket)}
          >
            <div className="bg-white rounded-[50%] border-solid border-gray-300 border">
              <FaRocket className="text-8xl font-extrabold text-green-500 p-6" />
            </div>

            <div className="flex flex-col gap-3">
              <b className="font-bold text-3xl text-[#3d3c3c]">
                Launch into Success
              </b>
              <p className="text-xl text-[#7c8595]">
                Experience a transformation in your koi care routine with our
                comprehensive services and expert guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <img
            className="rounded-md inline h-[30rem] max-w-[30rem] object-cover"
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

        <div className="flex justify-center gap-8 flex-wrap mb-10">
          <div className="max-w-xs rounded-md shadow-lg p-5 bg-white border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="font-semibold text-xl mb-4">
              Expertise You Can Trust
            </h3>
            <p>
              Our team consists of highly trained professionals with years of
              experience in koi health management.
            </p>
          </div>

          <div className="max-w-xs rounded-md shadow-lg p-5 bg-white border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="font-semibold text-xl mb-4">
              Comprehensive Services
            </h3>
            <p>
              From health assessments to treatment plans, we cover all aspects
              of koi care to ensure their well-being.
            </p>
          </div>

          <div className="max-w-xs rounded-md shadow-lg p-5 bg-white border-2 border-gray-200 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h3 className="font-semibold text-xl mb-4">
              Customer-Centric Approach
            </h3>
            <p>
              Your needs and concerns are our top priority. We provide
              personalized care to meet each koi’s unique requirements.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
