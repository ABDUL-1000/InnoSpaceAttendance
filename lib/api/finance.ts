import { api } from './instance';

export interface ExpenseData {
  title: string;
  amount: number;
  category: string;
  addedBy: string;
  description: string;
}

export interface RevenueData {
  source: string;
  amount: number;
  receivedBy: string;
  description: string;
}

export interface BudgetData {
  title: string;
  amount: number;
  department: string;
  createdBy: string;
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

export const financeApi = {
  // Expenses
  addExpense: async (data: ExpenseData) => {
    const response = await api.post('/api/finance/expense', data);
    return response.data;
  },

  getAllExpenses: async () => {
    const response = await api.get('/api/finance/expense');
    return response.data;
  },

  // Revenue
  addRevenue: async (data: RevenueData) => {
    const response = await api.post('/api/finance/revenue', data);
    return response.data;
  },

  getAllRevenue: async () => {
    const response = await api.get('/api/finance/revenue');
    return response.data;
  },

  // Budget
  addBudget: async (data: BudgetData) => {
    const response = await api.post('/api/finance/budget', data);
    return response.data;
  },

  getAllBudgets: async () => {
    const response = await api.get('/api/finance/budget');
    return response.data;
  },

  // Summary
  getFinanceSummary: async () => {
    const response = await api.get('/api/finance/summary');
    return response.data;
  },
};