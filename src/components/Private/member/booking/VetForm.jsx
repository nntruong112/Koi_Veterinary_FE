import { useState, useEffect } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getVetByRole } from "../../../../services/userService";
import { toast } from "react-toastify";
import { getAllBookingSchedule } from "../../../../services/bookingService";
import { updateValidVets } from "../../../../redux/slices/bookingSlice";

const availableTimes = [
  "09:00",

  "10:00",

  "11:00",

  "13:00",
  "13:30",
  "14:00",

  "15:00",

  "16:00",

  "17:00",
];

const VetForm = ({ updateFormData }) => {
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const formData = useSelector((state) => state.booking.data.bookingData);
  const invoiceData = useSelector((state) => state.booking.data.invoiceData);
  const bookingSchedule =
    useSelector((state) => state.booking.data.bookingSchedule) || [];

  useEffect(() => {
    dispatch(getVetByRole());
    dispatch(getAllBookingSchedule());
  }, []);

  // Hàm chuyển LocalDate thành tên ngày trong tuần
  const getWeekdayName = (dateString) => {
    const date = new Date(dateString); // Chuyển đổi LocalDate sang Date
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return weekdayNames[date.getDay()];
  };

  const getValidVetsForDate = () => {
    if (!formData.appointmentDate) return [];

    // Chuyển appointmentDate thành tên ngày trong tuần
    const appointmentDayName = getWeekdayName(formData.appointmentDate);

    // Lọc danh sách lịch của các bác sĩ theo ngày
    const vetsWorkingToday = bookingSchedule
      .filter((schedule) => schedule.availableDate === appointmentDayName)
      .flatMap((schedule) => schedule.veterinarianProfiles); // Chuyển đổi từ mảng lồng vào mảng phẳng

    return vetsWorkingToday;
  };

  // Dùng useEffect để cập nhật danh sách bác sĩ hợp lệ khi formData.appointmentDate hoặc bookingSchedule thay đổi
  useEffect(() => {
    if (formData.appointmentDate && bookingSchedule.length > 0) {
      const validVets = getValidVetsForDate();
      // Cập nhật danh sách bác sĩ hợp lệ trong Redux
      dispatch(updateValidVets(validVets));
      console.log(validVets);
    }
  }, [formData.appointmentDate, bookingSchedule, dispatch]); // Dependency array bao gồm các giá trị sẽ trigger useEffect khi thay đổi

  const handleDoctorSelect = (vet) => {
    setSelectedDoctor(vet);
    updateFormData({
      veterinarianId: vet.userId,
      veterinarianName: `${vet.firstname} ${vet.lastname}`,
    });
  };

  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    updateFormData({ startTime: time });
  };

  const handleEndTimeChange = (e) => {
    const time = e.target.value;
    setEndTime(time);
    updateFormData({ endTime: time });
  };

  const handleClearDoctorSelection = () => {
    setSelectedDoctor(null);
    updateFormData({ veterinarianId: null, veterinarianName: null }); // Clear vet name as well
  };

  const getValidStartTimes = () => {
    if (!formData.appointmentDate) return [];

    // Chuyển appointmentDate thành tên ngày trong tuần
    const appointmentDayName = getWeekdayName(formData.appointmentDate);

    // Nếu không có bác sĩ được chọn, trả về danh sách giờ làm việc chung của tất cả bác sĩ
    if (!selectedDoctor) {
      const generalSchedule = bookingSchedule.find(
        (schedule) => schedule.availableDate === appointmentDayName
      );

      return generalSchedule?.availableTimes || availableTimes;
    }

    // Nếu có bác sĩ được chọn, tìm lịch làm việc của bác sĩ đó
    const vetSchedule = bookingSchedule.find(
      (schedule) =>
        schedule.veterinarianProfiles.some(
          (profile) =>
            profile.veterinarianProfilesId ===
            selectedDoctor.veterinarianProfilesId
        ) && schedule.availableDate === appointmentDayName
    );

    if (!vetSchedule) {
      toast.error("This doctor is not available on the selected date.");
      return [];
    }

    // Trả về danh sách giờ làm việc của bác sĩ nếu có
    return vetSchedule.availableTimes || availableTimes;
  };

  const getValidEndTimes = () => {
    return availableTimes.filter((time) => time > startTime);
  };

  // Function to format price with a comma and VND currency unit
  const formatPrice = (price) => {
    return price
      ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : "0 ₫";
  };

  return (
    <div className="flex flex-row min-h-[50vh] w-full gap-8 mt-5">
      <form className="w-3/4 mx-auto p-6 bg-white rounded-3xl shadow-lg mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">
            Choose a Veterinarian (Optional)
          </h2>

          {/* Clear button to deselect the vet */}
          <button
            type="button"
            onClick={handleClearDoctorSelection}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-500/90"
          >
            Clear Selection
          </button>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {getValidVetsForDate().map((vet) => (
            <div
              key={vet.veterinarianProfilesId}
              className={`p-4 border rounded-lg shadow-lg cursor-pointer transition-all ${
                selectedDoctor?.userId === vet.veterinarianProfilesId
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-200"
              }`}
              onClick={() => handleDoctorSelect(vet)}
            >
              <img
                src={vet.image || assets.DefaultAvatar}
                alt="Vet"
                className="w-20 h-28 rounded-lg object-cover"
              />
              <h3 className="text-lg font-semibold mt-2">{`${vet.firstname} ${vet.lastname}`}</h3>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">
            Booking Times
            {` for ${formData.veterinarianName || ""}`}
          </h3>

          <div className="flex items-center gap-10">
            {/* Select for Start Time */}
            <div className="mb-4">
              <label className="mr-2">Start Time:</label>
              <select
                value={startTime}
                onChange={handleStartTimeChange}
                className="p-2 border border-gray-300 rounded-lg"
              >
                <option value="" disabled>
                  Select Start Time
                </option>

                {getValidStartTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Select for End Time */}
            <div className="mb-4">
              <label className="mr-2">End Time:</label>
              <select
                value={endTime}
                onChange={handleEndTimeChange}
                className="p-2 border border-gray-300 rounded-lg"
                disabled={!startTime}
              >
                <option value="" disabled>
                  Select End Time
                </option>
                {getValidEndTimes().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* RIGHT SIDE */}
      <form className="flex flex-col gap-5 w-1/4 h-1/2 p-5 rounded-3xl shadow-lg border-gray-200 border bg-white">
        <section>
          <h1 className="text-lg font-bold">Appointment summary</h1>
          <div className="border-2 border-gray-200 grid grid-cols-2 gap-4 rounded-lg p-2 mt-2 w-full">
            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Date</p>
              {formData.appointmentDate || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Type</p>
              {formData.appointmentService || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Location</p>
              {formData.location || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">
                Vet's Name
              </p>
              {formData.veterinarianName || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">Start</p>
              {formData.startTime || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">End</p>
              {formData.endTime || "none"}
            </div>
          </div>
        </section>

        <section>
          <div className="flex flex-row justify-between items-center gap-5">
            <h1 className="text-lg font-bold">Total:</h1>
            <p className="font-bold text-blue-500">
              {formatPrice(invoiceData?.total)}
            </p>
          </div>
        </section>
      </form>
    </div>
  );
};

export default VetForm;
