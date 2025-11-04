'use client';
import { useLogout } from '@/lib/hooks/useAuth';

export function LogoutButton() {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="text-gray-700 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
    >
      Logout
    </button>
  );
}