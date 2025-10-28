import { useMutation, useQuery } from '@tanstack/react-query';
import { attendanceApi } from '../api/attendance';
import { AttendanceData } from '@/app/types';


export const useInternDetails = (phone: string) => {
  return useQuery({
    queryKey: ['intern-details', phone],
    queryFn: () => attendanceApi.getInternDetails(phone),
    enabled: !!phone && phone.length === 11, 
    retry: false, 
  });
};

export const useMarkAttendance = () => {
  return useMutation({
    mutationFn: (data: AttendanceData) => attendanceApi.markAttendance(data),
  });
};