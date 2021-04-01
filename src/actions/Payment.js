/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  PAYMENT_USER,
  CUSTOMER_PAYMENT_DETAIL,
  CUSTOMER_PAYMENT_DETAIL_SUCCESS,
  CARD_PAYMENT,
  CARD_PAYMENT_SUCCESS,
  CARD_REMOVE_SUCCESS,
  CARD_REMOVE,
  CARD_ERROR,
} from "../constants/ActionTypes";

/* ---PROVIDER PROFILE-- */

export const paymentUser = () => ({
  type: PAYMENT_USER,
});

export const customerPaymentDetail = () => ({
  type: CUSTOMER_PAYMENT_DETAIL,
});

export const customerPaymentDetailSuccess = (payload) => ({
  type: CUSTOMER_PAYMENT_DETAIL_SUCCESS,
  payload,
});

export const cardPayment = (payload) => ({
  type: CARD_PAYMENT,
  payload,
});

export const cardPaymentSuccess = (payload) => ({
  type: CARD_PAYMENT_SUCCESS,
  payload,
});
export const cardRemove = (payload) => ({
  type: CARD_REMOVE,
  payload,
});
export const cardRemoveSuccess = (payload) => ({
  type: CARD_REMOVE_SUCCESS,
  payload,
});
export const paymentError = (payload) => ({
  type: CARD_ERROR,
  payload,
});
