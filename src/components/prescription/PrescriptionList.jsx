import { useState, useEffect } from "react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { getPrescriptions } from "../../services/prescriptionService";

export default function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      setIsLoading(true);
      const data = await getPrescriptions();
      console.log("prescription  : ", data);
      setPrescriptions(data.data.prescription);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch prescriptions");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  if (prescriptions?.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center text-gray-500">
        No prescriptions found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Prescriptions</h2>
      <div className="grid gap-6">
        {prescriptions?.map((prescription) => (
          <div
            key={prescription?._id}
            className="bg-white shadow rounded-lg p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  Patient ID: {prescription?.patient}
                </h3>
                <p className="text-sm text-gray-500">
                  Consultation ID: {prescription?.consultation}
                </p>
              </div>
              <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
                Active
              </span>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Diagnosis</h4>
              <p className="text-gray-700">{prescription?.diagnosis}</p>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Medications</h4>
              <div className="space-y-2">
                {prescription?.medications?.map((med, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-3 rounded-md space-y-1"
                  >
                    <p className="font-medium">{med.name}</p>
                    <p className="text-sm text-gray-600">
                      Dosage: {med.dosage} | Frequency: {med.frequency}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {med.duration}
                    </p>
                    <p className="text-sm text-gray-600">
                      Instructions: {med.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {prescription?.tests && prescription?.tests.length > 0 && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Tests</h4>
                <div className="space-y-2">
                  {prescription?.tests.map((test, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-md space-y-1"
                    >
                      <p className="font-medium">{test.name}</p>
                      <p className="text-sm text-gray-600">
                        Instructions: {test.instructions}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Follow-up Date:</span>{" "}
                {format(new Date(prescription?.followUp), "PPpp")}
              </div>
              <div>
                <span className="font-medium">Valid Until:</span>{" "}
                {format(new Date(prescription?.validUntil), "PPpp")}
              </div>
            </div>

            {prescription?.advice && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">General Advice</h4>
                <p className="text-gray-700">{prescription?.advice}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
