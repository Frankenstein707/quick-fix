'use client';

import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LogoutButton from '@/app/components/auth/LogoutButton';
import { Users, User, History, Wrench, CheckCircle, XCircle, Mail, Briefcase } from 'lucide-react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Mechanic extends User {
  specialization: string;
  experience: number;
  isApproved: boolean;
}

interface HireHistory {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  mechanicId: {
    name: string;
    specialization: string;
  };
  status: string;
  startDate: string;
  endDate?: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [hireHistory, setHireHistory] = useState<HireHistory[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchMechanics();
    fetchHireHistory();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error("Failed to fetch users");
    }
  };

  const fetchMechanics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/mechanics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setMechanics(data);
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      toast.error("Failed to fetch mechanics");
    }
  };

  const fetchHireHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/hire-history', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setHireHistory(data);
    } catch (error) {
      console.error('Error fetching hire history:', error);
      toast.error("Failed to fetch hire history");
    }
  };

  const toggleMechanicApproval = async (mechanicId: string, isApproved: boolean) => {
    try {
      await fetch(`http://localhost:5000/api/admin/mechanics/${mechanicId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ isApproved }),
      });
      fetchMechanics();
      toast.success(`Mechanic ${isApproved ? 'approved' : 'disapproved'} successfully`);
    } catch (error) {
      console.error('Error updating mechanic approval:', error);
      toast.error("Failed to update mechanic approval");
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen bg-[#F3F3E0]">
        <header className="bg-[#133E87] text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Wrench className="mr-2" />
              QuickFix Admin Dashboard
            </h1>
            <LogoutButton />
          </div>
        </header>
        <main className="container mx-auto p-6">
          <Tabs defaultValue="mechanics" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-[#CBDCEB]">
              <TabsTrigger value="mechanics" className="data-[state=active]:bg-[#608BC1] data-[state=active]:text-white">
                <Wrench className="mr-2" />
                Mechanics
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-[#608BC1] data-[state=active]:text-white">
                <Users className="mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-[#608BC1] data-[state=active]:text-white">
                <History className="mr-2" />
                Hire History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mechanics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mechanics.map((mechanic) => (
                  <Card key={mechanic._id} className="bg-white shadow-lg border-[#608BC1] border-t-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#133E87]">{mechanic.name}</CardTitle>
                      <CardDescription className="text-[#608BC1]">{mechanic.specialization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-2">
                        <Briefcase className="mr-2 text-[#608BC1]" />
                        <p>Experience: {mechanic.experience} years</p>
                      </div>
                      <div className="flex items-center mb-4">
                        <Mail className="mr-2 text-[#608BC1]" />
                        <p>{mechanic.email}</p>
                      </div>
                      <Button
                        variant={mechanic.isApproved ? "destructive" : "default"}
                        onClick={() => toggleMechanicApproval(mechanic._id, !mechanic.isApproved)}
                        className={mechanic.isApproved ? "bg-red-500 hover:bg-red-600" : "bg-[#133E87] hover:bg-[#608BC1]"}
                      >
                        {mechanic.isApproved ? <XCircle className="mr-2" /> : <CheckCircle className="mr-2" />}
                        {mechanic.isApproved ? 'Disapprove' : 'Approve'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="users">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <Card key={user._id} className="bg-white shadow-lg border-[#608BC1] border-t-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#133E87]">{user.name}</CardTitle>
                      <CardDescription className="text-[#608BC1]">{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center">
                        <User className="mr-2 text-[#608BC1]" />
                        <p>Role: {user.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <Card className="bg-white shadow-lg border-[#608BC1] border-t-4">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#133E87]">Hire History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border border-[#CBDCEB]">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-[#F3F3E0]">
                          <TableHead>User</TableHead>
                          <TableHead>Mechanic</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Start Date</TableHead>
                          <TableHead>End Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {hireHistory.map((hire) => (
                          <TableRow key={hire._id}>
                            <TableCell>{hire.userId.name}</TableCell>
                            <TableCell>{hire.mechanicId.name}</TableCell>
                            <TableCell>{hire.mechanicId.specialization}</TableCell>
                            <TableCell>{hire.status}</TableCell>
                            <TableCell>{new Date(hire.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {hire.endDate ? new Date(hire.endDate).toLocaleDateString() : '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
}