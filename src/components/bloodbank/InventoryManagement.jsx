import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { bloodInventorySchema } from '../../validations/bloodInventorySchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import SubmitButton from '../forms/SubmitButton';

const bloodGroups = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export default function InventoryManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [inventory, setInventory] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(bloodInventorySchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Blood unit added to inventory');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to add blood unit');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Add Blood Unit</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Blood Group"
              register={register('bloodGroup')}
              error={errors.bloodGroup?.message}
              options={bloodGroups}
            />
            <FormInput
              label="Units"
              type="number"
              register={register('units')}
              error={errors.units?.message}
            />
            <FormInput
              label="Collection Date"
              type="date"
              register={register('collectionDate')}
              error={errors.collectionDate?.message}
            />
            <FormInput
              label="Expiry Date"
              type="date"
              register={register('expiryDate')}
              error={errors.expiryDate?.message}
            />
          </div>
          <SubmitButton isLoading={isLoading}>Add Blood Unit</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Current Inventory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No blood units in inventory
                  </td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.units}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.collectionDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.expiryDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.units > 10
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.units > 10 ? 'Sufficient' : 'Low Stock'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}