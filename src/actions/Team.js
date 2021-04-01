/* eslint-disable import/named */
import {
  PROVIDER_GET_TEAM_MANAGEMENT_LIST,
  PROVIDER_GET_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DELETE_INITIALIZATION_TEAM_MANAGEMENT_LIST,
  PROVIDER_ERROR_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DELETE_TEAM_MANAGEMENT_LIST,
  PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_INITIALIZATION_ADD_TEAM_MANAGEMENT_LIST,
  PROVIDER_ADD_TEAM_MANAGEMENT_LIST,
  PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ERROR_ADD_TEAM_MANAGEMENT_LIST,
  PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST,
  PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_INITIALIZATION_EDIT_TEAM_MANAGEMENT_LIST,
  PROVIDER_EDIT_TEAM_MANAGEMENT_LIST,
  PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ERROR_EDIT_TEAM_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_TEAM,
  PROVIDER_INITIALIZATION_TEAM_MANAGEMENT_LIST,
  PROVIDER_ERROR_TEAM_MANAGEMENT_LIST,
  PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST,
  PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ERROR_TEAM_USER_MANAGEMENT_LIST,
} from '../constants/ActionTypes';

// intilization

export const teamInitialization = () => ({
  type: PROVIDER_INITIALIZATION_TEAM,
});

//  user List
export const getUserListing = () => ({
  type: PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST,
});

export const getUserListingTeamSuccess = (payload) => ({
  type: PROVIDER_GET_TEAM_USER_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const getUserListingTeamError = () => ({
  type: PROVIDER_ERROR_TEAM_USER_MANAGEMENT_LIST,
});

// list
export const listTeamInitialization = () => ({
  type: PROVIDER_INITIALIZATION_TEAM_MANAGEMENT_LIST,
});

export const getTeamListInfo = () => ({
  type: PROVIDER_GET_TEAM_MANAGEMENT_LIST,
});

export const getTeamDataListSuccess = (payload) => ({
  type: PROVIDER_GET_TEAM_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const listTeamError = () => ({
  type: PROVIDER_ERROR_TEAM_MANAGEMENT_LIST,
});

// Delete

export const deleteTeamInitialization = () => ({
  type: PROVIDER_DELETE_INITIALIZATION_TEAM_MANAGEMENT_LIST,
});

export const deleteTeam = (payload) => ({
  type: PROVIDER_DELETE_TEAM_MANAGEMENT_LIST,
  payload,
});

export const deleteTeamSuccess = (payload) => ({
  type: PROVIDER_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const deleteTeamError = () => ({
  type: PROVIDER_ERROR_DELETE_TEAM_MANAGEMENT_LIST_SUCCESS,
});

// ADD

export const addTeamInitialization = () => ({
  type: PROVIDER_INITIALIZATION_ADD_TEAM_MANAGEMENT_LIST,
});

export const addTeamListInfo = (payload) => ({
  type: PROVIDER_ADD_TEAM_MANAGEMENT_LIST,
  payload,
});

export const addTeamSuccess = (payload) => ({
  type: PROVIDER_ADD_TEAM_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const addTeamError = () => ({
  type: PROVIDER_ERROR_ADD_TEAM_MANAGEMENT_LIST,
});

// View
export const viewTeamDetailsInfo = (payload) => ({
  type: PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST,
  payload,
});

export const viewTeamDetailsSuccess = (payload) => ({
  type: PROVIDER_TEAM_DETAILS_TEAM_MANAGEMENT_LIST_SUCCESS,
  payload,
});

// Edit
export const editTeamInitialization = () => ({
  type: PROVIDER_INITIALIZATION_EDIT_TEAM_MANAGEMENT_LIST,
});

export const editTeamListInfo = (payload) => ({
  type: PROVIDER_EDIT_TEAM_MANAGEMENT_LIST,
  payload,
});

export const editTeamDetailsSuccess = (payload) => ({
  type: PROVIDER_EDIT_TEAM_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const editTeamError = () => ({
  type: PROVIDER_ERROR_EDIT_TEAM_MANAGEMENT_LIST,
});
// end
