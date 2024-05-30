const { createContext, Children, useReducer } = require("react");

export const ContextProvider = createContext(null);

const Provider = ({ children }) => {
  const intial = {
    isOpenLoginPopup: false,
    isOpenSignUpPopup: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "openSignupPopup":
        return {
          ...state,
          isOpenSignUpPopup: true,
        };
      case "openLoginPopup":
        return {
          ...state,
          isOpenLoginPopup: true,
        };
      case "closeLoginPopup":
        return {
          ...state,
          isOpenLoginPopup: false,
        };
        case "closeSignupPopup":
            return {
              ...state,
              isOpenSignUpPopup: false,
            };
      default:
        () => {
          return state;
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, intial);

  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Provider;
