import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const enrollmentFieldSchema = z.number().min(0, 'Cannot be negative').optional();

const step2Schema = z.object({
  schoolName: z.string().min(3, 'School name is required'),
  schoolName2: z.string().optional(),
  address: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  lga: z.string().optional(),
  aeqeoZone: z.string().optional(),
  gpsLongitude: z.number().optional(),
  gpsLatitude: z.number().optional(),
  typeOfSchool: z.enum(['Faith Based', 'Conventional', 'Islamiyah Integrated', 'Secular', 'Other']).optional(),
  categoryOfSchool: z.string().optional(),
  ownership: z.enum(['Individual(s)', 'Sole', 'Partnership', 'Corporate', 'Community', 'Religious Organization', 'Other']).optional(),
  yearOfEstablishment: z.number().min(1900).max(2100).optional(),
  yearOfApproval: z.number().min(1900).max(2100).optional(),
  registrationEvidence: z.string().optional(),
  
  // All enrollment fields
  kg1Male: enrollmentFieldSchema, kg1Female: enrollmentFieldSchema,
  kg2Male: enrollmentFieldSchema, kg2Female: enrollmentFieldSchema,
  eccdMale: enrollmentFieldSchema, eccdFemale: enrollmentFieldSchema,
  nursery1Male: enrollmentFieldSchema, nursery1Female: enrollmentFieldSchema,
  nursery2Male: enrollmentFieldSchema, nursery2Female: enrollmentFieldSchema,
  primary1Male: enrollmentFieldSchema, primary1Female: enrollmentFieldSchema,
  primary2Male: enrollmentFieldSchema, primary2Female: enrollmentFieldSchema,
  primary3Male: enrollmentFieldSchema, primary3Female: enrollmentFieldSchema,
  primary4Male: enrollmentFieldSchema, primary4Female: enrollmentFieldSchema,
  primary5Male: enrollmentFieldSchema, primary5Female: enrollmentFieldSchema,
  primary6Male: enrollmentFieldSchema, primary6Female: enrollmentFieldSchema,
  jss1Male: enrollmentFieldSchema, jss1Female: enrollmentFieldSchema,
  jss2Male: enrollmentFieldSchema, jss2Female: enrollmentFieldSchema,
  jss3Male: enrollmentFieldSchema, jss3Female: enrollmentFieldSchema,
  ss1Male: enrollmentFieldSchema, ss1Female: enrollmentFieldSchema,
  ss2Male: enrollmentFieldSchema, ss2Female: enrollmentFieldSchema,
  ss3Male: enrollmentFieldSchema, ss3Female: enrollmentFieldSchema,
});

type Step2FormData = z.infer<typeof step2Schema>;

