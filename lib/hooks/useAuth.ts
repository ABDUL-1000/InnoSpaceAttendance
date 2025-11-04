import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/instance';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export interface LoginData {
  identifier: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
  role: string;
}
export const useLogin = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (data) => {
      toast.success('Login successful!');
      console.log('Login successful, token should be set:', data);
      // Add a small delay to ensure cookie is set
      setTimeout(() => {
        router.push('/dashboard');
      }, 100);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RegisterData) => authApi.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });
};

export const useAllStaffs = () => {
  return useQuery({
    queryKey: ['staffs'],
    queryFn: () => authApi.getAllStaffs(),
  });
};

export const useUpdateStaff = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ staffId, data }: { staffId: string; data: Partial<RegisterData> }) => 
      authApi.updateStaff(staffId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });
};

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (staffId: string) => authApi.deleteStaff(staffId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
    },
  });
};

export const useLogout = () => {
  return () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
  };
};