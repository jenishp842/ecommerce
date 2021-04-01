/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import {
  Formik, Form, FieldArray,
} from 'formik';
import _ from 'lodash';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {
  WithLayoutContainer,
  SuccessPopup,
} from '../../component/index.jsx';
import DragAndDrop from './DragDrop.jsx';
import StaticTemplate from './StaticTemplate.jsx';
import createTemplateSchema from '../../schema/createTemplateSchema.js';
import RecentAttribute from './RecentAttribute.jsx';
import * as actions from '../../actions';
import LivePreview from './LivePreview.jsx';
import Loader from '../../component/Loader.jsx';
import { convertTemplateDataFromData } from '../../helper/utility.js';
import moment from 'moment';

let interval = '';
let checkInternal = false;
let autoSaveVar = false;
class EditTemlate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      selectTemplate: ['Attribute', 'Thumbnail', 'Text'],
      addFlag: false,
      recentAttributeFlag: true,
      attribute: [],
      successFlag: true,
      SuccessPopupFlag: true,
      autoSaveFlag: props.templateObj && props.templateObj.templateDetailsInfo && props.templateObj.templateDetailsInfo.autoSave,
      autoSaveData: '',
      formData: '',
      checkDetailsLoader: false,
      templateId: '',
      autoSaveFlagCheck: false,
      autoSaveLoader: false,
      checkAutoSave: false,
      checkAutoSaveBtn: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.buttonRef = React.createRef();
    this.getFormData = this.getFormData.bind(this);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({
        addFlag: false,
      });
    }
  }

  getTemplateItem = (item) => {
    const { template } = this.state;
    const temp1 = template;

    temp1.push({
      type: item.toLowerCase(),
      attribute_name: '',
      attribute_dropdown: '',
      include_in_thumbnail: '',
    });

    this.setState({
      template: temp1,
      addFlag: false,
    });
  }

  addFlag = () => {
    this.setState({
      addFlag: !this.state.addFlag,
    });
  }

  componentDidUpdate(prevState, prevProps) {
    const { templateObj } = this.props;
    const { templateUpdate, templateDetailsInfo, autoSaveSuccess } = templateObj;
    const { templateId, autoSaveFlag } = this.state;

    if (this.props !== prevProps) {
      if (templateUpdate === true) {
        this.props.history.push('template');
      }
      if (templateObj !== '' && templateDetailsInfo !== null) {
        if (templateDetailsInfo.autoSave === true && checkInternal === false) {
          interval = setInterval(() => {
            this.setState({
              autoSaveFlagCheck: true,
              // autoSaveLoader: false,
            }, () => {
              this.buttonRef.current.click();
            });
          }, 60000);
          checkInternal = true;
        } else if ((templateDetailsInfo.autoSave === false || templateDetailsInfo.autoSave === undefined) && checkInternal === true) {
          clearInterval(interval);
          checkInternal = false;
          this.setState({
            autoSaveFlagCheck: false,
          });
        } else { }
      }

      if (autoSaveSuccess === true) {
        this.props.detailsTemplateListInfo(templateId);
        this.props.getTemplateListInfo({ search: '' });
        this.props.templateInitialization();
      }
    }
    if (this.props.error) {
      this.setState({
        autoSaveFlag: !autoSaveFlag,
      });
      this.props.errorClear();
    }
  }

  componentWillUnmount() {
    clearInterval(interval);
    checkInternal = false;
    this.setState({
      autoSaveFlag: false,
    });
    this.props.templateInitialization();
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  successPopup = () => {
    this.setState({
      addFlag: false,
      successFlag: true,
      SuccessPopupFlag: true,
    });
  }

  successPopupClosePopup = () => {
    this.props.templateInitialization();

    this.setState({
      addFlag: false,
      SuccessPopupFlag: false,
    });
  }

  formateTemplateData = (values) => {
    const { templateObj } = this.props;
    const { templateDetailsInfo } = templateObj;
    const { _id, acceptance_form } = templateDetailsInfo;
    const { autoSaveFlag } = this.state;

    const {
      attribute, template_name, template_type, isAcceptanceDocument, thumbnail,
    } = values;

    let finalObj = {};

    if (attribute && attribute.length > 0) {
      const temp1 = attribute.map((item, key) => ({ ...item, order: key + 1 }));

      finalObj = temp1.reduce((att, a) => {
        att[a.type] = att[a.type] || [];

        if (a.type === 'attribute') {
          if (a.attribute_dropdown === 'Text') {
            att[a.type].push({
              order: a.order,
              attribute_name: a.attribute_name,
              dataType: a.attribute_dropdown,
              include_in_thumbnail: a.include_in_thumbnail,
              value: a.description,
            });
          } else if (a.attribute_dropdown === 'Image' || a.attribute_dropdown === 'Qr') {
            att[a.type].push({
              order: a.order,
              attribute_name: a.attribute_name,
              dataType: a.attribute_dropdown,
              default: a.include_in_thumbnail,
            });
          } else {
            att[a.type].push({
              order: a.order,
              attribute_name: a.attribute_name,
              dataType: a.attribute_dropdown,
              include_in_thumbnail: a.include_in_thumbnail,
            });
          }
        }
        return att;
      }, Object.create(null));
    }

    !('attribute' in finalObj) && (finalObj.attribute = []);

    finalObj.autoSave = autoSaveFlag || false;
    finalObj.template_name = template_name || '';
    finalObj.template_type = template_type || '';
    finalObj.isAcceptanceDocument = isAcceptanceDocument || false;
    finalObj.templateId = _id;
    finalObj.thumbnail = thumbnail;

    if (finalObj.isAcceptanceDocument === true && acceptance_form !== '') {
      finalObj.acceptance_form = acceptance_form || '';
    }
    return finalObj;
  }

  handleSubmit = (values) => {
    const { autoSaveFlagCheck, autoSaveFlag } = this.state;
    const { attribute } = values;
    const { templateObj } = this.props;
    const { templateDetailsInfo } = templateObj;
    const { _id, acceptance_form } = templateDetailsInfo;

    let finalObj = {};
    if (attribute.length === 0) {
      toast.error('At least one attribute is required');
      this.setState({
        autoSaveFlag: !autoSaveFlag,
      });
    } else {
      finalObj = this.formateTemplateData(values);
      if (autoSaveFlagCheck === true) {
        if (finalObj.isAcceptanceDocument === true && !acceptance_form) {
          toast.error('Acceptance tik is required');
          this.setState({
            autoSaveFlag: !autoSaveFlag,
          });
        } else {
          autoSaveVar = true;
          const finalData = convertTemplateDataFromData(finalObj);
          this.props.autoSaveTemplate(finalData);
        }
        this.setState({
          autoSaveFlagCheck: false,
        });
      } else {
        if (finalObj.isAcceptanceDocument === true) {
          this.props.history.push('/selectAcceptanceTemp', { finalObj, editFlag: true });
        } else {
          const finalData = convertTemplateDataFromData(finalObj);
          this.props.editTemplate(finalData);
        }
      }
      autoSaveVar = false;
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    if (this.props.location.state && this.props.location.state.data) {
      const { data } = this.props.location.state;
      const { _id } = data;
      this.setState({
        templateId: _id,
      }, () => {
        this.props.detailsTemplateListInfo(_id);
      });
    } else {
      const { finalObj } = this.props.location.state;
      const { templateId } = finalObj;
      this.setState({
        templateId,
      }, () => {
        this.props.detailsTemplateListInfo(templateId);
      });
    }

    this.setState({
      checkDetailsLoader: true,
    });

    this.props.recentAttributeListInfo();
    this.props.errorClear();

    const { templateObj } = this.props;
    const { templateDetailsInfo } = templateObj;

    if (templateDetailsInfo !== null) {
      this.setState({
        autoSaveFlag: templateDetailsInfo.autoSave,
      });
    }
  }

  handleTabAttribute = (tab) => {
    if (tab === 'recent') {
      this.setState({
        recentAttributeFlag: true,
      });
    } else {
      this.setState({
        recentAttributeFlag: false,
      });
    }
  }

  inilitizeTempValue = (templateDetailsInfo) => {
    const {
      attribute, image, text,
    } = templateDetailsInfo;

    const finalAttribute = [];
    if (templateDetailsInfo !== null) {
      const result = _.unionBy(image, text, attribute);
      const temp2 = _.orderBy(result, ['_id'], ['asc']);

      templateDetailsInfo !== null && temp2.length > 0 && temp2.map((item) => {
        let typeAttribute = '';
        if (item.image_title) {
          typeAttribute = 'image';
        } else if (item.attribute_name) {
          typeAttribute = 'attribute';
        } else {
          typeAttribute = 'text';
        }
        finalAttribute.push({
          type: typeAttribute,
          attribute_name: item.attribute_name || item.image_title || item.title || '',
          attribute_dropdown: item.dataType || '',
          include_in_thumbnail: (item.dataType === 'Image' || item.dataType === 'Qr' ? item.default : item.include_in_thumbnail) || false,
          description: item.value || '',
        });
      });
    }

    return finalAttribute;
  }

  handleAutoSaveCheckbox = (checked) => {
    if (checked === true) {
      this.setState({
        checkAutoSave: checked,
        autoSaveFlag: checked,
        autoSaveFlagCheck: true,
      }, () => {
        this.setState({
          checkAutoSaveBtn: true,
        });
        this.buttonRef.current.click();
        // this.handleCheckboxAutoSave(checked);
      });
    }
  }

  handleCheckboxAutoSave = (checked) => {
    this.setState({
      autoSaveFlag: checked,
      autoSaveFlagCheck: true,
      autoSaveLoader: true,
    }, () => {
      if (checked === false) {
        this.setState({
          checkAutoSaveBtn: true,
        });
      }
      this.buttonRef.current.click();
    });
  }

  getFormData = (formData) => {
    const finalObj = this.formateTemplateData(formData);
    const finalData = convertTemplateDataFromData(finalObj);
    this.props.autoSaveTemplate(finalData);
  };

  render() {
    const {
      recentAttributeFlag, SuccessPopupFlag, checkDetailsLoader, autoSaveFlag, checkAutoSave, checkAutoSaveBtn,
    } = this.state;
    const { templateObj, location } = this.props;
    const { state } = location;
    const {
      recentAttribute, recentAttributeLoader, successPopup, templateDetailsInfo, detailsLoader, successLoader, autoSaveSuccess, autoSaveData
    } = templateObj;
    const finalAttributeValue = {};
    if (state && state.finalObj && state.selectTemp == true) {
      const {
        isAcceptanceDocument, template_name, template_type, thumbnail,
      } = state.finalObj;

      let temp1 = [];
      temp1 = this.inilitizeTempValue(state.finalObj);

      finalAttributeValue.template_name = template_name;
      finalAttributeValue.template_type = template_type;
      finalAttributeValue.isAcceptanceDocument = isAcceptanceDocument || false;
      finalAttributeValue.thumbnail = thumbnail || '';
      finalAttributeValue.attribute = temp1;
    } else if (templateDetailsInfo !== null) {
      const {
        isAcceptanceDocument, template_name, template_type, thumbnail,
      } = templateDetailsInfo;
      let temp1 = [];
      temp1 = this.inilitizeTempValue(templateDetailsInfo);
      finalAttributeValue.template_name = template_name;
      finalAttributeValue.template_type = template_type;
      finalAttributeValue.isAcceptanceDocument = isAcceptanceDocument || false;
      finalAttributeValue.thumbnail = thumbnail || '';
      finalAttributeValue.attribute = temp1;
    }
    let time = '';
    if (autoSaveData !== null || (templateDetailsInfo !== null && templateDetailsInfo.autoSave)) {
      if (autoSaveData === null) {
        time = moment(templateDetailsInfo.createdAt).fromNow();
      } else {
        time = moment(autoSaveData.createdAt).fromNow();
      }
    }
    return (
      <WithLayoutContainer>
        <div id="createTemp" className="wrapper wrapper-content createTemp">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox p-0">
                <div className="row">
                  <Formik
                    enableReinitialize={templateDetailsInfo !== null}
                    initialValues={finalAttributeValue}
                    validationSchema={createTemplateSchema}
                    onSubmit={this.handleSubmit}
                    render={({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched,
                      resetForm,
                    }) => (
                        <>
                          <FieldArray
                            name="attribute"
                            render={(arrayHelpers) => (
                              <>
                                <div id="createTemplateleft" className="col-xl-9 col-lg-8 col-sm-12 border-right py-4 pl-5">
                                  <div className="table-title d-flex justify-content-between align-items-center mb-4">
                                    <ul className="ks-cboxtags">
                                      <li>
                                        {autoSaveVar && <i className="fa fa-refresh fa-spin" />
                                          || (
                                            <>
                                              <input
                                                type="checkbox"
                                                id="checkboxOne"
                                                value=""
                                                onChange={(e) => this.handleCheckboxAutoSave(e.target.checked)}
                                                checked={autoSaveFlag === null ? templateDetailsInfo !== null && templateDetailsInfo.autoSave : autoSaveFlag}
                                              />
                                              <label htmlFor="checkboxOne">
                                                Auto Save
                                            </label>
                                            </>
                                          )}
                                      </li>
                                      {(autoSaveData !== null || (templateDetailsInfo !== null && templateDetailsInfo.autoSave)) &&
                                        <li>
                                          <span>Last saved {time}</span>
                                        </li>}
                                    </ul>
                                    <h2 className="f-b m-0">Edit Template </h2>

                                    <button
                                      type="submit"
                                      onClick={handleSubmit}
                                      className="btn-primary p-2 next mr-15 templateButton"
                                      disabled={successLoader}
                                      ref={this.buttonRef}
                                    >
                                      {successLoader ? <i className="fa fa-refresh fa-spin" /> : values.isAcceptanceDocument == false ? 'Submit' : 'Next'}
                                    </button>
                                  </div>

                                  {(detailsLoader && checkDetailsLoader === false) && <Loader /> || (
                                    <div className="fixHeight" style={{ minHeight: 'calc(100vh - 280px)', position: 'relative' }}>
                                      <Form>
                                        <ul className="slides">
                                          <StaticTemplate
                                            setFieldTouched={setFieldTouched}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            setFieldValue={setFieldValue}
                                            handleCheckboxAutoSave={this.handleCheckboxAutoSave}
                                            handleAutoSaveCheckbox={() => this.handleAutoSaveCheckbox}
                                            checkAutoSave={checkAutoSave}
                                            autoSaveFlag={autoSaveFlag}
                                            autoSaveData={autoSaveData}
                                            checkAutoSaveBtn={checkAutoSaveBtn}
                                          />
                                          <div>
                                            <DragAndDrop
                                              data={values.attribute}
                                              setFieldTouched={setFieldTouched}
                                              values={values}
                                              errors={errors}
                                              touched={touched}
                                              setFieldValue={setFieldValue}
                                              arrayHelpers={arrayHelpers}
                                              handleAutoSaveCheckbox={() => this.handleAutoSaveCheckbox}
                                              checkAutoSave={checkAutoSave}
                                              autoSaveFlag={autoSaveFlag}
                                              autoSaveData={autoSaveData}
                                              checkAutoSaveBtn={checkAutoSaveBtn}
                                            />
                                          </div>

                                        </ul>
                                      </Form>
                                    </div>
                                  )}
                                  <div className="dropup puls-drop show" ref={this.wrapperRef}>
                                    <a
                                      className="btn plus-btn f-24 text-center p-2"
                                      onClick={() => {
                                        arrayHelpers.push({
                                          type: 'attribute',
                                          attribute_name: '',
                                          attribute_dropdown: '',
                                          include_in_thumbnail: false,
                                          description: '',
                                        });
                                        this.setState({
                                          addFlag: false,
                                        });
                                      }}
                                    >
                                      {' '}
                                      <i className="fa fa-plus" />
                                    </a>
                                  </div>
                                </div>
                                <div id="editTemplateright" className="col-xl-3 col-lg-4 col-sm-12">
                                  <ul className="nav nav-pills my-3 flex-wrap justify-content-center" role="tablist">
                                    <li className="nav-item">
                                      <a className={`nav-link  ${recentAttributeFlag === true ? 'active' : ''}`} data-toggle="pill" role="tab" onClick={() => this.handleTabAttribute('recent')}>Recent Attributes</a>
                                    </li>
                                    <li className="nav-item">
                                      <a className={`nav-link  ${recentAttributeFlag === true ? '' : 'active'}`} data-toggle="pill" role="tab" onClick={() => this.handleTabAttribute('live')}>Live Preview</a>
                                    </li>
                                  </ul>
                                  <div className=" recent-attribute-main-container">
                                    <div>
                                      <div className="tab-content pr-3 br-6 mr-2" style={{ maxHeight: 'calc(100vh - 320px)', overflowY: 'auto' }}>
                                        {recentAttributeFlag === true
                                          ? (
                                            <RecentAttribute
                                              recentAttribute={recentAttributeFlag}
                                              recentAttributeLoader={recentAttributeLoader}
                                              attribute={recentAttribute.length > 0 ? recentAttribute : []}
                                              addRecentAttribute={(item) => {
                                                const a = {
                                                  type: 'attribute',
                                                  attribute_name: item.attribute_name || item.image_title || item.title,
                                                  attribute_dropdown: item.dataType,
                                                  include_in_thumbnail: item.include_in_thumbnail,
                                                  description: item.description,
                                                };
                                                arrayHelpers.push(a);
                                              }}
                                            />
                                          )
                                          : <LivePreview attribute={values.attribute} />}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          />
                        </>
                      )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {SuccessPopupFlag === true && successPopup
          ? <SuccessPopup msg={successPopup.msg} closePopup={this.successPopupClosePopup} history={this.props.history} />
          : null}
      </WithLayoutContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  templateObj: state.Template,
  error: state.Auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  recentAttributeListInfo: () => dispatch(actions.recentAttributeListInfo()),
  createTemplate: (data) => dispatch(actions.createTemplate(data)),
  detailsTemplateListInfo: (id) => dispatch(actions.detailsTemplateListInfo(id)),
  editTemplate: (data) => dispatch(actions.editTemplate(data)),
  autoSaveTemplate: (data) => dispatch(actions.autoSaveTemplate(data)),
  templateInitialization: () => dispatch(actions.templateInitialization()),
  errorClear: () => dispatch(actions.errorClear()),
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(EditTemlate);
