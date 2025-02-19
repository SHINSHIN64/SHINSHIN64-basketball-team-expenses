import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Expense } from '../types';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete }) => {
  return (
    <Box sx={{ width: '100%', overflowX: 'auto' }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        経費一覧
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }}>
          <TableHead>
            <TableRow>
              <TableCell>日付</TableCell>
              <TableCell>選手</TableCell>
              <TableCell>カテゴリー</TableCell>
              <TableCell align="right">金額</TableCell>
              <TableCell>説明</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {format(new Date(expense.date), 'yyyy/MM/dd', { locale: ja })}
                </TableCell>
                <TableCell>
                  {expense.playerName || 'チーム共通'}
                </TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell align="right">
                  {expense.amount.toLocaleString()}円
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => onDelete(expense.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}; 