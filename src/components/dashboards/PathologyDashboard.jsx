import { useState } from 'react';
import TestManagement from '../pathology/TestManagement';
import SampleCollection from '../pathology/SampleCollection';
import ReportGeneration from '../pathology/ReportGeneration';
import PathologyProfileForm from '../pathology/PathologyProfileForm';

export default function PathologyDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'tests':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <TestManagement />
          </div>
        );

      case 'samples':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <SampleCollection />
          </div>
        );

      case 'reports':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <ReportGeneration />
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
            <PathologyProfileForm />
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Welcome to Pathology Lab Management</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveView('tests')}
                    className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">🧪</span>
                    <span>Tests</span>
                  </button>
                  <button
                    onClick={() => setActiveView('samples')}
                    className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">🧫</span>
                    <span>Samples</span>
                  </button>
                  <button
                    onClick={() => setActiveView('reports')}
                    className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📄</span>
                    <span>Reports</span>
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
                  <h3 className="font-medium mb-2">Test Statistics</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Pending Tests: Loading...</p>
                    <p>Processing Tests: Loading...</p>
                    <p>Completed Today: Loading...</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Sample Collection</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Scheduled Collections: Loading...</p>
                    <p>Samples in Transit: Loading...</p>
                    <p>Received Today: Loading...</p>
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
      <h1 className="text-2xl font-bold mb-6">Pathology Dashboard</h1>
      {renderContent()}
    </div>
  );
}