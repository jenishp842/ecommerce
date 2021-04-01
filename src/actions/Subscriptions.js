/* eslint-disable import/prefer-default-export */
import {
  GET_SUBSCRIPTION,
  GET_SUBSCRIPTION_SUCCESS,
  SUBSCRIPTION_SELECTION_SUCCESS,
  SUBSCRIPTION_SELECTION,
  GET_MYPLAN_SUCCESS,
  GET_MYPLAN,
  SUBSCRIPTION_UPDATE_SELECTION,
  GET_INVOICE_DETAIL,
  GET_INVOICE_DETAIL_SUCCESS,
  SUBSCRIPTION_ERROR,
  SUBSCRIPTION_ERROR_FALSE,
  SUBSCRIPTION_PAYABLE,
  SUBSCRIPTION_PAYABLE_SUCCESS,
  PAYABLE_AMOUNT,
  NEW_SUBSCRIPTION,
  PROMO_SUCCESS,
  PROMO,
} from '../constants/ActionTypes';

export const getSubscription = () => ({
  type: GET_SUBSCRIPTION,
});

export const subscriptionSuccess = (payload) => ({
  type: GET_SUBSCRIPTION_SUCCESS,
  payload,
});

export const subscriptionSelection = (payload) => ({
  type: SUBSCRIPTION_SELECTION,
  payload,
});

export const subscriptionSelectionSuccess = (payload) => ({
  type: SUBSCRIPTION_SELECTION_SUCCESS,
  payload,
});
export const subscriptionUpdateSelection = (payload) => ({
  type: SUBSCRIPTION_UPDATE_SELECTION,
  payload,
});
export const getMyPlan = () => ({
  type: GET_MYPLAN,
});

export const getMyPlanSuccess = (payload) => ({
  type: GET_MYPLAN_SUCCESS,
  payload,
});

export const invoiceDetail = () => ({
  type: GET_INVOICE_DETAIL,
});

export const invoiceDetailSuccess = (payload) => ({
  type: GET_INVOICE_DETAIL_SUCCESS,
  payload,
});

export const subscriptionError = (payload) => ({
  type: SUBSCRIPTION_ERROR,
  payload,
});

export const subscriptionErrorFalse = () => ({
  type: SUBSCRIPTION_ERROR_FALSE,
});

export const subscriptionPayable = (payload) => ({
  type: SUBSCRIPTION_PAYABLE,
  payload,
});

export const subscriptionPayableSuccess = (payload) => ({
  type: SUBSCRIPTION_PAYABLE_SUCCESS,
  payload,
});

export const payableAmount = (payload) => ({
  type: PAYABLE_AMOUNT,
  payload,
});

export const newSubscriptipn = (payload) => ({
  type: NEW_SUBSCRIPTION,
  payload,
});

export const promo = (payload) => ({
  type: PROMO,
  payload,
});

export const promoSuccess = (payload) => ({
  type: PROMO_SUCCESS,
  payload,
});