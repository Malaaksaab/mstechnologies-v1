import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type DigitalCategory = 'frp_unlock' | 'mobile_unlock' | 'iphone_bypass' | 'apple_id' | 'gmail_services' | 'android_flash' | 'sim_services' | 'firmware' | 'device_repair';

export interface DigitalService {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  category: DigitalCategory;
  features: string[];
  supported_devices: string[];
  min_price: number | null;
  max_price: number | null;
  delivery_time: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
}

export const digitalCategoryLabels: Record<DigitalCategory, string> = {
  frp_unlock: 'FRP Unlock',
  mobile_unlock: 'Mobile Unlock',
  iphone_bypass: 'iPhone Bypass',
  apple_id: 'Apple ID Services',
  gmail_services: 'Gmail Services',
  android_flash: 'Android Flashing',
  sim_services: 'SIM Services',
  firmware: 'Firmware',
  device_repair: 'Device Repair'
};

export const useDigitalServices = (category?: DigitalCategory | null, searchQuery?: string) => {
  return useQuery({
    queryKey: ['digital-services', category, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('digital_services')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('title');

      if (category) {
        query = query.eq('category', category);
      }

      if (searchQuery && searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map(service => ({
        ...service,
        features: service.features || [],
        supported_devices: service.supported_devices || []
      })) as DigitalService[];
    }
  });
};

export const useDigitalServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['digital-service', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('digital_services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        features: data.features || [],
        supported_devices: data.supported_devices || []
      } as DigitalService;
    },
    enabled: !!slug
  });
};