interface Step2SchoolInfoProps {
  initialData?: Partial<Step2FormData>;
  onSubmit: (data: Step2FormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const Step2SchoolInfo: React.FC<Step2SchoolInfoProps> = ({
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
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: initialData || {}
  });

  const [enrollmentTotals, setEnrollmentTotals] = useState({ male: 0, female: 0, total: 0 });

  // Helper to create enrollment input group
  const EnrollmentInput = ({ level, label }: { level: string; label: string }) => (
    <div className="grid grid-cols-3 gap-2 items-center py-2 border-b">
      <Label className="font-medium text-sm">{label}</Label>
      <Input
        type="number"
        {...register(`${level}Male` as any, { valueAsNumber: true })}
        min="0"
        placeholder="0"
        className="text-center"
      />
      <Input
        type="number"
        {...register(`${level}Female` as any, { valueAsNumber: true })}
        min="0"
        placeholder="0"
        className="text-center"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location & GPS</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment Data</TabsTrigger>
        </TabsList>

        {/* Basic School Information */}
        <TabsContent value="basic" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="schoolName">School Name *</Label>
              <Input
                id="schoolName"
                {...register('schoolName')}
                placeholder="Enter school name"
              />
              {errors.schoolName && (
                <p className="text-sm text-red-500 mt-1">{errors.schoolName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="schoolName2">Alternative School Name</Label>
              <Input
                id="schoolName2"
                {...register('schoolName2')}
                placeholder="E.g., annex or branch name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">School Address *</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Enter complete address"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="addressLine2">Address Line 2</Label>
            <Input
              id="addressLine2"
              {...register('addressLine2')}
              placeholder="Additional address details"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="typeOfSchool">Type of School</Label>
              <Select onValueChange={(value) => setValue('typeOfSchool', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select school type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Faith Based">Faith Based</SelectItem>
                  <SelectItem value="Conventional">Conventional</SelectItem>
                  <SelectItem value="Islamiyah Integrated">Islamiyah Integrated</SelectItem>
                  <SelectItem value="Secular">Secular</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ownership">Ownership</Label>
              <Select onValueChange={(value) => setValue('ownership', value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ownership type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Individual(s)">Individual(s)</SelectItem>
                  <SelectItem value="Sole">Sole</SelectItem>
                  <SelectItem value="Partnership">Partnership</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                  <SelectItem value="Religious Organization">Religious Organization</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="yearOfEstablishment">Year of Establishment</Label>
              <Input
                id="yearOfEstablishment"
                type="number"
                {...register('yearOfEstablishment', { valueAsNumber: true })}
                min="1900"
                max="2100"
                placeholder="YYYY"
              />
            </div>

            <div>
              <Label htmlFor="yearOfApproval">Year of Approval</Label>
              <Input
                id="yearOfApproval"
                type="number"
                {...register('yearOfApproval', { valueAsNumber: true })}
                min="1900"
                max="2100"
                placeholder="YYYY"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="registrationEvidence">Registration Evidence</Label>
            <Input
              id="registrationEvidence"
              {...register('registrationEvidence')}
              placeholder="E.g., Certificate Number or Document Reference"
            />
          </div>
        </TabsContent>

        {/* Location & GPS */}
        <TabsContent value="location" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lga">Local Government Area (LGA)</Label>
              <Input
                id="lga"
                {...register('lga')}
                placeholder="Enter LGA"
              />
            </div>

            <div>
              <Label htmlFor="aeqeoZone">AEQEO Zone</Label>
              <Input
                id="aeqeoZone"
                {...register('aeqeoZone')}
                placeholder="Enter zone"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gpsLatitude">GPS Latitude</Label>
              <Input
                id="gpsLatitude"
                type="number"
                step="0.0000001"
                {...register('gpsLatitude', { valueAsNumber: true })}
                placeholder="9.4567890"
              />
              <p className="text-xs text-gray-500 mt-1">Example: 9.4567890</p>
            </div>

            <div>
              <Label htmlFor="gpsLongitude">GPS Longitude</Label>
              <Input
                id="gpsLongitude"
                type="number"
                step="0.0000001"
                {...register('gpsLongitude', { valueAsNumber: true })}
                placeholder="8.5123456"
              />
              <p className="text-xs text-gray-500 mt-1">Example: 8.5123456</p>
            </div>
          </div>
        </TabsContent>

        {/* Enrollment Data */}
        <TabsContent value="enrollment" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Enrollment by Grade and Gender</CardTitle>
              <CardDescription>
                Enter the number of students in each grade level
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Header Row */}
              <div className="grid grid-cols-3 gap-2 items-center font-semibold text-sm pb-2 border-b-2">
                <div>Grade Level</div>
                <div className="text-center">Male</div>
                <div className="text-center">Female</div>
              </div>

              {/* Kindergarten */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">Kindergarten</h4>
                <EnrollmentInput level="kg1" label="KG 1" />
                <EnrollmentInput level="kg2" label="KG 2" />
                <EnrollmentInput level="eccd" label="ECCD" />
              </div>

              {/* Nursery */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">Nursery</h4>
                <EnrollmentInput level="nursery1" label="Nursery 1" />
                <EnrollmentInput level="nursery2" label="Nursery 2" />
              </div>

              {/* Primary */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">Primary</h4>
                <EnrollmentInput level="primary1" label="Primary 1" />
                <EnrollmentInput level="primary2" label="Primary 2" />
                <EnrollmentInput level="primary3" label="Primary 3" />
                <EnrollmentInput level="primary4" label="Primary 4" />
                <EnrollmentInput level="primary5" label="Primary 5" />
                <EnrollmentInput level="primary6" label="Primary 6" />
              </div>

              {/* Junior Secondary */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">Junior Secondary (JSS)</h4>
                <EnrollmentInput level="jss1" label="JSS 1" />
                <EnrollmentInput level="jss2" label="JSS 2" />
                <EnrollmentInput level="jss3" label="JSS 3" />
              </div>

              {/* Senior Secondary */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-gray-700 bg-gray-100 px-2 py-1 rounded">Senior Secondary (SS)</h4>
                <EnrollmentInput level="ss1" label="SS 1" />
                <EnrollmentInput level="ss2" label="SS 2" />
                <EnrollmentInput level="ss3" label="SS 3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-32">
          {isSubmitting ? 'Saving...' : 'Next: Payment & Verification'}
        </Button>
      </div>
    </form>
  );
};

export default Step2SchoolInfo;
