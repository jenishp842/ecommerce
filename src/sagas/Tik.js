/* eslint-disable quote-props */
/* eslint-disable no-plusplus */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */

import { takeEvery, put, select, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import * as actionTypes from "../constants/ActionTypes";
import * as actions from "../actions/index";
import { user2, user, blockchain } from '../services';

let token;
const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
if (JwtToken == null || JwtToken == '') {
  token = null;
} else {
  token = JwtToken.accessToken.jwtToken;
}

function* createTikSubmit(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const passcode = JSON.parse(localStorage.getItem('pass'));
    const {
      documentName, templateId, metaData, sortattrVal, sortimgList, images, receiverList, logId
    } = action.payload;
    const stringmetaData = JSON.stringify(metaData);
    const stringsortattrVal = JSON.stringify(sortattrVal);
    const stringsortimgList = JSON.stringify(sortimgList);
    const reciver = JSON.stringify(receiverList);
    const fd = new FormData();
    for (let i = 0; i < images.length; i++) {
      fd.append('image', images[i]);
    }
    fd.append('metadataList', stringmetaData);
    fd.append('attributeList', stringsortattrVal);
    fd.append('documentName', documentName);
    fd.append('templateId', templateId);
    fd.append('passcode', passcode);
    fd.append('receiverList', reciver);
    fd.append('logId', logId);

    const response = yield user({
      method: 'post',
      url: '/document',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        'content-type': 'multipart/form-data',
      },
      data: fd
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.createTikSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    toast.error(response.response.data.msg);
    yield put(actions.error({ error: response.response.data.msg }));
  }
}

// EXISTING TAG
function* existingTag(action) {
  const { payload } = action;
  try {
    yield put(actions.addExistingTagsInTikInitialization());
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const response = yield blockchain({
      method: 'post',
      url: '/document-tag/get-document-tags',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        usertype: 'provider'
      },
      data: { ...payload }
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.addExistingTagsInTikSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addExistingTagsInTikError());
    } else {
      yield put(actions.addExistingTagsInTikError());
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.addExistingTagsInTikError());
  }
}

function* addTag(action) {
  const { payload } = action;
  const { body, existingTags } = payload;

  try {
    yield put(actions.addTagsInTikInitialization());
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const response = yield blockchain({
      method: existingTags === null ? 'post' : 'put',
      url: '/document-tag',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        usertype: 'provider'
      },
      data: { ...body }
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.addTagsInTikSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.addTagsInTikError());
    } else {
      yield put(actions.addTagsInTikError());
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.addTagsInTikError());
  }
}

function* deleteTag(action) {
  const { payload } = action;
  try {
    yield put(actions.deleteTagsInTikInitialization());
    const response = yield blockchain({
      method: 'delete',
      url: '/document-tag',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        usertype: 'provider'
      },
      data: payload
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.deleteTagsInTikSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.deleteTagsInTikError());
    } else {
      yield put(actions.deleteTagsInTikError());
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.deleteTagsInTikError());
  }
}

