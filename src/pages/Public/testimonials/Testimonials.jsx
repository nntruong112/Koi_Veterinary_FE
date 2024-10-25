import React, { useState } from "react";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const testimonialsData = [
  {
    serviceName: "Service A",
    rating: 4,
    comment: "This service was amazing, very satisfied!",
    userName: "John Doe",
  },
  {
    serviceName: "Service B",
    rating: 5,
    comment: "Excellent service, highly recommend!",
    userName: "Jane Smith",
  },
  {
    serviceName: "Service C",
    rating: 3,
    comment: "Good service but could be improved.",
    userName: "Samuel Green",
  },
  {
    serviceName: "Service D",
    rating: 4,
    comment: "Very friendly staff and great service.",
    userName: "Alice Brown",
  },
  {
    serviceName: "Service E",
    rating: 5,
    comment: "Top-notch experience! ",
    userName: "Michael Lee",
  },
  {
    serviceName: "Service F",
    rating: 4,
    comment: "Highly professional and attentive. ",
    userName: "Sarah Wilson",
  },
];

const Testimonials = () => {
  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", formData);
    setFormData({
      comment: "",
      rating: 0,
    });
  };

  const renderStars = (rating, handleClick) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starIndex = index + 1;
      return (
        <span
          key={index}
          onClick={() => handleClick && handleClick(starIndex)}
          className={`cursor-pointer ${
            starIndex <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          {starIndex <= rating ? <FaStar /> : <FaRegStar />}
        </span>
      );
    });
  };

  return (
    <>
      <RolesNavbar />

      <div className="px-6 pb-20 bg-gray-100 rounded-lg max-w-full mx-auto">
        <h2 className="text-4xl font-semibold text-center pt-4 mb-10 text-[#071e55]">
          Customer Feedback
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          loop={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between h-full"
            >
              <div className="mb-2 text-center">
                <div className="text-xl font-semibold">
                  {testimonial.serviceName}
                </div>
                <div className="flex justify-center items-center my-2">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-700 italic text-center mb-4 break-words whitespace-normal">
                {testimonial.comment}
              </p>
              <p className="text-right font-semibold">
                - {testimonial.userName}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col justify-evenly">
        <h1 className="text-center text-4xl font-bold mt-8 text-[#071e55]">
          Your feedback is the best way for us to improve our service quality!
        </h1>

        <section className="flex flex-row items-center w-full py-20">
          <div className="w-1/2 flex items-center justify-center">
            <img src={assets.Feedback} className="w-1/2" />
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-1/2 ml-[-8rem] flex flex-col items-center justify-between gap-7 border border-solid shadow-lg rounded-lg p-10"
          >
            <div className="flex items-center mb-4  text-2xl">
              <span className="mr-2">Rating:</span>
              {renderStars(formData.rating, handleRatingChange)}
            </div>

            <textarea
              name="comment"
              placeholder="Your Comment"
              value={formData.comment}
              onChange={handleChange}
              rows="5"
              className="min-h-50 p-4 w-full border border-solid border-black rounded-lg"
              required
            ></textarea>

            <div className="bg-primary text-white py-2 rounded-2xl font-semibold hover:bg-primary/90 w-[100px] text-center text-xl">
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Testimonials;
