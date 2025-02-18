import React, { useState } from 'react';
import { Expense } from '../types';

interface ExpenseFormProps {
  playerId: string;
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ playerId, onSubmit }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'uniform',
    amount: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      playerId,
      date: formData.date,
      category: formData.category as Expense['category'],
      amount: Number(formData.amount),
      description: formData.description,
    });
    setFormData({
      ...formData,
      amount: '',
      description: '',
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>経費登録</h3>
      <div className="form-group">
        <label htmlFor="date">日付</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">カテゴリー</label>
        <select
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="uniform">ユニフォーム</option>
          <option value="shoes">シューズ</option>
          <option value="equipment">用具</option>
          <option value="tournament">大会参加費</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">金額</label>
        <input
          type="number"
          id="amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
          min="0"
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">説明</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <button type="submit" className="submit-button">登録</button>
    </form>
  );
};

export default ExpenseForm; 