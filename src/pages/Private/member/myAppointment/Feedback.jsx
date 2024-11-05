import React, { useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { assets } from "../../../../assets/assets";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createFeedback } from "../../../../services/userService";
import { useLocation } from "react-router-dom";

const Feedback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const appointment = location.state?.selectedAppointment;

  const [formData, setFormData] = useState({
    comment: "",
    rating: 0,
    punctuality: "present", // Default value for punctuality
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();

    const feedbackData = {
      ...formData,
      customerId: appointment.customer.userId,
      appointmentId: appointment.appointmentId,
    };

    try {
      await dispatch(createFeedback(feedbackData));

      setFormData({
        comment: "",
        rating: 0,
        punctuality: "present", // Reset punctuality to default value
      });

      e.target.reset();

      toast.success("Submit successfully");
    } catch (error) {
      console.log("Error while submitting: ", error);
      toast.error("Submit fail!");
    }
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
    <div className="flex flex-col justify-evenly">
      <h1 className="text-center text-4xl font-bold my-8 text-[#071e55]">
        Your feedback is the best way for us to improve our service quality!
      </h1>

      <section className="flex flex-row items-center w-full py-8 bg-white rounded-lg shadow-lg">
        <div className="w-1/2 flex items-center justify-center">
          <img src={assets.Feedback} className="w-1/2" />
        </div>

        <form
          onSubmit={handleSubmitFeedback}
          className="w-1/2 ml-[-8rem] flex flex-col items-center justify-between gap-7 border border-solid shadow-lg rounded-lg p-10"
        >
          <div className="flex items-center mb-4 text-2xl">
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

          {/* Punctuality Select Field */}
          <div className="flex flex-col mb-4">
            <label htmlFor="punctuality" className="text-lg mb-2">
              Punctuality:
            </label>
            <select
              name="punctuality"
              value={formData.punctuality}
              onChange={handleChange}
              className="p-2 border border-solid border-black rounded-lg"
              required
            >
              <option value="present">Present</option>
              <option value="late">Late</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="bg-primary text-white py-2 rounded-2xl font-semibold hover:bg-primary/90 w-[100px] text-center text-xl">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Feedback;
