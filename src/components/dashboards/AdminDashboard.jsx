import { useState } from 'react';
import DoctorVerificationStatus from '../doctor/DoctorVerificationStatus';

export default function AdminDashboard() {
  const [doctors] = useState([
    {
      id: '675855b5dfdb76bd8b52c993',
      name: 'Dr. John Doe',
      status: 'pending',
    },
    // Add more doctors as needed
  ]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Doctor Verifications</h2>
          
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="border-b pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-medium mb-4">{doctor.name}</h3>
                <DoctorVerificationStatus
                  doctorId={doctor.id}
                  currentStatus={doctor.status}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}