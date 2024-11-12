import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVetByRole } from "../../../../services/userService";
import { getAllSchedule } from "../../../../services/adminService";
import AddSlotModal from "../../../../components/Private/modal/AddSlotModal";

const ScheduleOfVet = () => {
  const dispatch = useDispatch();
  const vets = useSelector((state) => state.users.data.vets?.result);
  const scheduleOfVet = useSelector((state) => state.admin.data?.scheduleOfAll);
  const [selectedVetId, setSelectedVetId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getVetByRole());
    dispatch(getAllSchedule());
  }, [dispatch]);

  const handleAddSlot = (userId) => {
    setSelectedVetId(userId);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedVetId(null); // Reset selectedVetId when closing modal
  };

  return (
    <div className="p-5">
      {vets && vets.length > 0 ? (
        vets.map((vet) => (
          <div
            key={vet.userId}
            className="bg-white p-5 m-5 border border-gray-300 rounded-lg shadow-sm"
          >
            <h4 className="font-bold text-lg">
              Veterinarian name:{" "}
              <span className="font-normal">
                {vet.firstname} {vet.lastname}
              </span>
            </h4>

            <h5 className="font-bold text-lg mt-2">Working Slots:</h5>
            {scheduleOfVet && scheduleOfVet.length > 0 ? (
              scheduleOfVet
                .filter((schedule) =>
                  schedule.veterinarianProfiles.some(
                    (profile) => profile.userId === vet.userId
                  )
                )
                .map((schedule) => (
                  <div
                    key={schedule.scheduleId}
                    className="grid grid-cols-3 gap-4 mt-4 ml-40"
                  >
                    <div>
                      <strong>Date:</strong> {schedule.availableDate}
                    </div>
                    <div>
                      <strong>Slot:</strong> {schedule.slot}
                    </div>
                    <div>
                      <strong>Time:</strong> {schedule.startTime} -{" "}
                      {schedule.endTime}
                    </div>
                  </div>
                ))
            ) : (
              <p>No slots available.</p>
            )}
            <button
              onClick={() => handleAddSlot(vet.userId)}
              className="bg-primary text-white rounded-full p-2 mt-4 hover:bg-primary/90"
            >
              Add Slot
            </button>
          </div>
        ))
      ) : (
        <p>No veterinarians available.</p>
      )}

      {isModalVisible && selectedVetId && (
        <AddSlotModal
          vetId={selectedVetId}
          onSave={() => {
            // Handle saving slot here
            setModalVisible(false);
          }}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ScheduleOfVet;
