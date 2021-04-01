/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from "../../actions";
import Loader from "../components/Loader.jsx";
import SuccessModal from "../../component/SuccessModal.jsx";

let param;
class SignupLinkVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popupSuccessFlag: fa
    };
  }
  componentDidMount() {
    const query = this.props.location.search;
    param = queryString.parse(query);
    // this.signupVerification()
  }

  signupVerification = async () => {
    const userName = JSON.parse(localStorage.getItem('userName'))
    try {
      await Auth.confirmSignUp(userName, verificationCode)
        .then(async () => {
          this.props.closePopup();
          this.props.showSuccessPopup();
          const user1 = await Auth.signIn(userName, password);
          Auth.setPreferredMFA(user1, 'SMS')
            .then(data => console.log('MFA update success: ', data))
            .catch(err => console.log('MFA update error: ', err))
        },

        );
    } catch (error) {
      console.log("error confirming sign up", error);
      toast.error(error.message, options);
      this.setState({ disabled: false });
      clearInterval(resendTime);
      display.textContent = 2 + ":" + 30;
    }
  };
}

render() {

  return (
    <>
      {popupSuccessFlag == true ? (
        <SuccessModal
          closePopup={this.closeSuccessPopup}
          history={this.props.history}
          message={'You signed up successfully'}
        />
      ) : null}
    </>
  );
}
}

export default SignupLinkVerification;
