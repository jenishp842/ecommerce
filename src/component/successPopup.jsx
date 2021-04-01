import React from "react";
import { Modal } from './index.jsx';
import success from "../assets/img/success.png";

const SuccessPopup = (props) => {
  const { closePopup, msg, history } = props;
  console.log(msg, "msgmsgv")

  return (
    <>
      <Modal closePopup={closePopup}>
        <div class="modal-body pt-0 plr-100 pb-5">
          <img class="mx-auto d-block text-center mb-5" src={success} />
          <h4 class="modal-title text-center f-20 f-m" id="">{msg}</h4>
        </div>
      </Modal>
    </>
  );

}

export default SuccessPopup;
