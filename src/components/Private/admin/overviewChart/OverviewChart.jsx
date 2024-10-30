import React from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OverviewChart = () => {
  const formatToMillions = (value) => {
    return (value / 1_000_000).toLocaleString("vi-VN");
  };

  const totalIncome =
    useSelector((state) => state.admin.data?.totalIncome) || 0;
  const totalIncomeData = [{ name: "Total", sales: totalIncome }];

  return (
    <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-5 border w-full">
      <h2 className="text-lg font-medium mb-4">Total income overview</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={totalIncomeData}>
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
              dataKey="sales"
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
