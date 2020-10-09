module.exports = {
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
  },

  reducer: (state, action) => {
    switch (action.type) {
      case "SIGNIN":
        localStorage.setItem("token", action.payload.data.token);
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.data.token,
          user: action.payload.config.user,
        };
      case "LOAD_USER":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  },
};
