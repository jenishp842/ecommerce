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
  customerDetail: '',
  cardDetails: '',
  cardPaymentSuccess: '',
  cardRemoveSuccess: '',
  cardError: '',
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_EDIT:
      return {
        ...state,
        customerDetail: action.payload.data,
      };
    case actionTypes.CUSTOMER_PAYMENT_DETAIL_SUCCESS:
      return {
        ...state,
        cardDetails: action.payload.data.data.cards.data,
      };
    case actionTypes.CARD_PAYMENT_SUCCESS:
      return {
        ...state,
        cardPaymentSuccess: action.payload.data,
      };
    case actionTypes.CARD_REMOVE_SUCCESS:
      return {
        ...state,
        cardRemoveSuccess: action.payload.data,
      };
    case actionTypes.CARD_ERROR:
      return {
        ...state,
        cardError: action.payload.data,
      };
    default:
      return state;
  }
};
