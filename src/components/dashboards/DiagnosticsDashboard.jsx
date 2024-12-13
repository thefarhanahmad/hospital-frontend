import { useState } from 'react';
import AppointmentForm from '../diagnostics/appointment/AppointmentForm';
import MachineStatus from '../diagnostics/MachineStatus';
import ReportForm from '../diagnostics/report/ReportForm';
import DiagnosticsProfileForm from '../diagnostics/DiagnosticsProfileForm';

export default function DiagnosticsDashboard() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'appointments':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <AppointmentForm />
          </div>
        );

      case 'machines':
        return (
          <div>
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <MachineStatus />
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
            <ReportForm />
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
            <DiagnosticsProfileForm />
          </div>
        );

      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6">Welcome to Diagnostics Center</h2>
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    onClick={() => setActiveView('appointments')}
                    className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">📅</span>
                    <span>Appointments</span>
                  </button>
                  <button
                    onClick={() => setActiveView('machines')}
                    className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors flex flex-col items-center justify-center space-y-2"
                  >
                    <span className="text-lg">🔧</span>
                    <span>Machines</span>
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
                  <h3 className="font-medium mb-2">Today's Schedule</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Total Appointments: Loading...</p>
                    <p>Completed Scans: Loading...</p>
                    <p>Pending Reports: Loading...</p>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Machine Status</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Active Machines: Loading...</p>
                    <p>Under Maintenance: Loading...</p>
                    <p>Next Service Due: Loading...</p>
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
      <h1 className="text-2xl font-bold mb-6">Diagnostics Dashboard</h1>
      {renderContent()}
    </div>
  );
}