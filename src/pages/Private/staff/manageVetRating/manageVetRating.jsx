import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageRating = () => {
  const token = useSelector((state) => state.auth.data?.token);

  const [vetUsers, setVetUsers] = useState([]); // Lưu danh sách VET users với userId và username
  const [selectedUserId, setSelectedUserId] = useState(""); // userId được chọn
  const [penaltyType, setPenaltyType] = useState("late");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVetUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/role/VET",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setVetUsers(
          response.data.result.map((user) => ({
            userId: user.userId,
            lastname: user.lastname,
            firstname: user.firstname,
          }))
        ); // Lưu các userId và username vào state
      } catch (error) {
        console.error("Error fetching VET users:", error);
        toast.error("Failed to load VET users.");
      }
    };

    fetchVetUsers();
  }, [token]);

  const handleUserChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const handlePenaltyChange = (e) => {
    setPenaltyType(e.target.value);
  };

  const applyPenalty = async () => {
    if (!selectedUserId) {
      setError("Please select a user ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const penaltyUrl =
        penaltyType === "late"
          ? `http://localhost:8080/users/late-penalty/${selectedUserId}`
          : `http://localhost:8080/users/absent-penalty/${selectedUserId}`;

      await axios.post(
        penaltyUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `${
          penaltyType === "late" ? "Late" : "Absent"
        } penalty applied successfully!`
      );
    } catch (error) {
      setError("Error applying penalty.");
      console.error("Error:", error);
      toast.error("Error applying penalty!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-gray-50 shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Apply Penalty
      </h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-5">
        <div className="flex items-center mb-4">
          <label className="text-lg mr-2">Select Vet to manage Rating:</label>
          <select
            value={selectedUserId}
            onChange={handleUserChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select User --</option>
            {vetUsers.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.lastname} {user.firstname}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label className="text-lg mr-2">Penalty Type:</label>
          <select
            value={penaltyType}
            onChange={handlePenaltyChange}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="late">Late Penalty</option>
            <option value="absent">Absent Penalty</option>
          </select>
        </div>

        <button
          onClick={applyPenalty}
          className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Applying..." : "Apply Penalty"}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ManageRating;
