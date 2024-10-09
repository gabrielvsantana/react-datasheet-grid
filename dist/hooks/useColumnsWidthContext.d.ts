import { Dispatch, SetStateAction } from 'react';
export type ColumnWidthsContextType = {
    columnWidths?: number[];
    initialColumnWidths?: Record<string, number>;
    resizedColumnWidths?: Record<string, number>;
    onColumnsResize?: (widths: Record<string, number>) => void;
    resizeCallback?: Dispatch<SetStateAction<Record<string, number>>>;
    columnsMap?: Record<string, number>;
};
export declare const ColumnWidthsContext: import("react").Context<ColumnWidthsContextType>;
export declare const useColumnWidthsContext: () => ColumnWidthsContextType;
//# sourceMappingURL=useColumnsWidthContext.d.ts.map