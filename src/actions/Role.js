import {
  PROVIDER_GET_ROLE_MANAGEMENT_LIST,
  PROVIDER_GET_ROLE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DELETE_ROLE_MANAGEMENT_LIST,
  PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ADD_ROLE_MANAGEMENT_LIST,
  PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ADD_INITIALIZATION_ROLE_MANAGEMENT_LIST,
  PROVIDER_ADD_ERROR_ROLE_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_ROLE_MANAGEMENT_LIST,
  PROVIDER_ERROR_ROLE_MANAGEMENT_LIST,
  PROVIDER_DELETE_INITIALIZATION_ROLE_MANAGEMENT_LIST,
  PROVIDER_DELETE_ERROR_ROLE_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_ROLE,
  PROVIDER_EDIT_ROLE_MANAGEMENT_LIST,
  PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_EDIT_INITIALIZATION_ROLE_MANAGEMENT_LIST,
  PROVIDER_EDIT_ERROR_ROLE_MANAGEMENT_LIST,
} from '../constants/ActionTypes';

export const roleInitialization = () => ({
  type: PROVIDER_INITIALIZATION_ROLE,
});
// Listing
export const listRoleInitialization = () => ({
  type: PROVIDER_INITIALIZATION_ROLE_MANAGEMENT_LIST,
});

export const getRoleListInfo = () => ({
  type: PROVIDER_GET_ROLE_MANAGEMENT_LIST,
});

export const getRoleDataListSuccess = (payload) => ({
  type: PROVIDER_GET_ROLE_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const listRoleError = () => ({
  type: PROVIDER_ERROR_ROLE_MANAGEMENT_LIST,
});

// Delete
export const deleteRoleInitialization = () => ({
  type: PROVIDER_DELETE_INITIALIZATION_ROLE_MANAGEMENT_LIST,
});

export const deleteRole = (payload) => ({
  type: PROVIDER_DELETE_ROLE_MANAGEMENT_LIST,
  payload,
});

export const deleteRoleSuccess = (payload) => ({
  type: PROVIDER_DELETE_ROLE_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const deleteRoleError = () => ({
  type: PROVIDER_DELETE_ERROR_ROLE_MANAGEMENT_LIST,
});

// ADD
export const addRoleInitialization = () => ({
  type: PROVIDER_ADD_INITIALIZATION_ROLE_MANAGEMENT_LIST,
});
export const addRoleInList = (payload) => ({
  type: PROVIDER_ADD_ROLE_MANAGEMENT_LIST,
  payload,
});
export const addRoleSuccess = (payload) => ({
  type: PROVIDER_ADD_ROLE_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const addRoleError = () => ({
  type: PROVIDER_ADD_ERROR_ROLE_MANAGEMENT_LIST,
});
// edit
export const editRoleInitialization = () => ({
  type: PROVIDER_EDIT_INITIALIZATION_ROLE_MANAGEMENT_LIST,
});
export const editRoleInList = (payload) => ({
  type: PROVIDER_EDIT_ROLE_MANAGEMENT_LIST,
  payload,
});
export const editRoleSuccess = (payload) => ({
  type: PROVIDER_EDIT_ROLE_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const editRoleError = () => ({
  type: PROVIDER_EDIT_ERROR_ROLE_MANAGEMENT_LIST,
});
