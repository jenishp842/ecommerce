import React, { Component } from "react";
import close from "../assets/img/close.png";

class AuthModal extends Component {
    render() {
        const { closePopup } = this.props;
        return (
            <>
                <div>
                    <div className="modal fade show" id="twoFactor" tabIndex="-1" role="dialog" aria-labelledby="twoFactorTitle" aria-hidden="true" style={{zIndex:1}}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header ">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closePopup}>
                                        <img src={close} />
                                    </button>
                                </div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default AuthModal;
