'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Wrench } from 'lucide-react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    specialization: '',
    experience: '',
    phone: '',
  });

  const { register } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      toast.success("Registration successful!");
      
      // Navigate based on selected role
      switch (formData.role) {
        case 'admin':
          router.push('/admin/dashboard');
          break;
        case 'mechanic':
          router.push('/mechanic/dashboard');
          break;
        case 'user':
          router.push('/user/dashboard');
          break;
        default:
          router.push('/user/dashboard');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F3E0] py-12">
      <Card className="w-[450px] shadow-lg border-[#608BC1] border-t-4">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Wrench size={40} className="text-[#133E87]" />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#133E87]">QuickFix</h2>
          <p className="text-center text-sm text-[#608BC1]">Create your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-[#133E87]">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-[#CBDCEB] focus:border-[#608BC1]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-[#133E87]">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-[#CBDCEB] focus:border-[#608BC1]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-[#133E87]">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="border-[#CBDCEB] focus:border-[#608BC1]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role" className="text-[#133E87]">Role</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger className="border-[#CBDCEB] focus:border-[#608BC1]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="mechanic">Mechanic</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.role === 'mechanic' && (
                <>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="specialization" className="text-[#133E87]">Specialization</Label>
                    <Input
                      id="specialization"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                      className="border-[#CBDCEB] focus:border-[#608BC1]"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="experience" className="text-[#133E87]">Years of Experience</Label>
                    <Input
                      id="experience"
                      name="experience"
                      type="number"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="border-[#CBDCEB] focus:border-[#608BC1]"
                    />
                  </div>
                </>
              )}

              {formData.role === 'user' && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone" className="text-[#133E87]">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="border-[#CBDCEB] focus:border-[#608BC1]"
                  />
                </div>
              )}
            </div>
            <CardFooter className="flex justify-center mt-6">
              <Button 
                type="submit"
                className="w-full bg-[#133E87] hover:bg-[#608BC1] transition-colors"
              >
                Register
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}