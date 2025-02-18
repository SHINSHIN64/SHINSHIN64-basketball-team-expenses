import React from 'react';
import { Player } from '../types';

interface PlayersListProps {
  players: Player[];
  onSelectPlayer: (playerId: string) => void;
  selectedPlayerId?: string;
}

const PlayersList: React.FC<PlayersListProps> = ({
  players,
  onSelectPlayer,
  selectedPlayerId,
}) => {
  return (
    <div className="players-list">
      <h3>選手一覧</h3>
      <div className="players-grid">
        {players.map((player) => (
          <div
            key={player.id}
            className={`player-card ${player.id === selectedPlayerId ? 'selected' : ''}`}
            onClick={() => onSelectPlayer(player.id)}
          >
            <div className="player-number">#{player.number}</div>
            <div className="player-name">{player.name}</div>
            <div className="player-position">{player.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList; 