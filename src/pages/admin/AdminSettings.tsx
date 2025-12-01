import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Save, Globe, Mail, Phone, MapPin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const queryClient = useQueryClient();

  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      const settingsMap: Record<string, any> = {};
      data?.forEach(item => {
        settingsMap[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
      });
      return settingsMap;
    }
  });

  useEffect(() => {
    if (siteSettings) {
      setSettings(siteSettings);
    }
  }, [siteSettings]);

  const updateMutation = useMutation({
    mutationFn: async (updates: Record<string, any>) => {
      for (const [key, value] of Object.entries(updates)) {
        const { error } = await supabase
          .from('site_settings')
          .upsert({ key, value: JSON.stringify(value), updated_at: new Date().toISOString() }, { onConflict: 'key' });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast.success('Settings saved successfully');
    },
    onError: (error: Error) => toast.error(error.message)
  });

  const handleSave = () => {
    updateMutation.mutate(settings);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Site Settings" description="Customize your website">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Site Settings" description="Customize your website content and SEO">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        {/* Company Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" /> Company Information
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input
                value={settings.company_name || ''}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
              <Input
                type="email"
                value={settings.company_email || ''}
                onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</Label>
              <Input
                value={settings.company_phone || ''}
                onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</Label>
              <Input
                value={settings.company_address || ''}
                onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Site Title (max 60 characters)</Label>
              <Input
                value={settings.seo_title || ''}
                onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                maxLength={60}
              />
              <p className="text-xs text-muted-foreground">{(settings.seo_title || '').length}/60 characters</p>
            </div>
            <div className="space-y-2">
              <Label>Meta Description (max 160 characters)</Label>
              <Textarea
                value={settings.seo_description || ''}
                onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                maxLength={160}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">{(settings.seo_description || '').length}/160 characters</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Share2 className="w-5 h-5" /> Social Media Links
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform) => (
              <div key={platform} className="space-y-2">
                <Label className="capitalize">{platform}</Label>
                <Input
                  placeholder={`https://${platform}.com/yourpage`}
                  value={settings.social_links?.[platform] || ''}
                  onChange={(e) => setSettings({
                    ...settings,
                    social_links: { ...settings.social_links, [platform]: e.target.value }
                  })}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateMutation.isPending} className="gap-2">
            <Save className="w-4 h-4" />
            {updateMutation.isPending ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettings;
