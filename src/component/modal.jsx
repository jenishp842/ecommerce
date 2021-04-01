import React, { Component } from "react";
import close from "../assets/img/close.png";

class Modal extends Component {
    render() {
        const { closePopup } = this.props;
        return (
            <>
                <div>
                    <div className="modal fade show" id="twoFactor" tabIndex="-1" role="dialog" aria-labelledby="twoFactorTitle" aria-hidden="true" style={{ zIndex: 1 }}>
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header ">
                                    {this.props.Subscription || this.props.freeTrial || this.props.verify ?  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closePopup}>
                                        <img src='' />
                                    </button> : <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closePopup}>
                                        <img src={close} />
                                    </button>}
                                </div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-backdrop fade show" style={{ zIndex: 0 }}></div>
            </>
        );
    }
}

export default Modal;
