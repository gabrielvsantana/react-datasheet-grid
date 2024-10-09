"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumnWidths = exports.getColumnWidths = void 0;
const react_1 = require("react");
const getColumnWidths = (containerWidth, columns, initialColumnsWidth) => {
    const items = columns.map(({ id, basis, minWidth, maxWidth }) => {
        const hasInitialWidth = id && (initialColumnsWidth === null || initialColumnsWidth === void 0 ? void 0 : initialColumnsWidth[id]) !== undefined;
        return {
            id,
            basis,
            minWidth,
            maxWidth,
            size: hasInitialWidth ? initialColumnsWidth[id] : basis,
            violation: 0,
            frozen: hasInitialWidth,
            factor: 0,
        };
    });
    let availableWidth = items.reduce((acc, cur) => acc - cur.size, containerWidth);
    if (availableWidth > 0) {
        columns.forEach(({ grow }, i) => {
            items[i].factor = grow;
        });
    }
    else if (availableWidth < 0) {
        columns.forEach(({ shrink }, i) => {
            items[i].factor = shrink;
        });
    }
    for (const item of items) {
        if (item.factor === 0) {
            item.frozen = true;
        }
    }
    while (items.some(({ frozen }) => !frozen)) {
        const sumFactors = items.reduce((acc, cur) => acc + (cur.frozen ? 0 : cur.factor), 0);
        let totalViolation = 0;
        for (const item of items) {
            if (!item.frozen) {
                item.size += (availableWidth * item.factor) / sumFactors;
                if (item.size < item.minWidth) {
                    item.violation = item.minWidth - item.size;
                }
                else if (item.maxWidth !== undefined && item.size > item.maxWidth) {
                    item.violation = item.maxWidth - item.size;
                }
                else {
                    item.violation = 0;
                }
                item.size += item.violation;
                totalViolation += item.violation;
            }
        }
        if (totalViolation > 0) {
            for (const item of items) {
                if (item.violation > 0) {
                    item.frozen = true;
                }
            }
        }
        else if (totalViolation < 0) {
            for (const item of items) {
                if (item.violation < 0) {
                    item.frozen = true;
                }
            }
        }
        else {
            break;
        }
        availableWidth = items.reduce((acc, cur) => acc - cur.size, containerWidth);
    }
    return items.map(({ size, id }) => {
        var _a;
        if (id === undefined) {
            return size;
        }
        return (_a = initialColumnsWidth === null || initialColumnsWidth === void 0 ? void 0 : initialColumnsWidth[id]) !== null && _a !== void 0 ? _a : size;
    });
};
exports.getColumnWidths = getColumnWidths;
const useColumnWidths = (columns, width, initialColumnWidths) => {
    const columnsHash = columns
        .map(({ id, basis, minWidth, maxWidth, grow, shrink }) => [
        id && (initialColumnWidths === null || initialColumnWidths === void 0 ? void 0 : initialColumnWidths[id]),
        basis,
        minWidth,
        maxWidth,
        grow,
        shrink,
    ].join(','))
        .join('|');
    return (0, react_1.useMemo)(() => {
        if (width === undefined) {
            return {
                fullWidth: false,
                columnWidths: undefined,
                columnRights: undefined,
                columnsMap: undefined,
                totalWidth: undefined,
            };
        }
        const columnWidths = (0, exports.getColumnWidths)(width, columns, initialColumnWidths);
        const columnsMap = columns.reduce((acc, cur, i) => {
            if (cur.id === undefined) {
                return acc;
            }
            acc[cur.id] = columnWidths[i];
            return acc;
        }, {});
        let totalWidth = 0;
        const columnRights = columnWidths.map((w, i) => {
            totalWidth += w;
            return i === columnWidths.length - 1 ? Infinity : totalWidth;
        });
        return {
            fullWidth: Math.abs(width - totalWidth) < 0.1,
            columnWidths,
            columnsMap,
            columnRights,
            totalWidth,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [width, columnsHash, initialColumnWidths]);
};
exports.useColumnWidths = useColumnWidths;
//# sourceMappingURL=useColumnWidths.js.map