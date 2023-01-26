import { createContext, useReducer } from "react";
import userReducer from "../reducer/userReducer";

const UserContext = createContext();

const initialState = {
  userinfo: {},
  isLoading: true,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const setUserInfo = (info) => {
    return dispatch({ type: "SET_USER_INFO", payload: info });
  };

  const resetUserInfo = () => {
    return dispatch({ type: "RESET_USER_INFO" });
  };

  const setLoading = (value) => {
    return dispatch({ type: "SET_LOADING", payload: value });
  };

  return (
    <UserContext.Provider
      value={{ ...state, setUserInfo, resetUserInfo, setLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
