import { api } from './instance';

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

export const authApi = {




};