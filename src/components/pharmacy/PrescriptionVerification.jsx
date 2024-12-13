import { useState } from 'react';
import toast from 'react-hot-toast';

const mockPrescriptions = [
  {
    id: '1',
    patientName: 'Jane Smith',
    doctorName: 'Dr. Johnson',
    status: 'pending',
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', duration: '7 days' },
      { name: 'Ibuprofen', dosage: '400mg', frequency: 'as needed', duration: '5 days' },
    ],
    date: '2024-01-15',
  },
];

export default function PrescriptionVerification() {
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);

  const handleVerification = async (prescriptionId, isVerified) => {
    try {
      // API call would go here
      setPrescriptions(prescriptions.map(prescription =>
        prescription.id === prescriptionId
          ? { ...prescription, status: isVerified ? 'verified' : 'rejected' }
          : prescription
      ));
      toast.success(`Prescription ${isVerified ? 'verified' : 'rejected'}`);
    } catch (error) {
      toast.error('Failed to update prescription status');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Prescription Verification</h2>
      
      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <div key={prescription.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">Prescription #{prescription.id}</h3>
                <p className="text-sm text-gray-500">Patient: {prescription.patientName}</p>
                <p className="text-sm text-gray-500">Doctor: {prescription.doctorName}</p>
                <p className="text-sm text-gray-500">Date: {prescription.date}</p>
              </div>
              <span className={`px-2 py-1 text-sm rounded-full ${
                prescription.status === 'verified'
                  ? 'bg-green-100 text-green-800'
                  : prescription.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
              </span>
            </div>

            <div className="space-y-4 mb-4">
              <h4 className="font-medium text-sm">Medications:</h4>
              {prescription.medications.map((medication, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <div className="font-medium">{medication.name}</div>
                  <div className="text-sm text-gray-600">
                    <p>Dosage: {medication.dosage}</p>
                    <p>Frequency: {medication.frequency}</p>
                    <p>Duration: {medication.duration}</p>
                  </div>
                </div>
              ))}
            </div>

            {prescription.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleVerification(prescription.id, true)}
                  className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
                >
                  Verify
                </button>
                <button
                  onClick={() => handleVerification(prescription.id, false)}
                  className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}