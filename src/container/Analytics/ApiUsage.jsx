import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer, Table, SuccessPopup } from "../../component/index.jsx";
import * as actions from "../../actions";
import { AnalystListingTitle } from '../../constants/Mapper.js';
import { formatTime, formatDate, } from "../../helper/utility.js"
import SuccessModal from "../../component/SuccessModal.jsx";
import { toast } from "react-toastify";

const actionsData = {
  edit: true,
  delete: true,
};


class ApiUsage extends Component {
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
  }

  componentDidMount() {
    this.props.logList();
  }
  componentDidUpdate(prevprops){
   if(prevprops.logListDetailData != this.props.logListDetailData){
       this.props.history.push('/api-detail')
   }
  }
  viewPopup = (data) => {
 this.props.logListDetail({id: data._id})
 localStorage.setItem('apiId',JSON.stringify(data._id))
  }
  render() {
    const {logListData } = this.props;
    // const { successPopup } = role;
    const dataTable = {
      titles: AnalystListingTitle,
      data: [],
    };

    if (logListData.length > 0) {
      dataTable.data = logListData.map((role, key) => {
        const { requestTime } = role;
        return {
          ...role,
          ...{
            sr_no: key + 1,
            date: formatDate(requestTime),
            time: formatTime(requestTime),
            request: `${role.method}${role.requestPath}`,
          }
        };
      })
    }

    return (
      <WithLayoutContainer>
        <div id="teamMgnt" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox">
                <div className="table-title d-flex justify-content-between align-items-center mb-4">
                  <h2 className="f-b m-0">API Requests</h2>
                </div>
                <div className="table-responsive fixHeight">
                  <Table
                    dataTable={dataTable}
                    actions={actionsData}
                    defaultSort={'sr_no'}
                    editButtonOnClick={this.editButtonOnClick}
                    deleteButtonOnClick={this.deleteButtonOnClick}
                    loader={this.props.loader}
                    viewPopup={this.viewPopup}
                  />
                </div>
              </div>
            </div>
           
         
          </div>
        </div>
       
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    logListData: state.Analytics.logList,
    logListDetailData: state.Analytics.logListDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logList: () => dispatch(actions.logList()),
  logListDetail: (payload) => dispatch(actions.logListDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApiUsage);
