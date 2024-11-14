'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/');
    }
    if (user && !allowedRoles.includes(user.role)) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
} 