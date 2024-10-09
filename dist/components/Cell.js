"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderCell = exports.BodyCell = exports.Cell = exports.MIN_COLUMN_WIDTH = void 0;
const react_1 = __importStar(require("react"));
const classnames_1 = __importDefault(require("classnames"));
const useResizeHandler_1 = require("../hooks/useResizeHandler");
const throttle_debounce_1 = require("throttle-debounce");
const useColumnsWidthContext_1 = require("../hooks/useColumnsWidthContext");
exports.MIN_COLUMN_WIDTH = 40;
const Cell = (_a) => {
    var { isHeader } = _a, props = __rest(_a, ["isHeader"]);
    return isHeader ? (react_1.default.createElement(exports.HeaderCell, Object.assign({}, props, { resizable: props.index !== 0 }))) : (react_1.default.createElement(exports.BodyCell, Object.assign({}, props)));
};
exports.Cell = Cell;
const BodyCell = ({ children, gutter, stickyRight, active, disabled, className, width, left, }) => {
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
            width,
            left: stickyRight ? undefined : left,
        } }, children));
};
exports.BodyCell = BodyCell;
const HeaderCell = ({ id, index, children, gutter, stickyRight, active, disabled, className, width, left, resizable, }) => {
    var _a;
    const { columnWidths, columnsMap, resizedColumnWidths, onColumnsResize, resizeCallback, } = (0, useColumnsWidthContext_1.useColumnWidthsContext)();
    const [prevWidth, setPrevWidth] = (0, react_1.useState)(width);
    const colWidth = (0, react_1.useRef)(width);
    (0, react_1.useLayoutEffect)(() => {
        setPrevWidth(width);
        colWidth.current = width;
    }, [width]);
    const throttledOnDrag = (0, throttle_debounce_1.throttle)(50, (dx = 0) => {
        // prevent column collapse
        if (prevWidth + dx <= exports.MIN_COLUMN_WIDTH) {
            return;
        }
        colWidth.current = prevWidth + dx;
        if (id) {
            resizeCallback === null || resizeCallback === void 0 ? void 0 : resizeCallback(() => (Object.assign(Object.assign({}, resizedColumnWidths), { [id]: colWidth.current })));
        }
    });
    const ref = (0, useResizeHandler_1.useResizeHandle)({
        onDrag: throttledOnDrag,
        onDragEnd: () => {
            if (id) {
                onColumnsResize === null || onColumnsResize === void 0 ? void 0 : onColumnsResize(Object.assign(Object.assign({}, resizedColumnWidths), { [id]: colWidth.current }));
            }
        },
    });
    return (react_1.default.createElement("div", { className: (0, classnames_1.default)('dsg-cell', gutter && 'dsg-cell-gutter', disabled && 'dsg-cell-disabled', gutter && active && 'dsg-cell-gutter-active', stickyRight && 'dsg-cell-sticky-right', className), style: {
            width: (_a = colWidth.current) !== null && _a !== void 0 ? _a : width,
            left: stickyRight ? undefined : left,
        } },
        children,
        resizable && onColumnsResize && (react_1.default.createElement("div", { className: "dsg-resize-handle", ref: ref }))));
};
exports.HeaderCell = HeaderCell;
//# sourceMappingURL=Cell.js.map