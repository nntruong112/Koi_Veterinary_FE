import { useState, useEffect } from "react";
import { assets } from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { getVetByRole } from "../../../../services/userService";
import { getAllBookingSchedule } from "../../../../services/bookingService";
import { updateValidVets } from "../../../../redux/slices/bookingSlice";

const timeSlots = [
  { slot: "1", start: "07:00", end: "09:00" },
  { slot: "2", start: "10:00", end: "12:00" },
  { slot: "3", start: "13:00", end: "15:00" },
  { slot: "4", start: "16:00", end: "18:00" },
];

const VetForm = ({ updateFormData }) => {
  const dispatch = useDispatch();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const formData = useSelector((state) => state.booking.data.bookingData);
  const invoiceData = useSelector((state) => state.booking.data.invoiceData);
  const vets = useSelector((state) => state.users.data.vets?.result);
  const bookingSchedule =
    useSelector((state) => state.booking.data.bookingSchedule) || [];
  const vetWorkingToday =
    useSelector((state) => state.booking.data?.vetWorkingToday) || [];

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

    return weekdayNames[date.getDay()]; // Lấy ngày theo mảng đã tạo
  };

  // Lọc ra các bác sĩ làm việc trong ngày mà khách hàng đặt
  const getValidVetsForDate = () => {
    if (!formData.appointmentDate && !selectedSlot) return [];

    // Chuyển appointmentDate thành tên ngày trong tuần
    const appointmentDayName = getWeekdayName(formData.appointmentDate);

    // Lọc danh sách lịch của các bác sĩ theo ngày
    const vetsWorkingToday = bookingSchedule
      .filter(
        (schedule) =>
          schedule.availableDate === appointmentDayName &&
          schedule.slot === selectedSlot?.slot
      )
      .flatMap((schedule) => schedule.veterinarianProfiles); // Chuyển đổi từ mảng lồng vào mảng phẳng

    return vetsWorkingToday;
  };

  // Dùng useEffect để cập nhật danh sách bác sĩ hợp lệ khi formData.appointmentDate hoặc bookingSchedule thay đổi
  useEffect(() => {
    if (
      formData.appointmentDate &&
      formData.slot &&
      bookingSchedule.length > 0
    ) {
      const validVets = getValidVetsForDate();

      // Cập nhật danh sách bác sĩ hợp lệ
      if (validVets && validVets.length > 0) {
        dispatch(updateValidVets(validVets));
      }
    }
  }, [formData.appointmentDate, formData.slot, bookingSchedule, dispatch]);

  // Xử lý việc chọn bác sĩ khi cần
  const handleDoctorSelect = (vet) => {
    setSelectedDoctor(vet);
    updateFormData({
      veterinarianId: vet.userId,
      veterinarianName: `${vet.firstname} ${vet.lastname}`,
    });
  };

  // Ghi nhận thay đổi khi chọn slot thời gian
  const handleSlotChange = (e) => {
    const selectedSlot = timeSlots.find((slot) => slot.slot === e.target.value);
    if (selectedSlot) {
      setSelectedSlot(selectedSlot);
      updateFormData({
        slot: selectedSlot.slot,
        startTime: selectedSlot.start,
        endTime: selectedSlot.end,
      });
    }
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
          <h1 className="text-2xl font-semibold mb-4">Booking Times</h1>

          {/* Xóa lựa chọn đã chọn */}
          <button
            type="button"
            onClick={handleClearDoctorSelection}
            className="bg-red-500 text-white py-2 px-4 rounded-lg mb-4 hover:bg-red-500/90"
          >
            Clear Selection
          </button>
        </div>

        <div className="mb-4 flex items-start gap-4">
          <div>
            <label className="mr-2">Select Time Slot:</label>
            <select
              value={formData.slot || ""}
              onChange={handleSlotChange}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select Slot
              </option>
              {timeSlots.map((slot) => (
                <option key={slot.slot} value={slot.slot}>
                  {slot.slot}
                </option>
              ))}
            </select>
          </div>

          <div className="font-medium flex flex-col gap-2">
            <p>Slot 1: 07:00 - 09:00</p>
            <p>Slot 2: 10:00 - 12:00</p>
            <p>Slot 3: 13:00 - 15:00</p>
            <p>Slot 4: 16:00 - 18:00</p>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-4 mt-12">
          Choose a veterinarian (Optional)
        </h1>

        <div className="grid grid-cols-2 gap-6">
          {vetWorkingToday.map((vet) => {
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
              <p className="text-gray-500 font-semibold text-base">
                Start time
              </p>
              {formData.startTime || "none"}
            </div>

            <div className="flex flex-col items-start gap-1">
              <p className="text-gray-500 font-semibold text-base">End time</p>
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
