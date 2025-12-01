import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface InvestmentPlan {
  id: string;
  name: string;
  description: string | null;
  min_deposit: number;
  max_deposit: number;
  profit_rate: number;
  duration_months: number;
  features: string[];
  is_popular: boolean | null;
  is_active: boolean | null;
}

export const useInvestmentPlans = () => {
  return useQuery({
    queryKey: ['investment-plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investment_plans')
        .select('*')
        .eq('is_active', true)
        .order('min_deposit');

      if (error) throw error;

      return (data || []).map(plan => ({
        ...plan,
        features: plan.features || []
      })) as InvestmentPlan[];
    }
  });
};
