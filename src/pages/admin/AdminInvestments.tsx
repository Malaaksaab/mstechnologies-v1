import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import ServiceFormModal from '@/components/admin/ServiceFormModal';
import { useInvestmentPlans } from '@/hooks/useInvestmentPlans';
import { useCreateInvestmentPlan, useUpdateInvestmentPlan, useDeleteInvestmentPlan } from '@/hooks/useAdminServices';
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

const AdminInvestments = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: plans, isLoading } = useInvestmentPlans();
  const createMutation = useCreateInvestmentPlan();
  const updateMutation = useUpdateInvestmentPlan();
  const deleteMutation = useDeleteInvestmentPlan();

  const filteredPlans = plans?.filter(plan => 
    plan.name.toLowerCase().includes(search.toLowerCase()) ||
    plan.description?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (data: any) => {
    if (editingPlan) {
      updateMutation.mutate({ id: editingPlan.id, ...data }, {
        onSuccess: () => {
          setModalOpen(false);
          setEditingPlan(null);
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

  const handleEdit = (plan: any) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null)
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <AdminLayout 
      title="Investment Plans" 
      description="Manage investment plans, profit rates, and deposit limits"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Plans</p>
                <p className="text-2xl font-bold text-foreground">{plans?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Popular Plans</p>
                <p className="text-2xl font-bold text-foreground">{plans?.filter(p => p.is_popular).length || 0}</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Profit Rate</p>
                <p className="text-2xl font-bold text-foreground">
                  {plans?.length ? (plans.reduce((acc, p) => acc + p.profit_rate, 0) / plans.length).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => { setEditingPlan(null); setModalOpen(true); }} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Plan
          </Button>
        </div>

        {/* Plans Table */}
        <div className="glass-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan Name</TableHead>
                <TableHead>Deposit Range</TableHead>
                <TableHead>Profit Rate</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading plans...
                  </TableCell>
                </TableRow>
              ) : filteredPlans?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No plans found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPlans?.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {plan.is_popular && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        <span className="font-medium">{plan.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatCurrency(plan.min_deposit)} - {formatCurrency(plan.max_deposit)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20">
                        {plan.profit_rate}% Monthly
                      </Badge>
                    </TableCell>
                    <TableCell>{plan.duration_months} months</TableCell>
                    <TableCell>
                      <Badge variant={plan.is_active ? 'default' : 'secondary'}>
                        {plan.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(plan)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(plan.id)}>
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
        onClose={() => { setModalOpen(false); setEditingPlan(null); }}
        onSubmit={handleSubmit}
        initialData={editingPlan}
        type="investment"
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Investment Plan</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this investment plan? This action cannot be undone.
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

export default AdminInvestments;
