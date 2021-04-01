/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import moment from "moment";

class SharedModal extends Component{
    render(){
        const {closePopup, sharedData} = this.props;
        return(
            <Modal closePopup={closePopup}>
              <div class="modal-body pt-0 pb-5">
                            <a class="d-flex justify-content-between align-items-center mt-4 mb-2">
                                <span class="p-1 f-b">Date</span>
                                <span class="pl-4r f-b">Time</span>
                                <span class="p-1 f-b">Status</span>
                            </a>
                            {/* {sharedData && sharedData.map(e => {
                                return <a class="d-flex justify-content-between align-items-center share-public">
                                <span class="">{moment(e.at).format("DD/MM/YYYY")}</span>
                                <span class="">{moment(e.at).format("LT")}</span>
                                <span class=""><i className={e.blockchainData.isPublic == 'true' ? "fas fa-check text-muted txt-org text-right d-inline":"fas fa-times text-muted txt-org text-right d-inline"}></i></span>
                            </a>
                            })} */}
                        </div>
             </Modal>
        )
    }
}

export default SharedModal;