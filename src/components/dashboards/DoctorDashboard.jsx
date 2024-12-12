import { useState } from "react";
import DoctorRegistrationForm from "../doctor/DoctorRegistrationForm";
import ConsultationForm from "../consultation/ConsultationForm";
import PrescriptionList from "../prescription/PrescriptionList";
import PrescriptionForm from "../prescription/PrescriptionForm";

export default function DoctorDashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "registration":
        return (
          <div>
            <button
              onClick={() => setActiveView("dashboard")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <DoctorRegistrationForm />
          </div>
        );
      case "consultation":
        return (
          <div>
            <button
              onClick={() => setActiveView("dashboard")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <ConsultationForm />
          </div>
        );
      case "prescriptions":
        return (
          <div>
            <button
              onClick={() => setActiveView("dashboard")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <PrescriptionList />
          </div>
        );
      case "appointments":
        return (
          <div>
            <button
              onClick={() => setActiveView("dashboard")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <div>appointments</div>
          </div>
        );
      case "add-prescription":
        return (
          <div>
            <button
              onClick={() => setActiveView("dashboard")}
              className="mb-4 text-sm text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Dashboard
            </button>
            <div>
              <PrescriptionForm />
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Welcome, Doctor!</h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h3 className="font-medium">Quick Actions</h3>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveView("registration")}
                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    Complete Registration
                  </button>
                  <button
                    onClick={() => setActiveView("consultation")}
                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    Schedule Consultation
                  </button>
                  <button
                    onClick={() => setActiveView("add-prescription")}
                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    Add Prescriptions
                  </button>
                  <button
                    onClick={() => setActiveView("prescriptions")}
                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    View Prescriptions
                  </button>
                  <button
                    onClick={() => setActiveView("appointments")}
                    className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    View Appointmens
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Registration Status</h3>
                <p className="text-gray-600">
                  Please complete your registration to access all features
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      {renderContent()}
    </div>
  );
}
