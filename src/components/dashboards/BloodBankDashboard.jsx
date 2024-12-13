import { useState } from 'react';
import InventoryManagement from '../bloodbank/InventoryManagement';
import DonorManagement from '../bloodbank/DonorManagement';
import RequestManagement from '../bloodbank/RequestManagement';
import BloodBankProfileForm from '../bloodbank/BloodBankProfileForm';

export default function BloodBankDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'inventory':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <InventoryManagement />
          </div>
        );

      case 'donors':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <DonorManagement />
          </div>
        );

      case 'requests':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <RequestManagement />
          </div>
        );

      case 'profile':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <BloodBankProfileForm />
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Welcome to Blood Bank Management</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveView('inventory')}
                    className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">🩸</span>
                    <span>Inventory</span>
                  </button>
                  <button
                    onClick={() => setActiveView('donors')}
                    className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">👥</span>
                    <span>Donors</span>
                  </button>
                  <button
                    onClick={() => setActiveView('requests')}
                    className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📋</span>
                    <span>Requests</span>
                  </button>
                  <button
                    onClick={() => setActiveView('profile')}
                    className="p-4 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">⚙️</span>
                    <span>Settings</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Blood Inventory</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>A+ Units: Loading...</p>
                    <p>B+ Units: Loading...</p>
                    <p>O+ Units: Loading...</p>
                    <p>Critical Levels: Loading...</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Recent Activity</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Pending Requests: Loading...</p>
                    <p>Today's Donations: Loading...</p>
                    <p>Units Dispatched: Loading...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blood Bank Dashboard</h1>
      {renderContent()}
    </div>
  );
}