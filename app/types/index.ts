export interface User {
  id: string;
  fullname: string;
  email: string;
  role: string;
}

export interface Intern {
  _id: string;
  name: string;
  email: string;
  phone: string;
  school: string;
  category: 'SIWES' | 'Intern';
  course?: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  siwesForm?: string;
  paymentProof?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface InternsResponse {
  success: boolean;
  message: string;
  data: {
    interns: Intern[];
    count: number;
  };
}

export interface Expense {
  _id: string;
  title: string;
  amount: number;
  category: string;
  addedBy: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  __v?: number;
}

export interface Revenue {
  _id: string;
  source: string;
  amount: number;
  receivedBy: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  transactionId: string;
  __v?: number;
}

export interface Budget {
  _id: string;
  title: string;
  amount: number;
  department: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface FinanceSummary {
  totalBudget: number;
  totalRevenue: number;
  totalExpenses: number;
  netBalance: number;
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