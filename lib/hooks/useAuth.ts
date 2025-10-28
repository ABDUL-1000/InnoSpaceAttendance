import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, LoginData, RegisterData } from '../api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginData) => authApi.login(data),
    onSuccess: (data) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userRole', data.user?.role);
      }
    },
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