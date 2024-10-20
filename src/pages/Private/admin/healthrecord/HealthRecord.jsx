import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const HealthRecordPage = () => {
  const { fishId } = useParams(); // Get fishId
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/health-records/fish/${fishId}`
        ); //enpoing backend a may chu
        setHealthRecords(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHealthRecords();
  }, [fishId]);

  if (loading) return <p>Loading health records...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">
        Health Records for Fish ID: {fishId}
      </h2>
      {healthRecords.length === 0 ? (
        <p>No health records available for this fish.</p>
      ) : (
        <div className="space-y-6">
          {healthRecords.map((record) => (
            <div
              key={record.healthRecordId}
              className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-md"
            >
              <p>
                <strong>Date:</strong> {record.createdDate}
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

export default HealthRecordPage;
