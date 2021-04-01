import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WithLayoutContainer,
  Table,
  SuccessPopup,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { AnalystListingTitle } from "../../constants/Mapper.js";
import { formatTime, formatDate } from "../../helper/utility.js";
import SuccessModal from "../../component/SuccessModal.jsx";
import { toast } from "react-toastify";

const actionsData = {
  edit: true,
  delete: true,
};

class ApiDetail extends Component {
  state = {
    editFlag: false,
    deleteFlag: false,
    addFlag: false,
    editData: {},
    deleteData: {},
    addPopupSuccess: false,
    viewFlag: false,
    viewData: {},
    showSuccess: false,
    successFlag: true,
    SuccessPopupFlag: true,
    // addPopupLoader: false,
    // editData={}
  };

  componentDidMount() {
    const apiId = JSON.parse(localStorage.getItem("apiId"));
    this.props.logListDetail({ id: apiId });
  }

  successPopup = () => {
    this.setState({
      successFlag: true,
      SuccessPopupFlag: true,
    });
  };

  render() {
    const { logListDetailData } = this.props;
    const date = formatDate(logListDetailData.requestTime);
    const time = formatTime(logListDetailData.requestTime);
    return (
      <WithLayoutContainer>
        <div id="api" class="wrapper wrapper-content">
          <div class="row">
            <div class="col-xl-12">
              <div class="containerBox">
                <div class=" ">
                  <div class="table-title d-flex justify-content-between align-items-center mb-4">
                    <h2 class="f-b m-0">API Requests Details</h2>
                  </div>
                  <div class="apiContent fixHeight" style={{overflowX:'scroll'}}>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Method</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.method}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Path</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">
                          {`${logListDetailData.method}${logListDetailData.requestPath}`}
                        </h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Status</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{`${logListDetailData.statusCode}(${logListDetailData.status})`}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Client IP Address</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.clientIp}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">User Agent</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.userAgent}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Date/Time</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{`${date}${time}`}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Get Parameter</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.params && (logListDetailData.params.msg == undefined ? logListDetailData.params : logListDetailData.params.msg) }</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Files</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.files && (logListDetailData.files.msg == undefined ? logListDetailData.files : logListDetailData.files.msg) }</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Content Type</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">
                          Application/x-222-form-urlencoded
                        </h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Request Body</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.requestBody && (JSON.stringify(logListDetailData.requestBody))}</h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b">Response Body</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">{logListDetailData.responseBody && (JSON.stringify(logListDetailData.responseBody))}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logListDetailData: state.Analytics.logListDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logListDetail: (payload) => dispatch(actions.logListDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiDetail);
