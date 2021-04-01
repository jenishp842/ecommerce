/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import authenticationFormSchema from "../../schema/authenticationFormSchema";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import * as actions from "../../actions";
import { connect } from "react-redux";
import _ from "lodash";

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
class ForgotPasswordVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      certi: "",
      imgName: "",
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
    const verificationCode = values.otp;
    const password = values.password;
    const certi = values.certi
    console.log(user)
    document.body.classList.remove("modal-open");

    Auth.forgotPasswordSubmit(user, verificationCode, password)
      .then((data) => {
        this.props.closePopup();
        this.props.showSuccessPopup();
      })
      .catch((error) => {
        console.log("error confirming sign up", error);
        toast.error(error.message, options);
        // this.setState({ disabled: false });
        // clearInterval(resendTime);
        //  display = document.querySelector("#time");
        //  display.textContent = 2 + ":" + 30;
      });
    this.props.recoverPassword({ email:user, passcode:password, certi });
  };
  resendForgot = () => {
    const { user } = this.props;
    this.setState({ disabled: true });
    const fiveMinutes = 60 * 2 + 30,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
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
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
        timer = duration;
        clearInterval(resendTime);
        this.setState({ disabled: false });
      }
    }, 1000);
  };
  handleChange = (e) => {
    this.setState({
      certi: e.target.files[0],
      imgName: e.target.files[0].name,
    });
  };
  render() {
    const { closePopup } = this.props;
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            otp: "",
            password: "",
            certi: "",
          }}
          // validationSchema={authenticationFormSchema}
          validate={(values) => {
            console.log(values);
            const errors = {};
            if (!values.password) {
              errors.password = "Required";
            } else if (values.password.length < 8) {
              errors.password = "Password has to be longer than 8 characters!";
            } else if (!/^(?=.*[A-Z]).*$/.test(values.password)) {
              errors.password = "Password should contain uppercase";
            } else if (!/^(?=.*[a-z]).*$/.test(values.password)) {
              errors.password = "Password should contain lowercase";
            } else if (!/^(?=.*\d).*$/.test(values.password)) {
              errors.password = "Password should contain numeric";
            } else if (!/^(?=.*[@$!%*#?&]).*$/.test(values.password)) {
              errors.password = "Password should contain special character";
            } else if (values.conpassword !== values.password) {
              errors.conpassword = "Confirm password does not match password";
            } else if (values.conpassword !== values.password) {
              errors.conpassword = "Confirm password does not match password";
            } else if (!/^[0-9]+$/.test(values.otp)) {
              errors.otp = "Value must be a number";
            } else if (!values.certi) {
              errors.certi = "certificate is required";
            } 
            return errors;
          }}
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
                      error={errors.password}
                      onChange={(value) => setFieldValue("password", value)}
                      value={values.password}
                      showError={touched.password && errors.password}
                      className={"mb-2"}
                      onBlur={() =>
                        !touched.password &&
                        setFieldTouched("password", true, true)
                      }
                    />
                    <TextInput
                      type="password"
                      name="conpassword"
                      id={"conpassword"}
                      placeholder={"Enter confirm password"}
                      error={errors.conpassword}
                      onChange={(value) => setFieldValue("conpassword", value)}
                      value={values.conpassword}
                      showError={touched.conpassword && errors.conpassword}
                      className={"mb-2"}
                      onBlur={() =>
                        !touched.conpassword &&
                        setFieldTouched("conpassword", true, true)
                      }
                    />
                    <TextInput
                      type="text"
                      name="otp"
                      id={"otp"}
                      placeholder={"Enter one time password"}
                      error={errors.otp}
                      onChange={(value) => setFieldValue("otp", value)}
                      value={values.otp}
                      className={"mb-2"}
                      showError={touched.otp && errors.otp}
                      onBlur={() =>
                        !touched.otp && setFieldTouched("otp", true, true)
                      }
                    />
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        onChange={(event) => {
                          setFieldValue("certi", event.currentTarget.files[0]);}}
                      
                        name="certi"
                        onBlur={() =>
                          !touched.certi && setFieldTouched("certi", true, true)
                        }
                      />
                      
                      <label class="custom-file-label f-m">
                        {this.state.image != undefined
                          ? _.truncate(this.state.imgName, { length: 12 })
                          : "No file selected"}
                      </label>
                   {touched.certi && errors.certi && <div className="formError">{errors.certi}</div>}
                    </div>
                    <h5 class="text-center txt-blu my-5 f-20 f-m">
                      Verification code sent on registered E-mail address
                    </h5>
                    <h5 class="txt-org text-center mb-5 f-m">
                      Code can be resent in <span id="time">02:30</span>
                    </h5>
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
                  <div
                    className={
                      this.state.disabled
                        ? "disabledLink txt-org text-center mb-3 f-m"
                        : "txt-org text-center mb-3 f-m"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={this.state.disabled ? null : this.resendForgot}
                  >
                    Resend confirmation code
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
const mapDispatchToProps = (dispatch) => ({
  recoverPassword: (payload) => dispatch(actions.recoverPassword(payload)),
  errorClear: () => dispatch(actions.errorClear()),
});
export default connect(null, mapDispatchToProps)(ForgotPasswordVerification);
