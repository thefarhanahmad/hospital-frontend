export default function DocumentsSection({ register, errors }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Documents</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">10th Marksheet</label>
            <input
              type="file"
              accept=".pdf,image/*"
              {...register('tenthMarksheet')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.tenthMarksheet && (
              <p className="mt-1 text-sm text-red-600">{errors.tenthMarksheet.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">12th Marksheet</label>
            <input
              type="file"
              accept=".pdf,image/*"
              {...register('twelfthMarksheet')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.twelfthMarksheet && (
              <p className="mt-1 text-sm text-red-600">{errors.twelfthMarksheet.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Degree Certificate</label>
            <input
              type="file"
              accept=".pdf,image/*"
              {...register('degreeCertificate')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.degreeCertificate && (
              <p className="mt-1 text-sm text-red-600">{errors.degreeCertificate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Doctor Photograph</label>
            <input
              type="file"
              accept="image/*"
              {...register('doctorPhotograph')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.doctorPhotograph && (
              <p className="mt-1 text-sm text-red-600">{errors.doctorPhotograph.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {['first', 'second', 'third', 'fourth', 'fifth'].map((year) => (
            <div key={year}>
              <label className="block text-sm font-medium text-gray-700">
                {year.charAt(0).toUpperCase() + year.slice(1)} Year Marksheet
              </label>
              <input
                type="file"
                accept=".pdf,image/*"
                {...register(`${year}YearMarksheet`)}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {errors[`${year}YearMarksheet`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`${year}YearMarksheet`].message}</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">MCI Registration</label>
            <input
              type="file"
              accept=".pdf,image/*"
              {...register('mciRegistration')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.mciRegistration && (
              <p className="mt-1 text-sm text-red-600">{errors.mciRegistration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Clinic Photographs</label>
            <input
              type="file"
              accept="image/*"
              multiple
              {...register('clinicPhotographs')}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            {errors.clinicPhotographs && (
              <p className="mt-1 text-sm text-red-600">{errors.clinicPhotographs.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}