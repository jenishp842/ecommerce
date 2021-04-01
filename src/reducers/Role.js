/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  roleList: [],
  loader: false,
  successPopup: '',
  successLoader: false,
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_INITIALIZATION_ROLE:
      return {
        ...state,
        loader: false,
        successPopup: '',
        successLoader: false,
      };

    case actionTypes.PROVIDER_INITIALIZATION_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        loader: true,
      };
    case actionTypes.PROVIDER_GET_ROLE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        roleList: action.payload.data,
        loader: false,
      };

    case actionTypes.PROVIDER_ERROR_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        roleList: [],
        loader: false,
      };
    case actionTypes.PROVIDER_DELETE_INITIALIZATION_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: true,
        successPopup: '',
      };
    case actionTypes.PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,
      };

    case actionTypes.PROVIDER_DELETE_ERROR_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: false,
      };
    case actionTypes.PROVIDER_ADD_INITIALIZATION_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: true,
        successPopup: '',
      };
    case actionTypes.PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,

      };
    case actionTypes.PROVIDER_ADD_ERROR_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: false,
        successPopup: '',
      };

    case actionTypes.PROVIDER_EDIT_INITIALIZATION_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: true,
        successPopup: '',
      };
    case actionTypes.PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,

      };
    case actionTypes.PROVIDER_EDIT_ERROR_ROLE_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: false,
        successPopup: '',
      };

    default:
      return state;
  }
};
