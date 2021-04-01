import {
  TIK_REPORTS,
  PROVIDER_INITIALIZATION_TIK_REPORTS_MANAGEMENT_LIST,
  PROVIDER_TIK_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS,
  TIK_REPORTS_ERROR,
  TOR_REPORTS,
  PROVIDER_INITIALIZATION_TOR_REPORTS_MANAGEMENT_LIST,
  PROVIDER_TOR_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS,
  TOR_REPORTS_ERROR,
  GET_TIK_TAB_DATA_TIK,
  TOR_REPORTS_ROLE,
  TOR_REPORTS_ROLE_SUCCESS,
  TEAM_REPORTS,
} from '../constants/ActionTypes';

export const tikReportsInitialization = () => ({
  type: PROVIDER_INITIALIZATION_TIK_REPORTS_MANAGEMENT_LIST,
});

export const tikReports = (payload) => ({
  type: TIK_REPORTS,
  payload,
});

export const tikReportsSuccess = (payload) => ({
  type: PROVIDER_TIK_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const tikReportsError = () => ({
  type: TIK_REPORTS_ERROR,
});

export const torReportsInitialization = () => ({
  type: PROVIDER_INITIALIZATION_TOR_REPORTS_MANAGEMENT_LIST,
});

export const torReports = (payload) => ({
  type: TOR_REPORTS,
  payload,
});

export const torReportsSuccess = (payload) => ({
  type: PROVIDER_TOR_REPORTS_SUCCESS_MANAGEMENT_LIST_SUCCESS,
  payload,
});
export const torReportsError = () => ({
  type: TOR_REPORTS_ERROR,
});
export const getTikTabData = (payload) => ({
  type: GET_TIK_TAB_DATA_TIK,
  payload,
});
export const TorfilterRole = (payload) => ({
  type: TOR_REPORTS_ROLE,
  payload,
});

export const TorfilterRoleSuccess = (payload) => ({
  type: TOR_REPORTS_ROLE_SUCCESS,
  payload,
});

export const teamReports = (payload) => ({
  type: TEAM_REPORTS,
  payload,
});
