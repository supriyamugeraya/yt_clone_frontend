"use client";
const { createContext, useContext, useReducer } = require("react");

const reduce = (state, action) => {
  switch (action.type) {
    case "SET_VIDEO_ID":
      return { ...state, videoId: action.payload };
    case "SET_VIDEO_LIST":
      return { ...state, videoList: action.payload };
    case "SET_CACHED":
      return { ...state, cached: action.payload };
    default:
      return state;
  }
};
const initialState = {
  videoId: "",
  videoList: [],
  cached: {},
};
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reduce, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
