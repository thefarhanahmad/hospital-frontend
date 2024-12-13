import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { sampleCollectionSchema } from '../../validations/sampleCollectionSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const collectionTypes = [
  { value: 'home', label: 'Home Collection' },
  { value: 'lab', label: 'Lab Collection' },
];

export default function SampleCollection() {
  const [isLoading, setIsLoading] = useState(false);
  const [collections, setCollections] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(sampleCollectionSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Sample collection scheduled successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to schedule collection');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Schedule Sample Collection</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Patient Name"
              register={register('patientName')}
              error={errors.patientName?.message}
            />
            <FormInput
              label="Patient ID"
              register={register('patientId')}
              error={errors.patientId?.message}
            />
            <FormSelect
              label="Collection Type"
              register={register('collectionType')}
              error={errors.collectionType?.message}
              options={collectionTypes}
            />
            <FormInput
              label="Collection Date"
              type="date"
              register={register('collectionDate')}
              error={errors.collectionDate?.message}
            />
            <FormInput
              label="Collection Time"
              type="time"
              register={register('collectionTime')}
              error={errors.collectionTime?.message}
            />
            <FormInput
              label="Contact Number"
              register={register('contactNumber')}
              error={errors.contactNumber?.message}
            />
          </div>
          <FormTextarea
            label="Collection Address"
            register={register('address')}
            error={errors.address?.message}
            rows="3"
          />
          <FormTextarea
            label="Special Instructions"
            register={register('instructions')}
            error={errors.instructions?.message}
            rows="3"
          />
          <SubmitButton isLoading={isLoading}>Schedule Collection</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Scheduled Collections</h2>
        <div className="space-y-4">
          {collections.length === 0 ? (
            <p className="text-center text-gray-500">No scheduled collections</p>
          ) : (
            collections.map((collection) => (
              <div key={collection.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{collection.patientName}</h3>
                    <p className="text-sm text-gray-500">ID: {collection.patientId}</p>
                    <p className="text-sm text-gray-500">
                      {collection.collectionDate} at {collection.collectionTime}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    collection.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : collection.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {collection.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p><span className="font-medium">Type:</span> {collection.collectionType}</p>
                  <p><span className="font-medium">Contact:</span> {collection.contactNumber}</p>
                  {collection.address && (
                    <p><span className="font-medium">Address:</span> {collection.address}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}