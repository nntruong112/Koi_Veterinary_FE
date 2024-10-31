import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getIncomeByMonth } from "../../../../services/adminService";
import { saveIncomeByMonth } from "../../../../redux/slices/adminSlice";

const OverviewChart = () => {
  const dispatch = useDispatch();
  const incomeData =
    useSelector((state) => state.admin.data?.getIncomeByMonth) || [];

  useEffect(() => {
    const fetchData = async () => {
      const incomeByMonthPromises = [];

      // Duyệt qua 12 tháng và tạo promise cho từng tháng
      for (let month = 1; month <= 12; month++) {
        incomeByMonthPromises.push(dispatch(getIncomeByMonth(month)));
      }

      // Chờ cho tất cả các promise hoàn thành
      const incomeByMonthResults = await Promise.all(incomeByMonthPromises);

      // Chuyển đổi kết quả thành định dạng mong muốn
      const updatedIncomeData = incomeByMonthResults.map((result, index) => ({
        month: index + 1,
        amount: result.payload || 0,
      }));

      await dispatch(saveIncomeByMonth(updatedIncomeData));
    };

    fetchData();
  }, [dispatch]);

  // Kiểm tra và đảm bảo countData là một mảng
  if (!Array.isArray(incomeData)) {
    console.error("countData is not an array", incomeData);
    return null;
  }

  // Tạo mảng thu nhập cho 12 tháng với tên và giá trị
  const formattedIncomeData = Array.from({ length: 12 }, (_, index) => {
    const monthIndex = index + 1; // Tháng từ 1 đến 12
    const monthData = incomeData.find((data) => data.month === monthIndex);
    console.log(incomeData);

    return {
      name: `${monthIndex}`,
      income: monthData ? monthData.amount : 0, // Nếu không có dữ liệu, gán là 0
    };
  });

  const formatToMillions = (value) => {
    return (value / 1_000_000).toLocaleString("vi-VN");
  };

  return (
    <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-5 border w-full">
      <h2 className="text-lg font-medium mb-4">Total income overview</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={formattedIncomeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(value) => formatToMillions(value)}
              label={{
                value: "Million VND",
                angle: -90,
                position: "insideTopLeft",
                dx: -10,
                dy: -10,
                fill: "#4B5563",
                fontSize: 12,
              }}
            />
            <Tooltip
              formatter={(value) => `${formatToMillions(value)} million ₫`}
              cursor={{ stroke: "#1A73E8", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#1A73E8"
              strokeWidth={3}
              dot={{ fill: "#1A73E8", strokeWidth: 2, r: 8 }}
              activeDot={{ r: 10, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OverviewChart;
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const OverviewChart = () => {
//   const [monthlyIncome, setMonthlyIncome] = useState([]);
//   const token = useSelector((state) => state.auth.data?.token);
//   const formatToMillions = (value) => {
//     return (value / 1_000_000).toLocaleString("vi-VN");
//   };

//   useEffect(() => {
//     const fetchMonthlyIncome = async () => {
//       const incomeData = [];
//       for (let month = 1; month <= 12; month++) {
//         try {
//           const response = await axios.get(
//             `http://localhost:8080/payments/amount-in-month/${month}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Thêm token vào header
//               },
//             }
//           );
//           incomeData.push({ month: month, sales: response.data }); // Lưu tháng dưới dạng số
//         } catch (error) {
//           console.error(`Lỗi khi lấy dữ liệu cho tháng ${month}:`, error);
//         }
//       }
//       setMonthlyIncome(incomeData);
//     };

//     fetchMonthlyIncome();
//   }, []);

//   return (
//     <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-5 border w-full">
//       <h2 className="text-lg font-medium mb-4">Monthly income overview</h2>
//       <div className="h-80">
//         <ResponsiveContainer width={"100%"} height={"100%"}>
//           <LineChart data={monthlyIncome}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
//             <XAxis
//               dataKey="month"
//               stroke="#9ca3af"
//               tickFormatter={(month) => month.toString()}
//             />
//             <YAxis
//               stroke="#9ca3af"
//               tickFormatter={(value) => formatToMillions(value)}
//               label={{
//                 value: "Million VND",
//                 angle: -90,
//                 position: "insideTopLeft",
//                 dx: -10,
//                 dy: -10,
//                 fill: "#4B5563",
//                 fontSize: 12,
//               }}
//             />
//             <Tooltip
//               formatter={(value) => `${formatToMillions(value)} million ₫`}
//               cursor={{ stroke: "#1A73E8", strokeWidth: 2 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="sales"
//               stroke="#1A73E8"
//               strokeWidth={3}
//               dot={{ fill: "#1A73E8", strokeWidth: 2, r: 8 }}
//               activeDot={{ r: 10, strokeWidth: 2 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default OverviewChart;
