import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceFormModal from '@/components/admin/ServiceFormModal';
import { useDigitalServices, digitalCategoryLabels, DigitalCategory } from '@/hooks/useDigitalServices';
import { useCreateDigitalService, useUpdateDigitalService, useDeleteDigitalService } from '@/hooks/useAdminServices';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const categories = Object.entries(digitalCategoryLabels).map(([value, label]) => ({ value, label }));

const AdminDigital = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: services, isLoading } = useDigitalServices(null, search);
  const createMutation = useCreateDigitalService();
  const updateMutation = useUpdateDigitalService();
  const deleteMutation = useDeleteDigitalService();

  const handleSubmit = (data: any) => {
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...data }, {
        onSuccess: () => {
          setModalOpen(false);
          setEditingService(null);
        }
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          setModalOpen(false);
        }
      });
    }
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null)
      });
    }
  };

  const formatPrice = (min?: number | null, max?: number | null) => {
    if (!min && !max) return '-';
    return `$${min || 0} - $${max || 0}`;
  };

  return (
    <AdminLayout 
      title="Digital Services" 
      description="Manage digital solutions, unlocking services, and pricing"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => { setEditingService(null); setModalOpen(true); }} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Service
          </Button>
        </div>

        {/* Services Table */}
        <div className="glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price Range</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading services...
                  </TableCell>
                </TableRow>
              ) : services?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                services?.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {service.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        <span className="font-medium">{service.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {digitalCategoryLabels[service.category as DigitalCategory]}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatPrice(service.min_price, service.max_price)}</TableCell>
                    <TableCell>{service.delivery_time || '-'}</TableCell>
                    <TableCell>
                      <Badge variant={service.is_active ? 'default' : 'secondary'}>
                        {service.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(service.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Form Modal */}
      <ServiceFormModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditingService(null); }}
        onSubmit={handleSubmit}
        initialData={editingService}
        type="digital"
        categories={categories}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this service? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminDigital;
