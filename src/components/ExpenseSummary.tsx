import React from 'react';
import { PlayerExpenseSummary } from '../types';

interface ExpenseSummaryProps {
  summaries: PlayerExpenseSummary[];
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ summaries }) => {
  const totalTeamExpense = summaries.reduce((total, summary) => total + summary.totalExpense, 0);
  
  const categoryTotals = summaries.reduce((totals, summary) => {
    Object.entries(summary.expensesByCategory).forEach(([category, amount]) => {
      totals[category] = (totals[category] || 0) + (amount as number);
    });
    return totals;
  }, {} as { [key: string]: number });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  return (
    <div className="expense-summary">
      <div className="total-expense">
        <h3>チーム総支出</h3>
        <div className="amount">{formatCurrency(totalTeamExpense)}</div>
      </div>
      
      <div className="category-breakdown">
        <h3>カテゴリー別支出</h3>
        <div className="category-grid">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div key={category} className="category-item">
              <div className="category-name">
                {category === 'uniform' && 'ユニフォーム'}
                {category === 'shoes' && 'シューズ'}
                {category === 'equipment' && '用具'}
                {category === 'tournament' && '大会参加費'}
                {category === 'other' && 'その他'}
              </div>
              <div className="category-amount">{formatCurrency(amount)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="player-breakdown">
        <h3>選手別支出</h3>
        <div className="player-expenses-grid">
          {summaries.map((summary) => (
            <div key={summary.playerId} className="player-expense-item">
              <div className="player-name">{summary.playerName}</div>
              <div className="player-total">{formatCurrency(summary.totalExpense)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary; 