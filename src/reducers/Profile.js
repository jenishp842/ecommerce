/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
/* eslint-disable no-duplicate-case */
/* eslint-disable max-len */
/*----------------------------------------------------------------------------------------------------------------
       This is the Auth reducer where all auth related state managed like signin,signup,forgotpassword,etc
-------------------------------------------------------------------------------------------------------------------*/

import * as actionTypes from '../constants/ActionTypes';

export const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  mobileNumber: '',
  email: '',
  designation: '',
  companyName: '',
  address: '',
  profileUpdateSuccess: '',
  document: '',
  invoice: '',
  payment: '',
  role: '',
  template: '',
  photoData: '',
  mobileNumUpdate: '',
  updatedAt: '',
  userFirstname: '',
  userLastname: '',
  roleName: '',
  dashboard: '',
  userkey: '',
  invitationCode: '',
  referralDetails: '',
  showReferral: '',
  providerId: '',
};
/*---------------------------------------------------------------------
               Profile
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_INFO_SUCCESS:
      return {
        ...state,
        firstName: action.payload.data.data.firstName,
        lastName: action.payload.data.data.lastName,
        mobileNumber: action.payload.data.data.mobileNumber,
        email: action.payload.data.data.email,
        designation: action.payload.data.data.designation,
        companyName: action.payload.data.data.companyName,
        address: action.payload.data.data.address,
        document: action.payload.data.data.otherResponsibilities != null ? action.payload.data.data.otherResponsibilities.document : null,
        invoice: action.payload.data.data.otherResponsibilities != null ? action.payload.data.data.otherResponsibilities.invoice : null,
        payment: action.payload.data.data.otherResponsibilities != null ? action.payload.data.data.otherResponsibilities.payment : null,
        role: action.payload.data.data.otherResponsibilities != null ? action.payload.data.data.otherResponsibilities.role : null,
        template: action.payload.data.data.otherResponsibilities != null ? action.payload.data.data.otherResponsibilities.template : null,
        Roledocument: action.payload.data.data.role != null && action.payload.data.data.role != undefined ? action.payload.data.data.role.document : null,
        Roleinvoice: action.payload.data.data.role != null ? action.payload.data.data.role.invoice : null,
        Rolepayment: action.payload.data.data.role != null ? action.payload.data.data.role.payment : null,
        Rolerole: action.payload.data.data.role != null ? action.payload.data.data.role.role : null,
        Roletemplate: action.payload.data.data.role != null ? action.payload.data.data.role.template : null,
        photoData: action.payload.data.data.photo,
        updatedAt: action.payload.data.data.updatedAt,
        userFirstname: action.payload.data.data.firstName,
        userLastname: action.payload.data.data.lastName,
        roleName: action.payload.data.data.role != undefined ? action.payload.data.data.role.roleName : 'Super Provider',
        userkey: action.payload.data.data,
        invitationCode: action.payload.data.data.invitationCode,
        referralDetails: action.payload.data.data.referralDetails,
        showReferral: action.payload.data.data.isSuperProvide,
        providerId: action.payload.data.data.providerId,
      };
    case actionTypes.PROFILE_EDIT:
      return {
        ...state,
        [action.payload.key]: action.payload.e.target.value,
      };
    case actionTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileUpdateSuccess: action.payload.data,
      };
    case actionTypes.MOBILE_NUMBER_UPDATE_SUCCESS:
      return {
        ...state,
        mobileNumUpdate: action.payload.data,
      };
    case actionTypes.DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload.data.data,
      };
    default:
      return state;
  }
};
