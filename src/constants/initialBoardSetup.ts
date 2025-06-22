import type { Piece } from "../types/piece.types";

export function getInitialBoard(): Piece[] {
  const backRank: Array<Piece['type']> = [
    'rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'
  ];
  const board: Piece[] = [];

  // Black pieces (rank 7 & 8)
  for (let i = 0; i < 8; i++) {
    const file = String.fromCharCode(97 + i); // a-h
    board.push({
      id: `black-${backRank[i]}-${file}8`,
      type: backRank[i],
      color: 'black',
      position: `${file}8`,
      hasMoved: false
    });
    board.push({
      id: `black-pawn-${file}7`,
      type: 'pawn',
      color: 'black',
      position: `${file}7`,
      hasMoved: false
    });
  }

  // White pieces (rank 1 & 2)
  for (let i = 0; i < 8; i++) {
    const file = String.fromCharCode(97 + i); // a-h
    board.push({
      id: `white-${backRank[i]}-${file}1`,
      type: backRank[i],
      color: 'white',
      position: `${file}1`,
      hasMoved: false
    });
    board.push({
      id: `white-pawn-${file}2`,
      type: 'pawn',
      color: 'white',
      position: `${file}2`,
      hasMoved: false
    });
  }

  return board;
}