import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { reportSchema } from '../../../validations/diagnostics/reportSchema';
import { createReport } from '../../../services/diagnosticsService';
import FormInput from '../../forms/FormInput';
import FormTextarea from '../../forms/FormTextarea';
import FormSelect from '../../forms/FormSelect';
import SubmitButton from '../../forms/SubmitButton';
import FindingsSection from './FindingsSection';
import ImagesSection from './ImagesSection';
import RecommendationsSection from './RecommendationsSection';

const statusOptions = [
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function ReportForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reportSchema),
    defaultValues: {
      findings: {
        description: '',
        observations: [],
        impressions: []
      },
      images: [],
      recommendations: [],
      status: 'in-progress'
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await createReport(data);
      toast.success('Report generated successfully');
      reset();
    } catch (error) {
      toast.error(error.message || 'Failed to generate report');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-6">Generate Diagnostic Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Test ID"
            register={register('test')}
            error={errors.test?.message}
          />
          <FormInput
            label="Patient ID"
            register={register('patient')}
            error={errors.patient?.message}
          />
          <FormInput
            label="Radiologist ID"
            register={register('radiologist')}
            error={errors.radiologist?.message}
          />
          <FormInput
            label="Performed At"
            type="datetime-local"
            register={register('performedAt')}
            error={errors.performedAt?.message}
          />
          <FormSelect
            label="Status"
            register={register('status')}
            error={errors.status?.message}
            options={statusOptions}
          />
        </div>
      </div>

      <FindingsSection
        control={control}
        register={register}
        errors={errors}
      />

      <ImagesSection
        control={control}
        register={register}
        errors={errors}
      />

      <div className="bg-white shadow rounded-lg p-6">
        <FormTextarea
          label="Conclusion"
          register={register('conclusion')}
          error={errors.conclusion?.message}
          rows="4"
          placeholder="Enter diagnostic conclusion"
        />
      </div>

      <RecommendationsSection
        control={control}
        register={register}
        errors={errors}
      />

      <div className="flex justify-end">
        <SubmitButton isLoading={isLoading}>Generate Report</SubmitButton>
      </div>
    </form>
  );
}