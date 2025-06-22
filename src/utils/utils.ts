import type { Piece } from "../types/piece.types";

export function capitalize(str: string): string | undefined {
    if(!str) return;

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}


export function squareToCoords(square: string): [number, number] {
  const file = square.charCodeAt(0) - 'a'.charCodeAt(0); // a=0
  const rank = parseInt(square[1]) - 1; // 1=0
  return [file, rank];
}

export function coordsToSquare(file: number, rank: number): string {
  return String.fromCharCode('a'.charCodeAt(0) + file) + (rank + 1);
}

export function getPieceAt(pos: string, board: Piece[]) {
  return board.find(p => p.position === pos);
}

export function isSameColor(p1: Piece, p2: Piece) {
  return p1.color === p2.color;
}

export function extractSquareFromId(id: string, isSquare: boolean): string {
    if (!isSquare)
    {
        // Example input: "white_pawn_e2"
        return id.split('_')[2]; // "e2"
    }

    return id.split('-')[1];
}

export function isPathClear(from: string, to: string, board: Piece[]): boolean {
  const [fromX, fromY] = squareToCoords(from);
  const [toX, toY] = squareToCoords(to);

  const dirX = Math.sign(toX - fromX);
  const dirY = Math.sign(toY - fromY);

  let x = fromX + dirX;
  let y = fromY + dirY;

  while (x !== toX || y !== toY) {
    const square = coordsToSquare(x, y);
    if (getPieceAt(square, board)) return false;
    x += dirX;
    y += dirY;
  }

  return true;
}