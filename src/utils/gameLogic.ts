import type { Piece } from "../types/piece.types";
import { isLegalMove } from "./moveValidator";
import { coordsToSquare } from "./utils";

export function isKingInCheck(color: 'white' | 'black', pieces: Piece[]): boolean {
  const king = pieces.find(p => p.type === 'king' && p.color === color);
  if (!king) return false;

  for (const piece of pieces) {
    if (piece.color !== color) {
      const valid = isLegalMove(piece, king.position, pieces);
      if (valid) return true;
    }
  }

  return false;
}

export function isCheckmate(color: 'white' | 'black', pieces: Piece[]): boolean {
  if (!isKingInCheck(color, pieces)) return false;

  // Try every move for every piece of that color
  for (const piece of pieces.filter(p => p.color === color)) {
    for (let file = 0; file < 8; file++) {
      for (let rank = 0; rank < 8; rank++) {
        const to = coordsToSquare(file, rank);

        if (piece.position === to) continue;

        if (isLegalMove(piece, to, pieces)) {
          // simulate the move
          const testBoard = pieces
            .filter(p => p.position !== piece.position && p.position !== to)
            .concat({ ...piece, position: to });

          if (!isKingInCheck(color, testBoard)) {
            return false; // escape found
          }
        }
      }
    }
  }

  return true; // no way out
}