import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { internsApi, InternRegistrationData } from '../api/interns';

export const useRegisterIntern = () => {
  return useMutation({
    mutationFn: (data: FormData) => internsApi.register(data),
  });
};

export const useGetCertificate = (phone: string) => {
  return useQuery({
    queryKey: ['certificate', phone],
    queryFn: () => internsApi.getCertificate(phone),
    enabled: !!phone,
  });
};