import { useDraggable } from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import { useGame } from '../../Store/Game/GameContext';
import type { Piece } from '../../types/piece.types';
import { capitalize } from '../../utils/utils';

import './style.css';

function ChessPiece({ piece }: { piece: Piece }) {
    const { currentTurn } = useGame();
    const { type, color } = piece;

    const isDisable = currentTurn !== color; // returns false if same color
    
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `${color}_${type}_${piece.position}`,
        disabled: isDisable
    });


    const style = {
        transform: CSS.Translate.toString(transform),
    };

    // Construct file path based on color and type
    const imagePath = `/Pieces/${capitalize(type)}_${capitalize(color)}.svg`;

    return (
        <div
            ref={setNodeRef}
            style={style} 
            className="chess-piece"
            {...listeners}
            {...attributes}
        >
            <img src={imagePath} alt={`${color} ${type}`} />
        </div>
    );
}

export default ChessPiece;