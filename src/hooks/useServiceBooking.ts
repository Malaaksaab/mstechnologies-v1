import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface BookingFormData {
  service_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  company_name?: string;
  project_details: string;
  budget_range?: string;
  timeline?: string;
}

const generateTicketId = () => {
  const prefix = 'MS';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (formData: BookingFormData) => {
      const ticketId = generateTicketId();
      
      const { data, error } = await supabase
        .from('service_bookings')
        .insert({
          ...formData,
          ticket_id: ticketId,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  });
};
