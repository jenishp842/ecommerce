/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

let resendTime;
let display;
class CompleteNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }
  componentDidMount() {
    const fiveMinutes = 60 * 2 + 30,
    display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    this.setState({ disabled: true });
  }
  handleSubmit = async (values) => {
    const { user } = this.props;
    const newPassword = values.newPassword;
    const password = values.password;
    document.body.classList.remove("modal-open");

      display = document.querySelector("#time");
    // this.startTimer(fiveMinutes, display);
    // this.setState({ disabled: true });
    console.log(user, newPassword, password);

    Auth.completeNewPassword(
      user, // the Cognito User Object
      password // the new password
      // OPTIONAL, the required attributes
    )
      .then((data) => {
        Auth.setPreferredMFA(user, "SMS")
          .then((res) => {
            this.props.closePopup();
            this.props.showSuccessPopup();
          })
          .catch((e) => { });
      })
      .catch((e) => {
        console.log("error confirming sign up", error);
        toast.error(error.message, options);
        this.setState({ disabled: false });
        clearInterval(resendTime);
        display.textContent = 2 + ":" + 30;
      });
    // Auth.forgotPasswordSubmit(user, verificationCode, password)
    //   .then((data) => {
    //     this.props.closePopup();
    //     this.props.showSuccessPopup();
    //   })
    //   .catch((error) => {

    //   });
  };
  resendForgot = () => {
    const { user } = this.props;
    this.setState({ disabled: true });
    try {
      Auth.forgotPassword(user)
        .then((data) => console.log(data))
        .catch((err) => toast.error(error.message, options));
    } catch (error) {
      toast.error(error.message, options);
    }
  };
  startTimer = (duration, display) => {
    var timer = duration,
      minutes,
      seconds;
    resendTime = setInterval(() => {
      // minutes = parseInt(timer / 60, 10);
      // seconds = parseInt(timer % 60, 10);

      // minutes = minutes < 10 ? "0" + minutes : minutes;
      // seconds = seconds < 10 ? "0" + seconds : seconds;
      // if(display){
      //   display.textContent = minutes + ":" + seconds;
      // }/

      if (--timer < 0) {
        timer = duration;
        clearInterval(resendTime);
        this.setState({ disabled: false });
      }
    }, 1000);
  };
  render() {
    const { closePopup } = this.props;
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            newPassword: "",
            password: "",
          }}
          //   validationSchema={authenticationFormSchema}
          //   validationSchema={authenticationFormSchema}
          onSubmit={this.handleSubmit}
          validate={(values) => {
            const errors = {};

            if (!values.password) {
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
            } else if (values.newPassword != values.password) {
              errors.newPassword = "confirm password does not match new password"
            }
            return errors;
          }}
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
                  <div className="modal-body pt-0 plr-100 pb-0">
                    <h4
                      className="modal-title text-center f-24 mb-5 f-b"
                      id="twoFactorTitle"
                    >
                      Change Password
                    </h4>
                    <TextInput
                      type="password"
                      name="password"
                      id={"password"}
                      placeholder={"Enter new password"}
                      //   error={errors.password}
                      onChange={(value) => setFieldValue("password", value)}
                      value={values.password}
                      //   showError={touched.password && errors.password}
                      className={"mb-2"}
                    //   onBlur={() =>
                    //     !touched.password &&
                    //     setFieldTouched("password", true, true)
                    //   }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">
                        {errors.password}
                      </div>
                    )}
                    <TextInput
                      type="password"
                      name="newPassword"
                      id={"newPassword"}
                      placeholder={"Enter confirm password"}
                      // error={errors.otp}
                      onChange={(value) => setFieldValue("newPassword", value)}
                      value={values.newPassword}
                    //   showError={touched.otp && errors.otp}
                    //   onBlur={() =>
                    //     !touched.otp && setFieldTouched("otp", true, true)
                    //   }
                    />
                    {errors.newPassword && touched.newPassword && (
                      <div className="input-feedback">
                        {errors.newPassword}
                      </div>
                    )}
                  </div>
                  <div className="modal-footer plr-100 pb-5 f-m">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText={"Change Password"}
                      className="w-100"
                    // isDisabled={this.state.disabled}
                    />
                  </div>
                </form>
              </>
            );
          }}
        </Formik>

        {/* <a href="#" type="button" className="btn btn-primary w-100 f-18 f-b" onClick={this.handleLogin}>Log In</a> */}
      </Modal>
    );
  }
}

export default CompleteNewPassword;
