import { useState } from 'react';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">System Administration</h2>
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h3 className="font-medium mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-2">
                <span className="text-lg">👥</span>
                <span>User Management</span>
              </button>
              <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2">
                <span className="text-lg">🏥</span>
                <span>Hospital Approvals</span>
              </button>
              <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center space-y-2">
                <span className="text-lg">👨‍⚕️</span>
                <span>Doctor Verifications</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">System Statistics</h3>
              <div className="space-y-2 text-gray-600">
                <p>Total Users: Loading...</p>
                <p>Active Hospitals: Loading...</p>
                <p>Verified Doctors: Loading...</p>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Recent Activities</h3>
              <div className="space-y-2 text-gray-600">
                <p>Loading recent activities...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}