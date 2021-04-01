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
import moment from 'moment';
import {
  WithLayoutContainer,
  SuccessPopup,
  Button,
} from '../../component/index.jsx';
import DragAndDrop from './DragDrop.jsx';
import StaticTemplate from './StaticTemplate.jsx';
import createTemplateSchema from '../../schema/createTemplateSchema.js';
import RecentAttribute from './RecentAttribute.jsx';
import * as actions from '../../actions';
import LivePreview from './LivePreview.jsx';
import { convertTemplateDataFromData } from '../../helper/utility.js';

let interval = '';
let checkInternal = false;
let autoSaveVar = false;
class AddTemplate extends Component {
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
      autoSaveFlag: false,
      formData: '',
      checkDetailsLoader: false,
      autoSaveFlagCheck: false,
      checkAutoSave: false,
      checkAutoSaveBtn: false,
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.buttonRef = React.createRef();
    this.getFormData = this.getFormData.bind(this);
  }

  componentDidUpdate(prevState, prevProps) {
    const { templateObj } = this.props;
    const {
      templateUpdate, autoSaveSuccess, autoSaveData,
    } = templateObj;
    const { autoSaveFlag } = this.state;
    if (this.props !== prevProps) {
      if (templateUpdate === true) {
        this.props.history.push('template');
      }
      if (templateObj !== '' && autoSaveData !== null) {
        if (autoSaveData.autoSave === true && checkInternal === false) {
          interval = setInterval(() => {
            this.setState({
              autoSaveFlagCheck: true,
            }, () => {
              this.buttonRef.current.click();
            });
          }, 60000);
          checkInternal = true;
        } else if ((autoSaveData.autoSave === false || autoSaveData.autoSave === undefined) && checkInternal === true) {
          clearInterval(interval);
          checkInternal = false;
          this.setState({
            autoSaveFlagCheck: false,
          });
          // eslint-disable-next-line no-empty
        } else { }
      }

      if (autoSaveSuccess === true) {
        this.props.getTemplateListInfo({ search: '' });
        // this.props.templateInitialization();
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
      autoSaveData: {},
    });
    document.removeEventListener('mousedown', this.handleClickOutside);
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
    const { autoSaveData } = templateObj;
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
    finalObj.thumbnail = thumbnail || '';

    if (autoSaveData !== null) {
      finalObj.templateId = autoSaveData._id || '';
    }
    // if (finalObj.isAcceptanceDocument === true) {
    //   finalObj.acceptance_form = acceptance_form || '';
    // }
    return finalObj;
  }

  handleSubmit = (values) => {
    const { autoSaveFlagCheck, autoSaveFlag } = this.state;
    const { attribute } = values;
    let finalObj = {};
    if (attribute.length === 0) {
      toast.error('At least one attribute is required');
      this.setState({
        autoSaveFlag: !autoSaveFlag,
      });
    } else {
      finalObj = this.formateTemplateData(values);
      if (autoSaveFlagCheck === true) {
        if (finalObj.isAcceptanceDocument === true && finalObj.template_type !== 'Acceptance Tik') {
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
      } else if (finalObj.isAcceptanceDocument === true && finalObj.template_type !== 'Acceptance Tik') {
        this.props.history.push('/selectAcceptanceTemp', { finalObj, editFlag: false });
      } else {
        const finalData = convertTemplateDataFromData(finalObj);
        this.props.createTemplate(finalData);
      }
    }
    autoSaveVar = false;
  }

  componentDidMount() {
    this.props.recentAttributeListInfo();
    document.addEventListener('mousedown', this.handleClickOutside);
    this.props.errorClear();
  }

  addFlag = () => {
    const { addFlag } = this.state;
    this.setState({
      addFlag: !addFlag,
    });
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
          include_in_thumbnail: item.include_in_thumbnail || false,
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
      }, () => {
        checkInternal = true;
        this.handleCheckboxAutoSave(checked);
      });
    }
  }

  handleCheckboxAutoSave = (checked) => {
    this.setState({
      autoSaveFlag: checked,
      autoSaveFlagCheck: true,
      autoSaveLoader: true,
    }, () => {
      this.buttonRef.current.click();
      if (checked === false) {
        this.setState({
          checkAutoSaveBtn: true,
        });
      }
    });
  }

  getFormData = (formData) => {
    const { templateObj } = this.props;
    const finalObj = this.formateTemplateData(formData);
    const finalData = convertTemplateDataFromData(finalObj);

    this.props.autoSaveTemplate(finalData);
  };

  render() {
    const {
      recentAttributeFlag, SuccessPopupFlag, autoSaveFlag, checkAutoSave, checkAutoSaveBtn,
    } = this.state;
    const { templateObj, location } = this.props;
    const {
      recentAttribute, recentAttributeLoader, successPopup, successLoader, templateDetailsInfo, autoSaveData,
    } = templateObj;

    const initialValuesData = {};
    const { state } = location;
    if (state) {
      const { finalObj } = state;
      const finalObjData = this.inilitizeTempValue(finalObj);
      const {
        isAcceptanceDocument, template_name, template_type, thumbnail,
      } = finalObj;

      initialValuesData.template_name = template_name;
      initialValuesData.template_type = template_type;
      initialValuesData.isAcceptanceDocument = isAcceptanceDocument;
      initialValuesData.thumbnail = thumbnail || '';
      initialValuesData.attribute = finalObjData;
    } else {
      initialValuesData.template_name = '';
      initialValuesData.template_type = '';
      initialValuesData.isAcceptanceDocument = false;
      initialValuesData.thumbnail = '';
      initialValuesData.attribute = [];
    }
    const time = autoSaveData !== null && moment(autoSaveData.createdAt).fromNow();
    return (
      <WithLayoutContainer>
        <div id="createTemp" className="wrapper wrapper-content createTemp">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox p-0">
                <div className="row">
                  <Formik
                    initialValues={initialValuesData}
                    validationSchema={createTemplateSchema}
                    onSubmit={this.handleSubmit}
                    render={({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched,
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
                                                checked={autoSaveData === null ? false : autoSaveFlag}
                                              />
                                              <label htmlFor="checkboxOne">Auto Save</label>
                                            </>
                                          )}
                                      </li>
                                      {autoSaveData !== null
                                        && (
                                          <li>
                                            <span>
                                              Last saved {""}
                                            {time}
                                            </span>
                                          </li>
                                        )}
                                    </ul>
                                    <h2 className="f-b m-0">Create Template</h2>
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
                                  <div className="fixHeight" style={{ minHeight: 'calc(100vh - 280px)', position: 'relative' }}>
                                    <Form>
                                      <ul className="slides">
                                        <StaticTemplate
                                          setFieldTouched={setFieldTouched}
                                          values={values}
                                          errors={errors}
                                          touched={touched}
                                          setFieldValue={setFieldValue}
                                          successLoader={successLoader}
                                          handleCheckboxAutoSave={this.handleCheckboxAutoSave}
                                          handleAutoSaveCheckbox={this.handleAutoSaveCheckbox}
                                          checkAutoSave={checkAutoSave}
                                          autoSaveFlag={autoSaveFlag}
                                          autoSaveData={autoSaveData}
                                          checkAutoSaveBtn={checkAutoSaveBtn}
                                          checkInternal={checkInternal}
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
                                            handleAutoSaveCheckbox={this.handleAutoSaveCheckbox}
                                            checkAutoSave={checkAutoSave}
                                            autoSaveFlag={autoSaveFlag}
                                            autoSaveData={autoSaveData}
                                            checkAutoSaveBtn={checkAutoSaveBtn}
                                            checkInternal={checkInternal}
                                          />
                                        </div>
                                      </ul>
                                    </Form>
                                  </div>
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
                                <div id="createTemplateright" className="col-xl-3 col-lg-4 col-sm-12">
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
  template: state.Profile.template,
  error: state.Auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  recentAttributeListInfo: () => dispatch(actions.recentAttributeListInfo()),
  createTemplate: (data) => dispatch(actions.createTemplate(data)),
  templateInitialization: () => dispatch(actions.templateInitialization()),
  errorClear: () => dispatch(actions.errorClear()),
  autoSaveTemplate: (data) => dispatch(actions.autoSaveTemplate(data)),
  getTemplateListInfo: (payload) => dispatch(actions.getTemplateListInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddTemplate);
