/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import {
  TIK_EDIT,
  PROVIDER_INITIALIZATION_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ERROR_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_INITIALIZATION_META_DATA_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_ERROR_META_DATA_DOCUMENT_MANAGEMENT_LIST,
  CREATE_TIK,
  GET_META_DATA,
  GET_META_DATA_SUCCESS,
  RECIVER_LIST_SUCCESS,
  RECIVER_LIST,
  CREATE_TIK_SUCCESS,
  PROVIDER_DELETE_DRAFT_INITIALIZATION_DATA_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER_DRAFT_DELETE_DOCUMENT_MANAGEMENT_LIST,
  PROVIDER__DRAFT_SUCCESS_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  PROVIDER_DRAFT_ERROR_DOCUMENT_MANAGEMENT_LIST,
  SELECT_TEMPLATE,
  SAVE_DRAFT_SUCCESS,
  SAVE_DRAFT,
  DRAFT_DETAIL_SUCCESS,
  DRAFT_DETAIL,
  IMG_LIST_EDIT,
  TIK_INITIALIZATION,
  IMAGE_EDIT,
  RECIVER_DRAFT,
  RECIVER_DRAFT_EDIT,
  CLEAR_DRAFT,
  TIK_DETAIL,
  TIK_DETAIL_SUCCESS,
  ADD_META_DATA,
  ADD_TAG_DATA_TIK_INITIALIZATION,
  ADD_TAG_DATA_TIK,
  ADD_TAG_DATA_TIK_SUCCESS,
  ADD_TAG_DATA_IN_TIK_ERROR,
  ADD_EXISTING_TAG_DATA_TIK_INITIALIZATION,
  ADD_EXISTING_TAG_DATA_TIK,
  ADD_EXISTING_TAG_DATA_TIK_SUCCESS,
  ADD_EXISTING_TAG_DATA_TIK_ERROR,
  DELETE_TAG_DATA_TIK_INITIALIZATION,
  DELETE_TAG_DATA_TIK,
  DELETE_TAG_DATA_TIK_SUCCESS,
  DELETE_TAG_DATA_IN_TIK_ERROR,
  UPDATE_TIK,
  UPDATE_TIK_SUCCESS,
  VIEW_TIK,
  VIEW_TIK_SUCCESS,
  ARCHIVE,
  ARCHIVE_LIST,
  ARCHIVE_SUCCESS,
  TIK_LIMIT,
} from "../constants/ActionTypes";

/* ---PROVIDER TIK-- */
export const tikInitialization = () => ({
  type: TIK_INITIALIZATION,
});

export const createTikEdit = (payload) => ({
  type: TIK_EDIT,
  payload,
});

// document listing
export const listDocumentInitialization = () => ({
  type: PROVIDER_INITIALIZATION_DOCUMENT_MANAGEMENT_LIST,
});

export const getDocumentListInfo = (payload) => ({
  type: PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST,
  payload,
});

