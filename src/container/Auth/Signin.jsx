/* eslint-disable */
import React, { Component } from "react";
import { TextInput, Header, Checkbox, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import signInSchema from "../../schema/signInSchema";
import ForgotPassword from "./ForgotPassword.jsx";
import { Auth } from "aws-amplify";
import ForgotPasswordVerification from "./ForgotPasswordVerification.jsx";
import MobileVerification from "./MobileVerification.jsx";
import SuccessModal from "../../component/SuccessModal.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { toast } from "react-toastify";
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
import AuthenticationPopup from "./TwoFactorAuthentication.jsx";
import CompleteNewPassword from "./CompleteNewPassword.jsx";
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupFlag: false,
      isChecked: false,
      popupForgotFlag: false,
      user: "",
      popupForgotVerifiFlag: false,
      loggedUser: "",
      email: "",
      forgotUsername: "",
      attributes: "",
      popupMobileVerifiFlag: false,
      popupSuccessFlag: false,
      loader: false,
      password: "",
      cognitoId: "",
      sentNum: "",
      complete_new_password_modal: false,
      complete_new_user: "",
    };
  }

  componentDidMount() {
    if (localStorage.email !== "" && localStorage.isChecked) {
      this.setState({
        isChecked: true,
        email: localStorage.username,
        // password: localStorage.password
      });
    }
    this.props.subscriptionErrorFalse()
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.document == null);
    if (this.props.isSuperProvider != prevProps.isSuperProvider) {
      this.setState({
        popupFlag: true,
      });
      localStorage.setItem('isSuperprovider',JSON.stringify(this.props.isSuperProvider))
    }
    if (
      this.props.checkUserResponse != "" &&
      this.props.error == "" &&
      this.state.submit &&
      this.props.checkUserResponse != prevProps.checkUserResponse
    ) {
      this.callSignin();
      this.setState({ submit: false });
    }else if(this.props.checkUserResponse == "" &&
    this.props.error == "error"  &&
    this.state.submit){
      toast.error('Username or Password is incorrect')
      this.setState({ submit: false, loader: false });
    }
  }
  onChangeCheckbox = (value) => {
    this.setState({
      isChecked: value,
    });
  };
  // signinAgain = async (e) => {
  //   const email1 = e.email;
  //   const password1 = e.password;

  //   await Auth.signIn({ email1 , password1 });
  // }
  callSignin = async () => {
    const { email, password } = this.state;
    localStorage.setItem('pass',JSON.stringify(password))
    this.setState({ email: email, loader: true, password: password });
    try {
      await Auth.signIn({ username: email, password })
        .then((data) => {
          console.log(data)
          if (data.challengeName === "NEW_PASSWORD_REQUIRED") {
            console.log("if called...");
            const { requiredAttributes } = data.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
            this.setState({
              complete_new_password_modal : true,
              complete_new_user : data,
              loader: false,
              email : '',
              password: ''
            })
          } else {
            console.log("else called...");
            if (this.state.isChecked === true) {
              localStorage.username = email;
              localStorage.password = password;
              localStorage.isChecked = this.state.isChecked;
            }
            this.props.login({ cognitoId: data.username });
            localStorage.setItem("cognitoId", JSON.stringify(data.username));
            this.setState({
              sentNum: data.challengeParam.CODE_DELIVERY_DESTINATION,
            });
        
            Auth.setPreferredMFA(data, "SMS")
              .then(async (data) => {
                console.log("MFA update success: ", data);
                const user1 = await Auth.signIn({ username: email, password })
                  .then((data) => {
                    console.log("login data", data);
                    this.props.login({ cognitoId: data.username });
                    localStorage.setItem(
                      "cognitoId",
                      JSON.stringify(data.username)
                    );
                    this.setState({
                      user: data,
                      loader: false,
                      cognitoId: data.username,
                    });
                  })
                  .catch((error) => toast.error(error.message, options));
              })
              .catch((err) => {
                console.log("MFA update error: ", err);
                this.setState({
                  popupFlag: true,
                  // popupMobileVerifiFlag: true,
                  user: data,
                  loader: false,
                });
              });
            // other situations
          }
        })
        .catch((error) => {
          toast.error(error.message, options);
          this.setState({ loader: false });
        });
    } catch (error) {
      console.log("error signing up:", error.message);
      this.setState({ loader: false });
      // this.props.openSnackbar(error.message);
      toast.error(error.message, options);
    }
  }
  handleSubmit =  (values) => {
    this.props.errorClear();
    this.props.checkUser({ field: "email", value: values.email });
    this.setState({ email: values.email, submit: true, password: values.password,loader: true });
  };
  showModal = () => {
    document.body.classList.add("modal-open");
    this.setState({ popupForgotFlag: true });
  };
  closeModal = () => {
    this.setState({ show: false });
  };

  signUp = () => {
    this.props.history.push("/signup");
  };
  closePasswordVerificationPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      popupForgotVerifiFlag: false,
    });
  };
  showForgotVerifyPasswordPopup = (e) => {
    document.body.classList.add("modal-open");
    this.setState({
      popupForgotFlag: false,
      popupForgotVerifiFlag: true,
      forgotUsername: e,
    });
  };
  popupMobileVerifiFlag = (e) => {
    this.setState({
      popupMobileVerifiFlag: true,
    });
  };
  showTwoFactorPopup = (e) => {
    this.setState({
      popupFlag: true,
      popupMobileVerifiFlag: false,
      user: e,
    });
  };
  closePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      popupFlag: false,
      popupForgotFlag: false,
      popupMobileVerifiFlag: false,
    });
  };
  showSuccessPopup = () => {
    document.body.classList.add("modal-open");
    this.setState({
      popupSuccessFlag: true,
    });
  };
  closeSuccessPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      popupSuccessFlag: false,
    });
  };
  // test = (loggedUser) => {
  //   document.body.classList.add("modal-open");
  //   this.setState({ popupForgotFlag: true,loggedUser:loggedUser});
  // }
  render() {
    const {
      popupFlag,
      isChecked,
      popupForgotFlag,
      popupForgotVerifiFlag,
      popupMobileVerifiFlag,
      popupSuccessFlag,
      loader,
      email,
      password,
      sentNum,
    } = this.state;

    return (
      <>
        <Header isLoginPage={true} />

        <div id="content" className="container my-5">
          <div className="row">
            <div className="offset-lg-1 col-lg-5 col-md-6 bg-brw side-img d-flex align-items-center justify-content-center flex-column">
              <h3 className="text-center text-white m-0">
                Welcome to DocTrace
              </h3>
              <img className="img-fluid mx-auto d-block" src={logo} />
            </div>
            <div className="col-lg-5 col-md-6 log-container p-5 box-shd">
              <h1 className="f-b">Login</h1>

              <div className="tab-content">
                <div className="tab-pane active" id="">
                  <Formik
                    initialValues={{
                      email: email != null ? email : "",
                      password: password != null ? password : "",
                    }}
                    enableReinitialize
                    validationSchema={signInSchema}
                    onSubmit={this.handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleSubmit,
                      setFieldValue,
                      setFieldTouched,
                    }) => {
                      return (
                        <>
                          <form>
                            <div className="">
                              <div className="col p-0 mt-5">
                                <TextInput
                                  type="email"
                                  name="email"
                                  id={"email"}
                                  placeholder={"Email"}
                                  error={errors.email}
                                  onChange={(value) =>
                                    setFieldValue("email", value)
                                  }
                                  value={values.email}
                                  showError={touched.email && errors.email}
                                  onBlur={() =>
                                    !touched.email &&
                                    setFieldTouched("email", true, true)
                                  }
                                />
                              </div>
                              <div className="">
                                <div className="col p-0 mt-4">
                                  <TextInput
                                    type="password"
                                    name="password"
                                    id={"password"}
                                    placeholder={"Password"}
                                    onChange={(value) =>
                                      setFieldValue("password", value)
                                    }
                                    error={errors.password}
                                    value={values.password}
                                    showError={
                                      touched.password && errors.password
                                    }
                                    onBlur={() =>
                                      !touched.password &&
                                      setFieldTouched("password", true, true)
                                    }
                                  />
                                </div>
                              </div>

                              <div className=" login-link">
                                <div className="col p-0 mt-5 d-flex justify-content-between">
                                  <Checkbox
                                    type="checkbox"
                                    id="customCheck"
                                    name="example1"
                                    label={"Remember me"}
                                    onChange={this.onChangeCheckbox}
                                    checked={isChecked}
                                  />
                                  <a
                                    className="f-m txt-org f-14"
                                    data-toggle="modal"
                                    data-target="#forgot"
                                    onClick={this.showModal}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <u>Forgot Password?</u>
                                  </a>
                                </div>
                              </div>

                              <div className=" mt-5">
                                <Button
                                  type="submit"
                                  onClick={handleSubmit}
                                  buttonText={
                                    loader ? (
                                      <i className="fa fa-refresh fa-spin"></i>
                                    ) : (
                                      "Login"
                                    )
                                  }
                                />
                              </div>

                              <div className="text-center d-block mt-5 txt-blk f-20">
                                Don't have an Account?{" "}
                                <a
                                  className=" acc-link"
                                  onClick={() => this.signUp()}
                                  style={{ cursor: "pointer" }}
                                >
                                  <u>Create Now</u>
                                </a>
                              </div>
                            </div>
                          </form>
                        </>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          {popupFlag == true ? (
            <AuthenticationPopup
              closePopup={this.closePopup}
              history={this.props.history}
              initialuser={this.state.user}
              email={this.state.email}
              password={this.state.password}
              popupMobileVerifiFlag={this.popupMobileVerifiFlag}
              sentNum={sentNum}
            />
          ) : null}
          {popupForgotFlag == true ? (
            <ForgotPassword
              user={this.state.user}
              closePopup={this.closePopup}
              showForgotVerifyPasswordPopup={this.showForgotVerifyPasswordPopup}
            />
          ) : null}
          {popupForgotVerifiFlag == true ? (
            <ForgotPasswordVerification
              closePopup={this.closePasswordVerificationPopup}
              history={this.props.history}
              user={this.state.forgotUsername}
              showSuccessPopup={this.showSuccessPopup}
            />
          ) : null}
          {popupMobileVerifiFlag == true ? (
            <MobileVerification
              userName={this.state.email}
              closePopup={this.closePopup}
              history={this.props.history}
              showTwoFactorPopup={this.showTwoFactorPopup}
              user={this.state.user}
              email={this.state.email}
              password={this.state.password}
            />
          ) : null}
          {popupSuccessFlag == true ? (
            <SuccessModal
              closePopup={this.closeSuccessPopup}
              history={this.props.history}
              message={"Password changed successfully"}
            />
          ) : null}
          {this.state.complete_new_password_modal == true ? (
            <CompleteNewPassword
              closePopup={() => {
                this.setState({
                  complete_new_password_modal : false
                })
              }}
              history={this.props.history}
              user={this.state.complete_new_user}
              showSuccessPopup={this.showSuccessPopup}
            />
          ) : null}
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isSuperProvider: state.Auth.isSuperProvider,
  document: state.Auth.document,
  checkUserResponse: state.Auth.checkUser,
  error: state.Auth.error,

});

const mapDispatchToProps = (dispatch) => ({
  providerInfo: (payload) => dispatch(actions.providerInfo(payload)),
  login: (payload) => dispatch(actions.login(payload)),
  checkUser: (payload) => dispatch(actions.checkUser(payload)),
  subscriptionErrorFalse: () => dispatch(actions.subscriptionErrorFalse()),
  errorClear: () => dispatch(actions.errorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
