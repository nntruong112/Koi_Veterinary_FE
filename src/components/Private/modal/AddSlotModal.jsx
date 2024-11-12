import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addSlotForVet } from "../../../services/adminService";

const AddSlotModal = ({ vetId, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const scheduleOfVet = useSelector((state) => state.admin.data.scheduleOfAll);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [formData, setFormData] = useState({
    scheduleId: selectedScheduleId,
    veterinarianId: vetId,
  });

  useEffect(() => {
    if (selectedScheduleId) {
      setFormData((prevData) => ({
        ...prevData,
        scheduleId: selectedScheduleId,
      }));
    }
  }, [selectedScheduleId]);

  const handleSelectSchedule = (scheduleId) => {
    setSelectedScheduleId(scheduleId); // Cập nhật scheduleId đã chọn
  };

  const handleSave = () => {
    if (selectedScheduleId) {
      dispatch(addSlotForVet(formData)); // Gọi API với formData đã cập nhật
      toast.success("Slot added successfully");
      onSave(); // Gọi onSave để đóng modal sau khi lưu thành công
    } else {
      toast.warn("Please select a schedule");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 bg-opacity-50 z-20">
      <div className="bg-white p-6 rounded-lg w-2/3">
        <h3 className="font-bold text-xl mb-4 text-center">Add New Slot</h3>

        {/* Display scheduleOfVet array */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Available Schedules:</h4>
          {scheduleOfVet && scheduleOfVet.length > 0 ? (
            <div className="grid grid-cols-5 gap-4">
              {scheduleOfVet.map((schedule) => (
                <div
                  key={schedule.scheduleId}
                  className={`bg-gray-100 p-3 rounded-lg shadow-sm cursor-pointer hover:bg-blue-100 ${
                    selectedScheduleId === schedule.scheduleId
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => handleSelectSchedule(schedule.scheduleId)}
                >
                  <p className="text-sm font-medium text-gray-700 flex flex-col gap-4">
                    <span>
                      <strong>Date:</strong> {schedule.availableDate}
                    </span>
                    <span>
                      <strong>Slot:</strong> {schedule.slot}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No schedules available.</p>
          )}
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSave} // Gọi API khi nhấn Save
            className="bg-primary text-white rounded-full py-2 px-6 mr-2 hover:bg-primary/90"
          >
            Save Slot
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white rounded-full py-2 px-6 hover:bg-red-500/80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSlotModal;
