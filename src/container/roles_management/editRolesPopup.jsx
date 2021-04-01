/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React from "react";
import { Modal, TextInput, Checkbox, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import rolesSchema from "../../schema/rolesSchema.js";
import { formatCheckbox } from '../../helper/utility.js';
import { roleAccessMapper } from '../../constants/Mapper.js';


const EditRolesPopup = (props) => {

  const { closePopup, editData, roleObj } = props;
  const { successLoader } = roleObj;

  const { roleName, role, document, template, invoice, payment, _id } = editData;
  const roleList = formatCheckbox(role, document, template, invoice, payment)

  const handleSubmit = (values) => {
    console.log(values)

    let temp1 = values.roleCheckbox;
    let finalObj = {};
    let i = -1;

    Object.keys(roleAccessMapper).map((key) => {
      finalObj[key] = {}
      roleAccessMapper[key].forEach((permission) => {
        i = i + 1;
        finalObj[key][permission] = temp1[i]
      })
    })

    finalObj.roleName = values.roleName;
    finalObj.roleId = _id

    props.submitEditData(finalObj)
  }


  const clearForm = (resetForm) => {
    resetForm({values: {
      roleName: roleName,
      roleCheckbox:  [false, false, false, false, false, false, false, false, false, false, false, false, false]
    }});
    // resetForm()
  }

  return (
    <Modal closePopup={closePopup}>
      <Formik
        initialValues={{
          roleName: roleName || '',
          roleCheckbox: roleList,
        }}
        // enableReinitialize
        validationSchema={rolesSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          resetForm
        }) => {
          return (
            <>
              <div className="modal-body pt-0 plr-5 pb-5">
                <h4 className="modal-title text-center f-24 mb-5 f-b" id="nRoleTitle">Edit Role</h4>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Role Name</label>
                  <div className="col-sm-8">
                    <TextInput
                      type="text"
                      name="roleName"
                      id={""}
                      placeholder={"Enter Role Name"}
                      onChange={(value) =>
                        setFieldValue("roleName", value)
                      }
                      error={errors.roleName}
                      value={values.roleName}
                      showError={
                        touched.roleName && errors.roleName
                      }
                      onBlur={() =>
                        !touched.roleName &&
                        setFieldTouched("roleName", true, true)
                      }
                      disabled={true}
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Roles</label>
                  <div className="col-sm-8">
                    <form className="d-flex flex-wrap">

                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck1"
                        name="roleCheckbox"
                        label={'Create'}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }

                        checked={values.roleCheckbox[0]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.0", value);
                          value == true ? setFieldValue("roleCheckbox.3", true) : false
                        }}
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />

                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck2"
                        name="roleCheckbox"
                        label={'Delete'}

                        checked={values.roleCheckbox[1]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.1", value)
                          value == true ? setFieldValue("roleCheckbox.3", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }

                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck3"
                        name="roleCheckbox"
                        label={'Edit'}
                        checked={values.roleCheckbox[2]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.2", value)
                          value == true ? setFieldValue("roleCheckbox.3", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck4"
                        name="roleCheckbox"
                        label={'View'}
                        checked={values.roleCheckbox[3]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.3", value)
                        }}
                        disabled={
                          values.roleCheckbox[0] || values.roleCheckbox[1] || values.roleCheckbox[2] ? true : false
                        }
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                    </form>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Tik</label>
                  <div className="col-sm-8">
                    <form className="d-flex flex-wrap">

                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck5"
                        name="roleCheckbox"
                        label={'Create'}
                        checked={values.roleCheckbox[4]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.4", value)
                          value == true ? setFieldValue("roleCheckbox.6", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck6"
                        name="roleCheckbox"
                        label={'Update'}
                        checked={values.roleCheckbox[5]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.5", value)
                          value == true ? setFieldValue("roleCheckbox.6", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }

                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck7"
                        name="roleCheckbox"
                        label={'View'}
                        checked={values.roleCheckbox[6]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.6", value)
                        }}
                        disabled={
                          values.roleCheckbox[4] || values.roleCheckbox[5] ? true : false
                        }
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />

                    </form>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Templates</label>
                  <div className="col-sm-8">
                    <form className="d-flex flex-wrap">
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck8"
                        name="roleCheckbox"
                        label={'Create'}
                        checked={values.roleCheckbox[7]}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.7", value)
                          value == true ? setFieldValue("roleCheckbox.10", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }

                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck9"
                        name="roleCheckbox"
                        checked={values.roleCheckbox[8]}
                        label={'Delete'}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.8", value)
                          value == true ? setFieldValue("roleCheckbox.10", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck10"
                        name="roleCheckbox"
                        checked={values.roleCheckbox[9]}
                        label={'Edit'}
                        onChange={(value) => {

                          setFieldValue("roleCheckbox.9", value)
                          value == true ? setFieldValue("roleCheckbox.10", true) : false
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck11"
                        name="roleCheckbox"
                        checked={values.roleCheckbox[10]}
                        label={'View'}
                        onChange={(value) => {

                          setFieldValue("roleCheckbox.10", value)
                        }}
                        disabled={
                          values.roleCheckbox[7] || values.roleCheckbox[8] || values.roleCheckbox[9] ? true : false
                        }
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />

                    </form>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Invoice</label>
                  <div className="col-sm-8">
                    <form className="d-flex flex-wrap">
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck12"
                        name="roleCheckbox"
                        checked={values.roleCheckbox[11]}
                        label={'View'}
                        onChange={(value) => {

                          setFieldValue("roleCheckbox.11", value)
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />

                    </form>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Payment</label>
                  <div className="col-sm-8">
                    <form className="d-flex flex-wrap">
                      <Checkbox
                        parentClassName="form-check-inline"
                        type="checkbox"
                        id="customCheck13"
                        name="roleCheckbox"
                        checked={values.roleCheckbox[12]}
                        label={'Access'}
                        onChange={(value) => {
                          setFieldValue("roleCheckbox.12", value)
                        }}
                        error={errors.roleCheckbox}
                        showError={
                          touched.roleCheckbox && errors.roleCheckbox
                        }
                        onBlur={() =>
                          !touched.roleCheckbox &&
                          setFieldTouched("roleCheckbox", true, true)
                        }
                      />
                      <div className="formError"> {errors.roleCheckbox != null ? errors.roleCheckbox : null}</div>
                    </form>
                  </div>
                </div>

                <div className="d-flex">
                  <Button
                    type="button"
                    buttonText="Clear"
                    className="m-1 clear_button"
                    onClick={() => clearForm(resetForm)}
                  />
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : "Edit Role"}
                    className="m-1"
                  />

                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </Modal >
  );
}
export default EditRolesPopup;
