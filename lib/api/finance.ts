import { api } from './instance';

export interface ExpenseData {
  title: string;
  amount: number;
  category: string;
  addedBy: string;
  description?: string;
}

export interface RevenueData {
  source: string;
  amount: number;
  receivedBy: string;
  description?: string;
}

export interface BudgetData {
  title: string;
  amount: number;
  department: string;
  createdBy: string;
}

export const financeAPI = {
  addExpense: async (data: ExpenseData) => {
    const response = await api.post('/finance/expense', data);
    return response.data;
  },

  addRevenue: async (data: RevenueData) => {
    const response = await api.post('/finance/revenue', data);
    return response.data;
  },

  addBudget: async (data: BudgetData) => {
    const response = await api.post('/finance/budget', data);
    return response.data;
  },

  getExpenses: async () => {
    const response = await api.get('/finance/expense');
    return response.data;
  },

  getRevenue: async () => {
    const response = await api.get('/finance/revenue');
    return response.data;
  },

  getBudgets: async () => {
    const response = await api.get('/finance/budget');
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/finance/summary');
    return response.data;
  },
};