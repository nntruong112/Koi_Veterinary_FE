import React, { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import { assets } from "../../../assets/assets";
import RolesNavbar from "../../../components/rolesNavbar/RolesNavbar";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedback } from "../../../services/userService";

const Testimonials = () => {
  const dispatch = useDispatch();
  const allFeedback =
    useSelector((state) => state.users.data?.allFeedback) || [];

  useEffect(() => {
    dispatch(getAllFeedback());
  }, [dispatch]);

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
          {allFeedback.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between h-full"
            >
              <div className="mb-2 text-center">
                <div className="text-xl font-semibold">
                  {testimonial.appointment?.appointmentType?.appointmentService}
                </div>
                <div className="flex justify-center items-center my-2">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
              <p className="text-gray-700 italic text-center mb-4 break-words whitespace-normal">
                {testimonial.comment}
              </p>
              <p className="text-right font-semibold">
                - {testimonial.customer?.username}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Footer />
    </>
  );
};

export default Testimonials;
