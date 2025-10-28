import { api } from './instance';

export interface InternRegistrationData {
  name: string;
  phone: string;
  email: string;
  school: string;
  category: 'SIWES' | 'Intern';
  siwesForm?: File;
  paymentProof: File;
}

export interface Intern {
  id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  category: 'SIWES' | 'Intern';
  status: 'pending' | 'accepted' | 'rejected';
  regNumber?: string;
  address?: string;
}

export const internsApi = {
  register: async (data: FormData) => {
    const response = await api.post('/api/interns/register', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  getDetailsByPhone: async (phone: string) => {
    const response = await api.get(`/api/interns/details/${phone}`);
    return response.data;
  },

  getCertificate: async (phone: string) => {
    const response = await api.get(`/api/interns/certificate/${phone}`);
    return response.data;
  },
};