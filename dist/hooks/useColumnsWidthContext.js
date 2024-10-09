"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useColumnWidthsContext = exports.ColumnWidthsContext = void 0;
const react_1 = require("react");
exports.ColumnWidthsContext = (0, react_1.createContext)({});
const useColumnWidthsContext = () => {
    return (0, react_1.useContext)(exports.ColumnWidthsContext);
};
exports.useColumnWidthsContext = useColumnWidthsContext;
//# sourceMappingURL=useColumnsWidthContext.js.map