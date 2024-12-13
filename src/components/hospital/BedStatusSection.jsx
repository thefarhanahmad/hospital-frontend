import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { getBedStatus, updateBedStatus } from '../../services/hospitalService';

export default function BedStatusSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [bedStatus, setBedStatus] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchBedStatus();
  }, []);

  const fetchBedStatus = async () => {
    try {
      setIsLoading(true);
      const data = await getBedStatus();
      setBedStatus(data);
    } catch (error) {
      toast.error('Failed to fetch bed status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBedStatus = async (wardId, updates) => {
    try {
      setIsUpdating(true);
      await updateBedStatus(wardId, updates);
      await fetchBedStatus();
      toast.success('Bed status updated successfully');
    } catch (error) {
      toast.error('Failed to update bed status');
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-6">Hospital Bed Status</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Example ward cards - replace with actual data */}
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">General Ward</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Beds: 50</p>
              <p className="text-sm text-gray-600">Available: 30</p>
              <p className="text-sm text-gray-600">Occupied: 20</p>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">ICU</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Beds: 10</p>
              <p className="text-sm text-gray-600">Available: 4</p>
              <p className="text-sm text-gray-600">Occupied: 6</p>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Emergency</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Total Beds: 15</p>
              <p className="text-sm text-gray-600">Available: 8</p>
              <p className="text-sm text-gray-600">Occupied: 7</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-4">Bed Availability Trend</h3>
          <div className="h-48 border rounded-lg bg-gray-50 flex items-center justify-center">
            <p className="text-gray-500">Bed availability chart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}