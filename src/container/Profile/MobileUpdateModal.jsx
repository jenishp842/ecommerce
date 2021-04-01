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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
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

class MobileUpdateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      email: "",
      submit: false,
      submit: false,
      errormessage: "",
      error: "",
      mobileLength: "",
      mobile: "",
    };
    this.props.errorClear();
  }

  handleSubmit = async (values) => {
    this.setState({ submit: true });
    console.log(this.state.mobile);
    if (this.state.mobile == "") {
      this.setState({
        errormessage: "Please Enter mobile number",
        error: true,
      });
    } else if (!this.state.mobileLength) {
      this.setState({ errormessage: "number should be 10 digit", error: true });
    } else {
      this.setState({ errormessage: "", error: false });
      this.props.checkUser({
        field: "mobileNumber",
        value: `+${this.state.mobile}`,
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.checkUserResponse == "" &&
      this.props.error == "error" &&
      this.state.mobileLength &&
      prevState.mobile == this.state.mobile &&
      this.state.submit
    ) {
      this.mobileUpdateCall();
      this.setState({ submit: false });
    }
    if (
      this.props.checkUserResponse != "" &&
      this.props.error == "" &&
      this.props.checkUserResponse != prevProps.checkUserResponse &&
      this.state.submit
    ) {
      toast.error("Phone number already exists");
      this.setState({ submit: false });
    }
  }

  mobileUpdateCall = async () => {
    let user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      phone_number: `+${this.state.mobile}`,
    })
      .then((res) => {
        this.props.confirmMobileUpdate();
        this.props.mobileNumUpdate({ mobileNumber: `+${this.state.mobile}` });
      })
      .catch((err) => console.log(err));
  };

  callSignup = async () => {
    const { email } = this.state;

    try {
      await Auth.resendSignUp(email);
      this.props.closePopup();
      this.props.confirmSignupSuccess(email);
    } catch (error) {
      toast.error(error.message, options);
    }
  };
  resendCode = async () => {
    const { userName } = this.props;
    const fiveMinutes = 5,
      display = document.querySelector("#time");
    this.startTimer(fiveMinutes, display);
    try {
      await Auth.resendSignUp(userName);
    } catch (error) {
      toast.error(error.message, options);
    }
  };

  mobileHandler = (e, data) => {
    console.log(data);
    const dialCode = data.dialCode;
    console.log(e, dialCode.length);
    const mobileLength = e.length - dialCode.length == 10;
    this.setState({ mobileLength: mobileLength, mobile: e });
    if (this.state.submit) {
      console.log("sasasa");
      if (this.state.mobile == "") {
        this.setState({
          errormessage: "Please Enter mobile number",
          error: true,
        });
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
    const { closePopup } = this.props;
    const { error, errormessage } = this.state;
    return (
      <Modal closePopup={closePopup}>
        <Formik
          initialValues={{
            mobile: "",
          }}
          //   validationSchema={authenticationFormSchema}
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
                      Update Phone Number
                    </h4>
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
                  <div className="modal-footer mt-2 plr-100 pb-3 f-m">
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      buttonText={"Update Mobile Number"}
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
  mobileNumUpdateData: state.Profile.mobileNumUpdate,
});

const mapDispatchToProps = (dispatch) => ({
  checkUser: (payload) => dispatch(actions.checkUser(payload)),
  errorClear: () => dispatch(actions.errorClear()),
  mobileNumUpdate: (payload) => dispatch(actions.mobileNumUpdate(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MobileUpdateModal);
