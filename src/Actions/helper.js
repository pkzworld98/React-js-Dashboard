import { ACTIVATE_MENU } from "./types";

////ACTIVATE LOGOUT MENU

export const ActivateMenu = (event) => {
  return async (dispatch) => {
    dispatch({
      type: ACTIVATE_MENU,
      event,
    });
  };
};
