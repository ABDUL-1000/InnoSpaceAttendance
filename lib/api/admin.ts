import { api } from './instance';

export interface ManualInternData {
  name: string;
  phone: string;
  email: string;
  school: string;
  category: 'SIWES' | 'Intern';
}

export const adminApi = {
  getAllInterns: async () => {
    const response = await api.get('/api/admin/interns');
    return response.data;
  },

  getAllSiwes: async () => {
    const response = await api.get('/api/admin/interns/siwes');
    return response.data;
  },

  addInternManually: async (data: ManualInternData) => {
    const response = await api.post('/api/admin/interns/manual', data);
    return response.data;
  },

  uploadAcceptanceLetter: async (internId: string, file: File) => {
    const formData = new FormData();
    formData.append('acceptanceLetter', file);
    
    const response = await api.post(
      `/api/admin/interns/${internId}/acceptance`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  uploadCertificate: async (internId: string, file: File) => {
    const formData = new FormData();
    formData.append('certificate', file);
    
    const response = await api.post(
      `/api/admin/interns/${internId}/certificate`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data;
  },

  acceptIntern: async (internId: string) => {
    const response = await api.put(`/api/admin/interns/${internId}/accept`);
    return response.data;
  },

  deleteIntern: async (internId: string) => {
    const response = await api.delete(`/api/admin/interns/${internId}`);
    return response.data;
  },
};