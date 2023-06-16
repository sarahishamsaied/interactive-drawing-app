export interface RectState {
  refX: number;
  refY: number;
  width: number;
  height: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  strokeDasharray: string;
  strokeDashoffset: number;
  transform: string;
  rotate: number;
  opacity: number;
  visible: boolean;
}

export const initialState: RectState = {
  refX: 0,
  refY: 0,
  width: 0,
  height: 0,
  fill: "none",
  stroke: "black",
  strokeWidth: 1,
  strokeDasharray: "none",
  strokeDashoffset: 0,
  transform: "",
  rotate: 0,
  opacity: 1,
  visible: true,
};

interface RectAction {
  type: "SET_RECT";
  payload: Partial<RectState>;
}

export const rectReducer = (
  state: RectState,
  action: RectAction
): RectState => {
  switch (action.type) {
    case "SET_RECT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
