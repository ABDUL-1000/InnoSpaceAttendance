import { api } from './instance';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  password: string;
  role: string;
}

export interface Staff {
  id: string;
  fullname: string;
  email: string;
  role: string;
  createdAt: string;
}

export const authApi = {
  login: async (data: LoginData) => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/staffs/me');
    return response.data;
  },

  getAllStaffs: async () => {
    const response = await api.get('/api/staffs');
    return response.data;
  },

  updateStaff: async (staffId: string, data: Partial<RegisterData>) => {
    const response = await api.put(`/api/staffs/${staffId}`, data);
    return response.data;
  },

  deleteStaff: async (staffId: string) => {
    const response = await api.delete(`/api/staffs/${staffId}`);
    return response.data;
  },
};