import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import InfoForm from "../../../components/Private/member/booking/InfoForm";
import VetForm from "../../../components/Private/member/booking/VetForm";
import ConfirmForm from "../../../components/Private/member/booking/ConfirmForm";
import {
  resetBookingData,
  setCurrentStep,
  updateBookingData,
} from "../../../redux/slices/bookingSlice";
import { bookingAppointment } from "../../../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStep = useSelector((state) => state.booking?.currentStep);
  const bookingInfo = useSelector((state) => state.booking.data);
  const customerId = useSelector((state) => state.users.data?.result?.userId);

  const steps = [
    {
      title: "Fill appointment form",
      content: (
        <InfoForm
          updateFormData={(data) => dispatch(updateBookingData(data))}
        />
      ),
    },
    {
      title: "Choose vet and time",
      content: (
        <VetForm updateFormData={(data) => dispatch(updateBookingData(data))} />
      ),
    },
    {
      title: "Confirm Appointment Information",
      content: <ConfirmForm appointmentData={bookingInfo} />,
    },
  ];

  const bookingData = {
    ...bookingInfo,
    customerId: customerId,
    status: "on-going",
  };

  const handleSubmit = async () => {
    if (!bookingInfo || !customerId) {
      toast.error("Please complete all required fields!");
      return;
    }

    try {
      await dispatch(bookingAppointment(bookingData));

      dispatch(resetBookingData());
      toast.success("Booking added successfully");
    } catch (error) {
      console.error("Error when submit: ", error);
      toast.error(error.response?.data?.message || "Booking failed!");
    }
  };

  const handleNext = () => {
    if (currentStep === 0) {
      const { appointmentDate, appointmentType, location, fishId } =
        bookingInfo;
      if (!appointmentDate || !appointmentType || !location || !fishId) {
        toast.error("Please complete all required fields in this step!");
        return;
      }
    } else if (currentStep === 1) {
      const { veterinarianId, startTime, endTime } = bookingInfo;
      if (!veterinarianId || !startTime || !endTime) {
        toast.error("Please complete all required fields in this step!");
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      dispatch(setCurrentStep(currentStep + 1));
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-bold mt-5 mb-8 text-[#071e55]">
          Booking An Appointment
        </h1>
        <p className="text-xl font-normal text-[#7c8595]">
          If you had appointments,
          <button
            onClick={() => navigate(`${path.MEMBER}/${path.MY_APPOINTMENT}`)}
            className="mx-1 rounded-full p-3 hover:text-primary underline decoration-solid"
          >
            click here
          </button>
          to view appointments
        </p>
      </div>
      <div className="flex items-center justify-center mt-8 ml-80">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`relative w-full mb-6 ${
                index <= currentStep ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`z-10 flex items-center justify-center w-6 h-6 ${
                    index <= currentStep ? "bg-blue-200" : "bg-gray-200"
                  } rounded-full ring-0 ring-white`}
                >
                  <span
                    className={`flex w-3 h-3 ${
                      index <= currentStep ? "bg-blue-600" : "bg-gray-900"
                    } rounded-full`}
                  ></span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex w-full bg-gray-200 h-0.5"></div>
                )}
              </div>
              <div className="mt-3">
                <h3 className="font-medium text-gray-900">{step.title}</h3>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col justify-center">
        <div className="mx-20">{steps[currentStep]?.content}</div>

        <div className="flex items-center justify-center gap-20 w-full mb-5 text-white">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="bg-primary p-2 rounded-lg font-semibold hover:bg-primary/80 transition cursor-pointer"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="bg-primary p-2 rounded-lg font-semibold hover:bg-primary/80 transition"
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Booking;
