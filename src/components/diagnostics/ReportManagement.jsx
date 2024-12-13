import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { diagnosticReportSchema } from '../../validations/diagnosticReportSchema';
import FormInput from '../forms/FormInput';
import FormSelect from '../forms/FormSelect';
import FormTextarea from '../forms/FormTextarea';
import SubmitButton from '../forms/SubmitButton';

const reportStatuses = [
  { value: 'draft', label: 'Draft' },
  { value: 'pending_review', label: 'Pending Review' },
  { value: 'finalized', label: 'Finalized' },
];

export default function ReportManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(diagnosticReportSchema),
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
        <h2 className="text-lg font-semibold mb-6">Generate Report</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Patient ID"
              register={register('patientId')}
              error={errors.patientId?.message}
            />
            <FormInput
              label="Scan ID"
              register={register('scanId')}
              error={errors.scanId?.message}
            />
            <FormInput
              label="Scan Date"
              type="date"
              register={register('scanDate')}
              error={errors.scanDate?.message}
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
          <FormTextarea
            label="Findings"
            register={register('findings')}
            error={errors.findings?.message}
            rows="4"
          />
          <FormTextarea
            label="Impression"
            register={register('impression')}
            error={errors.impression?.message}
            rows="3"
          />
          <FormTextarea
            label="Recommendations"
            register={register('recommendations')}
            error={errors.recommendations?.message}
            rows="3"
          />
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
                    <p className="text-sm text-gray-500">Scan ID: {report.scanId}</p>
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
                    <h4 className="text-sm font-medium mb-1">Findings</h4>
                    <p className="text-sm text-gray-600">{report.findings}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1">Impression</h4>
                    <p className="text-sm text-gray-600">{report.impression}</p>
                  </div>
                  {report.recommendations && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                      <p className="text-sm text-gray-600">{report.recommendations}</p>
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