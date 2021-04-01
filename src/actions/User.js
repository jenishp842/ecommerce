import {
  PROVIDER_GET_USER_MANAGEMENT_LIST,
  PROVIDER_GET_USER_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DELETE_USER_MANAGEMENT_LIST,
  PROVIDER_DELETE_USER_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ADD_USER_MANAGEMENT_LIST,
  PROVIDER_ADD_USER_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ADD_INITIALIZATION_USER_MANAGEMENT_LIST,
  PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST,
  PROVIDER_ERROR_USER_MANAGEMENT_LIST,
  PROVIDER_DELETE_INITIALIZATION_USER_MANAGEMENT_LIST,
  PROVIDER_DELETE_ERROR_USER_MANAGEMENT_LIST,
  PROVIDER_EDIT_USER_MANAGEMENT_LIST,
  PROVIDER_EDIT_USER_MANAGEMENT_LIST_SUCCESS,
  FAQ_SUCCESS,
  FAQ,
  FAQ_SEARCH_SUCCESS,
  FAQ_SEARCH,
  IS_ACTIVE,
} from '../constants/ActionTypes';

// Listing
export const listUserInitialization = () => ({
  type: PROVIDER_INITIALIZATION_USER_MANAGEMENT_LIST,
});

export const getUserListInfo = () => ({
  type: PROVIDER_GET_USER_MANAGEMENT_LIST,
});

export const getUserDataListSuccess = (payload) => ({
  type: PROVIDER_GET_USER_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const listUserError = () => ({
  type: PROVIDER_ERROR_USER_MANAGEMENT_LIST,
});

// Delete
export const deleteUser = (payload) => ({
  type: PROVIDER_DELETE_USER_MANAGEMENT_LIST,
  payload,
});

export const deleteUserSuccess = (payload) => ({
  type: PROVIDER_DELETE_USER_MANAGEMENT_LIST_SUCCESS,
  payload,
});

// Delete
export const deleteUserInitialization = () => ({
  type: PROVIDER_DELETE_INITIALIZATION_USER_MANAGEMENT_LIST,
});

export const deleteUserError = () => ({
  type: PROVIDER_DELETE_ERROR_USER_MANAGEMENT_LIST,
});

// ADD
export const addUserInitialization = () => ({
  type: PROVIDER_ADD_INITIALIZATION_USER_MANAGEMENT_LIST,
});
export const addUserInList = (payload) => ({
  type: PROVIDER_ADD_USER_MANAGEMENT_LIST,
  payload,
});
export const addUserSuccess = (payload) => ({
  type: PROVIDER_ADD_USER_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const editUserInList = (payload) => ({
  type: PROVIDER_EDIT_USER_MANAGEMENT_LIST,
  payload,
});
export const editUserSuccess = (payload) => ({
  type: PROVIDER_EDIT_USER_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const addUserError = () => ({
  type: PROVIDER_ADD_ERROR_USER_MANAGEMENT_LIST,
});

export const faq = () => ({
  type: FAQ,
});
export const faqSuccess = (payload) => ({
  type: FAQ_SUCCESS,
  payload,
});

export const faqSearch = (payload) => ({
  type: FAQ_SEARCH,
  payload,
});

export const faqSearchSuccess = (payload) => ({
  type: FAQ_SEARCH_SUCCESS,
  payload,
});

export const isactive = (payload) => ({
  type: IS_ACTIVE,
  payload,
});