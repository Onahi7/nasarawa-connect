import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, Info } from 'lucide-react';

const step3Schema = z.object({
  paymentMethod: z.string().optional(),
  paymentStatus: z.string().optional(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected']).optional(),
  approvalEvidence: z.string().optional(),
  confirmAccuracy: z.boolean().refine(val => val === true, {
    message: 'You must confirm the accuracy of the information'
  })
});

type Step3FormData = z.infer<typeof step3Schema>;

interface Step3PaymentInfoProps {
  initialData?: Partial<Step3FormData>;
  onSubmit: (data: Step3FormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const Step3PaymentInfo: React.FC<Step3PaymentInfoProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: initialData || {
      approvalStatus: 'pending',
      confirmAccuracy: false
    }
  });

  const confirmAccuracy = watch('confirmAccuracy');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              onValueChange={(value) => setValue('paymentMethod', value)}
              defaultValue={initialData?.paymentMethod}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Digital Capturing">Digital Capturing</SelectItem>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="paymentStatus">Payment Status</Label>
            <Select
              onValueChange={(value) => setValue('paymentStatus', value)}
              defaultValue={initialData?.paymentStatus || 'Pending'}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Partial">Partial</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Approval Status */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900">Approval Status</h3>

        <div>
          <Label htmlFor="approvalStatus">Approval Status</Label>
          <Select
            onValueChange={(value) => setValue('approvalStatus', value as any)}
            defaultValue={initialData?.approvalStatus || 'pending'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select approval status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="approvalEvidence">Approval Evidence</Label>
          <Input
            id="approvalEvidence"
            {...register('approvalEvidence')}
            placeholder="E.g., Approval Letter Number or Reference"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter document reference or certificate number if available
          </p>
        </div>
      </div>

      {/* Information Summary Alert */}
      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-sm text-gray-700">
          <strong>Before submitting:</strong> Please review all information entered in previous steps. 
          Once submitted, your registration will be processed by the NAPPS Nasarawa administration.
        </AlertDescription>
      </Alert>

      {/* Confirmation Checkbox */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900">Declaration</h3>
        
        <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
          <Checkbox
            id="confirmAccuracy"
            checked={confirmAccuracy}
            onCheckedChange={(checked) => setValue('confirmAccuracy', checked as boolean)}
            className="mt-1"
          />
          <div className="flex-1">
            <Label 
              htmlFor="confirmAccuracy" 
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              I hereby declare that all information provided in this registration form is accurate 
              and complete to the best of my knowledge. I understand that providing false information 
              may result in the rejection of my application or cancellation of my membership with 
              NAPPS Nasarawa State.
            </Label>
            {errors.confirmAccuracy && (
              <p className="text-sm text-red-500 mt-2">{errors.confirmAccuracy.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Success Message */}
      {confirmAccuracy && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-sm text-gray-700">
            You're ready to submit! Click the "Complete Registration" button below to finalize your application.
          </AlertDescription>
        </Alert>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting || !confirmAccuracy}
          className="min-w-40 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
        </Button>
      </div>
    </form>
  );
};

export default Step3PaymentInfo;
