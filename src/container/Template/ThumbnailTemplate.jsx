/* eslint-disable react/prop-types */
import React from 'react';
import {
  ErrorMessage, DropDown, TextInput, Checkbox,
} from '../../component/index.jsx';
import dlt from "../../assets/img/dlt.png";
import drag from "../../assets/img/drag.png";

const dataType = [
  { label: 'GenerateQr', value: 'generateQr' },
  { label: 'UploadImage', value: 'uploadImage' }];


const ThumbnailTemplate = (props) => {
  const {
    values, setFieldValue, index, deleteAttributeTemplate
  } = props;
  return (
    <div className="attribute-container-block">
      {values.attribute.length > 1 ? <a className="deleteTemplate"><img class="dlt" src={dlt} onClick={() => deleteAttributeTemplate(index)} /></a> : ''}
      <div className="org-border br-6 p-3 bg-white">
        <img className="mb-4 mx-auto d-block drag" src={drag} />
        <div className="row mb-3 ">
          <div className="col-lg-6 d-flex flex-wrap mb-3">
            <label className="f-16 f-b">Thumbnail Title</label>
            <TextInput
              type="text"
              placeholder="Enter Thumbnail Title"
              id=""
              placeholder="Enter Attribute Name"
              onChange={(value) => {
                setFieldValue(`attribute[${index}].attribute_name`, value)
              }}
              value={values.attribute[index].attribute_name}
              className="form-control h-40 f-16 f-m w-70"
            />
            <ErrorMessage name={`attribute[${index}].attribute_name`} />
          </div>

          <div className="col-lg-6 d-flex flex-wrap mb-3">
            <label className="f-16 f-b">Data Type</label>

            <DropDown
              options={dataType}
              onChange={(value) => {
                setFieldValue(`attribute[${index}].attribute_dropdown`, value)
              }}
              className="w-70"
              placeholder
              value={values.attribute[index].attribute_dropdown}
              name={`attribute[index].attribute_dropdown`}
            />
            <ErrorMessage name={`attribute[${index}].attribute_dropdown`} />
          </div>

        </div>

        <Checkbox
          parentClassName="custom-control custom-checkbox check-dipend"
          type="checkbox"
          name={`attribute[${index}].include_in_thumbnail`}
          id={`attribute[${index}].include_in_thumbnail`}
          label="Include in Thumbnail"
          checked={values.attribute[index].include_in_thumbnail}
          onChange={(value) => {
            setFieldValue(`attribute[${index}].include_in_thumbnail`, value);
          }}
        />
        {/* <ErrorMessage name={`attribute[${index}].include_in_thumbnail`} /> */}



      </div>
    </div>
  );
};
export default ThumbnailTemplate;