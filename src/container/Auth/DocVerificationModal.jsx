import React, { Component } from "react";
import { Link } from "react-router-dom";

class DocVerifyModal extends Component {
    logout = () => {
        document.body.classList.remove("modal-open");
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem("isFree");
        this.props.history.push('/signin');
      }
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
              <div class="modal-body plr-100 py-5">
                    <h4 class="modal-title text-center f-20 mb-4 f-m " id="successTitle">Documents have been sent for verification.<br/><br/> You would receive status updates via Email within 48 hours.</h4>
                    <span onClick={this.logout} class="btn btn-primary w-100 f-18 f-b">Ok</span>
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

export default DocVerifyModal;
