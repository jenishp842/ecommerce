/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
  Modal,
  TextInput,
  Checkbox,
  Button,
  DropDown,
} from "../../component/index.jsx";
import { Formik } from "formik";
import userSchema from "../../schema/userSchema.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { roleAccessMapper } from '../../constants/Mapper.js';

export default class AddUserPopup extends Component {
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
    };
  }

  componentDidMount() {
    const roleUser = [];
    this.props.roleList.map((e, i) => {
      let a = {};
      a.label = e.roleName;
      a.value = e._id;
      roleUser.push(a);
    });
    this.setState({ roleObject: roleUser });
  }

  handleAddSubmit = (values) => {
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
    let finalMainObj = {};

    // let temp1 = values.roleCheckbox;
    // let a = temp1.splice(0, 4);
    // let b = temp1.splice(0, 3);
    // let c = temp1.splice(0, 4);
    // let d = temp1.splice(0, 1);
    // let e = temp1.splice(0, 1);



    // let role = {
    //   create: "false",
    //   update: "false",
    //   delete: "false",
    //   view: "false",
    // };
    // let document = {
    //   create: "false",
    //   update: "false",
    //   view: "false",
    // };
    // let template = {
    //   create: "false",
    //   update: "false",
    //   delete: "false",
    //   view: "false",
    // };
    // let invoice = {
    //   view: "false",
    // };
    // let payment = {
    //   access: "false",
    // };

    // a.forEach(function (data) {
    //   if (data) {
    //     role[data] = "true";
    //   }
    // });
    // b.forEach(function (data) {
    //   if (data) {
    //     document[data] = "true";
    //   }
    // });

    // c.forEach(function (data) {
    //   if (data) {
    //     template[data] = "true";
    //   }
    // });

    // d.forEach(function (data) {
    //   if (data) {
    //     invoice[data] = "true";
    //   }
    // });

    // e.forEach(function (data) {
    //   if (data) {
    //     payment[data] = "true";
    //   }
    // });



    finalMainObj.otherResponsibilities = {};
    finalMainObj.otherResponsibilities.role = finalObj.role;
    finalMainObj.otherResponsibilities.document = finalObj.document;
    finalMainObj.otherResponsibilities.template = finalObj.template;
    finalMainObj.otherResponsibilities.invoice = finalObj.invoice;
    finalMainObj.otherResponsibilities.payment = finalObj.payment;
    finalMainObj.name = values.name;
    finalMainObj.email = values.email;
    finalMainObj.mobileNumber = `+${this.state.mobile}`;
    finalMainObj.role = values.roleUser;

    if (this.state.mobile == "") {
      this.setState({ errormessage: "fields required", error: true });
    } else if (!this.state.mobileLength) {
      this.setState({ errormessage: "number should be 10 digit", error: true });
    } else {
      this.setState({ errormessage: "", error: false });
      this.props.submitUserData(finalMainObj);
    }
  };

  clearForm = (resetForm) => {
    resetForm();
  };

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
    const { closePopup, addPopupLoader, addPopup } = this.props;
    const { roleObject, error, errormessage } = this.state;
    if (addPopupLoader === false && addPopup !== undefined) {
      closePopup();
    }
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            roleUser: "",
            // mobile: '',
            roleCheckbox:
              [false, false, false, false, false, false, false, false, false, false, false, false, false],
            tikCheckbox: [],
            templatesCheckbox: [],
            paymentCheckbox: [],
            inVoiceCheckbox: [],
          }}
          enableReinitialize
          validationSchema={userSchema}
          onSubmit={this.handleAddSubmit}
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
                  <h4
                    className="modal-title text-center f-24 mb-5 f-b"
                    id="nRoleTitle"
                  >
                    Create User
                  </h4>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Name
                    </label>
                    <div className="col-sm-8">
                      <TextInput
                        type="text"
                        name="name"
                        id={""}
                        placeholder={"Enter Name"}
                        onChange={(value) => setFieldValue("name", value)}
                        error={errors.name}
                        value={values.name}
                        showError={touched.name && errors.name}
                        onBlur={() =>
                          !touched.name && setFieldTouched("name", true, true)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Email
                    </label>
                    <div className="col-sm-8">
                      <TextInput
                        type="text"
                        name="email"
                        id={""}
                        placeholder={"Enter Email"}
                        onChange={(value) => setFieldValue("email", value)}
                        error={errors.email}
                        value={values.email}
                        showError={touched.email && errors.email}
                        onBlur={() =>
                          !touched.email && setFieldTouched("email", true, true)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Mobile
                    </label>
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
                    <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Roles
                    </label>
                    <div class="col-sm-8">
                      <div class="input-group">
                        <DropDown
                          options={roleObject}
                          onChange={(value) => setFieldValue("roleUser", value)}
                          error={errors.roleUser}
                          value={values.roleUser}
                          placeholder={true}
                          showError={touched.roleUser && errors.roleUser}
                          name={"roleUser"}
                          onBlur={() =>
                            !touched.roleUser &&
                            setFieldTouched("roleUser", true, true)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label class="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Responsibilities
                    </label>
                  </div>
                  <div className="form-group row align-items-center">
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Roles
                    </label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck1"
                          name="roleCheckbox"
                          label={"Create"}
                          error={errors.roleCheckbox}
                          showError={
                            touched.roleCheckbox && errors.roleCheckbox
                          }
                          checked={values.roleCheckbox[0]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.0", value)
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
                          label={"Delete"}
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
                          label={"Edit"}
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
                          label={"View"}
                          checked={values.roleCheckbox[3]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.3", value);
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Tik
                    </label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck5"
                          name="roleCheckbox"
                          label={"Create"}
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
                          label={"Update"}
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
                          label={"View"}
                          checked={values.roleCheckbox[6]}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.6", value);
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Templates
                    </label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck8"
                          name="roleCheckbox"
                          label={"Create"}
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
                          label={"Delete"}
                          onChange={(value) => {
                            setFieldValue("roleCheckbox.8", value)
                            value == true ? setFieldValue("roleCheckbox.10", value) : null
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
                          label={"Edit"}
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
                          label={"View"}
                          onChange={(value) => {

                            setFieldValue("roleCheckbox.10", value);
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Invoice
                    </label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck12"
                          name="roleCheckbox"
                          checked={values.roleCheckbox[11]}
                          label={"View"}
                          onChange={(value) => {

                            setFieldValue("roleCheckbox.11", value);
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
                    <label className="col-sm-4 col-form-label justify-content-start f-18 f-m">
                      Payment
                    </label>
                    <div className="col-sm-8">
                      <form className="d-flex flex-wrap">
                        <Checkbox
                          parentClassName="form-check-inline"
                          type="checkbox"
                          id="customCheck13"
                          name="roleCheckbox"
                          checked={values.roleCheckbox[12]}
                          label={"Access"}
                          onChange={(value) => {

                            setFieldValue("roleCheckbox.12", value);
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

                        <div className="formError">
                          {" "}
                          {errors.roleCheckbox != null
                            ? errors.roleCheckbox
                            : null}
                        </div>

                        {/* <div className="formError"> {errors.paymentCheckbox != null ? errors.paymentCheckbox : null}</div> */}

                        {/* <div className="form-check-inline custom-control custom-checkbox">
                          <input type="checkbox" className="custom-control-input" id="customCheck2114" name="example1" />
                          <label className="custom-control-label" htmlFor="customCheck2114">Access</label>
                        </div> */}
                      </form>
                    </div>
                  </div>

                  <div className="d-flex">
                    {/* <Button
                      type="button"
                      onClick={handleSubmit}
                      buttonText="Clear"
                      className="m-1 button_form btn-default clear_button"
                    /> */}
                    <Button
                      type="button"
                      buttonText="Clear"
                      className="m-1 clear_button"
                      onClick={() => this.clearForm(resetForm)}
                    />
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText="Create User"
                      className="m-1"
                    />

                    {/* {/* 
                   <a type="button" className="btn btn-default w-100 m-1">Clear</a>
                    <a data-toggle="modal" className="btn btn-org w-100 m-1">Create Role</a> */}
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
