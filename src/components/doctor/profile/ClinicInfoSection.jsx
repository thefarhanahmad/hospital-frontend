export default function ClinicInfoSection({ register, errors }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Clinic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Clinic Name</label>
          <input
            type="text"
            {...register('clinicName')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.clinicName && (
            <p className="mt-1 text-sm text-red-600">{errors.clinicName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Clinic Location</label>
          <input
            type="text"
            {...register('clinicLocation')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.clinicLocation && (
            <p className="mt-1 text-sm text-red-600">{errors.clinicLocation.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            step="any"
            {...register('latitude')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.latitude && (
            <p className="mt-1 text-sm text-red-600">{errors.latitude.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            step="any"
            {...register('longitude')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.longitude && (
            <p className="mt-1 text-sm text-red-600">{errors.longitude.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}