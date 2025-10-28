import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi, ManualInternData } from '../api/admin';

export const useAllInterns = () => {
  return useQuery({
    queryKey: ['admin', 'interns'],
    queryFn: () => adminApi.getAllInterns(),
  });
};

export const useAllSiwes = () => {
  return useQuery({
    queryKey: ['admin', 'siwes'],
    queryFn: () => adminApi.getAllSiwes(),
  });
};

export const useAddInternManually = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ManualInternData) => adminApi.addInternManually(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'interns'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'siwes'] });
    },
  });
};

export const useAcceptIntern = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (internId: string) => adminApi.acceptIntern(internId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'interns'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'siwes'] });
    },
  });
};

export const useDeleteIntern = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (internId: string) => adminApi.deleteIntern(internId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'interns'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'siwes'] });
    },
  });
};