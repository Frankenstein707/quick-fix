'use client';

import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import LogoutButton from '@/app/components/auth/LogoutButton';
import { User, Calendar, CheckCircle, XCircle, Wrench } from 'lucide-react';

interface HireRequest {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'accepted' | 'rejected';
  date: string;
}

export default function MechanicDashboard() {
  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchHireRequests();
  }, []);

  const fetchHireRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mechanics/requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setHireRequests(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching hire requests:', error);
      toast.error("Failed to fetch hire requests");
      setHireRequests([]);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/mechanics/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });
      
      if (response.ok) {
        toast.success(`Request ${status} successfully`);
        fetchHireRequests();
      } else {
        toast.error("Failed to update request status");
      }
    } catch (error) {
      console.error('Error updating request status:', error);
      toast.error("Failed to update request status");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'accepted':
        return 'bg-green-500';
      case 'rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['mechanic']}>
      <div className="min-h-screen bg-[#F3F3E0]">
        <header className="bg-[#133E87] text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center">
              <Wrench className="mr-2" />
              QuickFix Mechanic Dashboard
            </h1>
            <LogoutButton />
          </div>
        </header>
        <main className="container mx-auto p-6">
          <h2 className="text-3xl font-bold mb-6 text-[#133E87]">Hire Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(hireRequests) && hireRequests.map((request) => (
              <Card key={request._id} className="bg-white shadow-lg border-[#608BC1] border-t-4">
                <CardHeader>
                  <CardTitle className="text-xl text-[#133E87] flex items-center">
                    <User className="mr-2 text-[#608BC1]" />
                    {request.userId.name}
                  </CardTitle>
                  <CardDescription className="text-[#608BC1]">{request.userId.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Badge className={`${getStatusColor(request.status)} text-white`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </div>
                  <div className="flex items-center mb-4">
                    <Calendar className="mr-2 text-[#608BC1]" />
                    <p>{new Date(request.date).toLocaleDateString()}</p>
                  </div>
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        onClick={() => updateRequestStatus(request._id, 'accepted')}
                        className="flex-1 bg-[#133E87] hover:bg-[#608BC1] transition-colors"
                      >
                        <CheckCircle className="mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => updateRequestStatus(request._id, 'rejected')}
                        className="flex-1"
                      >
                        <XCircle className="mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}