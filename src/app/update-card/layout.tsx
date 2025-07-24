"use client";

import { useAuthStore } from "@/store/auth-store";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div>
      {/* Example: show a welcome if logged in */}
      {isAuthenticated && <p>Welcome back, {user?.username || "User"}!</p>}
      {children}
    </div>
  );
}
