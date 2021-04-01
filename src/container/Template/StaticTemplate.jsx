/* eslint-disable react/prop-types */
import React from 'react';
import {
  TextInput, Checkbox, Button, DropDown,
} from '../../component/index.jsx';
import { imageMapperTemplate } from '../../constants/Mapper.js';

const templateType = [
  { label: 'Acceptance Tik', value: 'Acceptance Tik' },
  { label: 'e-Certificate', value: 'e-Certificate' },
  { label: 'e-Achievement', value: 'e-Achievement' },
  { label: 'e-Privilege', value: 'e-Privilege' },
  { label: 'e-Ticket', value: 'e-Ticket' },
  { label: 'e-Membership', value: 'e-Membership' },
  { label: 'e-Prescription', value: 'e-Prescription' },
  { label: 'e-Receipt', value: 'e-Receipt' },
  { label: 'e-Note', value: 'e-Note' },
  { label: 'e-Diploma', value: 'e-Diploma' },
  { label: 'e-Transcript', value: 'e-Transcript' },
  { label: 'e-Permit', value: 'e-Permit' },
  { label: 'e-License', value: 'e-License' },
]

const StaticTemplate = (props) => {
  const {
    setFieldTouched, values, errors, touched, setFieldValue, handleAutoSaveCheckbox, checkAutoSave, checkAutoSaveBtn,
  } = props;

  return (

    <li class="slide slide1">
      <div class="org-border br-6 p-3 bg-white">
        <div className="row mb-3">
          <div className="col-lg-6 d-flex flex-wrap">
            <label className="f-16 f-b">Template Name</label>
            <TextInput
              type="text"
              name={values.template_name}
              id=""
              placeholder="Enter Template Name"
              onChange={(value) => {
                setFieldValue('template_name', value);

                if (values.template_type !== '' && values.template_name !== '' && values.attribute.length > 0 && checkAutoSave === false && checkAutoSaveBtn === false) {
                  handleAutoSaveCheckbox(true);
                }
              }}

              error={errors.template_name}
              value={values.template_name}
              showError={
                touched.template_name && errors.template_name
              }
              className=" h-40 f-16 f-m w-70 mb-3"
              onBlur={() => !touched.template_name
                && setFieldTouched('template_name', true, true)}
            />
          </div>
          {/* <div className="col mt-4">
            <Button
              type="submit"
              buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : values.isAcceptanceDocument == false ? 'Submit' : 'Next'}
              className="m-2 btn btn-primary p-2 next w-75"
            />

          </div> */}
        </div>
        <div className="row mb-3 ">
          <div className="col-lg-6 d-flex flex-wrap">
            <label className="f-16 f-b">Template Type</label>
            <DropDown
              options={templateType}
              onChange={(value) => {
                if (value === 'Acceptance Tik') {
                  setFieldValue('isAcceptanceDocument', false);
                }
                setFieldValue('template_type', value);
                if (values.template_type !== '' && values.template_name !== '' && values.attribute && values.attribute.length > 0 && checkAutoSave === false && checkAutoSaveBtn === false) {
                  handleAutoSaveCheckbox(true);
                }
              }}
              placeholder
              error={errors.template_type}
              value={values.template_type}
              showError={
                touched.template_type && errors.template_type
              }
              className="w-70"
              onBlur={() => !touched.template_type
                && setFieldTouched('template_type', true, true)}
            />
          </div>
          <div class="col next-margin d-flex">

            <form class="form-group d-inline-block">
              <div class="custom-file edit-thum">
                <img class="img-fluid image-circle tempLogo mr-3 temp-Image" src={imageMapperTemplate[values.template_type]} />
                {/* <input
                  type="file"
                  className="custom-file-input-temp"
                  error={errors.thumbnail}
                  accept="image/png,image/jpg,image/jpeg"
                  onChange={(e) => {
                    setFieldValue('thumbnail', e.target.files[0].name)
                    }
                  }
                  showError={
                    touched.thumbnail && errors.thumbnail
                  }
                  onBlur={() => !touched.thumbnail
                    && setFieldTouched('thumbnail', true, true)}
                /> */}
                {/* <div>{values.thumbnail ? values.thumbnail : ''}</div> */}
                {/* <label class="custom-file-label f-m" for=""></label> */}
              </div>
            </form>
          </div>
        </div>

        {values.template_type !== 'Acceptance Tik' ?
          <Checkbox
            parentClassName="custom-control custom-checkbox check-dipend"
            type="checkbox"
            id="isAcceptanceDocument"
            name="isAcceptanceDocument"
            label="Required acceptance"
            checked={values.isAcceptanceDocument}
            onChange={(value) => {
              setFieldValue('isAcceptanceDocument', value);
            }}
          /> : ''}
      </div>
    </li>
  );
};


export default StaticTemplate;
