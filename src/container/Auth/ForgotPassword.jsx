import React, { Component, useState } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify";
import SuccessModal from "../../component/SuccessModal.jsx";
import { Formik } from "formik";
import { withSnackbar } from "react-simple-snackbar";
import forgotpasswordSchema from "../../schema/forgotpasswordSchema";
import { toast } from 'react-toastify';
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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: '',
      submit: false
    };
    this.props.errorClear()
  }

  handleSubmit = (values) => {
    this.props.checkUser({ field: "email", value: values.email });
    this.setState({ email: values.email, submit: true })
  };
  componentDidUpdate(prevProps) {
    this.props.errorClear()
    if (this.props.checkUserResponse != "" &&
      this.props.error == "" && this.state.submit) {
      this.callForgot();
      this.setState({ submit: false })
    }else if(this.props.checkUserResponse == "" &&
    this.props.error == "error"  &&
    this.state.submit){
      toast.error('email does not exist')
      this.setState({ submit: false });
    }

  }

  callForgot = () => {
    const { showForgotVerifyPasswordPopup } = this.props;
    const { email } = this.state;
    this.setState({ loader: true })
    try {
      Auth.forgotPassword(email)
        .then((data) => { this.setState({ loader: false }); showForgotVerifyPasswordPopup(email) })
        .catch((error) => {toast.error(error.message, options); this.setState({ loader: false }) });
    } catch (error) {
      console.log(error);
      this.setState({ loader: false });
      toast.error(error.message, options);
    }
  }
  render() {
    const { closePopup } = this.props;
    const { loader } = this.state;
    return (
      <>
        {/* {this.props.error ? toast.error('email does not exist', options) : null} */}
        <Modal closePopup={closePopup}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={forgotpasswordSchema}
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
                    <div class="modal-body pt-0 plr-100 pb-0">
                      <h4
                        class="modal-title text-center f-24 f-b"
                        id="forgotTitle"
                      >
                        Forgot Password
                      </h4>
                      <h5 class="text-center my-5 f-20 f-m">
                        If you forgot the password, please enter your email
                        address.
                        <br />
                        <br />
                        we will send you a password verification code on your
                        email address.
                      </h5>
                      <TextInput
                        type="text"
                        name="email"
                        id={"email"}
                        placeholder={"Enter E-mail address"}
                        error={errors.email}
                        onChange={(value) => setFieldValue("email", value)}
                        value={values.email}
                        showError={touched.email && errors.email}
                        onBlur={() =>
                          !touched.email && setFieldTouched("email", true, true)
                        }
                      />
                    </div>
                    <div class="modal-footer plr-100 pb-5 f-m flex-column">
                      {/* <button
                        onClick={handleSubmit}
                        type="submit"
                        class="btn btn-primary w-100 f-18 f-b"
                        data-dismiss="modal"
                        data-toggle="modal"
                        data-target="#success"
                        aria-hidden="true"
                      >
                        Submit
                      </button> */}
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        class="btn btn-primary w-100 f-18 f-b"
                        buttonText={loader ? <i class="fa fa-refresh fa-spin"></i> : 'Submit'}
                      />
                      <div class="text-center d-block mt-5 txt-blk f-20 f-m">
                        Don't have an Account,{" "}
                        <Link to="/signup" class="txt-blk acc-link">
                          <u>Create Now</u>
                        </Link>
                      </div>
                    </div>
                  </form>
                </>
              );
            }}
          </Formik>

          {/* <a href="#" type="button" className="btn btn-primary w-100 f-18 f-b" onClick={this.handleLogin}>Log In</a> */}
        </Modal>
        {}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
