export interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
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
  createdAt: string;
}

export interface Attendance {
  id: string;
  internId: string;
  date: string;
  signedInAt: string;
}
export interface LocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
}
export interface AttendanceData {
  phone: string;
  latitude?: number;
  longitude?: number;
}
