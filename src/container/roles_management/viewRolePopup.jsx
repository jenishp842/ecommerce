import React, { Component } from "react";
import { Modal, TextInput, Checkbox } from "../../component/index.jsx";
import { Formik } from "formik";
import { formatCheckbox } from '../../helper/utility.js';

export default class ViewRolesPopup extends Component {

  render() {
    const { closePopup, viewData } = this.props;
    const { roleName, role, document, template, invoice, payment } = viewData;
    const roleList = formatCheckbox(role, document, template, invoice, payment)

    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            roleName: roleName && roleName != null ? roleName : '',
            roleCheckbox: roleList,
          }}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
          }) => {
            return (
              <>
                <div className="modal-body pt-0 plr-5 pb-5">
                  <h4 className="modal-title text-center f-24 mb-5 f-b" id="nRoleTitle">View Role</h4>
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
                            const dataValue = value ? 'create' : null
                            setFieldValue("roleCheckbox.0", dataValue)
                          }}
                          disabled={true}
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
                            const dataValue = value ? 'Delete' : null
                            setFieldValue("roleCheckbox.1", dataValue)
                          }}
                          disabled={true}
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
                            const dataValue = value ? 'Edit' : null
                            setFieldValue("roleCheckbox.2", dataValue)
                          }}
                          disabled={true}
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
                            const dataValue = value ? 'View' : null
                            setFieldValue("roleCheckbox.3", dataValue)
                          }}
                          disabled={true}
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
                          disabled={true}
                          checked={values.roleCheckbox[4]}
                          onChange={(value) => {
                            const dataValue = value ? 'Create' : null
                            setFieldValue("roleCheckbox.4", dataValue)
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
                            const dataValue = value ? 'Update' : null
                            setFieldValue("roleCheckbox.5", dataValue)
                          }}
                          error={errors.roleCheckbox}
                          disabled={true}
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
                          disabled={true}
                          checked={values.roleCheckbox[6]}
                          onChange={(value) => {
                            const dataValue = value ? 'View' : null
                            setFieldValue("roleCheckbox.6", dataValue)
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Templates</label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck8"
                          name="roleCheckbox"
                          label={'Create'}
                          disabled={true}
                          checked={values.roleCheckbox[7]}
                          onChange={(value) => {
                            const dataValue = value ? 'Create' : null
                            setFieldValue("roleCheckbox.7", dataValue)
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
                          disabled={true}
                          onChange={(value) => {
                            const dataValue = value ? 'Delete' : null
                            setFieldValue("roleCheckbox.8", dataValue)
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
                          disabled={true}
                          onChange={(value) => {
                            const dataValue = value ? 'Edit' : null
                            setFieldValue("roleCheckbox.9", dataValue)
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
                          disabled={true}
                          label={'View'}
                          onChange={(value) => {
                            const dataValue = value ? 'View' : null
                            setFieldValue("roleCheckbox.10", dataValue)
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
                          disabled={true}
                          onChange={(value) => {
                            const dataValue = value ? 'View' : null
                            setFieldValue("roleCheckbox.11", dataValue)
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
                          disabled={true}
                          label={'Access'}
                          onChange={(value) => {
                            const dataValue = value ? 'Access' : null
                            setFieldValue("roleCheckbox.12", dataValue)
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
                  </div>
                </div>
              </>
            );
          }}
        </Formik>
      </Modal >
    );
  }
}
