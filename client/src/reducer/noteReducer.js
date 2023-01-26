const noteReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTES":
      return { ...state, notes: action.payload };
    case "RESET_NOTES":
      return { notes: {} };

    default:
      return state;
  }
};

export default noteReducer;
