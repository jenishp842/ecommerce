/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import {
  DropDown, AddTagForm,
} from './index.jsx';
import { Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Multiselect } from 'multiselect-react-dropdown';
import moment from 'moment';
import { toast } from 'react-toastify';
import { staticLabel } from '../constants/Constants.js';
import 'react-tagsinput/react-tagsinput.css';
import cal from "../assets/img/cal.png";

let initialValues = {};
const style = {
  inputField: {
    borderColor: 'black',
    borderWidth: '1px',
    border: '1px solid #fff',
    borderRadius: '6px',
  },
  chips: {
    background: '#9f9a9a',
    boxShadow: '1px 1px 6px #ddd',
  },
  optionContainer: {
    background: '##f5f0f0',
  },
  option: {
    background: 'none',
    color: 'black',
    borderBottomWidth: '1px',
    borderColor: 'black',
  },
};

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };

    this.multiFromSearch = React.createRef();
    this.multiToSearch = React.createRef();
    this.addTag = React.createRef();
  }

  clearForm = (resetForm) => {
    resetForm();
    this.multiFromSearch.current.resetSelectedValues();
    this.multiToSearch.current.resetSelectedValues();

    const data = this.multiFromSearch.current;
    const data1 = this.multiToSearch.current;
    const data2 = this.addTag.current;
    data.state.inputValue = '';
    data1.state.inputValue = '';
    data2.state.tag = '';

    document.getElementsByClassName('react-tagsinput-input')[0].value = '';
    document.getElementsByClassName('react-tagsinput-input')[0].defaultValue = '';
    this.props.clearAdvanceSearchValue();
  };

  handleSubmit = (values) => {
    const { advanceSearch } = this.props;
    const {
      status, category, createDateFrom, createDateTo, template, from, to, tags,
    } = values;

    if (status !== '' || category !== '' || createDateFrom !== '' || createDateTo !== '' || template !== '' || from.length > 0 || to.length > 0 || tags.length > 0) {
      const fromData = [];
      const toData = [];

      from && from.map((item) => fromData.push(item.id));
      to && to.map((item) => toData.push(item.id));

      const finalObj = {};

      finalObj.status = status || '';
      finalObj.category = category || '';
      finalObj.createDateFrom = createDateFrom && moment(createDateFrom).format('MM-DD-YYYY') || '';
      finalObj.createDateTo = createDateTo && moment(createDateTo).format('MM-DD-YYYY') || '';
      finalObj.template = template || '';
      finalObj.form = fromData || '';
      finalObj.to = toData || '';
      finalObj.tag = tags || '';
      advanceSearch(finalObj, values);
    } else {
      toast.error('at least one field required!');
    }
  };

  render() {
    const { search } = staticLabel;
    const {
      toReceiverData, templateList, fromProviderData, advanceSearchValue,
    } = this.props;
    const {
      labelStatus, labelTags, labelFrom, labelTo, labelCreationDate, labelTemplate, status, category, labelCategory,
    } = search;
    const templateData = templateList.length > 0 && templateList.map((item) => ({ label: item.template_name, value: item._id }));

    const fromData = [];
    const toData = [];
    if (advanceSearchValue !== '') {
      const { form, to } = advanceSearchValue;
      if (form !== '' && form.length > 0) {
        fromProviderData.map((item) => {
          form.map((id) => {
            if (item._id === id) {
              fromData.push({ name: item.email, id: item._id });
            }
          });
        });
      }
      if (to !== '' && to.length > 0) {
        toReceiverData.map((item) => {
          to.map((id) => {
            if (item._id === id) {
              toData.push({ name: item.email, id: item._id });
            }
          });
        });
      }

      initialValues = {
        status: advanceSearchValue.status !== '' ? advanceSearchValue.status : '',
        category: advanceSearchValue.category !== '' ? advanceSearchValue.category : '',
        from: advanceSearchValue.form.length > 0 ? fromData : '',
        to: advanceSearchValue.to.length > 0 ? toData : '',
        createDateFrom: advanceSearchValue.createDateFrom !== '' ? new Date(advanceSearchValue.createDateFrom) : '',
        createDateTo: advanceSearchValue.createDateTo !== '' ? new Date(advanceSearchValue.createDateTo) : '',
        template: advanceSearchValue.template !== '' ? advanceSearchValue.template : '',
        tags: advanceSearchValue.tag.length > 0 ? advanceSearchValue.tag : [],
      };

    } else {
      initialValues = {
        status: '',
        category: '',
        from: '',
        to: '',
        createDateFrom: '',
        createDateTo: '',
        template: '',
        tags: [],
      };
    }
    console.log(toReceiverData,fromProviderData)
    return (
      <div className="searchDrop dropdown-menu p-3 show" aria-labelledby="searchDrop">
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            resetForm,
          }) => (
              <>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelStatus}</label>
                  <div className="col-sm-9">
                    <DropDown
                      options={status}
                      onChange={(value) => setFieldValue('status', value)}
                      placeholder
                      placeholderText="Select Status / Type"
                      error={errors.status}
                      value={values.status}
                      showError={
                        touched.status && errors.status
                      }
                      onBlur={() => !touched.status
                        && setFieldTouched('status', true, true)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelCategory}</label>
                  <div className="col-sm-9">
                    <DropDown
                      options={category}
                      onChange={(value) => setFieldValue('category', value)}
                      placeholder
                      error={errors.category}
                      value={values.category}
                      showError={
                        touched.category && errors.category
                      }
                      onBlur={() => !touched.category
                        && setFieldTouched('category', true, true)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelTags}</label>
                  <div className="col-sm-9">
                    <AddTagForm
                      ref={this.addTag}
                      advanceSearchValue={advanceSearchValue}
                      onChangeTag={(tags) => {
                        setFieldValue('tags', tags);
                      }}
                      tags={values.tags}
                      addTagLabel="Add Tag"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="from" className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelFrom}</label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <Multiselect
                        options={fromProviderData && fromProviderData.map((e, i) => ({ name: e.email, id: e._id }))}
                        // options={toReceiverData && toReceiverData.map((e, i) => ({ name: e.email, id: e._id }))}

                        selectedValues={values.from}
                        onSelect={(selectedList) => {
                          setFieldValue('from', selectedList);
                        }}
                        onRemove={(selectedList) => {
                          setFieldValue('from', selectedList);
                        }}
                        displayValue="name"
                        placeholder="Enter From"
                        style={style}
                        error={errors.from}
                        closeIcon="cancel"
                        ref={this.multiFromSearch}
                      />
                      <div className="formError">
                        {' '}
                        {errors.from ? errors.from : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="to" className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelTo}</label>
                  <div className="col-sm-9">
                    <div className="input-group">
                      <Multiselect
                        options={toReceiverData && toReceiverData.map((e, i) => ({ name: e.email, id: e._id }))}
                        selectedValues={values.to}
                        onSelect={(selectedList) => {
                          setFieldValue('to', selectedList);
                        }}
                        onRemove={(selectedList) => {
                          setFieldValue('to', selectedList);
                        }}
                        displayValue="name"
                        placeholder="Enter To"
                        style={style}
                        error={errors.to}
                        closeIcon="cancel"
                        ref={this.multiToSearch}
                      />
                      <div className="formError">
                        {' '}
                        {errors.to ? errors.to : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor className="col-sm-3 col-form-labe justify-content-start f-18 f-m">{labelCreationDate}</label>
                  <div className="col-sm-9 dateinput d-flex align-items-center">
                    <DatePicker
                      value={values.createDateFrom}
                      onChange={(value) => {
                        setFieldValue('createDateFrom', value);
                        setFieldValue('createDateTo', new Date());
                      }}
                      dateFormat="dd-MM-yyyy"
                      className="text-center dull py-1 px-2 f-14 f-m form-control w-100 datetimepicker2"
                      selected={values.createDateFrom}
                      maxDate={new Date()}
                      placeholderText="DD/MM/YYYY"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <label>
                      <button className="border-0 mr-1 event-none" disabled>
                        <img src={cal} />
                      </button>
                    </label>
                    <h3 className="mr-2 ml-2">To</h3>
                    <DatePicker
                      value={values.createDateTo}
                      onChange={(value) => setFieldValue('createDateTo', value)}
                      placeholderText="DD/MM/YYYY"
                      dateFormat="dd-MM-yyyy"
                      className="text-center dull py-1 px-2 f-14 f-m form-control w-100 datetimepicker2"
                      selected={values.createDateTo}
                      minDate={values.createDateFrom}
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                    />
                    <label>
                      <button className="border-0 mr-1 event-none" disabled>
                        <img src={cal} />
                      </button>
                    </label>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="Template" className="col-sm-3 col-form-label justify-content-start f-18 f-m">{labelTemplate}</label>
                  <div className="col-sm-9">
                    <DropDown
                      options={templateData && templateData}
                      onChange={(value) => setFieldValue('template', value)}
                      placeholder
                      error={errors.template}
                      value={values.template}
                      showError={
                        touched.template && errors.template
                      }
                      onBlur={() => !touched.template
                        && setFieldTouched('template', true, true)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <button
                    type="button"
                    onClick={() => this.clearForm(resetForm)}
                    className="btn btn-border ml-3 mr-2 flex-fill f-18 f-b "
                  >
                    Clear
                </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btn btn-org mr-3 ml-2 flex-fill f-18 f-b "
                  >
                    Search
                </button>
                </div>
              </>
            )}
        </Formik>
      </div>
    );
  }
}

export default SearchForm;
