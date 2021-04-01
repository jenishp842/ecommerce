import React, { Component } from "react";
import { Modal, Button } from "../../component/index.jsx";
import error from "../../assets/img/error.png";

export default class DeleteDraftTIikPopup extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    const { closePopup, confirmDelete, tik, deleteData } = this.props;
    const { successLoader } = tik;
    return (
      <Modal closePopup={closePopup}>
        <div class="modal-body pt-0 plr-100 pb-5">
          <img class="mx-auto d-block text-center mb-5" src={error} />
          <h4 class="modal-title text-center f-20 mb-5 f-m" id=""> Delete  Draft{deleteData.tikName}?</h4>
          <div class="d-flex">
            <Button
              type="button"
              buttonText="No"
              className="m-1 clear_button"
              onClick={closePopup}
            />
            <Button
              type="button"
              className="m-1"
              buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : 'Yes'}
              onClick={confirmDelete}
            />
          </div>
        </div>
      </Modal>
    );
  }
}
