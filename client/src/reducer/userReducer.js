const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return { ...state, userinfo: action.payload };
    case "RESET_USER_INFO":
      return { userinfo: {}, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    default:
      return state;
  }
};

export default userReducer;
