import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  AccountBalance as AccountBalanceIcon,
  SportsTennis as SportsIcon,
  DirectionsBus as TransportIcon,
  Restaurant as FoodIcon,
  Checkroom as UniformIcon,
  More as OtherIcon,
} from '@mui/icons-material';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

const categoryIcons: Record<ExpenseCategory, React.ReactElement> = {
  '会場費': <AccountBalanceIcon />,
  '用具費': <SportsIcon />,
  '交通費': <TransportIcon />,
  '飲食費': <FoodIcon />,
  'ユニフォーム代': <UniformIcon />,
  'その他': <OtherIcon />,
};

const categoryColors: Record<ExpenseCategory, string> = {
  '会場費': '#2196f3',
  '用具費': '#4caf50',
  '交通費': '#ff9800',
  '飲食費': '#f44336',
  'ユニフォーム代': '#9c27b0',
  'その他': '#757575',
};

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        経費サマリー
      </Typography>
      
      <Card sx={{ mb: 3, overflow: 'hidden' }}>
        <Box sx={{ 
          p: 2, 
          background: 'linear-gradient(45deg, #2196f3 30%, #64b5f6 90%)',
          color: 'white'
        }}>
          <Typography variant="h5" component="div" align="center" sx={{ fontWeight: 'bold' }}>
            総支出
          </Typography>
          <Typography variant="h4" component="div" align="center" sx={{ mt: 1 }}>
            ¥{total.toLocaleString()}
          </Typography>
        </Box>
      </Card>

      <Grid container spacing={2}>
        {Object.entries(categoryTotals).map(([category, amount]) => {
          const percentage = (amount / total) * 100;
          const categoryKey = category as ExpenseCategory;
          return (
            <Grid item xs={12} sm={6} key={category}>
              <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box sx={{ 
                    mr: 1,
                    color: categoryColors[categoryKey],
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {categoryIcons[categoryKey]}
                  </Box>
                  <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                    {category}
                  </Typography>
                </Box>
                <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                  ¥{amount.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ flex: 1, mr: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: `${categoryColors[categoryKey]}20`,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: categoryColors[categoryKey],
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {percentage.toFixed(1)}%
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}; 