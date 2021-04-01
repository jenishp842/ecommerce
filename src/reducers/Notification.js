/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from "../constants/ActionTypes";

export const INITIAL_STATE = {
  notificationListData: "",
  notificationSocketData: "",
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationListData: action.payload.data,
      };
    case actionTypes.SOCKET_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notificationSocketData: action.payload.data,
      };
    default:
      return state;
  }
};
