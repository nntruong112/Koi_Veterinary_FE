import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Work = () => {
  return (
    <>
      <Navbar />
      <section className="bg-center bg-cover bg-[url('./src/assets/home.jpg')]">
        <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 mx-11 md:py-[10vw] md:mb-[-30px]">
          <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight">
            Veterinary Services
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
            <p>
              At Koi Have Sex, we firmly believe that all pets are entitled to
              quality veterinary care, and we want to extend this idea to your
              aquatic pets. Our mission is to support your fish by providing
              high-quality veterinary care so that your fish will enjoy a happy,
              healthy life as part of the family
            </p>
          </div>
        </div>
      </section>
      <section className="text-center py-8 bg-[#f1faff]">
        <h1 className="text-5xl font-bold mt-0 mb-8 text-[#071e55]">
          OUR SERVICES
        </h1>

        <p className="text-xl font-normal mb-8 text-[#7c8595]">
          Dicover how our amazing team can help your problem.
        </p>
        <div className="flex flex-col md:flex-row mt-16">
          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Wellness & Sick Visits
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              All appointments begin with our veterinarian’s assessment of your
              fish’s habitat and water quality. Individual fish will undergo a
              physical exam, and the veterinarian will determine if further
              diagnostics are needed.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Diagnostics{" "}
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Basic cytology, parasite screening, and ultrasound may be
              performed on site. Our veterinarian will determine if advanced
              diagnostics such as bloodwork, radiographs, and histopathology are
              necessary.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Procedures
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Our veterinarian offers a variety of advanced procedures for your
              fish, including basic and advanced surgeries, as well as
              cryotherapy.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-16">
          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Subscriptions
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Our veterinary team will assess your pond or tank twice yearly to
              ensure fish health and wellbeing, without having to call and
              schedule an appointment.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">
              Consultations
            </h2>
            <p className="text-[15px] text-[#7c8595]">
              Our veterinarian offers telehealth consults to established clients
              and husbandry consults to new clients. Veterinary consults are
              available for fellow veterinary professionals seeking assistance
              with fish cases.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 md:w-2/4 px-10">
            <h2 className="text-2xl font-bold mb-1 text-[#3d3c3c]">Packages</h2>
            <p className="text-[15px] text-[#7c8595]">
              Tank and pond packages include water quality testing, sedation and
              examination of up to three fish, as well as parasite screening.
              Pricing varies based on tank/pond size and location.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Work;
