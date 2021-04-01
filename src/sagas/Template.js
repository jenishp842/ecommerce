/* eslint-disable import/order */
/* eslint-disable no-console */
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
import { takeEvery, put, select } from 'redux-saga/effects';
import * as actionTypes from '../constants/ActionTypes';
import * as actions from '../actions/index';
import { user } from '../services';
import { toast } from 'react-toastify';

const getAutoSaveData = (state) => state.Template.autoSaveData;
const templateDetailsInfoData = (state) => state.Template.templateDetailsInfo;

function* getTemplateListInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { payload } = action;
    let url = '';
    if (payload.whiteList) {
      url = `/template?whiteList=${true}`;
    } else {
      const { search } = action.payload;
      url = `/template?keyword=${search}`;
    }

    yield put(actions.listUserInitialization());
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
      yield put(actions.getTemplateListSuccess({ data: response.data.data }));
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      // yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
      toast.error(response.response.data.msg);
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

function* deleteTemplateListInfo(action) {
  const { templateId } = action.payload;
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const response = yield user({
      method: 'delete',
      url: '/template',
      headers: {
        Authorization: JwtToken.accessToken.jwtToken
      },
      data: {
        templateId
      },
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      // getRoleListInfo()
      yield put(actions.deleteTemplateSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.error({ error: response.response.data.message }));
    }
  } catch (error) {
    yield put(actions.error({ error: response.response.data.message }));
  }
}

// Recent Attribute
function* getRecentAttributeTemplateListInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.listRecentAttributeTemplateInitialization());
    const response = yield user
      .get('/template/attributes-list',
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getRecentAttributeTemplateListSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response !== 200) {
      yield put(actions.getRecentAttributeTemplateListError());
    } else {
      yield put(actions.getRecentAttributeTemplateListError());
    }
  } catch (error) {
    yield put(actions.getRecentAttributeTemplateListError());
  }
}
function* getTemplateDetailInfo(action) {
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const { templateId, whiteList } = action.payload;

    yield put(actions.listUserInitialization());
    const response = yield user
      .get(`/template/details?templateId=${templateId}&whiteList=${whiteList}`,
        {
          headers: {
            Authorization: JwtToken.accessToken.jwtToken
          }
        })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getTemplateDetailSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
      toast.error(response.response.data.msg);
    } else {
      yield put(actions.listUserError());
      yield put(actions.error({ error: response.response.data.message }));
      toast.error(response.response.data.msg);
    }
  } catch (error) {
    yield put(actions.listUserError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

// Edit
function* editTemplate(action) {
  const { body } = action;
  const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
  const config = {
    'Content-Type': 'multipart/form-data',
    Authorization: JwtToken.accessToken.jwtToken
  };
  try {
    yield put(actions.createTemplateInitialization());
    const response = yield user
      .put('/template', body, config)
      .then(async (response) => response)
      .catch(async (error) => error);

    if (response.status === 200) {
      yield put(actions.createTemplateSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.createTemplateError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.createTemplateError());
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.createTemplateError());
  }
}

function* autoSaveEditTemplate(action) {
  const { body } = action;

  const autoSaveData = yield select(getAutoSaveData);
  const templateDetailsInfo = yield select(templateDetailsInfoData);

  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    const response = yield user({
      method: (autoSaveData === null && templateDetailsInfo === null) ? 'post' : 'put',
      url: '/template',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: JwtToken.accessToken.jwtToken
      },
      data: body,
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.autoSaveTemplateSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.autoSaveTemplateError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      toast.error(response.response.data.msg);
      yield put(actions.autoSaveTemplateError());
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    toast.error(response.response.data.msg);
    yield put(actions.autoSaveTemplateError());
  }
}

// CREATE TEMPLATE
function* addTemplate(action) {
  const { body } = action;
  const autoSaveData = yield select(getAutoSaveData);
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.createTemplateInitialization());
    const response = yield user({
      method: autoSaveData === null ? 'post' : 'put',
      url: '/template',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: JwtToken.accessToken.jwtToken
      },
      data: body,
    })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.createTemplateSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.createTemplateError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.createTemplateError());
      toast.error(response.response.data.msg);
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.createTemplateError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

