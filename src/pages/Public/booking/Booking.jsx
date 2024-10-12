import React from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Booking = () => {
  return (
    <>
      <Navbar />
      <h1 className="text-5xl font-bold mt-8 mb-8 text-[#071e55] text-center">
        BOOKING FOR YOUR SERVICES.
      </h1>
      <div className="text-center justify-center ">
        <p className="text-xl font-normal mb-8 text-[#7c8595] ">
          If you have a pressing concern, please call our office directly at
          (123) 456-7890. <br />
          Our phones and emails are answered 9am-3pm PST Monday through
          Saturday, but are closed most major holidays. <br />
          For clients in District 2, District 1 and Binh Thanh, please fill out
          this form. We partner with the Koi Center to see clients in that
          service area.
        </p>
      </div>
      <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-blue-600 text-white text-center font-bold uppercase">
          Book an Appointment
        </div>
      </div>
      <div>
        <form className="py-4 px-6" action="" method="POST">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="date">
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Select a date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="time">
              Time
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="time"
              type="time"
              placeholder="Select a time"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" for="service">
              Service
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="service"
              name="service"
            >
              <option value="">Select a service</option>
              <option value="Surgery">Surgery</option>
              <option value="Ich">Ich(parasite)</option>
              <option value="Dropsy">Dropsy(bacteria)</option>
              <option value="Fluke">Fluke(worms)</option>
              <option value="Fish Lice">Fish Lice(parasite)</option>
              <option value="Costia">Costia(parasite)</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              form="message"
            >
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="4"
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="flex items-center justify-center mb-4">
            <button className="bg-blue-400 text-white py-2 px-4 rounded hover:bg-blue-500 focus:outline-none focus:shadow-outline">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
