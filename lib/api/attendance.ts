import { AttendanceData } from '@/app/types';
import { api } from './instance';


export const attendanceApi = {
  markAttendance: async (data: AttendanceData) => {
    const response = await api.post('/api/attendance/mark', data);
    return response.data;
  },

  getInternDetails: async (phone: string) => {
    const response = await api.get(`/api/interns/details/${phone}`);
    return response.data.data;
  },
};