function* getDocumentListInfo(action) {
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  const { payload } = action;

  let url = '';
  switch (payload) {
    case 'all': url = '/document';
      break;
    case 'Drafts': url = 'document/draft/list';
      break;
    case 'Shared with me': url = 'document/shared-with-me';
      break;
    case 'archive-list': url = 'document/archive-list';
      break;
    default: url = `/document?type=${payload}`;
  }

  try {
    yield put(actions.listDocumentInitialization());
    const response = yield user
      .get(url,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getDocumentListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listDocumentError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listDocumentError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listDocumentError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getMetaFiled(action) {
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  try {
    yield put(actions.listMetaInitialization());
    const response = yield user
      .get('/document/meta-list', {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken
        }
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getMetaListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.metaListError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.metaListError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.metaListError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* getMetaInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    const response = yield user
      .get('/document/meta-list',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getMetaDataSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status == 400) {
      toast.error(response.response.data.msg);
      yield put(actions.tikLimit());
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* reciverListReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    const response = yield user
      .get('/receiver-list',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.reciverListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* deleteDraftListInfo(action) {
  const { payload } = action;
  try {
    yield put(actions.deleteDraftInitialization());
    const response = yield user
      .delete('/document/draft', { data: payload })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.deleteDraftSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.deleteDraftError());
    } else {
      yield put(actions.deleteDraftError());
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.deleteDraftError());
  }
}

function* getSelectTempList(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { search } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .get(`document/without-acceptance?keyword=${search}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getTemplateListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status == 400) {
      toast.error(response.response.data.msg);
      yield put(actions.tikLimit());
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* saveDraftReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const passcode = JSON.parse(localStorage.getItem('pass'));
    const {
      documentName, templateId, metaData, sortattrVal, sortimgList, images, receiverList, removeDraftId
    } = action.payload;
    const stringmetaData = JSON.stringify(metaData);
    const stringsortattrVal = JSON.stringify(sortattrVal);
    const stringsortimgList = JSON.stringify(sortimgList);
    const reciver = JSON.stringify(receiverList);

    const fd = new FormData();
    for (let i = 0; i < images.length; i++) {
      fd.append('image', images[i]);
    }
    fd.append('metadataList', stringmetaData);
    fd.append('attributeList', stringsortattrVal);
    fd.append('documentName', documentName);
    fd.append('templateId', templateId);
    fd.append('passcode', passcode);
    fd.append('receiverList', reciver);
    fd.append('removedDraftId', removeDraftId);
    const response = yield user({
      method: 'post',
      url: '/document/draft',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        'content-type': 'multipart/form-data',
      },
      data: fd
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.saveDraftSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    toast.error(response.response.data.msg);
    yield put(actions.error({ error: response.response.data.msg }));
  }
}

function* draftDetailReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { Id } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .get(`document/draft?draftId=${Id}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.draftDetailSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* tikDeatilReq(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const passcode = JSON.parse(localStorage.getItem('pass'));
    const { Id } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .get(`document/details?documentId=${Id}&passcode=${passcode}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.tikDetailSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* updateTikInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const passcode = JSON.parse(localStorage.getItem('pass'));
    const {
      documentName, templateId, metaData, sortattrVal, sortimgList, images, receiverList, documentId
    } = action.payload;
    const stringmetaData = JSON.stringify(metaData);
    const stringsortattrVal = JSON.stringify(sortattrVal);
    const stringsortimgList = JSON.stringify(sortimgList);
    const reciver = JSON.stringify(receiverList);

    const fd = new FormData();
    for (let i = 0; i < images.length; i++) {
      fd.append('image', images[i]);
    }
    fd.append('metadataList', stringmetaData);
    fd.append('attributeList', stringsortattrVal);
    fd.append('documentName', documentName);
    fd.append('templateId', templateId);
    fd.append('passcode', passcode);
    fd.append('receiverList', reciver);
    fd.append('documentId', documentId);
    const response = yield user({
      method: 'put',
      url: '/document',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken,
        'content-type': 'multipart/form-data',
      },
      data: fd
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.updateTikSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    toast.error(response.response.data.msg);
    yield put(actions.error({ error: response.response.data.msg }));
  }
}

function* viewTikInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const passcode = JSON.parse(localStorage.getItem('pass'));
    const { Id } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .post('document/details',
        {
          documentId: Id,
          passcode
        },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.viewTikSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* archiveDoc(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { Id, isArchive } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .put('document/archive-list',
        {
          documentId: Id,
          isArchive
        },
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.archiveSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* archiveDocList(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { Id, isArchive } = action.payload;
    yield put(actions.listUserInitialization());
    const response = yield user
      .get('document/archive-list',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.archiveSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.message }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_GET_DOCUMENT_MANAGEMENT_LIST, getDocumentListInfo);
  yield takeEvery(actionTypes.PROVIDER_GET_META_DATA_DOCUMENT_MANAGEMENT_LIST, getMetaFiled);
  yield takeEvery(actionTypes.CREATE_TIK, createTikSubmit);
  yield takeEvery(actionTypes.GET_META_DATA, getMetaInfo);
  yield takeEvery(actionTypes.RECIVER_LIST, reciverListReq);
  yield takeEvery(actionTypes.PROVIDER_DRAFT_DELETE_DOCUMENT_MANAGEMENT_LIST, deleteDraftListInfo);
  yield takeEvery(actionTypes.SELECT_TEMPLATE, getSelectTempList);
  yield takeEvery(actionTypes.SAVE_DRAFT, saveDraftReq);
  yield takeEvery(actionTypes.DRAFT_DETAIL, draftDetailReq);
  yield takeEvery(actionTypes.TIK_DETAIL, tikDeatilReq);
  yield takeEvery(actionTypes.ADD_TAG_DATA_TIK, addTag);
  yield takeEvery(actionTypes.DELETE_TAG_DATA_TIK, deleteTag);
  yield takeEvery(actionTypes.ADD_EXISTING_TAG_DATA_TIK, existingTag);
  yield takeEvery(actionTypes.UPDATE_TIK, updateTikInfo);
  // yield takeEvery(actionTypes.DELETE_TAG_DATA_TIK_SUCCESS, existingTag);
  yield takeEvery(actionTypes.VIEW_TIK, viewTikInfo);
  yield takeEvery(actionTypes.ARCHIVE, archiveDoc);
  yield takeEvery(actionTypes.ARCHIVE_LIST, archiveDocList);
}
