/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  teamList: [],
  successPopup: '',
  successLoader: false,
  loader: false,
  userList: [],
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_INITIALIZATION_TEAM:
      return {
        ...state,
        loader: false,
        successPopup: '',
        successLoader: false,
      };
    case actionTypes.PROVIDER_INITIALIZATION_TEAM_MANAGEMENT_LIST:
      return {
        ...state,
        loader: true,
      };
    case actionTypes.PROVIDER_GET_TEAM_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        teamList: action.payload.data,
        loader: false,
      };
    case actionTypes.PROVIDER_ERROR_TEAM_MANAGEMENT_LIST:
      return {
        ...state,
        teamList: [],
        loader: false,
      };
    case actionTypes.PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        userList: action.payload.data,
        loader: false,
      };
    case actionTypes.PROVIDER_ERROR_TEAM_USER_MANAGEMENT_LIST:
      return {
        ...state,
        userList: [],
        loader: false,
      };
    case actionTypes.PROVIDER_DELETE_INITIALIZATION_TEAM_MANAGEMENT_LIST:
    case actionTypes.PROVIDER_INITIALIZATION_ADD_TEAM_MANAGEMENT_LIST:
    case actionTypes.PROVIDER_INITIALIZATION_EDIT_TEAM_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: true,
        successPopup: '',
      };
    case actionTypes.PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS:
    case actionTypes.PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS:
    case actionTypes.PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,
      };
    case actionTypes.PROVIDER_ERROR_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS:
    case actionTypes.PROVIDER_ERROR_ADD_TEAM_MANAGEMENT_LIST:
    case actionTypes.PROVIDER_ERROR_EDIT_TEAM_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: false,
        successPopup: '',
      };

    default:
      return state;
  }
};
