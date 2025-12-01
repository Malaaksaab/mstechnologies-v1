import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

interface ServiceFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  type: 'software' | 'social-media' | 'digital' | 'investment';
  categories?: { value: string; label: string }[];
  isLoading?: boolean;
}

const ServiceFormModal = ({ 
  open, 
  onClose, 
  onSubmit, 
  initialData, 
  type,
  categories = [],
  isLoading 
}: ServiceFormModalProps) => {
  const [formData, setFormData] = useState<any>({});
  const [newFeature, setNewFeature] = useState('');
  const [newTech, setNewTech] = useState('');
  const [newDevice, setNewDevice] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData(getDefaultFormData());
    }
  }, [initialData, type, open]);

  const getDefaultFormData = () => {
    switch (type) {
      case 'software':
        return { 
          title: '', slug: '', description: '', short_description: '', 
          category: '', icon_name: 'Code', features: [], technologies: [], 
          price_range: '', is_featured: false, is_active: true 
        };
      case 'social-media':
        return { 
          title: '', slug: '', description: '', short_description: '', 
          category: '', features: [], min_price: 0, max_price: 0,
          price_unit: 'per 1000', delivery_time: '', is_featured: false, is_active: true 
        };
      case 'digital':
        return { 
          title: '', slug: '', description: '', short_description: '', 
          category: '', features: [], supported_devices: [], min_price: 0, max_price: 0,
          delivery_time: '', is_featured: false, is_active: true 
        };
      case 'investment':
        return { 
          name: '', description: '', min_deposit: 0, max_deposit: 0,
          profit_rate: 0, duration_months: 12, features: [], 
          is_popular: false, is_active: true 
        };
      default:
        return {};
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), newFeature.trim()] });
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    const features = [...(formData.features || [])];
    features.splice(index, 1);
    setFormData({ ...formData, features });
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      setFormData({ ...formData, technologies: [...(formData.technologies || []), newTech.trim()] });
      setNewTech('');
    }
  };

  const removeTechnology = (index: number) => {
    const technologies = [...(formData.technologies || [])];
    technologies.splice(index, 1);
    setFormData({ ...formData, technologies });
  };

  const addDevice = () => {
    if (newDevice.trim()) {
      setFormData({ ...formData, supported_devices: [...(formData.supported_devices || []), newDevice.trim()] });
      setNewDevice('');
    }
  };

  const removeDevice = (index: number) => {
    const devices = [...(formData.supported_devices || [])];
    devices.splice(index, 1);
    setFormData({ ...formData, supported_devices: devices });
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit' : 'Add'} {type === 'investment' ? 'Investment Plan' : 'Service'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title/Name */}
          <div className="space-y-2">
            <Label>{type === 'investment' ? 'Plan Name' : 'Title'}</Label>
            <Input
              value={formData.title || formData.name || ''}
              onChange={(e) => {
                const field = type === 'investment' ? 'name' : 'title';
                setFormData({ 
                  ...formData, 
                  [field]: e.target.value,
                  ...(type !== 'investment' && { slug: generateSlug(e.target.value) })
                });
              }}
              required
            />
          </div>

          {/* Slug (not for investment) */}
          {type !== 'investment' && (
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
              />
            </div>
          )}

          {/* Category (not for investment) */}
          {type !== 'investment' && categories.length > 0 && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={formData.category || ''}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required={type !== 'investment'}
            />
          </div>

          {/* Short Description (not for investment) */}
          {type !== 'investment' && (
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input
                value={formData.short_description || ''}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              />
            </div>
          )}

          {/* Price Fields */}
          {type === 'software' && (
            <div className="space-y-2">
              <Label>Price Range</Label>
              <Input
                value={formData.price_range || ''}
                onChange={(e) => setFormData({ ...formData, price_range: e.target.value })}
                placeholder="e.g., $500 - $5000"
              />
            </div>
          )}

          {(type === 'social-media' || type === 'digital') && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Price ($)</Label>
                <Input
                  type="number"
                  value={formData.min_price || ''}
                  onChange={(e) => setFormData({ ...formData, min_price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Price ($)</Label>
                <Input
                  type="number"
                  value={formData.max_price || ''}
                  onChange={(e) => setFormData({ ...formData, max_price: parseFloat(e.target.value) || 0 })}
                />
              </div>
            </div>
          )}

          {type === 'investment' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Min Deposit ($)</Label>
                  <Input
                    type="number"
                    value={formData.min_deposit || ''}
                    onChange={(e) => setFormData({ ...formData, min_deposit: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max Deposit ($)</Label>
                  <Input
                    type="number"
                    value={formData.max_deposit || ''}
                    onChange={(e) => setFormData({ ...formData, max_deposit: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Profit Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={formData.profit_rate || ''}
                    onChange={(e) => setFormData({ ...formData, profit_rate: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (Months)</Label>
                  <Input
                    type="number"
                    value={formData.duration_months || ''}
                    onChange={(e) => setFormData({ ...formData, duration_months: parseInt(e.target.value) || 12 })}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Delivery Time (social-media and digital) */}
          {(type === 'social-media' || type === 'digital') && (
            <div className="space-y-2">
              <Label>Delivery Time</Label>
              <Input
                value={formData.delivery_time || ''}
                onChange={(e) => setFormData({ ...formData, delivery_time: e.target.value })}
                placeholder="e.g., 24-48 hours"
              />
            </div>
          )}

          {/* Price Unit (social-media only) */}
          {type === 'social-media' && (
            <div className="space-y-2">
              <Label>Price Unit</Label>
              <Input
                value={formData.price_unit || ''}
                onChange={(e) => setFormData({ ...formData, price_unit: e.target.value })}
                placeholder="e.g., per 1000"
              />
            </div>
          )}

          {/* Icon Name (software only) */}
          {type === 'software' && (
            <div className="space-y-2">
              <Label>Icon Name (Lucide)</Label>
              <Input
                value={formData.icon_name || ''}
                onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                placeholder="e.g., Code, Store, Building"
              />
            </div>
          )}

          {/* Features */}
          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex gap-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(formData.features || []).map((feature: string, index: number) => (
                <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(index)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Technologies (software only) */}
          {type === 'software' && (
            <div className="space-y-2">
              <Label>Technologies</Label>
              <div className="flex gap-2">
                <Input
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  placeholder="Add a technology"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <Button type="button" onClick={addTechnology} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(formData.technologies || []).map((tech: string, index: number) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm">
                    {tech}
                    <button type="button" onClick={() => removeTechnology(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Supported Devices (digital only) */}
          {type === 'digital' && (
            <div className="space-y-2">
              <Label>Supported Devices</Label>
              <div className="flex gap-2">
                <Input
                  value={newDevice}
                  onChange={(e) => setNewDevice(e.target.value)}
                  placeholder="Add a device"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDevice())}
                />
                <Button type="button" onClick={addDevice} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {(formData.supported_devices || []).map((device: string, index: number) => (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent-foreground rounded-full text-sm">
                    {device}
                    <button type="button" onClick={() => removeDevice(index)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_active ?? true}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label>Active</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.is_featured ?? formData.is_popular ?? false}
                onCheckedChange={(checked) => setFormData({ 
                  ...formData, 
                  ...(type === 'investment' ? { is_popular: checked } : { is_featured: checked })
                })}
              />
              <Label>{type === 'investment' ? 'Popular' : 'Featured'}</Label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (initialData ? 'Update' : 'Create')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceFormModal;
