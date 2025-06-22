import { useState, type ReactNode } from 'react';
import type { Piece } from '../../types/piece.types';
import { getInitialBoard } from '../../constants/initialBoardSetup';
import { GameContext } from './GameContext';
import type { iBoardHistory } from '../../types/board.types';
import { isKingInCheck, isCheckmate } from '../../utils/gameLogic';


const GameProvider = ({ children }: { children: ReactNode }) => {
  const [pieces, setPieces] = useState<Piece[]>(getInitialBoard());
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');
  const [selected, setSelected] = useState<string | null>(null);
  const [playerColor, setPlayerColor] = useState<'white'|'black'>('white');
  const [history, setHistory] = useState<iBoardHistory[]>([]);

  const getLivePieceAt = (pos: string) => pieces.find(p => p.position === pos);

  const movePiece = (from: string, to: string) => {
    const movingPiece = getLivePieceAt(from);
    if (!movingPiece) return;

    const captured = getLivePieceAt(to); // if there's a capture

    // Later: validate move
    const updatedPieces = pieces
      .filter(p => p.position !== from && p.position !== to) // remove source + target (if capture)
      .concat({
        ...movingPiece,
        position: to,
        hasMoved: true
      });

    setHistory(prev => [
      ...prev,
      { from, to, piece: movingPiece, captured }
    ]);

    const nextTurn = currentTurn === 'white' ? 'black' : 'white';

    if (isKingInCheck(nextTurn, updatedPieces)) {
      console.log(`${nextTurn} is in CHECK!`);
      if (isCheckmate(nextTurn, updatedPieces)) {
        console.log(`CHECKMATE! ${currentTurn} wins`);
        // Optionally: end game, freeze board, show modal, etc.
      }
    }

    setPieces(updatedPieces);
    setCurrentTurn(turn => (turn === 'white' ? 'black' : 'white'));
    setSelected(null);
  };

  return (
    <GameContext.Provider
      value={{ 
        pieces, setPieces,
        currentTurn, setCurrentTurn, 
        movePiece, 
        getLivePieceAt, 
        selected, setSelected, 
        playerColor, setPlayerColor,
        history, setHistory
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export default GameProvider;