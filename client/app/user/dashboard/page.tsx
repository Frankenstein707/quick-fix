'use client';

import { useAuth } from '@/app/context/AuthContext';
import ProtectedRoute from '@/app/components/auth/ProtectedRoute';
import { useEffect, useState } from 'react';
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LogoutButton from '@/app/components/auth/LogoutButton';
import { Wrench, Star, Clock, CheckCircle } from 'lucide-react';

interface Mechanic {
  _id: string;
  name: string;
  specialization: string;
  experience: number;
  isApproved: boolean;
}

interface CurrentHire {
  mechanicId: Mechanic;
  status: string;
  startDate: string;
}

export default function UserDashboard() {
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [currentHire, setCurrentHire] = useState<CurrentHire | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/status', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      console.log('User status:', data); // Debug log
      if (data.currentHire && data.currentHire.mechanicId) {
        setCurrentHire(data.currentHire);
      } else {
        await fetchMechanics();
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      toast.error("Failed to fetch user status");
    }
  };

  const fetchMechanics = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mechanics/approved');
      const data = await response.json();
      console.log('Fetched mechanics:', data); // Debug log
      setMechanics(data);
    } catch (error) {
      console.error('Error fetching mechanics:', error);
      toast.error("Failed to fetch mechanics");
    }
  };

  const hireMechanic = async (mechanicId: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/mechanics/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ mechanicId }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Hire request sent successfully");
        fetchUserStatus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error hiring mechanic:', error);
      toast.error("Failed to hire mechanic");
    }
  };

  const completeWork = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/complete-work', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        toast.success("Work completed successfully");
        setCurrentHire(null);
        fetchMechanics();
      } else {
        toast.error("Failed to complete work");
      }
    } catch (error) {
      console.error('Error completing work:', error);
      toast.error("Failed to complete work");
    }
  };

  return (
    <ProtectedRoute allowedRoles={['user']}>
      <div className="min-h-screen bg-[#F3F3E0]">
        <header className="bg-[#133E87] text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">QuickFix User Dashboard</h1>
            <LogoutButton />
          </div>
        </header>
        <main className="container mx-auto p-6">
          {currentHire && currentHire.mechanicId ? (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#133E87]">Current Service</h2>
              <Card className="bg-white shadow-lg border-[#608BC1] border-t-4">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#133E87]">{currentHire.mechanicId.name}</CardTitle>
                  <CardDescription className="text-[#608BC1]">{currentHire.mechanicId.specialization}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    <Clock className="mr-2 text-[#608BC1]" />
                    <p>Started: {new Date(currentHire.startDate).toLocaleDateString()}</p>
                  </div>
                  <Button 
                    onClick={completeWork}
                    className="w-full bg-[#133E87] hover:bg-[#608BC1] transition-colors"
                  >
                    <CheckCircle className="mr-2" />
                    Complete Work
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold mb-6 text-[#133E87]">Available Mechanics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mechanics.map((mechanic) => (
                  <Card key={mechanic._id} className="bg-white shadow-lg border-[#608BC1] border-t-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#133E87]">{mechanic.name}</CardTitle>
                      <CardDescription className="text-[#608BC1]">{mechanic.specialization}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-4">
                        <Star className="mr-2 text-[#608BC1]" />
                        <p>Experience: {mechanic.experience} years</p>
                      </div>
                      <Button 
                        onClick={() => hireMechanic(mechanic._id)}
                        className="w-full bg-[#133E87] hover:bg-[#608BC1] transition-colors"
                      >
                        <Wrench className="mr-2" />
                        Hire Mechanic
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}