import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { medicineSchema } from '../../validations/medicineSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import SubmitButton from '../forms/SubmitButton';

const categories = [
  { value: 'tablets', label: 'Tablets' },
  { value: 'syrups', label: 'Syrups' },
  { value: 'injections', label: 'Injections' },
  { value: 'equipment', label: 'Medical Equipment' },
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
    resolver: yupResolver(medicineSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Medicine added to inventory');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to add medicine');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Add New Medicine</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Medicine Name"
              register={register('name')}
              error={errors.name?.message}
            />
            <FormSelect
              label="Category"
              register={register('category')}
              error={errors.category?.message}
              options={categories}
            />
            <FormInput
              label="Quantity"
              type="number"
              register={register('quantity')}
              error={errors.quantity?.message}
            />
            <FormInput
              label="Price"
              type="number"
              step="0.01"
              register={register('price')}
              error={errors.price?.message}
            />
            <FormInput
              label="Expiry Date"
              type="date"
              register={register('expiryDate')}
              error={errors.expiryDate?.message}
            />
            <FormInput
              label="Batch Number"
              register={register('batchNumber')}
              error={errors.batchNumber?.message}
            />
          </div>
          <SubmitButton isLoading={isLoading}>Add Medicine</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Current Inventory</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
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
                    No items in inventory
                  </td>
                </tr>
              ) : (
                inventory.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.quantity > 10
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.quantity > 10 ? 'In Stock' : 'Low Stock'}
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