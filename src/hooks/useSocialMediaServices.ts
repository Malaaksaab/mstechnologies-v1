import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type SocialMediaCategory = 'youtube' | 'instagram' | 'facebook' | 'twitter' | 'tiktok' | 'linkedin' | 'telegram' | 'spotify' | 'verified_accounts';

export interface SocialMediaService {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  category: SocialMediaCategory;
  features: string[];
  min_price: number | null;
  max_price: number | null;
  price_unit: string | null;
  delivery_time: string | null;
  is_featured: boolean | null;
  is_active: boolean | null;
}

export const socialMediaCategoryLabels: Record<SocialMediaCategory, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'Twitter/X',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  telegram: 'Telegram',
  spotify: 'Spotify',
  verified_accounts: 'Verified Accounts'
};

export const useSocialMediaServices = (category?: SocialMediaCategory | null, searchQuery?: string) => {
  return useQuery({
    queryKey: ['social-media-services', category, searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('social_media_services')
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
        features: service.features || []
      })) as SocialMediaService[];
    }
  });
};

export const useSocialMediaServiceBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['social-media-service', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_media_services')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        ...data,
        features: data.features || []
      } as SocialMediaService;
    },
    enabled: !!slug
  });
};
