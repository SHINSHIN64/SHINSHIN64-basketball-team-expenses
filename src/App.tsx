import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { PlayersList } from './components/PlayersList';
import { Expense, Player } from './types';
import { v4 as uuidv4 } from 'uuid';
import { jaJP } from '@mui/material/locale';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      marginBottom: '1rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
  },
}, jaJP);

function App() {
  const [expenses, setExpenses] = React.useState<Expense[]>([]);
  const [players, setPlayers] = React.useState<Player[]>([]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: uuidv4(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleAddPlayer = (playerData: Omit<Player, 'id'>) => {
    const newPlayer: Player = {
      ...playerData,
      id: uuidv4(),
    };
    setPlayers([...players, newPlayer]);
  };

  const handleEditPlayer = (updatedPlayer: Player) => {
    setPlayers(players.map(player => 
      player.id === updatedPlayer.id ? updatedPlayer : player
    ));
  };

  const handleDeletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
    // 関連する経費の選手情報をnullに設定
    setExpenses(expenses.map(expense => 
      expense.playerId === id 
        ? { ...expense, playerId: null, playerName: null }
        : expense
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container 
        maxWidth="md" 
        sx={{ 
          py: 4,
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <PlayersList
          players={players}
          onAddPlayer={handleAddPlayer}
          onEditPlayer={handleEditPlayer}
          onDeletePlayer={handleDeletePlayer}
        />
        <ExpenseSummary expenses={expenses} />
        <ExpenseForm onSubmit={handleAddExpense} players={players} />
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} />
      </Container>
    </ThemeProvider>
  );
}

export default App; 