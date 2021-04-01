import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import { TextInput, Button } from "../../component/index.jsx";
import { Formik } from "formik";
import authenticationFormSchema from "../../schema/authenticationFormSchema";
import { Auth } from "aws-amplify";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import * as actions from "../../actions";
import signup from "../../assets/img/signup.png";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

class OnLoadModal extends Component {

  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem("isFree");
    this.props.history.push('/signin');
  }

  render() {
    return (
      <Modal verify={this.props.verify}>
         <div class="modal-body pt-0 plr-100 pb-5 text-center">
                    <img src={signup} /><br/><br/>
                    <h4 class="modal-title text-center f-20 mb-4 f-m" id="onloadTitle">Thank you for signing up on DocTrace.<br/><br/>Your account activation process has been initiated.
                    </h4>
                    <h5 class="f-16 f-m text-center">Note : activation would take place within next 48 hours</h5><br/>
                    <span style={{cursor:'pointer'}} class="txt-org f-20 f-m" onClick={this.logout} data-dismiss="modal"><u>Click here to redirect to homepage</u></span>
         </div>
      </Modal>
    );
  }
}


export default OnLoadModal;
