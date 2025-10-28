import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { financeAPI } from '../api/finance';

export const useFinance = () => {
  const queryClient = useQueryClient();

  // Queries
  const expensesQuery = useQuery({
    queryKey: ['finance', 'expenses'],
    queryFn: financeAPI.getExpenses,
  });

  const revenueQuery = useQuery({
    queryKey: ['finance', 'revenue'],
    queryFn: financeAPI.getRevenue,
  });

  const budgetsQuery = useQuery({
    queryKey: ['finance', 'budgets'],
    queryFn: financeAPI.getBudgets,
  });

  const summaryQuery = useQuery({
    queryKey: ['finance', 'summary'],
    queryFn: financeAPI.getSummary,
  });

  // Mutations
  const addExpenseMutation = useMutation({
    mutationFn: financeAPI.addExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'expenses'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });

  const addRevenueMutation = useMutation({
    mutationFn: financeAPI.addRevenue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'revenue'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });

  const addBudgetMutation = useMutation({
    mutationFn: financeAPI.addBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['finance', 'budgets'] });
      queryClient.invalidateQueries({ queryKey: ['finance', 'summary'] });
    },
  });

  return {
    // Queries data
    expenses: expensesQuery.data || [],
    revenue: revenueQuery.data || [],
    budgets: budgetsQuery.data || [],
    summary: summaryQuery.data || {},
    
    // Loading states
    isLoading: expensesQuery.isLoading || revenueQuery.isLoading || budgetsQuery.isLoading,
    
    // Mutations
    addExpense: addExpenseMutation.mutateAsync,
    addRevenue: addRevenueMutation.mutateAsync,
    addBudget: addBudgetMutation.mutateAsync,
    
    // Mutation states
    isAddingExpense: addExpenseMutation.isPending,
    isAddingRevenue: addRevenueMutation.isPending,
    isAddingBudget: addBudgetMutation.isPending,
    
    // Errors
    error: addExpenseMutation.error || addRevenueMutation.error,
  };
};