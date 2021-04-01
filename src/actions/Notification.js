/* eslint-disable import/named */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
    NOTIFICATION,
    NOTIFICATION_SUCCESS,
    SOCKET_NOTIFICATION_SUCCESS,
    SOCKET_NOTIFICATION,
    FCM_UPDATE,
  } from "../constants/ActionTypes";
    
  export const notification = () => ({
    type: NOTIFICATION,
  });
  
  export const notificationSuccess = (payload) => ({
    type: NOTIFICATION_SUCCESS,
    payload,
  });

  export const socketNotification = () => ({
    type: SOCKET_NOTIFICATION,
  });

  export const socketNotificationSuccess = (payload) => ({
    type: SOCKET_NOTIFICATION_SUCCESS,
    payload,
  });

  export const fcmUpdate = (payload) => ({
    type: FCM_UPDATE,
    payload,
  });