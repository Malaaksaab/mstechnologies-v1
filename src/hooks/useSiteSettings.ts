import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  company_name: string;
  company_owner: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  company_tagline: string;
  whatsapp_number: string;
  social_links: Record<string, string>;
  [key: string]: any;
}

const defaultSettings: SiteSettings = {
  company_name: 'MS Technologies And Digital Solutions Pvt Ltd',
  company_owner: 'Malaak Saab',
  company_email: 'info@mstechnologies.company',
  company_phone: '+923259479471',
  company_address: 'Totanobandi, Pakistan (34.856030, 72.219945)',
  company_tagline: 'Advanced Digital & AI Enterprise Software Solutions',
  whatsapp_number: '+923259479471',
  social_links: {}
};

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings-public'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      
      const settingsMap: SiteSettings = { ...defaultSettings };
      data?.forEach(item => {
        try {
          const value = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
          // Remove extra quotes if present
          settingsMap[item.key] = typeof value === 'string' ? value.replace(/^"|"$/g, '') : value;
        } catch {
          settingsMap[item.key] = item.value;
        }
      });
      return settingsMap;
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};