export const getDocumentListSuccess = (payload) => ({
  type: PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const listDocumentError = () => ({
  type: PROVIDER_ERROR_DOCUMENT_MANAGEMENT_LIST,
});

// document filter
// export const getDocumentListFilter = () => ({
//   type: PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST,
// });

// get meta filed
export const listMetaInitialization = () => ({
  type: PROVIDER_INITIALIZATION_META_DATA_DOCUMENT_MANAGEMENT_LIST,
});

export const getMetaListInfo = () => ({
  type: PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST,
});

export const getMetaListSuccess = (payload) => ({
  type: PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const metaListError = () => ({
  type: PROVIDER_ERROR_META_DATA_DOCUMENT_MANAGEMENT_LIST,
});

export const createTik = (payload) => ({
  type: CREATE_TIK,
  payload,
});

export const getMetaData = () => ({
  type: GET_META_DATA,
});

export const getMetaDataSuccess = (payload) => ({
  type: GET_META_DATA_SUCCESS,
  payload,
});

export const reciverList = () => ({
  type: RECIVER_LIST,
});

export const reciverListSuccess = (payload) => ({
  type: RECIVER_LIST_SUCCESS,
  payload,
});

export const createTikSuccess = (payload) => ({
  type: CREATE_TIK_SUCCESS,
  payload,
});

// delete DraftTik

export const deleteDraftInitialization = () => ({
  type: PROVIDER_DELETE_DRAFT_INITIALIZATION_DATA_DOCUMENT_MANAGEMENT_LIST,
});

export const deleteDraftTikListing = (payload) => ({
  type: PROVIDER_DRAFT_DELETE_DOCUMENT_MANAGEMENT_LIST,
  payload,
});

export const deleteDraftSuccess = (payload) => ({
  type: PROVIDER__DRAFT_SUCCESS_DOCUMENT_MANAGEMENT_LIST_SUCCESS,
  payload,
});

export const deleteDraftError = () => ({
  type: PROVIDER_DRAFT_ERROR_DOCUMENT_MANAGEMENT_LIST,
});

export const selectTemplate = (payload) => ({
  type: SELECT_TEMPLATE,
  payload,
});

export const saveDraft = (payload) => ({
  type: SAVE_DRAFT,
  payload,
});

export const saveDraftSuccess = (payload) => ({
  type: SAVE_DRAFT_SUCCESS,
  payload,
});

export const draftDtail = (payload) => ({
  type: DRAFT_DETAIL,
  payload,
});

export const draftDetailSuccess = (payload) => ({
  type: DRAFT_DETAIL_SUCCESS,
  payload,
});
export const imgListEdit = (payload) => ({
  type: IMG_LIST_EDIT,
  payload,
});

export const imageEdit = (payload) => ({
  type: IMAGE_EDIT,
  payload,
});

export const reciverDraft = (payload) => ({
  type: RECIVER_DRAFT,
  payload,
});

export const reciverDraftEdit = (payload) => ({
  type: RECIVER_DRAFT_EDIT,
  payload,
});

export const clearDraft = () => ({
  type: CLEAR_DRAFT,
});

export const tikDetail = (payload) => ({
  type: TIK_DETAIL,
  payload,
});

export const tikDetailSuccess = (payload) => ({
  type: TIK_DETAIL_SUCCESS,
  payload,
});

export const addMetaData = (payload) => ({
  type: ADD_META_DATA,
  payload,
});

// Add tag in Tik
export const addTagsInTikInitialization = () => ({
  type: ADD_TAG_DATA_TIK_INITIALIZATION,
});
export const addTagsInTik = (payload) => ({
  type: ADD_TAG_DATA_TIK,
  payload,
});
export const addTagsInTikSuccess = (payload) => ({
  type: ADD_TAG_DATA_TIK_SUCCESS,
  payload,
});
export const addTagsInTikError = () => ({
  type: ADD_TAG_DATA_IN_TIK_ERROR,
});

// ExistingTags
export const addExistingTagsInTikInitialization = () => ({
  type: ADD_EXISTING_TAG_DATA_TIK_INITIALIZATION,
});
export const addExistingTagsInTik = (payload) => ({
  type: ADD_EXISTING_TAG_DATA_TIK,
  payload,
});
export const addExistingTagsInTikSuccess = (payload) => ({
  type: ADD_EXISTING_TAG_DATA_TIK_SUCCESS,
  payload,
});
export const addExistingTagsInTikError = (payload) => ({
  type: ADD_EXISTING_TAG_DATA_TIK_ERROR,
  payload,
});
// delete
export const deleteTagsInTikInitialization = () => ({
  type: DELETE_TAG_DATA_TIK_INITIALIZATION,
});
export const deleteTagsInTik = (payload) => ({
  type: DELETE_TAG_DATA_TIK,
  payload,
});
export const deleteTagsInTikSuccess = (payload) => ({
  type: DELETE_TAG_DATA_TIK_SUCCESS,
  payload,
});
export const deleteTagsInTikError = () => ({
  type: DELETE_TAG_DATA_IN_TIK_ERROR,
});
export const updateTik = (payload) => ({
  type: UPDATE_TIK,
  payload,
});
export const updateTikSuccess = (payload) => ({
  type: UPDATE_TIK_SUCCESS,
  payload,
});

export const viewTik = (payload) => ({
  type: VIEW_TIK,
  payload,
});

export const viewTikSuccess = (payload) => ({
  type: VIEW_TIK_SUCCESS,
  payload,
});

export const archive = (payload) => ({
  type: ARCHIVE,
  payload,
});

export const archiveSuccess = (payload) => ({
  type: ARCHIVE_SUCCESS,
  payload,
});

export const archiveList = (payload) => ({
  type: ARCHIVE_LIST,
  payload,
});

export const tikLimit = () => ({
  type: TIK_LIMIT,
});
