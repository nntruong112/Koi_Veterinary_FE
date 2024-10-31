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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Feedbacks</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Feedback ID</th>
            <th className="px-4 py-2 border">Comment</th>
            <th className="px-4 py-2 border">Rating</th>
            <th className="px-4 py-2 border">Customer ID</th>
            <th className="px-4 py-2 border">Appointment ID</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <tr key={feedback.feedbackId}>
              <td className="px-4 py-2 border">{feedback.feedbackId}</td>
              <td className="px-4 py-2 border">{feedback.comment}</td>
              <td className="px-4 py-2 border">{feedback.rating}</td>
              <td className="px-4 py-2 border">{feedback.customerId}</td>
              <td className="px-4 py-2 border">{feedback.appointmentId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
