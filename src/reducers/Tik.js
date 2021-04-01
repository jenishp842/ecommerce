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
  loader: false,
  documentList: [],
  metaList: [],
  metaData: [],
  metaDataList: '',
  reciverData: '',
  createTikSuccess: '',
  successPopup: '',
  successLoader: false,
  saveDraftSuccess: '',
  draftDetailSuccess: '',
  imgList: [],
  image: [],
  imgListData: [],
  reciverList: [],
  reciverDraftList: [],
  tikDetailSuccess: '',
  tikListData: [],
  existingTags: [],
  deleteFlagSuccess: false,
  viewTik: '',
  archiveSuccess: '',
  tikLimit: false,
};
/*---------------------------------------------------------------------
               Tik
 ----------------------------------------------------------------------*/

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.TIK_INITIALIZATION:
      return {
        ...state,
        loader: false,
        successPopup: '',
        successLoader: false,
      };

    case actionTypes.TIK_EDIT:
      return {
        ...state,
        metaData: action.payload.metaData,
      };
    case actionTypes.PROVIDER_INITIALIZATION_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        loader: true,
        documentList: []
      };
    case actionTypes.PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        loader: false,
        documentList: action.payload.data,
      };
    case actionTypes.PROVIDER_ERROR_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        loader: false,
        documentList: [],
      };
    case actionTypes.PROVIDER_INITIALIZATION_META_DATA_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        metaList: [],
      };
    case actionTypes.PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        // loader: false,
        metaList: action.payload.data,
      };
    case actionTypes.PROVIDER_ERROR_META_DATA_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        metaList: [],
      };
    case actionTypes.GET_META_DATA_SUCCESS:
      return {
        ...state,
        metaDataList: action.payload.data,
        tikLimit: false,
      };
    case actionTypes.RECIVER_LIST_SUCCESS:
      return {
        ...state,
        reciverData: action.payload.data,
      };
    case actionTypes.CREATE_TIK_SUCCESS:
      return {
        ...state,
        createTikSuccess: action.payload.data,
      };
    case actionTypes.PROVIDER_DELETE_DRAFT_INITIALIZATION_DATA_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: true,
        successPopup: '',

      };
    case actionTypes.PROVIDER__DRAFT_SUCCESS_DOCUMENT_MANAGEMENT_LIST_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,
        deleteFlag: true,
      };

    case actionTypes.PROVIDER_DRAFT_ERROR_DOCUMENT_MANAGEMENT_LIST:
      return {
        ...state,
        successLoader: false,
      };
    case actionTypes.SAVE_DRAFT_SUCCESS:
      return {
        ...state,
        saveDraftSuccess: action.payload.data,
      };
    case actionTypes.DRAFT_DETAIL_SUCCESS:
      return {
        ...state,
        draftDetailSuccess: action.payload.data,
        // imgList: action.payload.data.draftData.attributeList,
        imgListData: action.payload.data.draftData.attributeList,
        reciverDraftList: action.payload.data.draftData.receiverList,
      };
    case actionTypes.IMG_LIST_EDIT:
      return {
        ...state,
        imgList: [...action.payload.previousdata],
        // attrVal: [...action.payload.previousdata]
      };
    case actionTypes.IMAGE_EDIT:
      return {
        ...state,
        image: [...action.payload.previousdata2],
        // attrVal: [...action.payload.previousdata]
      };
    case actionTypes.RECIVER_DRAFT:
      return {
        ...state,
        reciverList: action.payload.teeDetail,
        // attrVal: [...action.payload.previousdata]
      };
    case actionTypes.RECIVER_DRAFT_EDIT:
      return {
        ...state,
        reciverDraftList: action.payload.reciverList == null ? null : action.payload.reciverList,
        // attrVal: [...action.payload.previousdata]
      };
    case actionTypes.CLEAR_DRAFT:
      return {
        ...state,
        reciverDraftList: [],
        reciverList: [],
        image: [],
        imgListData: [],
        imgList: [],
      };
    case actionTypes.TIK_DETAIL_SUCCESS:
      return {
        ...state,
        tikDetailSuccess: action.payload.data,
        tikListData: action.payload.data.blockchainDocData.DocumentObject.Attributes,
      };
    case actionTypes.UPDATE_TIK_SUCCESS:
      return {
        ...state,
        updateTikSuccess: action.payload.data,
      };
    case actionTypes.ADD_META_DATA:
      return {
        ...state,
        metaData: action.payload.metaData,
      };
    case actionTypes.ADD_TAG_DATA_TIK_INITIALIZATION:
      return {
        ...state,
        successLoader: true,
        successPopup: '',
      };
    case actionTypes.ADD_TAG_DATA_TIK_SUCCESS:
      return {
        ...state,
        successLoader: false,
        successPopup: action.payload.data,
      };
    case actionTypes.ADD_TAG_DATA_IN_TIK_ERROR:
      return {
        ...state,
        successLoader: false,
        successPopup: '',
      };
    case actionTypes.DELETE_TAG_DATA_TIK_SUCCESS:
      return {
        ...state,
        deleteFlagSuccess: true,
      };
    case actionTypes.DELETE_TAG_DATA_IN_TIK_ERROR:
      return {
        ...state,
        deleteFlagSuccess: false,
      };
    case actionTypes.ADD_EXISTING_TAG_DATA_TIK_INITIALIZATION:
      return {
        ...state,
        existingTagsLoader: true,
        existingTags: [],
        deleteFlagSuccess: false,
      };
    case actionTypes.ADD_EXISTING_TAG_DATA_TIK_SUCCESS:
      return {
        ...state,
        existingTagsLoader: false,
        existingTags: action.payload.data,
      };
    case actionTypes.ADD_EXISTING_TAG_DATA_TIK_ERROR:
      return {
        ...state,
        existingTagsLoader: false,
        existingTags: [],
      };
    case actionTypes.VIEW_TIK_SUCCESS:
      return {
        ...state,
        viewTik: action.payload.data,
      };
    case actionTypes.ARCHIVE_SUCCESS:
      return {
        ...state,
        archiveSuccess: action.payload.data,
        successPopup: action.payload.data,
      };
    case actionTypes.TIK_LIMIT:
      return {
        ...state,
        tikLimit: true,
        metaDataList: [],
      };
    default:
      return state;
  }
};