// details
function* detailsTemplate(action) {
  const { payload } = action;
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.detailsTemplateInitialization());
    const response = yield user
      .get(`template/details?templateId=${payload}`, {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken
        }
      })
      .then(async (response) => response)
      .catch(async (error) => error);

    if (response.status === 200) {
      yield put(actions.detailsTemplateSuccess({ data: response.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response !== 200) {
      toast.error(response.response.data.msg);
      yield put(actions.detailsTemplateError());
    } else {
      yield put(actions.detailsTemplateError());
    }
  } catch (error) {
    yield put(actions.detailsTemplateError());
  }
}

// Get the template Listing
function* getSelectAcceptanceTempInfo(action) {
  const { payload } = action;
  try {
    const JwtToken = JSON.parse(localStorage.getItem('jwtToken'));
    yield put(actions.selectAcceptanceTempInfoInitialization());
    const response = yield user
      .get(`/document/acceptance-template-list?keyword=${payload}`, {
        headers: {
          Authorization: JwtToken.accessToken.jwtToken
        }
      })
      .then(async (response) => response)
      .catch(async (error) => error);
    if (response.status === 200) {
      yield put(actions.getSelectAcceptanceTempInfoSuccess({ data: response.data.data }));
      yield put(actions.subscriptionErrorFalse());
    } else if (response.response.status == 403) {
      yield put(actions.tokenError({ error: response.response.data.message }));
    } else if (response.response.status == 405) {
      yield put(actions.subscriptionError({ error: response.response.data.msg }));
    } else if (response.response.status !== 200) {
      yield put(actions.SelectAcceptanceTempInfoError());
      yield put(actions.error({ error: response.response.data.msg }));
    } else {
      yield put(actions.SelectAcceptanceTempInfoError());
      yield put(actions.error({ error: response.response.data.msg }));
    }
  } catch (error) {
    yield put(actions.SelectAcceptanceTempInfoError());
    yield put(actions.error({ error: response.response.data.message }));
  }
}

export default function* rootsaga() {
  yield takeEvery(actionTypes.PROVIDER_GET_TEMPLATE_MANAGEMENT_LIST, getTemplateListInfo);
  yield takeEvery(actionTypes.PROVIDER_DELETE_TEMPLATE_MANAGEMENT_LIST, deleteTemplateListInfo);
  yield takeEvery(actionTypes.PROVIDER_TEMPLATE_DETAIL, getTemplateDetailInfo);
  yield takeEvery(actionTypes.PROVIDER_GET_RECENT_TEMPLATE_MANAGEMENT_LIST, getRecentAttributeTemplateListInfo);
  yield takeEvery(actionTypes.PROVIDER_CREATE_TEMPLATE_MANAGEMENT_LIST, addTemplate);
  yield takeEvery(actionTypes.PROVIDER_CREATE_TEMPLATE_MANAGEMENT_SUCCESS, getRecentAttributeTemplateListInfo);
  yield takeEvery(actionTypes.PROVIDER_DETAILS_TEMPLATE_MANAGEMENT_LIST, detailsTemplate);
  yield takeEvery(actionTypes.PROVIDER_EDIT_TEMPLATE_MANAGEMENT_LIST, editTemplate);
  yield takeEvery(actionTypes.PROVIDER_GET_SELECT_ACCEPTANCE_TEMPLATE_MANAGEMENT_LIST, getSelectAcceptanceTempInfo);
  yield takeEvery(actionTypes.PROVIDER_EDIT_AUTO_SAVE_TEMPLATE_MANAGEMENT_LIST, autoSaveEditTemplate);
}
