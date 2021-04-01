import React, { Component } from "react";
import { Modal, Button } from "../../component/index.jsx";
import error from "../../assets/img/error.png";

export default class DeleteTeamPopup extends Component {
  constructor(props) {
    super(props);

  };

  render() {
    const { closePopup, confirmDelete, team, deleteData } = this.props;
    const { name } = deleteData;
    const { successLoader } = team;
    return (
      <Modal closePopup={closePopup}>
        <div class="modal-body pt-0 plr-100 pb-5">
          <img class="mx-auto d-block text-center mb-5" src={error} />
          <h4 class="modal-title text-center f-20 mb-5 f-m" id="">Are you sure to delete team {name}?</h4>
          <div class="d-flex">
            <Button
              type="button"
              buttonText="No"
              className="m-1 clear_button"
              onClick={closePopup}
            />
            <Button
              type="button"
              buttonText={successLoader ? <i class="fa fa-refresh fa-spin"></i> : 'Yes'}
              className="m-1"
              onClick={confirmDelete}
            />
            {/* <a data-dismiss="modal" data-toggle="modal" class="btn btn-default w-100 m-1" onClick={closePopup}>No</a>
            <a data-dismiss="modal" data-target="#dltsuccessTeam" data-toggle="modal" class="btn btn-org b w-100 m-1" onClick={closePopup}>Yes</a> */}
          </div>
        </div>
      </Modal>
    );
  }
}
