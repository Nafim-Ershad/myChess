import { createContext, useContext } from "react";
import type { Piece } from "../../types/piece.types";
import type { iBoardHistory } from "../../types/board.types";

interface GameContextProps {
  pieces: Piece[];
  currentTurn: 'white' | 'black';
  setCurrentTurn: React.Dispatch<React.SetStateAction<'white' | 'black'>>;
  movePiece: (from: string, to: string) => void;
  getLivePieceAt: (pos: string) => Piece | undefined;
  selected: string | null;
  setSelected: (pos: string | null) => void;
  setPieces: React.Dispatch<React.SetStateAction<Piece[]>>;
  playerColor: 'white' | 'black';
  setPlayerColor: React.Dispatch<React.SetStateAction<'white'|'black'>>;
  history: iBoardHistory[];
  setHistory: React.Dispatch<React.SetStateAction<iBoardHistory[]>>;
}

export const GameContext = createContext<GameContextProps | undefined>(undefined);

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
