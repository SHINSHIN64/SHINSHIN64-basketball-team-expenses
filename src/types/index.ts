export interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
}

export interface Expense {
  id: string;
  playerId: string | null;
  playerName: string | null;
  amount: number;
  date: string;
  category: ExpenseCategory;
  description: string;
}

export type ExpenseCategory = 
  | '会場費'
  | '用具費'
  | '交通費'
  | '飲食費'
  | 'ユニフォーム代'
  | 'その他';

export interface ExpenseSummary {
  total: number;
  byCategory: Record<ExpenseCategory, number>;
}

export interface PlayerExpenseSummary {
  playerId: string;
  playerName: string;
  totalExpense: number;
  expensesByCategory: {
    [key: string]: number;
  };
} 