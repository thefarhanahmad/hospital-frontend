import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { reportSchema } from '../../validations/reportSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';
import TestResultsSection from './report/TestResultsSection';

const reportStatuses = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'finalized', label: 'Finalized' },
];

export default function ReportGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      testResults: [{ parameter: '', result: '', unit: '', referenceRange: '' }],
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      // API call would go here
      toast.success('Report generated successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Generate Test Report</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Patient ID"
              register={register('patientId')}
              error={errors.patientId?.message}
            />
            <FormInput
              label="Sample ID"
              register={register('sampleId')}
              error={errors.sampleId?.message}
            />
            <FormInput
              label="Test ID"
              register={register('testId')}
              error={errors.testId?.message}
            />
            <FormInput
              label="Collection Date"
              type="date"
              register={register('collectionDate')}
              error={errors.collectionDate?.message}
            />
            <FormInput
              label="Report Date"
              type="date"
              register={register('reportDate')}
              error={errors.reportDate?.message}
            />
            <FormSelect
              label="Status"
              register={register('status')}
              error={errors.status?.message}
              options={reportStatuses}
            />
          </div>

          <TestResultsSection
            control={control}
            register={register}
            errors={errors}
          />

          <div className="space-y-4">
            <FormTextarea
              label="Clinical Notes"
              register={register('clinicalNotes')}
              error={errors.clinicalNotes?.message}
              rows="3"
            />
            <FormTextarea
              label="Comments"
              register={register('comments')}
              error={errors.comments?.message}
              rows="3"
            />
          </div>

          <SubmitButton isLoading={isLoading}>Generate Report</SubmitButton>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {reports.length === 0 ? (
            <p className="text-center text-gray-500">No reports available</p>
          ) : (
            reports.map((report) => (
              <div key={report.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">Report #{report.id}</h3>
                    <p className="text-sm text-gray-500">Patient ID: {report.patientId}</p>
                    <p className="text-sm text-gray-500">Sample ID: {report.sampleId}</p>
                  </div>
                  <span className={`px-2 py-1 text-sm rounded-full ${
                    report.status === 'finalized'
                      ? 'bg-green-100 text-green-800'
                      : report.status === 'pending_review'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Test Results</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Parameter
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Result
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Unit
                            </th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                              Reference Range
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {report.testResults.map((result, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 text-sm">{result.parameter}</td>
                              <td className="px-4 py-2 text-sm">{result.result}</td>
                              <td className="px-4 py-2 text-sm">{result.unit}</td>
                              <td className="px-4 py-2 text-sm">{result.referenceRange}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {report.clinicalNotes && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Clinical Notes</h4>
                      <p className="text-sm text-gray-600">{report.clinicalNotes}</p>
                    </div>
                  )}

                  {report.comments && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Comments</h4>
                      <p className="text-sm text-gray-600">{report.comments}</p>
                    </div>
                  )}

                  {report.status !== 'finalized' && (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                        onClick={() => {/* Handle edit */}}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-green-50 text-green-700 rounded hover:bg-green-100"
                        onClick={() => {/* Handle finalize */}}
                      >
                        Finalize
                      </button>
                    </div>
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