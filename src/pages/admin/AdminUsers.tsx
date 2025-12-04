import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { 
  Users, 
  Search,
  RefreshCw,
  Shield,
  UserCheck,
  UserX,
  Mail,
  Calendar,
  ShoppingBag,
  Eye,
  Crown,
  User as UserIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
}

interface UserWithDetails {
  profile: UserProfile;
  roles: UserRole[];
  bookingsCount: number;
  lastBooking: string | null;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<UserWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithDetails | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [stats, setStats] = useState({
    totalUsers: 0,
    admins: 0,
    activeToday: 0,
  });

  useEffect(() => {
    fetchUsers();

    // Set up realtime subscription for profiles
    const profilesChannel = supabase
      .channel('profiles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'profiles'
      }, () => {
        fetchUsers();
      })
      .subscribe();

    const rolesChannel = supabase
      .channel('roles-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_roles'
      }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(profilesChannel);
      supabase.removeChannel(rolesChannel);
    };
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Fetch bookings count per user
      const { data: bookings, error: bookingsError } = await supabase
        .from('service_bookings')
        .select('user_id, created_at')
        .not('user_id', 'is', null);

      if (bookingsError) throw bookingsError;

      // Combine data
      const usersWithDetails: UserWithDetails[] = (profiles || []).map(profile => {
        const userRoles = (roles || []).filter(r => r.user_id === profile.user_id);
        const userBookings = (bookings || []).filter(b => b.user_id === profile.user_id);
        const lastBooking = userBookings.length > 0 
          ? userBookings.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]?.created_at 
          : null;

        return {
          profile,
          roles: userRoles,
          bookingsCount: userBookings.length,
          lastBooking,
        };
      });

      setUsers(usersWithDetails);

      // Calculate stats
      const adminCount = usersWithDetails.filter(u => 
        u.roles.some(r => r.role === 'admin')
      ).length;

      setStats({
        totalUsers: usersWithDetails.length,
        admins: adminCount,
        activeToday: usersWithDetails.filter(u => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return new Date(u.profile.updated_at || u.profile.created_at) >= today;
        }).length,
      });

    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (user: UserWithDetails) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
  };

  const handleManageRole = (user: UserWithDetails) => {
    setSelectedUser(user);
    setSelectedRole(user.roles[0]?.role || 'user');
    setIsRoleModalOpen(true);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      // Check if user already has a role
      const existingRole = selectedUser.roles[0];

      if (existingRole) {
        // Update existing role
        const { error } = await supabase
          .from('user_roles')
          .update({ role: selectedRole as 'admin' | 'moderator' | 'user' })
          .eq('id', existingRole.id);

        if (error) throw error;
      } else {
        // Insert new role
        const { error } = await supabase
          .from('user_roles')
          .insert({
            user_id: selectedUser.profile.user_id,
            role: selectedRole as 'admin' | 'moderator' | 'user'
          });

        if (error) throw error;
      }

      toast.success('User role updated successfully');
      setIsRoleModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const getRoleBadge = (roles: UserRole[]) => {
    if (roles.some(r => r.role === 'admin')) {
      return <Badge className="bg-red-500 hover:bg-red-600"><Crown className="w-3 h-3 mr-1" />Admin</Badge>;
    }
    if (roles.some(r => r.role === 'moderator')) {
      return <Badge className="bg-blue-500 hover:bg-blue-600"><Shield className="w-3 h-3 mr-1" />Moderator</Badge>;
    }
    return <Badge variant="secondary"><UserIcon className="w-3 h-3 mr-1" />User</Badge>;
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.profile.full_name?.toLowerCase().includes(searchLower) ||
      user.profile.user_id.toLowerCase().includes(searchLower)
    );
  });

  return (
    <AdminLayout 
      title="Users Management" 
      description="View and manage registered users, roles, and permissions"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">registered accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Crown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-500">{stats.admins}</div>
            <p className="text-xs text-muted-foreground">with admin access</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">{stats.activeToday}</div>
            <p className="text-xs text-muted-foreground">users active today</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchUsers}>
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <RefreshCw className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? 'No users match your search' : 'No users found'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            {user.profile.avatar_url ? (
                              <img 
                                src={user.profile.avatar_url} 
                                alt={user.profile.full_name || 'User'} 
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <UserIcon className="w-5 h-5 text-primary" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{user.profile.full_name || 'Unnamed User'}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {user.profile.user_id}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.roles)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                          {user.bookingsCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {format(new Date(user.profile.created_at), 'MMM d, yyyy')}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewDetails(user)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleManageRole(user)}
                          >
                            <Shield className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* User Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>View detailed information about this user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  {selectedUser.profile.avatar_url ? (
                    <img 
                      src={selectedUser.profile.avatar_url} 
                      alt={selectedUser.profile.full_name || 'User'} 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.profile.full_name || 'Unnamed User'}</h3>
                  {getRoleBadge(selectedUser.roles)}
                </div>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">User ID:</span>
                  <span className="truncate text-xs">{selectedUser.profile.user_id}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Joined:</span>
                  <span>{format(new Date(selectedUser.profile.created_at), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Total Bookings:</span>
                  <span>{selectedUser.bookingsCount}</span>
                </div>
                {selectedUser.lastBooking && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Last Booking:</span>
                    <span>{format(new Date(selectedUser.lastBooking), 'MMM d, yyyy')}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    handleManageRole(selectedUser);
                  }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Manage Role
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Role Management Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Manage User Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedUser?.profile.full_name || 'this user'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    User
                  </div>
                </SelectItem>
                <SelectItem value="moderator">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-500" />
                    Moderator
                  </div>
                </SelectItem>
                <SelectItem value="admin">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-red-500" />
                    Admin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setIsRoleModalOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleUpdateRole}>
                Update Role
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsers;
