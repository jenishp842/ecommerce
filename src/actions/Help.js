/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  TICKET_LIST,
  TICKET_LIST_SUCCESS,
  TICKET_SUBMIT,
  TICKET_SUBMIT_SUCCESS,
} from "../constants/ActionTypes";

/* ---HELP-- */

export const ticketList = () => ({
  type: TICKET_LIST,
});

export const ticketListSuccess = (payload) => ({
  type: TICKET_LIST_SUCCESS,
  payload,
});

export const ticketSubmit = (payload) => ({
  type: TICKET_SUBMIT,
  payload,
});
export const ticketSubmitSuccess = (payload) => ({
  type: TICKET_SUBMIT_SUCCESS,
  payload,
});
