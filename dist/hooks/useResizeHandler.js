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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResizeHandle = void 0;
const React = __importStar(require("react"));
const useResizeHandle = ({ onDrag, onDragEnd, }) => {
    const ref = React.useRef(null);
    const deltaXRef = React.useRef(0);
    React.useLayoutEffect(() => {
        if (ref.current != null) {
            ref.current.onpointerdown = (e) => {
                e.stopPropagation();
                e.preventDefault();
                deltaXRef.current = 0;
                const currentPositionX = e.pageX;
                function onPointerMove(pointerMoveEvent) {
                    const deltaX = pointerMoveEvent.pageX - currentPositionX;
                    if (onDrag != null) {
                        onDrag(deltaX);
                    }
                    if (deltaXRef.current !== deltaX) {
                        deltaXRef.current = deltaX;
                    }
                }
                document.addEventListener('pointermove', onPointerMove);
                document.onpointerleave = (pointerLeaveEvent) => {
                    if (pointerLeaveEvent.clientY <= 0 ||
                        pointerLeaveEvent.clientX <= 0 ||
                        pointerLeaveEvent.clientX >= window.innerWidth ||
                        pointerLeaveEvent.clientY >= window.innerHeight) {
                        document.removeEventListener('pointermove', onPointerMove);
                        document.onpointerleave = null;
                        onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd();
                    }
                };
                document.onpointerup = () => {
                    document.removeEventListener('pointermove', onPointerMove);
                    document.onpointerup = null;
                    onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd();
                };
            };
        }
    }, [onDrag, onDragEnd]);
    return ref;
};
exports.useResizeHandle = useResizeHandle;
//# sourceMappingURL=useResizeHandler.js.map