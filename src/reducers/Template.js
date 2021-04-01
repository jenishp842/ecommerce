/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  templateList: [],
  addPopupLoader: false,
  loader: false,
  userSuccess: '',
  deleteSuccess: '',
  EditSuccess: '',
  templateDetail: '',
  recentAttributeLoader: false,
  recentAttribute: [],
  createTemplateFlag: false,
  templateUpdate: false,
  templateDetailsInfo: null,
  selectedTemplate: [],
  selectedTemplateLoader: false,
  successPopup: '',
  successLoader: false,
  detailsLoader: false,
  autoSaveSuccess: false,
  autoSaveData: null,
};
/*---------------------------------------------------------------------
               User signup success feedback  message
 ----------------------------------------------------------------------*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROVIDER_TEMPLATE_INITIALIZATION:
      return {
        ...state,
        loader: false,
        successPopup: '',
        successLoader: false,
        templateUpdate: false,
        detailsLoader: false,
        autoSaveSuccess: false,
        templateDetailsInfo: null,
        autoSaveData: null,
      };
    case actionTypes.PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST:
      return {
        ...state,
        loader: true,
      };
    case actionTypes.PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        templateList: action.payload.data,
        loader: false,
      };
    case actionTypes.PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        deleteSuccess: action.payload.data,
      };
    case actionTypes.PROVIDER_TEMPLATE_DETAIL_SUCCESS:
      return {
        ...state,
        templateDetail: action.payload.data,
      };
    case actionTypes.PROVIDER_INITIALIZATION_RECENT_TEMPLATE_MANAGEMENT_LIST:
      return {
        ...state,
        recentAttribute: [],
        recentAttributeLoader: true,
      };
    case actionTypes.PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        recentAttribute: action.payload.data,
        recentAttributeLoader: false,
      };
    case actionTypes.PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_ERROR:
      return {
        ...state,
        recentAttribute: [],
        recentAttributeLoader: false,
      };
    case actionTypes.PROVIDER_INITIALIZATION_CREATE_TEMPLATE_MANAGEMENT_LIST:
      return {
        ...state,
        successPopup: '',
        successLoader: true,
        templateUpdate: false,
      };
    case actionTypes.PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        successPopup: action.payload.data,
        successLoader: false,
        templateUpdate: true,
        autoSaveData: null,
        autoSaveSuccess: null,
      };
    case actionTypes.PROVIDER_CREATE_TEMPLATE_MANAGEMENT_ERROR:
      return {
        ...state,
        successPopup: '',
        successLoader: false,
        templateUpdate: false,
      };
    case actionTypes.PROVIDER_INITIALIZATION_DETAILS_TEMPLATE_MANAGEMENT_LIST:
      return {
        ...state,
        detailsLoader: true,
        // templateDetailsInfo: {},
      };
    case actionTypes.PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        detailsLoader: false,
        templateDetailsInfo: action.payload.data.data,
      };
    case actionTypes.PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_ERROR:
      return {
        ...state,
        detailsLoader: false,
        templateDetailsInfo: {},
      };
    case actionTypes.PROVIDER_INITIALIZATION_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST:
      return {
        ...state,
        selectedTemplateLoader: true,
      };
    case actionTypes.PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        selectedTemplate: action.payload.data,
        selectedTemplateLoader: false,
      };
    case actionTypes.PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_ERROR:
      return {
        ...state,
        selectedTemplate: [],
        selectedTemplateLoader: false,
      };
    case actionTypes.PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_SUCCESS:
      return {
        ...state,
        // autoSaveSuccess: true,
        autoSaveData: action.payload.data,
        autoSaveSuccess: false,
      };
    case actionTypes.PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};
