import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adminApi, ManualInternData } from '../api/admin';
import { InternsResponse } from '@/app/types';




export const useAllInterns = () => {
  return useQuery<InternsResponse>({
    queryKey: ['admin', 'interns'],
    queryFn: () => adminApi.getAllInterns(),
  });
};

export const useAllSiwes = () => {
  return useQuery<InternsResponse>({
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

export const useUploadAcceptanceLetter = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ internId, file }: { internId: string; file: File }) => 
      adminApi.uploadAcceptanceLetter(internId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'interns'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'siwes'] });
    },
  });
};

export const useUploadCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ internId, file }: { internId: string; file: File }) => 
      adminApi.uploadCertificate(internId, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'interns'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'siwes'] });
    },
  });
};