/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  userList: [],
  addPopupLoader: false,
  loader: false,
  userSuccess: '',
  deleteSuccess: '',
  EditSuccess: '',
  faqSuccess: '',
  isActive: ''
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST:
      return {
        ...state,
        loader: true,
      };
    case actionTypes.PROVIDER_GET_USER_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.data,
        loader: false,
      };

    case actionTypes.PROVIDER_ERROR_USER_MANAGEMENT_LIST:
      return {
        ...state,
        roleList: [],
        loader: false,
      };
    case actionTypes.PROVIDER_DELETE_USER_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload.data,
      };
    case actionTypes.PROVIDER_ADD_INITIALIZATION_USER_MANAGEMENT_LIST:
      return {
        ...state,
        addPopupLoader: true,
      };
    case actionTypes.PROVIDER_ADD_USER_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        addPopupLoader: false,
        userSuccess: action.payload.data,
      };
    case actionTypes.PROVIDER_EDIT_USER_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        addPopupLoader: false,
        EditSuccess: action.payload.data,
      };
    case actionTypes.PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST:
      return {
        ...state,
        addPopupLoader: false,
      };
    case actionTypes.PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST:
      return {
        ...state,
        addPopupLoader: false,
      };
    case actionTypes.FAQ_SUCCESS:
      return {
        ...state,
        faqSuccess: action.payload.data,
      };
    case actionTypes.FAQ_SEARCH_SUCCESS:
      return {
        ...state,
        faqSuccess: action.payload.data,
      };
      case actionTypes.IS_ACTIVE:
      return {
        ...state,
        isActive: action.payload.data,
      };
    default:
      return state;
  }
};
