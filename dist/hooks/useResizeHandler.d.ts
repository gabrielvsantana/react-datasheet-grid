import * as React from 'react';
export interface UseResizeHandleProps {
    onDrag?: (deltaX?: number) => void;
    onDragEnd?: () => void;
}
export declare const useResizeHandle: ({ onDrag, onDragEnd, }: UseResizeHandleProps) => React.RefObject<HTMLDivElement>;
//# sourceMappingURL=useResizeHandler.d.ts.map