// src/lib/api.ts
import axios from 'axios';

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

export interface Staff {
  id: string;
  fullname: string;
  email: string;
  role: string;
  createdAt: string;
}


const BASE_URL = "https://innospace-iosapi.onrender.com";

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authStorage = {
  setCookie(name: string, value: string, days = 7) {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

      // Simplified cookie string - remove problematic flags for development
      const cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
      
      document.cookie = cookieString;
      console.log('✅ Cookie set:', name, 'Value length:', value.length);
      console.log('📝 All cookies:', document.cookie);
    } catch (error) {
      console.error('❌ Error setting cookie:', error);
    }
  },

  getCookie(name: string): string | null {
    try {
      if (typeof document === 'undefined') return null;

      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
          const value = c.substring(nameEQ.length);
          console.log('🔍 Found cookie:', name, 'Value length:', value.length);
          return value;
        }
      }
      console.log('❌ Cookie not found:', name);
      return null;
    } catch (error) {
      console.error('Error getting cookie:', error);
      return null;
    }
  },

  deleteCookie(name: string) {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    } catch (error) {
      console.error('Error deleting cookie:', error);
    }
  },

  // User data storage in localStorage (since we don't have /user/me endpoint)
  setUserData(user: any) {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_data', JSON.stringify(user));
      }
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  },

  getUserData(): any | null {
    try {
      if (typeof window !== 'undefined') {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
      }
      return null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  clearUserData() {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user_data');
      }
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },

  // Token methods
  getAccessToken(): string | null {
    return this.getCookie('token');
  },

  setAccessToken(token: string) {
    this.setCookie('token', token, 7);
  },

  clearAccessToken() {
    this.deleteCookie('token');
  },

  // Clear all auth data
  clearAll() {
    this.clearAccessToken();
    this.clearUserData();
  },
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = authStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authStorage.clearAll();
      // Optional: redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API service functions
export const authApi = {
  login: async (credentials: { identifier: string; password: string }) => {
    const response = await api.post('/api/auth/login', credentials);
    
    if (response.data.success && response.data.data.token) {
      authStorage.setAccessToken(response.data.data.token);
      authStorage.setUserData(response.data.data.user);
    }
    
    return response.data.data;
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
  logout: () => {
    authStorage.clearAll();
  },
};

export default api;