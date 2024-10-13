import React from "react";
import Header from "../../../components/Header";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import { useSelector } from "react-redux";
import AdminNavbar from "../../../components/Private/admin/adminNavbar/AdminNavbar";

const Home = () => {
  const roles = useSelector((state) => state.users.data?.result?.roles);
  console.log(roles);
  return (
    <>
      {roles === "ADMIN" ? <AdminNavbar /> : <Navbar />}
      <Header />
      <section className="flex justify-normal py-8 bg-[#f5f2f2]">
        <div className="flex items-center flex-col gap-6 text-2xl text-center w-1/2  mb-1 text-[#3d3c3c]">
          <h2 className="font-bold">
            Koi Health Center: <br /> Comprehensive Care for Koi Fish Health
          </h2>
          <img className="w-[403px] h-[403px]" src={assets.koihealth} />
          <h3 className="text-slate-700">
            Administering Treatment to a Koi Fish
          </h3>
        </div>
        <div className="  flex flex-col w-1/2 items-center justify-center gap-6  px-10">
          <p className="text-xl text-center">
            Koi Health Center possesses many years of experience in the field of
            health care for Koi fish, with a team of experts who have performed
            hundreds of successful diagnoses and treatments for diseases ranging
            from simple to complex. The center has extensive experience in
            analyzing water quality, providing nutritional advice, and applying
            advanced treatments for Koi fish. Thanks to practical experience
            accumulated over many years, Koi Health Center confidently brings
            comprehensive and effective solutions to ensure your Koi fish stay
            healthy and develop optimally.
          </p>
        </div>
      </section>

      <section className="flex justify-normal py-8 bg-[#ffffff]">
        <div className="flex flex-col w-1/2 items-center justify-center gap-6 px-10">
          <p className="text-xl, text-center">
            Koi Health Center receives many positive feedback from customers
            thanks to its outstanding service quality and dedicated care for Koi
            fish. Customers often appreciate the professionalism of the team of
            experts, along with effective treatment results and detailed
            consultation. With high ratings, Koi Health Center has become a
            reliable destination for Koi fish farmers, helping them feel secure
            about the health and beauty of their precious fish.
          </p>
        </div>
        <div className="  flex items-center flex-col gap-6 text-2xl text-center w-1/2 font-bold mb-1 text-[#3d3c3c]">
          <h2 className="font-bold">
            Koi Health Center: <br /> Comprehensive Care for Koi Fish Health
          </h2>
          <img src={assets.RatingFb} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
