import { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import { Expense, ExpenseCategory, Player } from '../types';

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
  players: Player[];
}

const categories: ExpenseCategory[] = [
  '会場費',
  '用具費',
  '交通費',
  '飲食費',
  'ユニフォーム代',
  'その他'
];

export const ExpenseForm: FC<ExpenseFormProps> = ({ onSubmit, players }) => {
  const { control, handleSubmit, reset } = useForm<Omit<Expense, 'id'>>();

  const onSubmitForm = (data: Omit<Expense, 'id'>) => {
    const selectedPlayer = players.find(p => p.id === data.playerId);
    onSubmit({
      ...data,
      playerName: selectedPlayer?.name || null,
    });
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <Typography variant="h6" component="h2">
        経費登録
      </Typography>

      <Controller
        name="playerId"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>選手</InputLabel>
            <Select {...field} label="選手">
              <MenuItem value="">チーム共通</MenuItem>
              {players.map((player) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name} (#{player.number})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="amount"
        control={control}
        rules={{ required: true, min: 0 }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="金額"
            type="number"
            error={!!fieldState.error}
            helperText={fieldState.error ? '金額を入力してください' : ''}
            fullWidth
          />
        )}
      />

      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="日付"
            type="date"
            error={!!fieldState.error}
            helperText={fieldState.error ? '日付を選択してください' : ''}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        rules={{ required: true }}
        defaultValue={categories[0]}
        render={({ field, fieldState }) => (
          <FormControl fullWidth error={!!fieldState.error}>
            <InputLabel>カテゴリー</InputLabel>
            <Select {...field} label="カテゴリー">
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="description"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="説明"
            multiline
            rows={2}
            error={!!fieldState.error}
            helperText={fieldState.error ? '説明を入力してください' : ''}
            fullWidth
          />
        )}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        登録
      </Button>
    </Box>
  );
}; 