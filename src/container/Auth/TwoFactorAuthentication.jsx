import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import authenticationFormSchema from "../../schema/authenticationFormSchema";
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
class AuthenticationPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: "",
      resend: false,
      user2: "",
      disabled: false,
    };
  }
  componentDidMount() {
    const fiveMinutes = 60 * 2 + 30,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    this.setState({ disabled: true });
  }

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

  resendSignin = async () => {
    const { email, password } = this.props;
    this.setState({ disabled: true });
    const fiveMinutes = 60 * 2 + 30,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    const user2 = await Auth.signIn({ username: email, password })
      .then(data => {
        this.props.login({ cognitoId: data.username });
        localStorage.setItem('cognitoId', JSON.stringify(data.username));
        this.setState({ resend: true, user2: data });
      }).catch(error => {
        toast.error(error.message, options)
      })
  };
  handleSubmit = async (values) => {
    const code = values.otp;
    const { initialuser } = this.props;
    const { user2, resend } = this.state;
    document.body.classList.remove("modal-open");
    const user = resend ? user2 : initialuser;
    try {
      const loggedUser = await Auth.confirmSignIn(
        user, // Return object from Auth.signIn()
        code, // Confirmation code
        "SMS_MFA" // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
      )
        .then(async (data) => {
          await Auth.currentSession()
            .then((data) => {
              localStorage.setItem("jwtToken", JSON.stringify(data));
              // this.props.history.push("./docVerify");
              if (this.props.isSuperProvider && this.props.document == '') {
                this.props.history.push("./docVerify");
              } else {
                this.props.history.push("./dashboard");
              }
            })
        })
        .catch((error) => toast.error(error.message, options));
    } catch (error) {
      toast.error(error.message, options);
    }
  };

  render() {
    const { closePopup, sentNum } = this.props;
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            otp: "",
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
                <form>
                  <div className="modal-body pt-0 plr-100 pb-0">
                    <h4
                      className="modal-title text-center f-24 mb-5 f-b"
                      id="twoFactorTitle"
                    >
                      Two Factor Authentication
                    </h4>
                    <TextInput
                      type="text"
                      name="otp"
                      id={"otp"}
                      placeholder={"Enter Code"}
                      error={errors.otp}
                      onChange={(value) => setFieldValue("otp", value)}
                      value={values.otp}
                      showError={touched.otp && errors.otp}
                      onBlur={() =>
                        !touched.otp && setFieldTouched("otp", true, true)
                      }
                    />
                    <h5 className="text-center txt-blu my-5 f-20 f-m">
                      Code has been sent to {sentNum}
                    </h5>
                    <h5 className="txt-org text-center mb-5 f-m">
                      Code can be resent in <span id="time">02:30</span>
                    </h5>
                  </div>
                  <div className="modal-footer plr-100 pb-5 f-m">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText={"Log In"}
                      className={"w-100"}
                    />
                  </div>
                  <div
                    className={this.state.disabled ? "disabledLink txt-org text-center mb-3 f-m" : "txt-org text-center mb-3 f-m"}
                    style={{ cursor: "pointer" }}
                    onClick={this.state.disabled ? null : this.resendSignin}
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
const mapStateToProps = (state) => ({
  isSuperProvider: state.Auth.isSuperProvider,
  document: state.Auth.document,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPopup);
