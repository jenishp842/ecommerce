/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import authenticationFormSchema from "../../schema/authenticationFormSchema";
import { withSnackbar } from "react-simple-snackbar";
import { Auth } from "aws-amplify";
import { toast } from 'react-toastify';

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

class MobileVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
    };
  }

  handleSubmit = async (values) => {
    const { userName, user, email, password } = this.props;
    console.log(user)
    const verificationCode = values.otp;
    document.body.classList.remove("modal-open");

    const fiveMinutes = 60 * 2 + 30,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    this.setState({ disabled: true });

    //       await Auth.verifyUserAttributeSubmit(user, 'phone_number', verificationCode)
    //       .then(data => {console.log(data); this.props.history.push('./docVerify');})
    //       .catch ((error) => {
    //   console.log("error confirming sign up", error);
    //   toast.error(error.message, options);
    //   this.setState({ disabled: false });
    //   clearInterval(resendTime);
    //   display.textContent = 2 + ":" + 30;
    // })
           await Auth.verifyUserAttributeSubmit(user, 'phone_number', verificationCode)
          .then(async (data) => {
            console.log(data); 
            const user = await Auth.signIn({ username: email, password });
            if(user){
              this.props.showTwoFactorPopup(user)
            }
          })
          .catch ((error) => {
      console.log("error confirming sign up", error);
      toast.error(error.message, options);
      this.setState({ disabled: false });
      clearInterval(resendTime);
      display.textContent = 2 + ":" + 30;
    })
  };

  startTimer = (duration, display) => {
    var timer = duration,
      minutes,
      seconds;
    console.log(timer);
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
                      Mobile Number Verification
                    </h4>
                    <TextInput
                      type="text"
                      name="otp"
                      id={"otp"}
                      placeholder={"Enter one time password"}
                      error={errors.otp}
                      onChange={(value) => setFieldValue("otp", value)}
                      value={values.otp}
                      showError={touched.otp && errors.otp}
                      onBlur={() =>
                        !touched.otp && setFieldTouched("otp", true, true)
                      }
                    />
                    <h5 class="text-center txt-blu my-5 f-20 f-m">
                      Verification code sent on registered E-mail address
                    </h5>
                    <h5 className="txt-org text-center mb-5 f-m">
                      Code can be resent in <span id="time">02:30</span>
                    </h5>
                  </div>
                  <div className="modal-footer plr-100 pb-3 f-m">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText={"Verify Mobile Number"}
                      className={
                        this.state.disabled ? "disabled w-100" : "w-100"
                      }
                      isDisabled={this.state.disabled}
                    />
                  </div>
                  <div class="txt-org text-center mb-3 f-m" style={{cursor:'pointer'}} onClick={this.resendCode}>
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

export default MobileVerification;
