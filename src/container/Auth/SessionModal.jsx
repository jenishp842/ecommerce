import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as actions from "../../actions";

class SessionModal extends Component {
  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userInfo');
    localStorage.removeItem("isFree");
    this.props.history.push('/signin');
  }
  refreshSession = () => {
    this.props.tokenError({ error: '' })
    window.location.reload()
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
                  <h4 class="modal-title text-center f-20 mb-4 f-m " id="successTitle">Session is expired <br /> please click retry</h4>
                  <span onClick={this.refreshSession} class="btn btn-primary w-100 f-18 f-b">Retry</span>
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

const mapDispatchToProps = (dispatch) => ({
  tokenError: (payload) => dispatch(actions.tokenError(payload)),
});
export default withRouter(connect(null, mapDispatchToProps)(SessionModal));
