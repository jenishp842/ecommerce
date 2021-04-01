import React, { Component } from "react";
import Header from "../../component/Header.jsx";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Auth } from "aws-amplify";
import SignupVerification from "./SignupVerification.jsx";
import SuccessModal from "../../component/SuccessModal.jsx";
import ConfirmSignup from "./ConfirmSignup.jsx";
import confirmSignupSuccess from "./ConfirmSignupSuccess.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ConfirmSignupSuccess from "./ConfirmSignupSuccess.jsx";
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
import logo from '../../assets/img/v-logo.png'

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
const validationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      popupFlag: false,
      popupSuccessFlag: false,
      userName: "",
      isChecked: false,
      user: "",
      password: "",
      message: "",
      submit: false,
      mobile: "",
      confirmSignupPopup: false,
      confirmCodePopup: false,
      firstName: "",
      lastName: "",
      email: "",
      code: "",
    };
  }

  componentDidMount() {
    document.body.classList.remove("modal-open");
  }

  signupSubmit = async (data) => {
    this.setState({
      userName: data.email,
      password: data.password,
      submit: true,
      errormessage: "",
      error: false,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      code: data.code,
    });
    localStorage.setItem("userName", JSON.stringify(data.email));
    const { mobile, submit } = this.state;
    console.log(mobile, submit);
    if (this.state.mobile == "") {
      this.setState({ errormessage: "fields required", error: true });
    } else if (!this.state.mobileLength) {
      this.setState({ errormessage: "number should be 10 digit", error: true });
    } else {
      this.setState({ errormessage: "", error: false });
      this.props.checkUser({ field: "mobileNumber", value: mobile });
      // try {
      //    await Auth.signUp({
      //     username: email,
      //     password,
      //     attributes: {
      //       // 'custom:firstName': firstname,
      //       // 'custom:lastName': lastname,
      //       // 'custom:mobileNumber': `+91${mobile}`,
      //       // 'custom:referralCode': code,
      //       email: email,
      //       phone_number: `+${mobile}`,
      //       name: `${firstname}${lastname}`,
      //     },
      //   }).then(data => {
      //     this.setState({
      //       popupFlag: true,
      //       message:
      //         "Verification code has been sent on your registered Email Address",
      //     });
      //     this.props.signup({
      //       firstname: firstname,
      //       lastName: lastname,
      //       email,
      //       mobile,
      //       referralCode:code,
      //       cognitoId: data.userSub,
      //     });
      //   this.setState({ user: data.user });
      //   })
      //   // .then((data) =>
      //   // this.setState({
      //   //   popupFlag: true,
      //   // }),
      //   // )

      // } catch (error) {
      //   console.log("error signing up:", error);
      //   toast.error(error.message, options);
      // }
    }
  };
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (
      this.props.checkUserResponse == "" &&
      this.props.error == "error" &&
      this.state.mobileLength &&
      prevState.mobile == this.state.mobile &&
      this.state.submit
    ) {
      this.callSignup();
      this.setState({ submit: false})
    }
    if (
      this.props.checkUserResponse != "" &&
      this.props.error == "" &&
      this.props.checkUserResponse != prevProps.checkUserResponse &&
      this.state.submit
    ) {
      toast.error("phone number already exist", options);
      this.setState({ submit: false})
    }
    if(this.props.signupSuccess != prevProps.signupSuccess){
      this.props.blockchainRegister({orgName:'providerOrg', username: this.state.email, passcode: this.state.password})
    } 
  }
  callSignup = async () => {
    const { firstName, lastName, email, mobile, code, password } = this.state;
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          // 'custom:firstName': firstname,
          // 'custom:lastName': lastname,
          // 'custom:mobileNumber': `+91${mobile}`,
          // 'custom:referralCode': code,
          email: email,
          phone_number: `+${mobile}`,
          name: `${firstName}${lastName}`,
        },
      }).then((data) => {
        this.props.signup({
          firstName: firstName,
          lastName: lastName,
          email,
          mobile: `+${mobile}`,
          referralCode: code,
          cognitoId: data.userSub,
        });
        this.setState({ user: data.user });
        this.setState({
          popupFlag: true,
          message:
            "Verification code has been sent on your registered Email Address",
        });
      });
      // .then((data) =>
      // this.setState({
      //   popupFlag: true,
      // }),
      // )
    } catch (error) {
      console.log("error signing up:", error);
      toast.error(error.message, options);
    }
  };
  closePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      popupFlag: false,
      confirmSignupPopup: false,
      confirmCodePopup: false,
    });
  };
  closeSuccessPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      popupSuccessFlag: false,
    });
  };
  showSuccessPopup = () => {
    document.body.classList.add("modal-open");
    this.setState({
      popupSuccessFlag: true,
      message: "You signed up successfully",
    });
  };
  onChangeCheckbox = (event) => {
    this.setState({
      isChecked: event.target.checked,
    });
  };
  confirmSignupSuccess = (e) => {
    this.setState({ userName: e, confirmCodePopup: true });
  };
  AccountSuccess = () => {
    this.setState({
      popupSuccessFlag: true,
      confirmCodePopup: false,
      message: "Account activate successfully",
    });
  };
  mobileHandler = (e, data) => {
    console.log(data);
    const dialCode = data.dialCode;
    console.log(e.length, dialCode.length);
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
  confirmSignup = () => {
    this.setState({ confirmSignupPopup: true });
  };
  render() {
    const {
      popupFlag,
      isChecked,
      popupSuccessFlag,
      message,
      mobileLength,
      errormessage,
      error,
      confirmCodePopup,
      confirmSignupPopup,
      userName,
    } = this.state;
    console.log(this.props.signupSuccess);
    return (
      <>
        <Header isSingUpPage={true} />
        <div id="content" className="container my-5">
          <div className="row">
            <div className="offset-lg-1 col-lg-5 col-md-6 bg-brw side-img d-flex align-items-center justify-content-center flex-column">
              <h3 className="text-center text-white m-0">
                Welcome to DocTrace
              </h3>
              <img className="img-fluid mx-auto d-block" src={logo} />
            </div>
            <div className="col-lg-5 col-md-6 log-container p-5 box-shd">
              <h1 className="f-b">Sign Up</h1>
              <h5 className="f-20 f-b">For providing record</h5>
              <div className="tab-content">
                <div className="tab-pane active" id="">
                  <Formik
                    initialValues={{
                      firstname: "",
                      lastname: "",
                      email: "",
                      // mobile: "",
                      code: "",
                      password: "",
                    }}
                    onSubmit={this.signupSubmit}
                    // validationSchema={validationSchema}
                    validate={(values) => {
                      console.log(values);
                      const errors = {};
                      if (!values.firstname) {
                        errors.firstname = "Required";
                      } else if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/i.test(values.firstname)) {
                        errors.firstname = "Only characters is allowed"
                      } else if (!values.lastname) {
                        errors.lastname = "Required";
                      } else if (!/^[a-zA-Z]+(?:-[a-zA-Z]+)*$/i.test(values.lastname)) {
                        errors.lastname = "Only characters is allowed"
                      } else if (!values.email) {
                        errors.email = "Required";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }
                      //  else if (!values.mobile) {
                      //   errors.mobile = "Required";
                      // }
                      //  else if (
                      //   values.mobile.toString().length < 12 ||
                      //   values.mobile.toString().length > 12
                      // ) {
                      //   errors.mobile = "number should be 10 digit";
                      // }
                      else if (!values.password) {
                        errors.password = "Required";
                      } else if (values.password.length < 8) {
                        errors.password =
                          "Password has to be longer than 8 characters!";
                      } else if (!/^(?=.*[A-Z]).*$/.test(values.password)) {
                        errors.password = "Password should contain uppercase";
                      } else if (!/^(?=.*[a-z]).*$/.test(values.password)) {
                        errors.password = "Password should contain lowercase";
                      } else if (!/^(?=.*\d).*$/.test(values.password)) {
                        errors.password = "Password should contain numeric";
                      } else if (
                        !/^(?=.*[@$!%*#?&]).*$/.test(values.password)
                      ) {
                        errors.password =
                          "Password should contain special character";
                      } else if (values.conpassword !== values.password) {
                        errors.conpassword = "Confirm password does not match password";
                      }
                      return errors;
                    }}
                  >
                    {(props) => {
                      const {
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
                        setFieldValue,
                      } = props;
                      return (
                        <form>
                          <div className="col p-0 mt-5">
                            <input
                              type="text"
                              className="form-control"
                              id="firstname"
                              placeholder="First Name"
                              name="firstname"
                              value={values.firstname}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.firstname && touched.firstname && (
                            <div className="input-feedback">
                              {errors.firstname}
                            </div>
                          )}
                          <div className="col p-0 mt-4">
                            <input
                              type="text "
                              className="form-control"
                              id="lastname"
                              placeholder="Last Name"
                              name="lastname"
                              value={values.lastname}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.lastname && touched.lastname && (
                            <div className="input-feedback">
                              {errors.lastname}
                            </div>
                          )}
                          <div className="col p-0 mt-4">
                            <input
                              type="text"
                              className="form-control"
                              id="email"
                              placeholder="Email Addresss"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                          <div className="col p-0 mt-4">
                            <PhoneInput
                            enableLongNumbers={true}
                              placeholder="Enter phone number"
                              value={values.mobile}
                              countryCodeEditable={false}
                              // onChange={(e) => setFieldValue('mobile', e)}
                              onChange={(e, data) =>
                                this.mobileHandler(e, data)
                              }
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
                                width: "97.5%",
                                height: "50px",
                              }}
                            />
                          </div>
                          {error && (
                            <div className="input-feedback">{errormessage}</div>
                          )}
                          <div className="col p-0 mt-4">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              placeholder="Password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.password && touched.password && (
                            <div className="input-feedback">
                              {errors.password}
                            </div>
                          )}
                            <div className="col p-0 mt-4">
                            <input
                              type="password"
                              className="form-control"
                              id="conpassword"
                              placeholder="Confirm Password"
                              name="conpassword"
                              value={values.conpassword}
                              onChange={handleChange}
                            />
                          </div>
                          {errors.conpassword && touched.conpassword && (
                            <div className="input-feedback">
                              {errors.conpassword}
                            </div>
                          )}
                          <div className="col p-0 mt-4">
                            <input
                              type="text"
                              className="form-control"
                              id="code"
                              placeholder="Referral Code"
                              name="code"
                              value={values.code}
                              n
                              onChange={handleChange}
                            />
                          </div>

                          <div className="login-link">
                            <div className="col p-0 mt-5 d-flex justify-content-between">
                              <div className="custom-control custom-checkbox">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheck"
                                  name="example1"
                                  onChange={this.onChangeCheckbox}
                                  checked={isChecked}
                                />
                                <label
                                  className="custom-control-label f-m"
                                  htmlFor="customCheck"
                                >
                                  I hereby agree to the{" "}
                                  <Link to="/signup">
                                    <u>Terms</u>
                                  </Link>{" "}
                                  &{" "}
                                  <Link to="/signup">
                                    <u>Privacy Policy</u>
                                  </Link>{" "}
                                  of DocTrace
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mt-5">
                            <button
                             onClick={handleSubmit}
                              type="submit"
                              className={
                                isChecked
                                  ? "btn box-shd-hover-org btn-primary w-100 login-btn f-b"
                                  : "disabled btn  btn-primary w-100 login-btn f-b"
                              }
                              data-toggle="modal"
                              data-target="#mobileVerification"
                              disabled={!isChecked}
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="text-center d-block mt-5 txt-blk f-20 f-m">
                            Already have an Account?
                            <Link to="/signin" className=" acc-link">
                              {" "}
                              <u>Login Now</u>
                            </Link>
                          </div>
                          <div className="text-center d-block mt-2 txt-blk f-20 f-m">
                            Already Signup?
                            <span
                              className=" acc-link"
                              style={{ cursor: "pointer" }}
                              onClick={this.confirmSignup}
                            >
                              {" "}
                              <u>verify email</u>
                            </span>
                          </div>
                        </form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
        {popupFlag == true ? (
          <SignupVerification
            userName={userName}
            closePopup={this.closePopup}
            history={this.props.history}
            showSuccessPopup={this.showSuccessPopup}
            user={this.state.user}
            password={this.state.password}
          />
        ) : null}
        {popupSuccessFlag == true ? (
          <SuccessModal
            closePopup={this.closeSuccessPopup}
            history={this.props.history}
            message={message}
          />
        ) : null}
        {confirmSignupPopup == true ? (
          <ConfirmSignup
            closePopup={this.closePopup}
            history={this.props.history}
            confirmSignupSuccess={this.confirmSignupSuccess}
          />
        ) : null}
        {confirmCodePopup == true ? (
          <ConfirmSignupSuccess
            closePopup={this.closePopup}
            history={this.props.history}
            AccountSuccess={this.AccountSuccess}
            userName={userName}
          />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.Auth.error,
  checkUserResponse: state.Auth.checkUser,
  signupSuccess: state.Auth.signupSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (payload) => dispatch(actions.providerSignup(payload)),
  checkUser: (payload) => dispatch(actions.checkUser(payload)),
  blockchainRegister: (payload) => dispatch(actions.blockchainRegister(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
