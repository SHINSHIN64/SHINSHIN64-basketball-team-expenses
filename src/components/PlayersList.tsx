import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Avatar,
  Divider,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Player } from '../types';
import { useState } from 'react';

interface PlayersListProps {
  players: Player[];
  onAddPlayer: (player: Omit<Player, 'id'>) => void;
  onEditPlayer: (player: Player) => void;
  onDeletePlayer: (id: string) => void;
}

interface PlayerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (player: Omit<Player, 'id'>) => void;
  initialData?: Player;
  title: string;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

const getAvatarColor = (position: string) => {
  const colors = {
    'PG': '#2196f3',
    'SG': '#4caf50',
    'SF': '#ff9800',
    'PF': '#f44336',
    'C': '#9c27b0',
  };
  return colors[position as keyof typeof colors] || '#757575';
};

const PlayerDialog = ({ open, onClose, onSubmit, initialData, title }: PlayerDialogProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    number: initialData?.number || '',
    position: initialData?.position || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        pb: 2
      }}>
        {title}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="名前"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="背番号"
                value={formData.number}
                onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="ポジション"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                fullWidth
                required
                placeholder="PG, SG, SF, PF, C"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            キャンセル
          </Button>
          <Button type="submit" variant="contained" color="primary">
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const PlayersList = ({ players, onAddPlayer, onEditPlayer, onDeletePlayer }: PlayersListProps) => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleEdit = (player: Player) => {
    setSelectedPlayer(player);
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (playerData: Omit<Player, 'id'>) => {
    if (selectedPlayer) {
      onEditPlayer({ ...playerData, id: selectedPlayer.id });
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2 
      }}>
        <Typography variant="h6" component="h2">
          選手一覧
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setAddDialogOpen(true)}
        >
          選手を追加
        </Button>
      </Box>

      <Paper elevation={0} sx={{ bgcolor: 'background.default' }}>
        <Grid container spacing={2}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} key={player.id}>
              <Paper sx={{ 
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                }
              }}>
                <Avatar
                  sx={{
                    bgcolor: getAvatarColor(player.position),
                    width: 48,
                    height: 48,
                  }}
                >
                  {getInitials(player.name)}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                    {player.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    #{player.number} • {player.position}
                  </Typography>
                </Box>
                <Box>
                  <Tooltip title="編集">
                    <IconButton
                      onClick={() => handleEdit(player)}
                      color="primary"
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="削除">
                    <IconButton
                      onClick={() => onDeletePlayer(player.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <PlayerDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onSubmit={onAddPlayer}
        title="選手を追加"
      />

      <PlayerDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={selectedPlayer || undefined}
        title="選手を編集"
      />
    </Box>
  );
}; 