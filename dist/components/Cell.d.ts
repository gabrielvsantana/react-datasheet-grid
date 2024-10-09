import { FC } from 'react';
export declare const MIN_COLUMN_WIDTH = 40;
type CellProps = {
    id?: string;
    index: number;
    isHeader?: boolean;
    gutter: boolean;
    stickyRight: boolean;
    disabled?: boolean;
    className?: string;
    active?: boolean;
    children?: any;
    width: number;
    left: number;
};
export declare const Cell: FC<CellProps>;
export declare const BodyCell: FC<CellProps>;
export declare const HeaderCell: FC<CellProps & {
    resizable?: boolean;
}>;
export {};
//# sourceMappingURL=Cell.d.ts.map