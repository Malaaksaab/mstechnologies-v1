import { z } from 'zod';

export const bookingSchema = z.object({
  customer_name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  customer_email: z
    .string()
    .trim()
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters'),
  customer_phone: z
    .string()
    .max(20, 'Phone number must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  company_name: z
    .string()
    .max(200, 'Company name must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  project_details: z
    .string()
    .trim()
    .min(10, 'Project details must be at least 10 characters')
    .max(5000, 'Project details must be less than 5000 characters'),
  budget_range: z
    .string()
    .max(100, 'Budget range must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  timeline: z
    .string()
    .max(100, 'Timeline must be less than 100 characters')
    .optional()
    .or(z.literal('')),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(1000000, 'Quantity must be less than 1,000,000')
    .optional(),
});

export type BookingValidation = z.infer<typeof bookingSchema>;

export const validateBookingForm = (data: unknown) => {
  return bookingSchema.safeParse(data);
};
