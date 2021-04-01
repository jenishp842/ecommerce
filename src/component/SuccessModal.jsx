import React, { Component } from "react";
import close from "../assets/img/close.png";
import success from "../assets/img/success.png";

class SuccessModal extends Component {
  render() {
    const { closePopup } = this.props;
    return (
      <>
        <div>
          <div
            className="modal fade show"
            id="twoFactor"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="twoFactorTitle"
            aria-hidden="true"
            style={{ zIndex: 1 }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header ">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={closePopup}
                  >
                    <img src={close} />
                  </button>
                </div>
                <div className="modal-body pt-0 plr-100 pb-5">
                  <h4
                    className="modal-title text-center f-24 mb-4 f-b"
                    id="successTitle"
                  >
                    {this.props.message}
                  </h4>
                  {this.props.warning ? null : <img className="mx-auto my-0 d-block " src={success} />}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-backdrop fade show" style={{ zIndex: 0 }}></div>
      </>
    );
  }
}

export default SuccessModal;
