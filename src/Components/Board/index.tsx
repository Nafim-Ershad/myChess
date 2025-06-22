import { useMemo, type ReactNode } from "react";
import { useGame } from "../../Store/Game/GameContext";
import BoardSquare from "../BoardSquare";
import ChessPiece from "../ChessPiece";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import type { Piece } from "../../types/piece.types";
import { coordsToSquare } from "../../utils/utils";
import { isLegalMove } from "../../utils/moveValidator";
import { extractSquareFromId } from "../../utils/utils";
import "./style.css";

function renderPiece(x: number, y: number, piece: Piece)
{
    // const pos = toBoardPosition(x, y);
    const pos = coordsToSquare(x, y);
    if(piece.position === pos)
    {
        return <ChessPiece piece={piece}/>
    }
}

function renderSquare(j: number, pieces: Piece[]) {
    const x = j % 8;
    const y = Math.floor(j / 8);

    return(
        <BoardSquare x={x} y={y} key={j}> 
            { pieces.map(piece => renderPiece(x, y, piece))}
        </BoardSquare>
    )
}

function Board(): React.ReactNode {

    const { pieces, movePiece, getLivePieceAt, currentTurn } = useGame();

    const squares = useMemo(() => {
        const arr: React.ReactNode[] = [];
        for(let i = 0; i < 64; i++) {
            arr.push(renderSquare(i, pieces));
        }
        return arr;
    }, [pieces]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event; // Gets the id of the active (dragging) and the id of the block over (droppable) 

        if (!active || !over) return;
        

        const from = extractSquareFromId(active.id as string, false); // like "e2"
        const to = extractSquareFromId(over.id as string, true);      // "e4", the droppable square

        const movingPiece = getLivePieceAt(from); // Getting the piece information that is being dragged. Since the information is in the context
        if (!movingPiece) return;

         // ⛔ Check turn
        if (movingPiece.color !== currentTurn) {
            alert("⛔ Not your turn!");
            return;
        }

        const isValid = isLegalMove(movingPiece, to, pieces);
        if (isValid) {
            movePiece(from, to);
            return;
        } else {
            console.log("Invalid move!");
            return;
        }
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {/* your 8x8 render here */}
            <div className="board">
                {squares.map((square: ReactNode) => square)}
            </div>
        </DndContext>
    );
}

export default Board;