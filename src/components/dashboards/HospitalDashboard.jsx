export default function HospitalDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hospital Dashboard</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Welcome to Hospital Management</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium">Quick Actions</h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <button className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                Manage Staff
              </button>
              <button className="p-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                View Departments
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Hospital Statistics</h3>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      </div>
    </div>
  );
}