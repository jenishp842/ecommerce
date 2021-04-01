import React, { Component } from "react";
import { Modal, Button } from "../../component/index.jsx";
import error from "../../assets/img/error.png";

export default class DeleteRolesPopup extends Component {
  constructor(props) {
    super(props);
  };
  render() {
    const { closePopup, confirmDelete, deleteData } = this.props
    return (
      <Modal closePopup={closePopup}>
        <div class="modal-body pt-0 plr-100 pb-5">
          <img class="mx-auto d-block text-center mb-5" src={error} />
          <h4 class="modal-title text-center f-20 mb-5 f-m" id="">Are you sure to delete user {deleteData.firstName}?</h4>
          <div class="d-flex">
            <Button
              type="button"
              buttonText="No"
              className="m-1 clear_button"
              onClick={closePopup}
            />
            <Button
              type="button"
              buttonText="Yes"
              className="m-1"
              onClick={confirmDelete}            />
            {/* <a href="#" class="btn btn-default w-100 m-1">No</a>
            <a href="#" class="btn btn-org b w-100 m-1">Yes</a> */}
          </div>
        </div>
      </Modal>
    );
  }
}
