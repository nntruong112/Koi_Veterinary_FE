import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  countAppointmentType,
  getAllAppointmentType,
} from "../../../../services/adminService";
import { saveCountAppointmentType } from "../../../../redux/slices/adminSlice";

const COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#8B1A1A",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const BookedServicesChart = () => {
  const dispatch = useDispatch();
  const countData =
    useSelector((state) => state.admin.data?.countAppointmentType) || [];
  const typeList = useSelector((state) => state.admin.data?.typeList) || [];

  useEffect(() => {
    const fetchData = async () => {
      // Lấy danh sách các loại dịch vụ
      await dispatch(getAllAppointmentType());

      // Đảm bảo typeList đã có dữ liệu trước khi đếm
      if (typeList.length > 0) {
        const countDataPromises = typeList.map(async (type) => {
          const countResult = await dispatch(
            countAppointmentType(type.appointmentTypeId)
          );
          return {
            name: type.appointmentService,
            value: countResult.payload || 0,
          };
        });

        // Chờ tất cả các giá trị đếm được lấy
        const updatedCountData = await Promise.all(countDataPromises);

        // Lưu dữ liệu đếm đã cập nhật vào Redux
        await dispatch(saveCountAppointmentType(updatedCountData));
      }
    };

    fetchData();
  }, [dispatch]);

  // Kiểm tra và đảm bảo countData là một mảng
  if (!Array.isArray(countData)) {
    console.error("countData is not an array", countData);
    return null;
  }

  // Lọc dữ liệu để chỉ lấy các mục có giá trị lớn hơn 0
  const filteredCountData = countData.filter((item) => item.value > 0);

  return (
    <div className="bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border w-full">
      <h2 className="text-lg font-medium mb-2">Services Distribution</h2>
      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={filteredCountData}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={120}
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {filteredCountData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookedServicesChart;
