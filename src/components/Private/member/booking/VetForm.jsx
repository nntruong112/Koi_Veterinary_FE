import { useState, useEffect } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getVetByRole } from "../../../../services/userService";
import {
  getAllBookingSchedule,
  getSpeciality,
} from "../../../../services/bookingService";
import { updateValidVets } from "../../../../redux/slices/bookingSlice";

const availableTimes = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
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
  const vets = useSelector((state) => state.users.data.vets?.result);
  const bookingSchedule =
    useSelector((state) => state.booking.data.bookingSchedule) || [];

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getVetByRole());
      await dispatch(getAllBookingSchedule());
    };

    fetchData();
  }, [dispatch]);

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

  // Lọc ra các bác sĩ làm việc trong ngày mà khách hàng đặt
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
      // Cập nhật danh sách bác sĩ hợp lệ
      dispatch(updateValidVets(validVets));
    }
  }, [formData.appointmentDate, bookingSchedule, dispatch]);

  // Xử lý việc chọn bác sĩ khi cần
  const handleDoctorSelect = (vet) => {
    setSelectedDoctor(vet);
    updateFormData({
      veterinarianId: vet.userId,
      veterinarianName: `${vet.firstname} ${vet.lastname}`,
    });
  };

  // Ghi nhận thay đổi khi chọn giờ bắt đầu
  const handleStartTimeChange = (event) => {
    const time = event.target.value;
    setStartTime(time);
    updateFormData({ startTime: time });
  };

  // Ghi nhận thay đổi khi chọn giừo kết thúc
  const handleEndTimeChange = (e) => {
    const time = e.target.value;
    setEndTime(time);
    updateFormData({ endTime: time });
  };

  // Set up các thông tin đã chọn về trạng thái ban đầu
  const handleClearDoctorSelection = () => {
    setSelectedDoctor(null);
    updateFormData({
      veterinarianId: null,
      veterinarianName: null,
      startTime: null,
      endTime: null,
    });
  };

  // Chỉ lấy giờ kết thúc hợp lệ
  const getValidEndTimes = () => {
    return availableTimes.filter((time) => time > startTime);
  };

  // Hàm định dạng đơn vị tiền tệ
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
            Choose a veterinarian (Optional)
          </h2>

          {/* Xóa lựa chọn đã chọn */}
          <button
            type="button"
            onClick={handleClearDoctorSelection}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-500/90"
          >
            Clear Selection
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {getValidVetsForDate().map((vet) => {
            // Tìm ảnh của bác sĩ từ mảng vets dựa vào userId
            const vetImage =
              vets.find((v) => v.userId === vet.userId)?.image ||
              assets.DefaultAvatar;

            // Tìm specialty ứng với bác sĩ
            const vetSpeciality = vets.find(
              (v) => v.userId === vet.userId
            )?.fishSpecialty;

            return (
              <div
                key={vet.veterinarianProfilesId}
                className={`p-4 border rounded-lg shadow-lg cursor-pointer flex items-center gap-4 ${
                  selectedDoctor?.userId === vet.userId
                    ? "border-primary"
                    : "border-gray-200"
                }`}
                onClick={() => handleDoctorSelect(vet)}
              >
                <img
                  src={vetImage}
                  alt="Vet"
                  className="w-24 h-36 rounded-lg object-cover"
                />
                <div className="w-full flex flex-col gap-2">
                  <h3 className="text-xl font-semibold mt-2 text-center">{`${vet.firstname} ${vet.lastname}`}</h3>
                  <div className="flex flex-wrap gap-2">
                    <p className="font-semibold">Specialty name:</p>
                    <span>
                      {vetSpeciality?.fishSpecialtyName || "No available"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <p className="font-semibold">Category:</p>
                    <span>{vetSpeciality?.category || "No available"}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <p className="font-semibold">Description:</p>
                    <span>
                      {vetSpeciality?.description || "No description available"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
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

                {availableTimes.map((time) => (
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
                Vet's name
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
