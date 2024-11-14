'use client';

import { useAuth } from '@/app/context/AuthContext';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <Button 
      onClick={handleLogout}
      className="bg-white text-[#133E87] hover:bg-[#CBDCEB] transition-colors flex items-center gap-2"
      variant="outline"
    >
      <LogOut size={18} />
      Logout
    </Button>
  );
} 