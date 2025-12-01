import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type SoftwareCategory = Database['public']['Enums']['software_category'];
type SocialMediaCategory = Database['public']['Enums']['social_media_category'];
type DigitalCategory = Database['public']['Enums']['digital_category'];

// Software Services CRUD
export const useCreateSoftwareService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      description: string;
      short_description?: string;
      category: SoftwareCategory;
      icon_name?: string;
      features?: string[];
      technologies?: string[];
      price_range?: string;
      is_featured?: boolean;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from('software_services').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['software-services'] });
      toast.success('Software service created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create service: ${error.message}`);
    }
  });
};

export const useUpdateSoftwareService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('software_services').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['software-services'] });
      toast.success('Software service updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update service: ${error.message}`);
    }
  });
};

export const useDeleteSoftwareService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('software_services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['software-services'] });
      toast.success('Software service deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  });
};

// Social Media Services CRUD
export const useCreateSocialMediaService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      description: string;
      short_description?: string;
      category: SocialMediaCategory;
      features?: string[];
      min_price?: number;
      max_price?: number;
      price_unit?: string;
      delivery_time?: string;
      is_featured?: boolean;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from('social_media_services').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-media-services'] });
      toast.success('Social media service created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create service: ${error.message}`);
    }
  });
};

export const useUpdateSocialMediaService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('social_media_services').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-media-services'] });
      toast.success('Social media service updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update service: ${error.message}`);
    }
  });
};

export const useDeleteSocialMediaService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('social_media_services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-media-services'] });
      toast.success('Social media service deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  });
};

// Digital Services CRUD
export const useCreateDigitalService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      title: string;
      slug: string;
      description: string;
      short_description?: string;
      category: DigitalCategory;
      features?: string[];
      supported_devices?: string[];
      min_price?: number;
      max_price?: number;
      delivery_time?: string;
      is_featured?: boolean;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from('digital_services').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-services'] });
      toast.success('Digital service created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create service: ${error.message}`);
    }
  });
};

export const useUpdateDigitalService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('digital_services').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-services'] });
      toast.success('Digital service updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update service: ${error.message}`);
    }
  });
};

export const useDeleteDigitalService = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('digital_services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['digital-services'] });
      toast.success('Digital service deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  });
};

// Investment Plans CRUD
export const useCreateInvestmentPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: {
      name: string;
      description?: string;
      min_deposit: number;
      max_deposit: number;
      profit_rate: number;
      duration_months: number;
      features?: string[];
      is_popular?: boolean;
      is_active?: boolean;
    }) => {
      const { error } = await supabase.from('investment_plans').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-plans'] });
      toast.success('Investment plan created successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create plan: ${error.message}`);
    }
  });
};

export const useUpdateInvestmentPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: { id: string; [key: string]: any }) => {
      const { error } = await supabase.from('investment_plans').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-plans'] });
      toast.success('Investment plan updated successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update plan: ${error.message}`);
    }
  });
};

export const useDeleteInvestmentPlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('investment_plans').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investment-plans'] });
      toast.success('Investment plan deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete plan: ${error.message}`);
    }
  });
};
