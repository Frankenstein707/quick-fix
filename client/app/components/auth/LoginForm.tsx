'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { Wrench } from 'lucide-react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully");
      
      router.push('/user/dashboard');
    
    } catch (error) {
      console.error('Login failed:', error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F3E0]">
      <Card className="w-[400px] shadow-lg border-[#608BC1] border-t-4">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <Wrench size={40} className="text-[#133E87]" />
          </div>
          <h2 className="text-3xl font-bold text-center text-[#133E87]">QuickFix</h2>
          <p className="text-center text-sm text-[#608BC1]">Enter your credentials to access your account</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-[#133E87]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#CBDCEB] focus:border-[#608BC1]"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-[#133E87]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#CBDCEB] focus:border-[#608BC1]"
                />
              </div>
            </div>
            <CardFooter className="flex justify-center mt-6">
              <Button 
                type="submit" 
                className="w-full bg-[#133E87] hover:bg-[#608BC1] transition-colors"
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}