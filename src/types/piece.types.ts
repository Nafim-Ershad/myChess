export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';

export interface Piece {
  id: string; // unique, maybe `${type}-${color}-${pos}`
  type: PieceType;
  color: PieceColor;
  position: string; // e.g., 'e4'
  hasMoved: boolean;
}
