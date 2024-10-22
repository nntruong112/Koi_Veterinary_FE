import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { countByRole } from "../../../../services/adminService";
import { saveCount } from "../../../../redux/slices/adminSlice";

const SummaryCard = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.admin.data.countByRole);

  useEffect(() => {
    const fetchData = async () => {
      // Dispatch các action bất đồng bộ
      const userCount = await dispatch(countByRole("USER"));
      const vetCount = await dispatch(countByRole("VET"));
      const staffCount = await dispatch(countByRole("STAFF"));

      await dispatch(
        saveCount({
          USER: userCount.payload,
          VET: vetCount.payload,
          STAFF: staffCount.payload,
        })
      );
    };

    fetchData();
  }, [dispatch]);
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <FaUser />
          <p>Total users</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count.USER}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <FaUserDoctor />
          <p>Total vets</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count.VET}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <RiUserReceivedFill />
          <p>Total staffs</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count.STAFF}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <RiUserReceivedFill />
          <p>Total revenue</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> 0</strong>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
