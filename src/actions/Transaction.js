/* eslint-disable import/named */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  TRANSACTION_LIST,
  TRANSACTION_LIST_SUBMIT,
  TRANSACTION_DETAIL_SUCCESS,
  TRANSACTION_DETAIL,
} from "../constants/ActionTypes";
  
export const transactionList = () => ({
  type: TRANSACTION_LIST,
});

export const transactionListSubmit = (payload) => ({
  type: TRANSACTION_LIST_SUBMIT,
  payload,
});

export const transactionDetail = (payload) => ({
  type: TRANSACTION_DETAIL,
  payload,
});

export const transactionDetailSuccess = (payload) => ({
  type: TRANSACTION_DETAIL_SUCCESS,
  payload,
});
