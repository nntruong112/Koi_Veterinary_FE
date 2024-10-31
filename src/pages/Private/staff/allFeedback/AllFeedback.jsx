import React, { useEffect, useState } from "react";
import axios from "axios";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
      });
  }, []);

  return (
    <div className="p-5">
      {/* <h2 className="text-2xl font-semibold mb-4">All Feedbacks</h2> */}
      <div className="relative overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white text-gray-500 border border-gray-200 table-auto">
          <thead className="text-sm text-gray-700 uppercase bg-gray-200 border-b">
            <tr>
              <th className="px-4 py-3 border">Comment</th>
              <th className="px-4 py-3 border">Rating</th>
              <th className="px-4 py-3 border">Customer</th>
              {/* <th className="px-4 py-3 border">Appointment ID</th> */}
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((feedback) => (
              <tr
                key={feedback.feedbackId}
                className="border-b hover:bg-gray-100"
              >
                <td className="px-4 py-3 border">{feedback.comment}</td>
                <td className="px-4 py-3 border">{feedback.rating}</td>
                <td className="px-4 py-3 border">{feedback.customerId}</td>
                {/* <td className="px-4 py-3 border">{feedback.appointmentId}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
