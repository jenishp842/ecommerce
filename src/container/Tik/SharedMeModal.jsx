/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import { Modal } from "../../component/index.jsx";
import moment from "moment";

class SharedMeModal extends Component{
    render(){
        const {closePopup, sharedData} = this.props;
        return(
            <Modal closePopup={closePopup}>
              <div class="modal-body pt-0 pb-5">
              <a class="d-flex justify-content-between align-items-center flex-wrap mt-4 mb-2">
                                <span class="p-1 f-b">ID</span>
                                <span class="p-1 f-b">Date & Time</span>
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

export default SharedMeModal;