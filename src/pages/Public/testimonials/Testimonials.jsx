import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";

const Testimonials = () => {
  return (
    <>
      <Navbar />

      <main className="flex flex-col justify-evenly ">
        <h1 className="text-center text-4xl font-bold mt-8 text-[#071e55]">
          Your feedback is the best way for us to improve our service quality!
        </h1>

        <section className="flex flex-row items-center w-full py-20 ">
          <div className="w-1/2 flex items-center justify-center">
            <img src={assets.Feedback} className="w-1/2" />
          </div>

          <form className="w-1/2 ml-[-8rem] flex flex-col items-center justify-between gap-7 border-4 border-solid rounded-md p-10">
            <input
              type="text"
              placeholder="Your Name"
              className="h-10 p-4 w-full border border-solid border-black rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="h-10 p-4 w-full border border-solid border-black rounded-lg"
            />
            <input
              type="text"
              placeholder="Review Tittle"
              className="h-10 p-4 w-full border border-solid border-black rounded-lg"
            />
            <textarea
              placeholder="Your Feedback"
              rows={5}
              className="h-10 p-4 w-full border border-solid border-black rounded-lg"
            ></textarea>
            <div className="bg-blue-500 text-white p-5 rounded-2xl font-semibold hover:bg-primary/90 w-[150px] text-center text-xl">
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>

        <footer></footer>
      </main>

      <Footer />
    </>
  );
};

export default Testimonials;
