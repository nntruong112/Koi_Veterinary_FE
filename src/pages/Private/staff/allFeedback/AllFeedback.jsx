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
      <div className="relative overflow-x-auto rounded-2xl shadow-lg">
        <table className="min-w-full bg-white text-gray-500 border border-gray-200 table-auto">
          <thead className="text-sm text-gray-700 uppercase bg-gray-200 border-b">
            <tr>
              <th className="px-4 py-3 border">Comment</th>
              <th className="px-4 py-3 border">Rating</th>
              <th className="px-4 py-3 border">Customer</th>
              <th className="px-4 py-3 border">Veterinarian</th>
              <th className="px-4 py-3 border">Punctuality</th>
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
                <td className="px-4 py-3 border">
                  {feedback.customer &&
                  feedback.customer.lastname &&
                  feedback.customer.firstname
                    ? `${feedback.customer.lastname} ${feedback.customer.firstname}`
                    : "N/A"}
                </td>
                <td className="px-4 py-3 border">
                  {feedback.appointment.veterinarian &&
                  feedback.appointment.veterinarian.lastname &&
                  feedback.appointment.veterinarian.firstname
                    ? `${feedback.appointment.veterinarian.lastname} ${feedback.appointment.veterinarian.firstname}`
                    : "N/A"}
                </td>
                <td className="px-4 py-3 border">{feedback.punctuality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
