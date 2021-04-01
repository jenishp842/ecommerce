/* eslint-disable one-var */
/* eslint-disable one-var-declaration-per-line */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
/* eslint-disable eqeqeq */
/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-var */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable spaced-comment */
/* eslint-disable import/no-unresolved */
import moment from 'moment';
import { roleAccessMapper } from '../constants/Mapper';

//import FormData from 'form-data';

export const formateDateMonth = (date) => date && moment(date).format('MM-DD-YYYY');

export const formatDate = (date) => date && moment(date).format('Do MMM YYYY');
export const formatTime = (time) => time && moment(time).format('hh:mm A');
export const fromNow = (date) => moment(date).fromNow();
export const formatlogDate = (date) => date && moment(date).format('MMM YYYY');
//key formate for add update role
export const formateCheckboxList = (keyType, mapperKey, list) => {
  roleAccessMapper[mapperKey].forEach((key) => {
    list.push(keyType[key]);
  });
};

export const convertTemplateDataFromData = (obj) => {
  var formData = new FormData();
  formData.append('autoSave', obj.autoSave);
  formData.append('template_name', obj.template_name);
  formData.append('template_type', obj.template_type);
  formData.append('isAcceptanceDocument', obj.isAcceptanceDocument);
  formData.append('attribute', JSON.stringify(obj.attribute));
  obj.acceptance_form
    && formData.append('acceptance_form', obj.acceptance_form);
  formData.append('thumbnail', obj.thumbnail);
  obj.templateId
    && formData.append('templateId', obj.templateId);

  return formData;
};

export const formatCheckbox = (role, document, template, invoice, payment) => {
  const list = [];

  formateCheckboxList(role, 'role', list);
  formateCheckboxList(document, 'document', list);
  formateCheckboxList(template, 'template', list);
  formateCheckboxList(invoice, 'invoice', list);
  formateCheckboxList(payment, 'payment', list);

  return list;
};

let i = -1;
export const roleAccessCheckbox = (list, emptyObj) => {
  Object.keys(roleAccessMapper).map((key) => {
    emptyObj[key] = {};
    roleAccessMapper[key].forEach((permission) => {
      i += 1;
      emptyObj[key][permission] = list[i];
    });
  });
  return emptyObj;
};
