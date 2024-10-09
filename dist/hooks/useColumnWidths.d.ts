import { Column } from '../types';
export declare const getColumnWidths: (containerWidth: number, columns: Pick<Column<any, any, any>, 'id' | 'basis' | 'grow' | 'shrink' | 'minWidth' | 'maxWidth'>[], initialColumnsWidth?: Record<string, number>) => number[];
export declare const useColumnWidths: (columns: Column<any, any, any>[], width?: number, initialColumnWidths?: Record<string, number>) => {
    fullWidth: boolean;
    columnWidths: undefined;
    columnRights: undefined;
    columnsMap: undefined;
    totalWidth: undefined;
} | {
    fullWidth: boolean;
    columnWidths: number[];
    columnsMap: Record<string, number>;
    columnRights: number[];
    totalWidth: number;
};
//# sourceMappingURL=useColumnWidths.d.ts.map