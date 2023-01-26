import { createContext, useReducer } from "react";
import noteReducer from "../reducer/noteReducer";

const NoteContext = createContext();

const initialState = {
  notes: [],
};

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  const setNotes = (info) => {
    return dispatch({ type: "SET_NOTES", payload: info });
  };

  const resetNotes = () => {
    return dispatch({ type: "RESET_NOTES" });
  };

  return (
    <NoteContext.Provider value={{ ...state, setNotes, resetNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
export { NoteContext };
