import { useState } from 'react';
import toast from 'react-hot-toast';
import { updateDoctorVerification } from '../../services/doctorVerificationService';

export default function DoctorVerificationStatus({ doctorId, currentStatus }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus || 'pending');

  const handleVerificationUpdate = async (newStatus) => {
    try {
      setIsLoading(true);
      await updateDoctorVerification(doctorId, {
        status: newStatus,
        remarks: newStatus === 'approved' 
          ? 'All submitted documents are verified.'
          : 'Documents require revision.',
      });
      setStatus(newStatus);
      toast.success(\`Doctor verification status updated to \${newStatus}\`);
    } catch (error) {
      toast.error(error.message || 'Failed to update verification status');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadgeClass = () => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Verification Status</h3>
        <span
          className={\`px-3 py-1 rounded-full text-sm font-medium \${getStatusBadgeClass()}\`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        {status === 'pending' && (
          <div className="flex space-x-4">
            <button
              onClick={() => handleVerificationUpdate('approved')}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Approve'}
            </button>
            <button
              onClick={() => handleVerificationUpdate('rejected')}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Reject'}
            </button>
          </div>
        )}

        {status === 'rejected' && (
          <button
            onClick={() => handleVerificationUpdate('pending')}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Mark as Pending'}
          </button>
        )}

        {status === 'approved' && (
          <p className="text-green-700">
            This doctor's verification has been approved. All documents have been verified.
          </p>
        )}
      </div>
    </div>
  );
}