import type { Piece } from "./piece.types";

export interface iBoardHistory {
    from: string; 
    to: string; 
    piece: Piece; 
    captured?: Piece;
}