import {
  PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_TEMPLATE_DETAIL_SUCCESS,
  PROVIDER_TEMPLATE_DETAIL,
  PROVIDER_INITIALIZATION_RECENT_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_ERROR,
  PROVIDER_INITIALIZATION_CREATE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_CREATE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS,
  PROVIDER_CREATE_TEMPLATE_MANAGEMENT_ERROR,
  PROVIDER_TEMPLATE_INITIALIZATION,
  PROVIDER_INITIALIZATION_DETAILS_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_SUCCESS,
  PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_ERROR,
  PROVIDER_EDIT_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_ERROR,
  PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_LIST,
  PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_SUCCESS,
  PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_ERROR,
} from '../constants/ActionTypes';

// Listing
export const listTemplateInitialization = () => ({
  type: PROVIDER_INITIALIZATION_TEMPLATE_MANAGEMENT_LIST,
});

export const getTemplateListInfo = (payload) => ({
  type: PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST,
  payload,
});

export const getTemplateListSuccess = (payload) => ({
  type: PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  payload,
});

// Delete
export const deleteTemplate = (payload) => ({
  type: PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST,
  payload,
});

export const deleteTemplateSuccess = (payload) => ({
  type: PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const getTemplateDetail = (payload) => ({
  type: PROVIDER_TEMPLATE_DETAIL,
  payload,
});

export const getTemplateDetailSuccess = (payload) => ({
  type: PROVIDER_TEMPLATE_DETAIL_SUCCESS,
  payload,
});

// Recent Attribute Listing
export const listRecentAttributeTemplateInitialization = () => ({
  type: PROVIDER_INITIALIZATION_RECENT_TEMPLATE_MANAGEMENT_LIST,
});

export const recentAttributeListInfo = () => ({
  type: PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST,
});

export const getRecentAttributeTemplateListSuccess = (payload) => ({
  type: PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const getRecentAttributeTemplateListError = () => ({
  type: PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST_ERROR,
});

// Create template

export const createTemplateInitialization = () => ({
  type: PROVIDER_INITIALIZATION_CREATE_TEMPLATE_MANAGEMENT_LIST,
});

export const createTemplate = (body) => ({
  type: PROVIDER_CREATE_TEMPLATE_MANAGEMENT_LIST,
  body,
});

export const createTemplateSuccess = (payload) => ({
  type: PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS,
  payload,
});
export const createTemplateError = () => ({
  type: PROVIDER_CREATE_TEMPLATE_MANAGEMENT_ERROR,
});

// edit
export const editTemplate = (body) => ({
  type: PROVIDER_EDIT_TEMPLATE_MANAGEMENT_LIST,
  body,
});

// edit end
export const autoSaveTemplate = (body) => ({
  type: PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_LIST,
  body,
});
export const autoSaveTemplateSuccess = (payload) => ({
  type: PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_SUCCESS,
  payload,
});
export const autoSaveTemplateError = () => ({
  type: PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_ERROR,
});

// Details

export const detailsTemplateInitialization = () => ({
  type: PROVIDER_INITIALIZATION_DETAILS_TEMPLATE_MANAGEMENT_LIST,
});

export const detailsTemplateListInfo = (payload) => ({
  type: PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_LIST,
  payload,
});

export const detailsTemplateSuccess = (payload) => ({
  type: PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_SUCCESS,
  payload,
});
export const detailsTemplateError = () => ({
  type: PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_ERROR,
});
// edit end

export const templateInitialization = () => ({
  type: PROVIDER_TEMPLATE_INITIALIZATION,
});

// AcceptanceTemp
export const selectAcceptanceTempInfoInitialization = () => ({
  type: PROVIDER_INITIALIZATION_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST,
});

export const getSelectAcceptanceTempInfo = (payload) => ({
  type: PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST,
  payload,
});

export const getSelectAcceptanceTempInfoSuccess = (payload) => ({
  type: PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const SelectAcceptanceTempInfoError = () => ({
  type: PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST_ERROR,
});
