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
import { TiTick } from "react-icons/ti";
import PayForm from "../../../components/Private/member/booking/PayForm";

const Booking = () => {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.booking?.currentStep);
  const bookingInfo = useSelector((state) => state.booking.data.bookingData);
  const customerId = useSelector((state) => state.users.data?.result?.userId);

  const steps = [
    {
      step: 1,
      title: "Fill",
      content: (
        <InfoForm
          updateFormData={(data) => dispatch(updateBookingData(data))}
        />
      ),
    },
    {
      step: 2,
      title: "Choose",
      content: (
        <VetForm updateFormData={(data) => dispatch(updateBookingData(data))} />
      ),
    },
    {
      step: 3,
      title: "Payment",
      content: <PayForm />,
    },
    {
      step: 4,
      title: "Confirm",
      content: <ConfirmForm appointmentData={bookingInfo} />,
    },
  ];

  const bookingData = {
    ...bookingInfo,
    customerId: customerId,
    status: "on-going",
  };

  const handleSubmit = async () => {
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
      const { appointmentDate, appointmentTypeId, location, fishId } =
        bookingInfo;
      if (!appointmentDate || !appointmentTypeId || !location || !fishId) {
        toast.error("Please complete all required fields in this step!");
        return;
      }
    } else if (currentStep === 1) {
      const { startTime, endTime } = bookingInfo;
      if (!startTime || !endTime) {
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
      <main className="bg-gray-100">
        <div className="flex items-center justify-center pt-5 px-5 ml-48 mb-5">
          <div className="flex items-center w-full">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-2 w-full">
                <div
                  className={`w-12 h-10 rounded-lg text-center flex items-center justify-center shadow-lg ${
                    index < currentStep
                      ? "bg-green-600 text-white"
                      : index === currentStep
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {index < currentStep ? (
                    <TiTick className="text-2xl" />
                  ) : (
                    step.step
                  )}
                </div>

                <div className="flex items-center w-full gap-2">
                  <div className="flex-shrink-0 text-lg font-semibold">
                    {step.title}
                  </div>

                  {index < steps.length - 1 && (
                    <div className="bg-black h-0.5 w-full mr-2"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mx-20">{steps[currentStep]?.content}</div>

          <div className="flex items-center justify-center gap-20 w-full my-5 text-white">
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
      </main>

      <Footer />
    </>
  );
};

export default Booking;
