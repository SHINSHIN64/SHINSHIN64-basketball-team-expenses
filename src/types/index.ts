export interface Player {
  id: string;
  name: string;
  number: string;
  position: string;
}

export interface Expense {
  id: string;
  playerId: string;
  date: string;
  category: 'uniform' | 'shoes' | 'equipment' | 'tournament' | 'other';
  amount: number;
  description: string;
}

export interface PlayerExpenseSummary {
  playerId: string;
  playerName: string;
  totalExpense: number;
  expensesByCategory: {
    [key: string]: number;
  };
} 