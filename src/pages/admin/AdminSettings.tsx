import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Save, Globe, Mail, Phone, MapPin, Share2, CreditCard, 
  Building2, FileText, Palette, Bell, Shield, Settings2,
  Plus, Trash2, GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  account_details: Record<string, string>;
  instructions: string;
  icon_name: string;
  is_active: boolean;
  display_order: number;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [activeTab, setActiveTab] = useState('company');
  const queryClient = useQueryClient();

  const { data: siteSettings, isLoading } = useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) throw error;
      const settingsMap: Record<string, any> = {};
      data?.forEach(item => {
        try {
          settingsMap[item.key] = typeof item.value === 'string' ? JSON.parse(item.value) : item.value;
        } catch {
          settingsMap[item.key] = item.value;
        }
      });
      return settingsMap;
    }
  });

  const { data: paymentMethods, isLoading: paymentLoading } = useQuery({
    queryKey: ['payment-methods-admin'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as PaymentMethod[];
    }
  });

  useEffect(() => {
    if (siteSettings) {
      setSettings(siteSettings);
    }
  }, [siteSettings]);

  const updateSettingsMutation = useMutation({
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

  const updatePaymentMethodMutation = useMutation({
    mutationFn: async (method: Partial<PaymentMethod> & { id: string }) => {
      const { error } = await supabase
        .from('payment_methods')
        .update(method)
        .eq('id', method.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      toast.success('Payment method updated');
    },
    onError: (error: Error) => toast.error(error.message)
  });

  const deletePaymentMethodMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('payment_methods').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      toast.success('Payment method deleted');
    },
    onError: (error: Error) => toast.error(error.message)
  });

  const createPaymentMethodMutation = useMutation({
    mutationFn: async (method: Omit<PaymentMethod, 'id'>) => {
      const { error } = await supabase.from('payment_methods').insert(method);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods-admin'] });
      toast.success('Payment method added');
    },
    onError: (error: Error) => toast.error(error.message)
  });

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate(settings);
  };

  const handlePaymentMethodToggle = (id: string, is_active: boolean) => {
    updatePaymentMethodMutation.mutate({ id, is_active });
  };

  const handleAddPaymentMethod = () => {
    createPaymentMethodMutation.mutate({
      name: 'New Payment Method',
      type: 'domestic',
      account_details: {},
      instructions: '',
      icon_name: 'CreditCard',
      is_active: false,
      display_order: (paymentMethods?.length || 0) + 1
    });
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
    <AdminLayout title="Site Settings" description="Full control over your website configuration">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 h-auto p-1">
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden md:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden md:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden md:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Company Info Tab */}
        <TabsContent value="company">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Company Information
                </CardTitle>
                <CardDescription>Basic details about your business</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input
                    value={settings.company_name || ''}
                    onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                    placeholder="Your Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input
                    value={settings.company_tagline || ''}
                    onChange={(e) => setSettings({ ...settings, company_tagline: e.target.value })}
                    placeholder="Your company tagline"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
                  <Input
                    type="email"
                    value={settings.company_email || ''}
                    onChange={(e) => setSettings({ ...settings, company_email: e.target.value })}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</Label>
                  <Input
                    value={settings.company_phone || ''}
                    onChange={(e) => setSettings({ ...settings, company_phone: e.target.value })}
                    placeholder="+92 XXX XXXXXXX"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Address</Label>
                  <Textarea
                    value={settings.company_address || ''}
                    onChange={(e) => setSettings({ ...settings, company_address: e.target.value })}
                    placeholder="Full company address"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Business Registration Number</Label>
                  <Input
                    value={settings.registration_number || ''}
                    onChange={(e) => setSettings({ ...settings, registration_number: e.target.value })}
                    placeholder="REG-XXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID / NTN</Label>
                  <Input
                    value={settings.tax_id || ''}
                    onChange={(e) => setSettings({ ...settings, tax_id: e.target.value })}
                    placeholder="XXX-XXXX-XXX"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="w-5 h-5" />
                  Social Media Links
                </CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp'].map((platform) => (
                  <div key={platform} className="space-y-2">
                    <Label className="capitalize">{platform}</Label>
                    <Input
                      placeholder={platform === 'whatsapp' ? '+92XXXXXXXXXX' : `https://${platform}.com/yourpage`}
                      value={settings.social_links?.[platform] || ''}
                      onChange={(e) => setSettings({
                        ...settings,
                        social_links: { ...settings.social_links, [platform]: e.target.value }
                      })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Site Title (max 60 characters)</Label>
                  <Input
                    value={settings.seo_title || ''}
                    onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
                    maxLength={60}
                  />
                  <p className="text-xs text-muted-foreground">{(settings.seo_title || '').length}/60</p>
                </div>
                <div className="space-y-2">
                  <Label>Meta Description (max 160 characters)</Label>
                  <Textarea
                    value={settings.seo_description || ''}
                    onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{(settings.seo_description || '').length}/160</p>
                </div>
                <div className="space-y-2">
                  <Label>Keywords (comma separated)</Label>
                  <Input
                    value={settings.seo_keywords || ''}
                    onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
                    placeholder="software, development, pakistan, investment"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                  <CardDescription>Configure accepted payment options</CardDescription>
                </div>
                <Button onClick={handleAddPaymentMethod} size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Method
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentLoading ? (
                  <div className="animate-pulse space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted rounded-lg"></div>)}
                  </div>
                ) : paymentMethods?.map((method) => (
                  <div key={method.id} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                    <GripVertical className="w-5 h-5 text-muted-foreground mt-1 cursor-grab" />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Input
                            value={method.name}
                            onChange={(e) => updatePaymentMethodMutation.mutate({ id: method.id, name: e.target.value })}
                            className="font-medium w-48"
                          />
                          <span className={`text-xs px-2 py-1 rounded ${method.type === 'domestic' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {method.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={method.is_active}
                            onCheckedChange={(checked) => handlePaymentMethodToggle(method.id, checked)}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePaymentMethodMutation.mutate(method.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Account Details (JSON)</Label>
                          <Textarea
                            value={JSON.stringify(method.account_details, null, 2)}
                            onChange={(e) => {
                              try {
                                const parsed = JSON.parse(e.target.value);
                                updatePaymentMethodMutation.mutate({ id: method.id, account_details: parsed });
                              } catch {}
                            }}
                            rows={3}
                            className="font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Instructions</Label>
                          <Textarea
                            value={method.instructions || ''}
                            onChange={(e) => updatePaymentMethodMutation.mutate({ id: method.id, instructions: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Currency Settings</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Currency</Label>
                  <Input
                    value={settings.primary_currency || 'PKR'}
                    onChange={(e) => setSettings({ ...settings, primary_currency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Currency</Label>
                  <Input
                    value={settings.secondary_currency || 'USD'}
                    onChange={(e) => setSettings({ ...settings, secondary_currency: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Exchange Rate (PKR to USD)</Label>
                  <Input
                    type="number"
                    value={settings.exchange_rate || '280'}
                    onChange={(e) => setSettings({ ...settings, exchange_rate: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Homepage hero content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Hero Title</Label>
                  <Input
                    value={settings.hero_title || ''}
                    onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })}
                    placeholder="Transform Your Business with Technology"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hero Subtitle</Label>
                  <Textarea
                    value={settings.hero_subtitle || ''}
                    onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })}
                    placeholder="We provide cutting-edge software solutions..."
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>CTA Button Text</Label>
                  <Input
                    value={settings.hero_cta || ''}
                    onChange={(e) => setSettings({ ...settings, hero_cta: e.target.value })}
                    placeholder="Get Started"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>About Title</Label>
                  <Input
                    value={settings.about_title || ''}
                    onChange={(e) => setSettings({ ...settings, about_title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Description</Label>
                  <Textarea
                    value={settings.about_description || ''}
                    onChange={(e) => setSettings({ ...settings, about_description: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Input
                    type="number"
                    value={settings.years_experience || ''}
                    onChange={(e) => setSettings({ ...settings, years_experience: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Clients Served</Label>
                  <Input
                    type="number"
                    value={settings.clients_served || ''}
                    onChange={(e) => setSettings({ ...settings, clients_served: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Footer Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Footer Text</Label>
                  <Textarea
                    value={settings.footer_text || ''}
                    onChange={(e) => setSettings({ ...settings, footer_text: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Copyright Text</Label>
                  <Input
                    value={settings.copyright_text || ''}
                    onChange={(e) => setSettings({ ...settings, copyright_text: e.target.value })}
                    placeholder="© 2024 Company Name. All rights reserved."
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.primary_color || '#8B5CF6'}
                      onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.primary_color || '#8B5CF6'}
                      onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={settings.secondary_color || '#06B6D4'}
                      onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={settings.secondary_color || '#06B6D4'}
                      onChange={(e) => setSettings({ ...settings, secondary_color: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Dark Mode Default</Label>
                    <p className="text-xs text-muted-foreground">Set dark mode as default theme</p>
                  </div>
                  <Switch
                    checked={settings.dark_mode_default || false}
                    onCheckedChange={(checked) => setSettings({ ...settings, dark_mode_default: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logo & Branding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input
                    value={settings.logo_url || ''}
                    onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                    placeholder="https://your-domain.com/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Favicon URL</Label>
                  <Input
                    value={settings.favicon_url || ''}
                    onChange={(e) => setSettings({ ...settings, favicon_url: e.target.value })}
                    placeholder="https://your-domain.com/favicon.ico"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>New Order Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive email for new orders</p>
                  </div>
                  <Switch
                    checked={settings.notify_new_orders || false}
                    onCheckedChange={(checked) => setSettings({ ...settings, notify_new_orders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Received</Label>
                    <p className="text-xs text-muted-foreground">Receive email for payments</p>
                  </div>
                  <Switch
                    checked={settings.notify_payments || false}
                    onCheckedChange={(checked) => setSettings({ ...settings, notify_payments: checked })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Notification Email</Label>
                  <Input
                    type="email"
                    value={settings.notification_email || ''}
                    onChange={(e) => setSettings({ ...settings, notification_email: e.target.value })}
                    placeholder="admin@company.com"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">Require 2FA for admin access</p>
                  </div>
                  <Switch
                    checked={settings.require_2fa || false}
                    onCheckedChange={(checked) => setSettings({ ...settings, require_2fa: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-xs text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <Input
                    type="number"
                    value={settings.session_timeout || '60'}
                    onChange={(e) => setSettings({ ...settings, session_timeout: e.target.value })}
                    className="w-24"
                    placeholder="60"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={handleSaveSettings} disabled={updateSettingsMutation.isPending} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            {updateSettingsMutation.isPending ? 'Saving...' : 'Save All Settings'}
          </Button>
        </div>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;