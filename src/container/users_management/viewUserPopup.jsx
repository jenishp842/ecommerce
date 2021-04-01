/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Modal, TextInput, Checkbox, DropDown } from "../../component/index.jsx";
import { Formik } from "formik";
import userEditSchema from "../../schema/userEditSchema.js";
import { roleAccessMapper } from "../../constants/Mapper.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default class ViewUserPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      roleObject: [],
      submit: false,
      errormessage: "",
      error: "",
      mobileLength: "",
      mobile: "",
    }
  };

  componentDidMount() {
    const roleUser = [];
    this.props.roleList.map((e, i) => {
      let a = {};
      a.label = e.roleName;
      a.value = e._id
      roleUser.push(a)
    })
    this.setState({ roleObject: roleUser });

  }
  formateCheckboxList = (keyType, mapperKey, list) => {
    roleAccessMapper[mapperKey].forEach((key) => {
      list.push(keyType[key])
    })
  }

  formatCheckbox = (role, document, template, invoice, payment) => {


    let list = []

    this.formateCheckboxList(role, "role", list)
    this.formateCheckboxList(document, "document", list)
    this.formateCheckboxList(template, "template", list)
    this.formateCheckboxList(invoice, "invoice", list)
    this.formateCheckboxList(payment, "payment", list)

    return list
  }
  handleSubmit = (values) => {
    this.setState({
      submit: true,
    });
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
    let temp = {}

    temp.otherResponsibilities = finalObj;
    temp.firstName = values.name;
    temp.email = values.email;
    temp.mobileNumber = values.mobile;
    temp.role = values.roleUser;
    temp.userId = this.props.editData._id;

    this.props.submitUserEditData(temp);

  }

  clearForm = (resetForm) => {
    resetForm();
  }
  mobileHandler = (e, data) => {
    const dialCode = data.dialCode;

    const mobileLength = e.length - dialCode.length == 10;
    this.setState({ mobileLength: mobileLength, mobile: e });
    if (this.state.submit) {

      if (this.state.mobile == "") {
        this.setState({ errormessage: "fields required", error: true });
      } else if (mobileLength == false) {
        this.setState({
          errormessage: "number should be 10 digits",
          error: true,
        });
      } else {
        this.setState({ errormessage: "", error: false });
      }
    }
  };

  render() {
    const { closePopup, addPopupLoader, addPopup, viewData } = this.props;
    const { error, errormessage } = this.state
    const { firstName, lastName, email, otherResponsibilities, mobileNumber, _id } = viewData;

    const { document, invoice, payment, template, role } = otherResponsibilities;
    let roleList = this.formatCheckbox(role, document, template, invoice, payment)
    let newRoleList = [];

    roleList.forEach((element) => {
      if (element === "false") {
        newRoleList.push(undefined)
      } else {
        newRoleList.push(element);
      }
    })
    const { roleObject } = this.state
    if (addPopupLoader === false && addPopup !== undefined) {
      closePopup();
    }

    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            name: firstName && firstName != null ? `${firstName} ${lastName}` : '',
            email: email && email != null ? email : '',
            roleUser: _id,
            mobile: mobileNumber && mobileNumber != null ? mobileNumber : '',
            roleCheckbox: newRoleList,
            // tikCheckbox: [],
            // templatesCheckbox: [],
            // paymentCheckbox: [],
            // inVoiceCheckbox: [],
          }}
          enableReinitialize
          validationSchema={userEditSchema}
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
          }) => {

            return (
              <>
                <div className="modal-body pt-0 plr-5 pb-5">
                  <h4 className="modal-title text-center f-24 mb-5 f-b" id="nRoleTitle">View User</h4>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Name</label>
                    <div className="col-sm-8">
                      <TextInput
                        type="text"
                        name="name"
                        id={""}
                        placeholder={"Enter Role Name"}
                        onChange={(value) =>
                          setFieldValue("name", value)
                        }
                        disabled={true}
                        error={errors.name}
                        value={values.name}
                        showError={
                          touched.name && errors.name
                        }
                        onBlur={() =>
                          !touched.name &&
                          setFieldTouched("name", true, true)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Email</label>
                    <div className="col-sm-8">
                      <TextInput
                        type="text"
                        name="email"
                        id={""}
                        placeholder={"Enter Email"}
                        onChange={(value) =>
                          setFieldValue("email", value)
                        }
                        error={errors.email}
                        value={values.email}
                        showError={
                          touched.email && errors.email
                        }
                        disabled={true}
                        onBlur={() =>
                          !touched.email &&
                          setFieldTouched("email", true, true)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Mobile</label>
                    <div className="col-sm-8">
                      <PhoneInput
                        placeholder="Enter phone number"
                        value={values.mobile}
                        countryCodeEditable={false}
                        // onChange={(e) => setFieldValue('mobile', e)}
                        onChange={(e, data) => this.mobileHandler(e, data)}
                        country={"us"}
                        autoFormat={false}
                        enableAreaCodes={false}
                        // onlyCountries={["us"]}
                        containerStyle={{
                          marginBottom: "15px",
                          marginTop: "-7px",
                        }}

                        disabled={true}
                        inputStyle={{
                          border: "none",
                          // borderBottom: "0.5px solid rgba(0, 0, 0, 0.4)",
                          borderRadius: 5,
                          marginLeft: "10px",
                          width: "96%",
                          height: "50px",
                        }}
                      />
                      {error && (
                        <div className="input-feedback">{errormessage}</div>
                      )}
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Roles</label>
                    <div class="col-sm-8">
                      <div class="input-group">
                        <DropDown
                          options={roleObject}
                          onChange={(value) =>
                            setFieldValue("roleUser", value)
                          }
                          error={errors.roleUser}
                          value={values.roleUser}
                          showError={
                            touched.roleUser && errors.roleUser
                          }

                          disabled={true}
                          onBlur={() =>
                            !touched.roleUser &&
                            setFieldTouched("roleUser", true, true)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">Responsibilities</label>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Roles</label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">

                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck1"
                          name="roleCheckbox.0"
                          label={'Create'}
                          error={errors.roleCheckbox}
                          showError={
                            touched.roleCheckbox && errors.roleCheckbox
                          }
                          checked={values.roleCheckbox[0]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.0", value)
                            value == true ? setFieldValue("roleCheckbox.3", true) : false
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
                          name="roleCheckbox.1"
                          label={'Delete'}
                          checked={values.roleCheckbox[1]}
                          onChange={(value) => {

                            setFieldValue("roleCheckbox.1", value)
                            value == true ? setFieldValue("roleCheckbox.3", true) : false
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
                          name="roleCheckbox.2"
                          label={'Edit'}
                          checked={values.roleCheckbox[2]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.2", value)
                            value == true ? setFieldValue("roleCheckbox.3", true) : false
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
                          name="roleCheckbox.3"
                          label={'View'}
                          checked={values.roleCheckbox[3]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.3", value)
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
                          name="roleCheckbox.4"
                          label={'Create'}
                          checked={values.roleCheckbox[4]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.4", value)
                            value == true ? setFieldValue("roleCheckbox.6", true) : false
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
                          id="customCheck6"
                          name="roleCheckbox.5"
                          label={'Update'}
                          checked={values.roleCheckbox[5]}
                          disabled={true}
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
                          name="roleCheckbox.6"
                          label={'View'}
                          checked={values.roleCheckbox[6]}
                          disabled={
                            values.roleCheckbox[4] || values.roleCheckbox[5] ? true : false
                          }
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.6", value)
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Templates</label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck8"
                          name="roleCheckbox.7"
                          label={'Create'}
                          checked={values.roleCheckbox[7]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.7", value)
                            value == true ? setFieldValue("roleCheckbox.10", true) : false
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
                          id="customCheck9"
                          name="roleCheckbox.8"
                          checked={values.roleCheckbox[8]}
                          label={'Delete'}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.8", value)
                            value == true ? setFieldValue("roleCheckbox.10", true) : false
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
                          id="customCheck10"
                          name="roleCheckbox.9"
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
                          disabled={true}
                          onBlur={() =>
                            !touched.roleCheckbox &&
                            setFieldTouched("roleCheckbox", true, true)
                          }
                        />
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck11"
                          name="roleCheckbox.10"
                          checked={values.roleCheckbox[10]}
                          label={'View'}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.10", value)
                          }}
                          disabled={
                            values.roleCheckbox[7] || values.roleCheckbox[8] || values.roleCheckbox[9] ? true : false
                          }
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">Invoice</label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck12"
                          name="roleCheckbox.11"
                          checked={values.roleCheckbox[11]}
                          label={'View'}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.11", value)
                          }}
                          error={errors.roleCheckbox}
                          showError={
                            touched.roleCheckbox && errors.roleCheckbox
                          }
                          disabled={true}
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
                          name="roleCheckbox.12"
                          checked={values.roleCheckbox[12]}
                          label={'Access'}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.12", value)
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

                        <div className="formError"> {errors.roleCheckbox != null ? errors.roleCheckbox : null}</div>

                      </form>
                    </div>
                  </div>

                </div>
              </>
            );
          }}
        </Formik>
      </Modal>
    );
  }
}
