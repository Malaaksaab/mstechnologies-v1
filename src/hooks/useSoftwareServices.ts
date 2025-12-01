import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type SoftwareCategory = 
  | 'business_management'
  | 'education'
  | 'healthcare'
  | 'hospitality'
  | 'retail'
  | 'custom_development'
  | 'web_development'
  | 'mobile_apps'
  | 'cloud_solutions'
  | 'ecommerce';

export interface SoftwareService {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  category: SoftwareCategory;
  icon_name: string | null;
  features: string[];
  technologies: string[];
  price_range: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export const categoryLabels: Record<SoftwareCategory, string> = {
  business_management: 'Business Management',
  education: 'Education',
  healthcare: 'Healthcare',
  hospitality: 'Hospitality',
  retail: 'Retail & POS',
  custom_development: 'Custom Development',
  web_development: 'Web Development',
  mobile_apps: 'Mobile Apps',
  cloud_solutions: 'Cloud Solutions',
  ecommerce: 'E-commerce',
};

export const useSoftwareServices = (category?: SoftwareCategory | null, searchQuery?: string) => {
  return useQuery({
    queryKey: ['software-services', category, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('software_services')
        .select('*')
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('title');

      if (category) {
        query = query.eq('category', category);
      }

      if (searchQuery && searchQuery.trim()) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      // Transform data to ensure arrays are never null
      return (data || []).map(service => ({
        ...service,
        features: service.features || [],
        technologies: service.technologies || [],
      })) as SoftwareService[];
    },
  });
};

export const useSoftwareServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['software-service', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('software_services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as SoftwareService;
    },
    enabled: !!slug,
  });
};
