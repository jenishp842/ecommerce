/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  TO_RECEIVER_API,
  TO_RECEIVER_API_SUCCESS,
  TO_RECEIVER_API_ERROR,
  FROM_PROVIDER_API,
  FROM_PROVIDER_API_SUCCESS,
  FROM_PROVIDER_API_ERROR,
  PROVIDER_INITIALIZATION_ADVANCESEARCH,
  PROVIDER_ADVANCESEARCH,
  PROVIDER_ADVANCESEARCH_SUCCESS,
  PROVIDER_ADVANCESEARCH_ERROR,
  PROVIDER_INITIALIZATION_SIMPLESEARCH,
  PROVIDER_SIMPLESEARCH,
  ADVANCE_SEARCH_VALUES,
  SIMPLE_SEARCH_VALUES,
  CLEAR_SEARCH_VALUES,
} from "../constants/ActionTypes";

/* ---PROVIDER TIK-- */

export const toReceiverAPI = (payload) => ({
  type: TO_RECEIVER_API,
  payload,
});

export const toReceiverAPISuccess = (payload) => ({
  type: TO_RECEIVER_API_SUCCESS,
  payload,
});

export const toReceiverAPIError = () => ({
  type: TO_RECEIVER_API_ERROR,
});

// Provider API
export const toProviderAPI = (payload) => ({
  type: FROM_PROVIDER_API,
  payload,
});

export const toProviderAPISuccess = (payload) => ({
  type: FROM_PROVIDER_API_SUCCESS,
  payload,
});

export const toProviderAPIError = () => ({
  type: FROM_PROVIDER_API_ERROR,
});

// Advance Search API
export const advanceSearchInitialization = () => ({
  type: PROVIDER_INITIALIZATION_ADVANCESEARCH,
});

export const submitAdvanceSearch = (payload, advanceSearchValueData) => ({
  type: PROVIDER_ADVANCESEARCH,
  payload,
  advanceSearchValueData,
});

export const submitAdvanceSearchSuccess = (payload) => ({
  type: PROVIDER_ADVANCESEARCH_SUCCESS,
  payload,
});

export const submitAdvanceSearchError = () => ({
  type: PROVIDER_ADVANCESEARCH_ERROR,
});

// simple Search

export const simpleSearchInitialization = () => ({
  type: PROVIDER_INITIALIZATION_SIMPLESEARCH,
});

export const submitSimpleSearch = (payload) => ({
  type: PROVIDER_SIMPLESEARCH,
  payload,
});

// Advance search
export const advanceSearchValues = (payload) => ({
  type: ADVANCE_SEARCH_VALUES,
  payload,
});

export const simpleSearchValue = (payload) => ({
  type: SIMPLE_SEARCH_VALUES,
  payload,
});

export const clearSearchValue = () => ({
  type: CLEAR_SEARCH_VALUES,
});
