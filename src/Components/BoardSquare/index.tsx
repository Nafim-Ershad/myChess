import type { HTMLAttributes } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { coordsToSquare } from '../../utils/utils';

import './style.css';

interface iBoardSquareProps extends HTMLAttributes<HTMLDivElement> {
    x: number;
    y: number;
}

function BoardSquare({ x, y, children }: iBoardSquareProps): React.ReactNode {
    const isBlack = ( x + y ) % 2;
    const {isOver, setNodeRef} = useDroppable({
        id: `droppable-${coordsToSquare(x, y)}`
    });

    return(
        <div 
            ref={setNodeRef}
            id={coordsToSquare(x, y)} 
            className={`square ${isBlack ? 'black' : 'white'} ${isOver ? 'isOver' : ''}`}
        >
            { children }
        </div>
    )
}

export default BoardSquare;