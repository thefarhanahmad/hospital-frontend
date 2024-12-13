import { useState } from 'react';
import InventoryManagement from '../pharmacy/InventoryManagement';
import OrderProcessing from '../pharmacy/OrderProcessing';
import PrescriptionVerification from '../pharmacy/PrescriptionVerification';
import PharmacyProfileForm from '../pharmacy/PharmacyProfileForm';
import BillManagement from '../pharmacy/billing/BillManagement';
import BillList from '../pharmacy/billing/BillList';

export default function PharmacyDashboard() {
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

      case 'orders':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <OrderProcessing />
          </div>
        );

      case 'prescriptions':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <PrescriptionVerification />
          </div>
        );

      case 'create-bill':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <BillManagement />
          </div>
        );

      case 'view-bills':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <BillList />
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
            <PharmacyProfileForm />
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Welcome to Pharmacy Management</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveView('inventory')}
                    className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📦</span>
                    <span>Inventory</span>
                  </button>
                  <button
                    onClick={() => setActiveView('orders')}
                    className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">🛒</span>
                    <span>Orders</span>
                  </button>
                  <button
                    onClick={() => setActiveView('prescriptions')}
                    className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📋</span>
                    <span>Prescriptions</span>
                  </button>
                  <button
                    onClick={() => setActiveView('create-bill')}
                    className="p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📝</span>
                    <span>Create Bill</span>
                  </button>
                  <button
                    onClick={() => setActiveView('view-bills')}
                    className="p-4 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📊</span>
                    <span>View Bills</span>
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
                  <h3 className="font-medium mb-2">Inventory Overview</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Total Items: Loading...</p>
                    <p>Low Stock Items: Loading...</p>
                    <p>Expired Items: Loading...</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Recent Orders</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Pending Orders: Loading...</p>
                    <p>Processing Orders: Loading...</p>
                    <p>Completed Today: Loading...</p>
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
      <h1 className="text-2xl font-bold mb-6">Pharmacy Dashboard</h1>
      {renderContent()}
    </div>
  );
}