// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const Doctors = () => {
//   const { fishId } = useParams(); // Get fishId
//   const [healthRecords, setHealthRecords] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHealthRecords = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:8080/api/health-records/fish/${fishId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Add token to Authorization header
//             },
//           }
//         ); //enpoing backend a may chu
//         setHealthRecords(response.data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHealthRecords();
//   }, [fishId]);

//   if (loading) return <p>Loading health records...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-semibold mb-4">
//         Health Records for Fish ID: {fishId}
//       </h2>
//       {healthRecords.length === 0 ? (
//         <p>No health records available for this fish.</p>
//       ) : (
//         <div className="space-y-6">
//           {healthRecords.map((record) => (
//             <div
//               key={record.healthRecordId}
//               className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
//             >
//               <p>
//                 <strong>Date:</strong> {record.createdDate}
//               </p>
//               <p>
//                 <strong>Diagnosis:</strong> {record.diagnosis}
//               </p>
//               <p>
//                 <strong>Treatment:</strong> {record.treatment}
//               </p>
//               <p>
//                 <strong>Fish Species:</strong> {record.fish.species}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Doctors;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const { fishId } = useParams(); // Get fishId
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please login.");
        }
        const response = await axios.get(
          `http://localhost:8080/api/health-records/fish/${fishId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
          }
        );
        setHealthRecords(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (fishId) {
      fetchHealthRecords();
    } else {
      setError("No fish ID provided.");
      setLoading(false);
    }
  }, [fishId]);

  if (loading) return <p>Loading health records...</p>;
  if (error)
    return (
      <p className="text-red-500 font-semibold">
        {error.includes("401")
          ? "Unauthorized. Please login again."
          : `Error: ${error}`}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">
        Health Records for Fish ID: {fishId}
      </h2>
      {healthRecords.length === 0 ? (
        <p>
          No health records available for this fish. Please check back later or
          contact support.
        </p>
      ) : (
        <div className="space-y-6">
          {healthRecords.map((record) => (
            <div
              key={record.healthRecordId}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
            >
              <p>
                <strong>Date:</strong> {formatDate(record.createdDate)}
              </p>
              <p>
                <strong>Diagnosis:</strong> {record.diagnosis}
              </p>
              <p>
                <strong>Treatment:</strong> {record.treatment}
              </p>
              <p>
                <strong>Fish Species:</strong> {record.fish.species}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors;
