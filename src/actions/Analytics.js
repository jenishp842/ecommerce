/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  GENERATE_KEY,
  GENERATE_KEY_SUCCESS,
  LOG_LIST_SUCCESS,
  LOG_LIST,
  LOG_LIST_DETAIL_SUCCESS,
  LOG_LIST_DETAIL,
  LOG_REPORT_SUCCESS,
  LOG_REPORT,
} from "../constants/ActionTypes";

/* ---PROVIDER PROFILE-- */

export const generateKey = () => ({
  type: GENERATE_KEY,
});

export const generateKeySuccess = (payload) => ({
  type: GENERATE_KEY_SUCCESS,
  payload,
});

export const logList = () => ({
  type: LOG_LIST,
});

export const logListSuccess = (payload) => ({
  type: LOG_LIST_SUCCESS,
  payload,
});

export const logListDetail = (payload) => ({
  type: LOG_LIST_DETAIL,
  payload,
});

export const logListDetailSuccess = (payload) => ({
  type: LOG_LIST_DETAIL_SUCCESS,
  payload,
});

export const logReport = () => ({
  type: LOG_REPORT,
});

export const logReportSuccess = (payload) => ({
  type: LOG_REPORT_SUCCESS,
  payload,
});
