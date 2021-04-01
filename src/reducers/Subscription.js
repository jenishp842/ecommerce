/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from "../constants/ActionTypes";

export const INITIAL_STATE = {
  subscriptionPlan: "",
  subscriptionSelectionPlan: "",
  myPlan: "",
  specialFeatures: "",
  successMsg: "",
  invoiceDetail: "",
  subscriptionError: false,
  isfree: "",
  subscriptionPayable: "",
  payableId: "",
  newSubId: "",
  subscriptionPayableData: "",
  promoSuccess: '',
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscriptionPlan: action.payload.data,
        promoSuccess: ''
      };
    case actionTypes.SUBSCRIPTION_SELECTION_SUCCESS:
      return {
        ...state,
        subscriptionSelectionPlan: action.payload.data.data,
        successMsg: action.payload.data.msg,
      };
    case actionTypes.GET_MYPLAN_SUCCESS:
      return {
        ...state,
        myPlan: action.payload.data,
        specialFeatures:
          action.payload.data.subscriptionPlanDetails.specialFeatures,
      };
    case actionTypes.GET_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        invoiceDetail: action.payload.data,
      };
    case actionTypes.SUBSCRIPTION_ERROR:
      return {
        ...state,
        subscriptionError: true,
        myPlan: "",
        isfree: action.payload.error,
      };
    case actionTypes.SUBSCRIPTION_ERROR_FALSE:
      return {
        ...state,
        subscriptionError: false,
      };
    case actionTypes.SUBSCRIPTION_SELECTION_SUCCESS:
      return {
        ...state,
        subscriptionPayable: action.payload.data,

      };
    case actionTypes.PAYABLE_AMOUNT:
      return {
        ...state,
        payableId: action.payload.data,
      };
    case actionTypes.NEW_SUBSCRIPTION:
      return {
        ...state,
        newSubId: action.payload.newSubId,
      };
    case actionTypes.SUBSCRIPTION_PAYABLE_SUCCESS:
      return {
        ...state,
        subscriptionPayableData: action.payload.data.data,
      };
    case actionTypes.PROMO_SUCCESS:
      return {
        ...state,
        promoSuccess: action.payload.data,
      };
    default:
      return state;
  }
};
