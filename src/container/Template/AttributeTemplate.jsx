/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import {
  TextInput, Checkbox, DropDown, ErrorMessage, TextArea
} from '../../component/index.jsx';
import dlt from "../../assets/img/dlt.png";
import drag from "../../assets/img/drag.png";

const attribute_dataType = [
  { label: 'Date', value: 'Date' },
  { label: 'String', value: 'String' },
  { label: 'Number', value: 'Number' },
  { label: 'Boolean', value: 'Boolean' },
  { label: 'Time', value: 'Time' },
  { label: 'Qr', value: 'Qr' },
  { label: 'Image', value: 'Image' },
  { label: 'Text', value: 'Text' },
];

const AttributeTemplate = (props) => {
  const {
    values, setFieldValue, index, deleteAttributeTemplate, handleAutoSaveCheckbox, checkAutoSave, checkAutoSaveBtn,
  } = props;

  useEffect(() => {
    if (values.template_type !== '' && values.template_name !== '' && values.attribute.length > 0 && checkAutoSave === false && checkAutoSaveBtn === false) {
      if (values.attribute[0].attribute_name !== '' && values.attribute[0].attribute_dropdown !== '') {
        handleAutoSaveCheckbox(true);
      }
    }
  }, [values.attribute]);

  return (
    <div className="attribute-container-block">
      {values.attribute.length > 1 ?
        <a className="deleteTemplate"><img class="dlt" src={dlt}
          onClick={() => {
            if (values.attribute[index].include_in_thumbnail === true) {
              if (values.attribute[index].attribute_dropdown === "Image") {
                let Images = values.attribute.filter(a =>
                  a.attribute_dropdown === 'Image')
                if (Images.length > 1) {
                  let first = false
                  values.attribute.forEach((at, i) => {
                    if (at.attribute_dropdown === 'Image' && i !== index) {
                      if (first === false) {
                        setFieldValue(`attribute[${i}].include_in_thumbnail`, true)
                        first = true
                      }
                    }
                  })
                }
              }
            }
            if (values.attribute[index].include_in_thumbnail === true) {
              if (values.attribute[index].attribute_dropdown === "Qr") {
                let Images = values.attribute.filter(a =>
                  a.attribute_dropdown === 'Qr')
                if (Images.length > 1) {
                  let first = false
                  values.attribute.forEach((at, i) => {
                    if (at.attribute_dropdown === 'Qr' && i !== index) {
                      if (first === false) {
                        setFieldValue(`attribute[${i}].include_in_thumbnail`, true)
                        first = true
                      }
                    }
                  })
                }
              }
            }
            deleteAttributeTemplate(index)
          }} /></a> : ''}
      <div className="org-border br-6 p-3 bg-white" key={index}>
        <img className="mb-4 mx-auto d-block drag" src={drag} />
        <div className="row mb-3 ">
          <div className="col-lg-6 d-flex flex-wrap mb-3">
            <label className="f-16 f-b">Attribute Name</label>
            <TextInput
              type="text"
              name={`attribute[${index}].attribute_name`}
              id=""
              placeholder="Enter Attribute Name"
              onChange={(value) => {
                setFieldValue(`attribute[${index}].attribute_name`, value);
              }}
              value={values.attribute[index].attribute_name}
              className="form-control h-40 f-16 f-m w-70"

            />
            <ErrorMessage name={`attribute[${index}].attribute_name`} />
          </div>
          <div className="col-lg-6 d-flex flex-wrap mb-3">
            <label className="f-16 f-b">Data Type</label>
            <DropDown
              options={attribute_dataType}
              onChange={(value) => {
                if (value !== 'Qr' || value !== 'Image') {
                  setFieldValue(`attribute[${index}].include_in_thumbnail`, false);
                }
                if (value === 'Image') {
                  let Images = values.attribute.filter(a => a.attribute_dropdown === 'Image');
                  if (Images.length < 1) {
                    setFieldValue(`attribute[${index}].include_in_thumbnail`, true);
                  } else {
                    setFieldValue(`attribute[${index}].include_in_thumbnail`, false);
                  }
                }
                if (value === 'Qr') {
                  let Qrs = values.attribute.filter(a => a.attribute_dropdown === 'Qr');
                  if (Qrs.length < 1) {
                    setFieldValue(`attribute[${index}].include_in_thumbnail`, true);
                  }
                }
                setFieldValue(`attribute[${index}].attribute_dropdown`, value);
              }}
              className="w-70"
              placeholder
              value={values.attribute[index].attribute_dropdown}
              name={`attribute[index].attribute_dropdown`}
            />
            <ErrorMessage name={`attribute[${index}].attribute_dropdown`} />
          </div>
          {values.attribute[index].attribute_dropdown === 'Text' ?
            <div className="col-lg-6 d-flex flex-wrap mb-3">
              <label className="f-16 f-b">Description</label>
              <div className="input-group w-70">
                <TextArea
                  id={`attribute[${index}].description`}
                  placeholder="Type here..."
                  onChange={(value) => {
                    setFieldValue(`attribute[${index}].description`, value)
                  }}
                  rows={3}
                  value={values.attribute[index].description}
                  name={`attribute[${index}].description`}
                />
                <ErrorMessage name={`attribute[${index}].description`} />
              </div>
            </div> : ''}
        </div>

        {values.attribute[index].attribute_name !== '' ?
          <Checkbox
            parentClassName="custom-control custom-checkbox check-dipend"
            type="checkbox"
            name={`attribute[${index}].include_in_thumbnail`}
            id={`attribute[${index}].include_in_thumbnail`}
            label={(values.attribute[index].attribute_dropdown === 'Image' || values.attribute[index].attribute_dropdown === 'Qr') ? "Set as Default" : 'Include in thumbnail'}
            checked={values.attribute[index].include_in_thumbnail}
            onChange={(value) => {
              let b = false
              if (value) {
                if (values.attribute[index].attribute_dropdown === 'Image') {
                  values.attribute.forEach((a, i) => {
                    if (a.attribute_dropdown === 'Image') {
                      setFieldValue(`attribute[${i}].include_in_thumbnail`, false)
                    }
                  })
                }
                if (values.attribute[index].attribute_dropdown === 'Qr') {
                  values.attribute.forEach((a, i) => {
                    if (a.attribute_dropdown === 'Qr') {
                      setFieldValue(`attribute[${i}].include_in_thumbnail`, false)
                    }
                  })
                }
              } else {
                if (values.attribute[index].attribute_dropdown === 'Image') {
                  let Images = values.attribute.filter(a =>
                    a.attribute_dropdown === 'Image' && a.include_in_thumbnail === true)
                  if (Images.length == 1) {
                    b = true
                    setFieldValue(`attribute[${index}].include_in_thumbnail`, !value);
                  }
                } if (values.attribute[index].attribute_dropdown === 'Qr') {
                  let Images = values.attribute.filter(a =>
                    a.attribute_dropdown === 'Qr' && a.include_in_thumbnail === true)
                  if (Images.length == 1) {
                    b = true
                    setFieldValue(`attribute[${index}].include_in_thumbnail`, !value);
                  }
                }

              }
              if (!b) {
                setFieldValue(`attribute[${index}].include_in_thumbnail`, value);
              }

            }}
          />
          : ''}
      </div>
    </div>
  );
};

export default AttributeTemplate;