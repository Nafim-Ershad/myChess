import { useGame } from "../../Store/Game/GameContext";

import './styles.css';

function MoveList() {
  const { history } = useGame();

  return (
    <div className="move-history">
      {history.map((move, index) => (
        <div className="history" key={index}>
          {
          `${index + 1}. ${move.piece.color[0].toUpperCase()}${move.piece.type[0].toUpperCase()}: ${move.from} → ${move.to}
            ${move.captured ? ` × ${move.captured.color} ${move.captured.type}` : ''}`
          }
        </div>
      ))}
    </div>
  );
}

export default MoveList;