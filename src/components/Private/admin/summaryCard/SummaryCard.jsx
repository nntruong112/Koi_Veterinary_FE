import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { RiUserReceivedFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { countByRole, totalIncome } from "../../../../services/adminService";
import { saveCount } from "../../../../redux/slices/adminSlice";

const SummaryCard = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.admin.data?.countByRole) || 0;
  const total = useSelector((state) => state.admin.data?.totalIncome) || 0;

  useEffect(() => {
    const fetchData = async () => {
      const userCount = await dispatch(countByRole("USER"));
      const vetCount = await dispatch(countByRole("VET"));
      const staffCount = await dispatch(countByRole("STAFF"));
      await dispatch(totalIncome());
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

  // Hàm đinhj dạng đơn vị tiền tệ
  const formatToMillions = (price) => {
    return (price / 1_000_000).toLocaleString("vi-VN");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <FaUser />
          <p>Total users</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count?.USER}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <FaUserDoctor />
          <p>Total vets</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count?.VET}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <RiUserReceivedFill />
          <p>Total staffs</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl "> {count?.STAFF}</strong>
        </div>
      </div>

      <div className="text-lg w-52 rounded-lg p-2 bg-white shadow-md">
        <div className="flex items-center justify-start gap-2">
          <RiUserReceivedFill />
          <p>Total income</p>
        </div>
        <div className="text-center">
          <strong className="text-2xl ">
            {formatToMillions(total)} million ₫
          </strong>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
