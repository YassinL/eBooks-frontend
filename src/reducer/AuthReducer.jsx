module.exports = {
  reducer: (state, action) => {
    switch (action.type) {
      case "SIGNIN":
        localStorage.setItem("token", action.payload.data.token);
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.data.token,
          user: action.payload.data.user,
          roleAdmin: action.payload.data.user.roleAdmin,
          isLoading: false,
        };
      case "LOAD_USER":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
          token: action.payload.token,
          roleAdmin: action.payload.roleAdmin,
          isLoading: false,
        };
      case "LOGOUT":
        localStorage.clear();
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          roleAdmin: null,
          isLoading: false,
        };
      case "NO_USER":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null,
          roleAdmin: null,
          isLoading: false,
        };
      default:
        return state;
    }
  },
};
