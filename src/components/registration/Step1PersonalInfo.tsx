import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { NAPPS_CHAPTERS } from '@/lib/constants/chapters';

const step1Schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(2, 'Last name is required'),
  sex: z.enum(['Male', 'Female'], { required_error: 'Please select your gender' }),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  chapters: z.array(z.enum(NAPPS_CHAPTERS)).optional(),
  nappsRegistered: z.enum(['Not Registered', 'Registered', 'Registered with Certificate']).optional(),
  participationHistory: z.string().optional(),
  timesParticipated: z.number().min(0).optional(),
  pupilsPresentedLastExam: z.number().min(0).optional(),
  awards: z.string().optional(),
  positionHeld: z.string().optional(),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface Step1PersonalInfoProps {
  initialData?: Partial<Step1FormData>;
  onSubmit: (data: Step1FormData) => void;
  isSubmitting: boolean;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({
  initialData,
  onSubmit,
  isSubmitting
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: initialData || {
      nappsRegistered: 'Not Registered',
      timesParticipated: 0,
      pupilsPresentedLastExam: 0
    }
  });

  const nappsRegistered = watch('nappsRegistered');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              {...register('firstName')}
              placeholder="Enter first name"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="middleName">Middle Name</Label>
            <Input
              id="middleName"
              {...register('middleName')}
              placeholder="Enter middle name (optional)"
            />
          </div>

          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              {...register('lastName')}
              placeholder="Enter last name"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <Label>Gender *</Label>
          <RadioGroup
            onValueChange={(value) => setValue('sex', value as 'Male' | 'Female')}
            defaultValue={initialData?.sex}
            className="flex gap-4 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="male" />
              <Label htmlFor="male" className="font-normal cursor-pointer">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="female" />
              <Label htmlFor="female" className="font-normal cursor-pointer">Female</Label>
            </div>
          </RadioGroup>
          {errors.sex && (
            <p className="text-sm text-red-500 mt-1">{errors.sex.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register('phone')}
              placeholder="+2348012345678"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Chapters Assignment */}
      <div className="space-y-4 pt-6 border-t">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">NAPPS Chapters</h3>
          <p className="text-sm text-muted-foreground">Select the NAPPS chapters you belong to (optional)</p>
        </div>

        <div className="space-y-3">
          <Label>Available Chapters</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg border">
            {NAPPS_CHAPTERS.map((chapter) => (
              <div key={chapter} className="flex items-center space-x-2">
                <Checkbox
                  id={`chapter-${chapter}`}
                  {...register('chapters')}
                  value={chapter}
                />
                <Label 
                  htmlFor={`chapter-${chapter}`} 
                  className="text-sm cursor-pointer"
                >
                  {chapter}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            You can select multiple chapters. These can be updated later by an administrator.
          </p>
        </div>
      </div>

      {/* NAPPS Participation */
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold text-gray-900">NAPPS Participation</h3>

        <div>
          <Label htmlFor="nappsRegistered">NAPPS Registration Status</Label>
          <Select
            onValueChange={(value) => setValue('nappsRegistered', value as any)}
            defaultValue={initialData?.nappsRegistered || 'Not Registered'}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select registration status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Not Registered">Not Registered</SelectItem>
              <SelectItem value="Registered">Registered</SelectItem>
              <SelectItem value="Registered with Certificate">Registered with Certificate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {nappsRegistered !== 'Not Registered' && (
          <>
            <div>
              <Label htmlFor="participationHistory">Participation History</Label>
              <Textarea
                id="participationHistory"
                {...register('participationHistory')}
                placeholder="E.g., National: 2023/2024, 2024/2025&#10;State: 2023/2024&#10;Zonal: 2022/2023, 2023/2024"
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                List participation by level (National, State, Zonal) with years
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timesParticipated">Times Participated in NAPPS Exam</Label>
                <Input
                  id="timesParticipated"
                  type="number"
                  {...register('timesParticipated', { valueAsNumber: true })}
                  min="0"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="pupilsPresentedLastExam">Pupils Presented (Last Exam)</Label>
                <Input
                  id="pupilsPresentedLastExam"
                  type="number"
                  {...register('pupilsPresentedLastExam', { valueAsNumber: true })}
                  min="0"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="awards">Awards from NAPPS</Label>
              <Textarea
                id="awards"
                {...register('awards')}
                placeholder="List any awards or recognitions received from NAPPS"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="positionHeld">Position Held at NAPPS</Label>
              <Input
                id="positionHeld"
                {...register('positionHeld')}
                placeholder="E.g., Zonal Chairman, State Secretary"
              />
            </div>
          </>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <Button type="submit" disabled={isSubmitting} className="min-w-32">
          {isSubmitting ? 'Saving...' : 'Next: School Information'}
        </Button>
      </div>
    </form>
  );
};

export default Step1PersonalInfo;
