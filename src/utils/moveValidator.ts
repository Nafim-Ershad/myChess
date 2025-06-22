import type { Piece } from '../types/piece.types';
import { squareToCoords, getPieceAt, coordsToSquare, isPathClear } from './utils';

export function validatePawnMove(piece: Piece, to: string, pieces: Piece[]): boolean {
    const [fromX, fromY] = squareToCoords(piece.position);
    const [toX, toY] = squareToCoords(to);
    const dir = piece.color === 'white' ? 1 : -1;
    const oneStep = fromY + dir === toY && fromX === toX && !getPieceAt(to, pieces);
    const twoStep = !piece.hasMoved && fromY + dir * 2 === toY && fromX === toX && !getPieceAt(to, pieces) && !getPieceAt(coordsToSquare(toX, fromY + dir), pieces);

    const capture = Math.abs(toX - fromX) === 1 && toY === fromY + dir && getPieceAt(to, pieces) && getPieceAt(to, pieces)?.color !== piece.color;

    // Double !! is used to remove error of returning undefined instead of boolean
    return !!oneStep || !!twoStep || !!capture; 
}

export function validateRookMove(piece: Piece, to: string, board: Piece[]): boolean {
    const [fromX, fromY] = squareToCoords(piece.position);
    const [toX, toY] = squareToCoords(to);

    const sameRow = fromY === toY;
    const sameCol = fromX === toX;

    const target = getPieceAt(to, board);
    const isEnemy = !!(target && target.color !== piece.color); // Double !! is used to remove error of returning undefined instead of boolean

    return (sameRow || sameCol) &&
        isPathClear(piece.position, to, board) &&
        (!target || isEnemy);
}

export function validateBishopMove(piece: Piece, to: string, board: Piece[]): boolean {
  const [fromX, fromY] = squareToCoords(piece.position);
  const [toX, toY] = squareToCoords(to);

  const dirX = Math.abs(toX - fromX);
  const dirY = Math.abs(toY - fromY);

  const target = getPieceAt(to, board);
  const isEnemy = !!(target && target.color !== piece.color); // Double !! is used to remove error of returning undefined instead of boolean

  return dirX === dirY &&
        isPathClear(piece.position, to, board) &&
        (!target || isEnemy);
}

export function validateQueenMove(piece: Piece, to: string, board: Piece[]): boolean {
  return validateRookMove(piece, to, board) ||
        validateBishopMove(piece, to, board);
}

export function validateKnightMove(piece: Piece, to: string): boolean {
  const [fromX, fromY] = squareToCoords(piece.position);
  const [toX, toY] = squareToCoords(to);

  const dirX = Math.abs(toX - fromX);
  const dirY = Math.abs(toY - fromY);

  return (dirX === 2 && dirY === 1) || (dirX === 1 && dirY === 2);
}

export function validateKingMove(piece: Piece, to: string, board: Piece[]): boolean {
  const [fromX, fromY] = squareToCoords(piece.position);
  const [toX, toY] = squareToCoords(to);

  const dirX = Math.abs(toX - fromX);
  const dirY = Math.abs(toY - fromY);

  const target = getPieceAt(to, board);
  const isEnemy = !!(target && target.color !== piece.color); // Double !! is used to remove error of returning undefined instead of boolean

  return dirX <= 1 && dirY <= 1 && (!target || isEnemy);
}

export function isLegalMove(piece: Piece, to: string, board: Piece[]): boolean {
  switch (piece.type) {
    case 'pawn':
      return validatePawnMove(piece, to, board);
    case 'rook':
      return validateRookMove(piece, to, board);
    case 'bishop':
      return validateBishopMove(piece, to, board);
    case 'queen':
      return validateQueenMove(piece, to, board);
    case 'knight':
      return validateKnightMove(piece, to);
    case 'king':
      return validateKingMove(piece, to, board);
    default:
      return false;
  }
}

