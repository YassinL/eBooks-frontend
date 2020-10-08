module.exports = {
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    token: localStorage.getItem("token") || {},
    user: null,
  },

  reducer: (state, action) => {
    console.log("ICI ACTION :", action);
    switch (action.type) {
      case "SIGNIN":
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("user", action.payload.data.user.id);
        localStorage.setItem("firstname", action.payload.data.user.firstName);
        localStorage.setItem("lastname", action.payload.data.user.lastName);
        localStorage.setItem("email", action.payload.data.user.email);
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.data.token,
          user: action.payload.config.user,
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
