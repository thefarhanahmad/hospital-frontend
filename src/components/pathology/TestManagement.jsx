import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { testSchema } from '../../validations/testSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const testCategories = [
  { value: 'hematology', label: 'Hematology' },
  { value: 'biochemistry', label: 'Biochemistry' },
  { value: 'microbiology', label: 'Microbiology' },
  { value: 'immunology', label: 'Immunology' },
  { value: 'pathology', label: 'Pathology' },
];

export default function TestManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(testSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Test added successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to add test');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Add New Test</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Test Name"
              register={register('name')}
              error={errors.name?.message}
            />
            <FormSelect
              label="Category"
              register={register('category')}
              error={errors.category?.message}
              options={testCategories}
            />
            <FormInput
              label="Price"
              type="number"
              step="0.01"
              register={register('price')}
              error={errors.price?.message}
            />
            <FormInput
              label="TAT (Hours)"
              type="number"
              register={register('turnaroundTime')}
              error={errors.turnaroundTime?.message}
            />
          </div>
          <FormTextarea
            label="Sample Requirements"
            register={register('sampleRequirements')}
            error={errors.sampleRequirements?.message}
            rows="3"
          />
          <FormTextarea
            label="Special Instructions"
            register={register('specialInstructions')}
            error={errors.specialInstructions?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Add Test</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Available Tests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TAT (Hours)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No tests available
                  </td>
                </tr>
              ) : (
                tests.map((test) => (
                  <tr key={test.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{test.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{test.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{test.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{test.turnaroundTime}h</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        test.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {test.isActive ? 'Active' : 'Inactive'}
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