import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { financeApi, ExpenseData, RevenueData, BudgetData } from '../api/finance';

export const useAddExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: ExpenseData) => financeApi.addExpense(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'expenses'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });
};

export const useAllExpenses = () => {
  return useQuery({
    queryKey: ['finance', 'expenses'],
    queryFn: () => financeApi.getAllExpenses(),
  });
};

export const useAddRevenue = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: RevenueData) => financeApi.addRevenue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'revenue'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });
};

export const useAllRevenue = () => {
  return useQuery({
    queryKey: ['finance', 'revenue'],
    queryFn: () => financeApi.getAllRevenue(),
  });
};

export const useAddBudget = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: BudgetData) => financeApi.addBudget(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'budgets'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });
};

export const useAllBudgets = () => {
  return useQuery({
    queryKey: ['finance', 'budgets'],
    queryFn: () => financeApi.getAllBudgets(),
  });
};

export const useFinanceSummary = () => {
  return useQuery({
    queryKey: ['finance', 'summary'],
    queryFn: () => financeApi.getFinanceSummary(),
  });
};