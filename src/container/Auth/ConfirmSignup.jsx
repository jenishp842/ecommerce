/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import authenticationFormSchema from "../../schema/forgotpasswordSchema";
import { withSnackbar } from "react-simple-snackbar";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../actions";

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

class ConfirmSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      email: '',
      submit: false,
    };
  }

  handleSubmit = async (values) => {
    this.props.checkUser({ field: "email", value: values.email });
    this.setState({ email: values.email, submit: true })

  };

  componentDidUpdate(prevProps) {
    //  if (this.props.checkUserResponse == "" &&
    //  this.props.error == "error") {
    //   toast.error('email does not exist', options);
    //  }
    this.props.errorClear()
    if (this.props.checkUserResponse != "" &&
      this.props.error == "" && this.state.submit) {
      this.callSignup();
      this.setState({ submit: false })

    }
  }

  callSignup = async () => {
    const { email } = this.state;

    try {
      await Auth.resendSignUp(email);
      this.props.closePopup();
      this.props.confirmSignupSuccess(email);
    } catch (error) {
      toast.error(error.message, options);
    }
  }
  resendCode = async () => {
    const { userName } = this.props;
    this.setState({ disabled: true });
    const fiveMinutes = 60 * 2 + 30,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    try {
      await Auth.resendSignUp(userName);
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
  render() {
    const { closePopup } = this.props;
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={authenticationFormSchema}
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
                {this.props.error ? toast.error('email does not exist', options) : null}

                <form>
                  <div className="modal-body pt-0 plr-100 pb-0">
                    <h4
                      className="modal-title text-center f-24 mb-5 f-b"
                      id="twoFactorTitle"
                    >
                      Account Confirmation
                    </h4>
                    <TextInput
                      type="text"
                      name="emaail"
                      id={"email"}
                      placeholder={"Enter registered email address"}
                      error={errors.email}
                      onChange={(value) => setFieldValue("email", value)}
                      value={values.email}
                      showError={touched.email && errors.email}
                      onBlur={() =>
                        !touched.email && setFieldTouched("email", true, true)
                      }
                    />
                  </div>
                  <div className="modal-footer mt-2 plr-100 pb-3 f-m">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText={"Verify Account"}
                      className={
                        this.state.disabled ? "disabled w-100" : "w-100"
                      }
                      isDisabled={this.state.disabled}
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

const mapStateToProps = (state) => ({
  error: state.Auth.error,
  checkUserResponse: state.Auth.checkUser,
  checkUserData: state.Auth.checkUserData,
});

const mapDispatchToProps = (dispatch) => ({
  checkUser: (payload) => dispatch(actions.checkUser(payload)),
  errorClear: () => dispatch(actions.errorClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignup);
