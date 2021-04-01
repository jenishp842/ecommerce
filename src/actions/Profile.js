/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  PROFILE_INFO,
  PROFILE_INFO_SUCCESS,
  PROFILE_EDIT,
  PROFILE_UPDATE,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_PIC_UPDATE,
  MOBILE_NUMBER_UPDATE_SUCCESS,
  MOBILE_NUMBER_UPDATE,
  DASHBOARD,
  DASHBOARD_SUCCESS,
} from "../constants/ActionTypes";

/* ---PROVIDER PROFILE-- */

export const profileGetInfo = () => ({
  type: PROFILE_INFO,
});

export const profileGetInfoSuccess = (payload) => ({
  type: PROFILE_INFO_SUCCESS,
  payload,
});

export const profileEdit = (payload) => ({
  type: PROFILE_EDIT,
  payload,
});

export const profileUpdate = (payload) => ({
  type: PROFILE_UPDATE,
  payload,
});

export const profileUpdateSuccess = (payload) => ({
  type: PROFILE_UPDATE_SUCCESS,
  payload,
});

export const profilePicUpdate = (payload) => ({
  type: PROFILE_PIC_UPDATE,
  payload,
});

export const mobileNumUpdate = (payload) => ({
  type: MOBILE_NUMBER_UPDATE,
  payload,
});

export const mobileNumUpdateSuccess = (payload) => ({
  type: MOBILE_NUMBER_UPDATE_SUCCESS,
  payload,
});

export const getDashboardCount = () => ({
  type: DASHBOARD,
});

export const dashboardSuccess = (payload) => ({
  type: DASHBOARD_SUCCESS,
  payload,
});
