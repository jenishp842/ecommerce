/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  ticketListData: '',
  ticketSubmitData: '',
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TICKET_LIST_SUCCESS:
      return {
        ...state,
        ticketListData: action.payload.data,
      };
    case actionTypes.TICKET_SUBMIT_SUCCESS:
      return {
        ...state,
        ticketSubmitData: action.payload.data,
      };
    default:
      return state;
  }
};
