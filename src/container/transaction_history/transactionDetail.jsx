import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer, Table, SuccessPopup } from "../../component/index.jsx";
import * as actions from "../../actions";
import { TransactionHistory } from '../../constants/Mapper.js';
import { formatTime, formatDate, } from "../../helper/utility.js"
import moment from 'moment';
const actionsData = {
  edit: true,
  delete: true,
};
class TransactionDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataTable: {
        titles: TransactionHistory,
        data: []
      }
    }
  }
  componentDidMount(){
      const transId = JSON.parse(localStorage.getItem('transId'))
    this.props.transactionDetail({Id: transId})
  }
 
  render() {
    const { transactionDetailSuccess } = this.props;
    const Subdate = formatDate(transactionDetailSuccess.startOfSubscription)
    const expdate = formatDate(transactionDetailSuccess.endOfSubscription)
    const a = moment(transactionDetailSuccess.endOfSubscription);
    const b = moment(transactionDetailSuccess.startOfSubscription);
    const Validity = a.diff(b, 'month');
    return (
      <WithLayoutContainer>
         <div id="api" class="wrapper wrapper-content">
          <div class="row">
            <div class="col-xl-12">
              <div class="containerBox">
                <div class=" ">
                  <div class="table-title d-flex justify-content-between align-items-center mb-4">
                    <h2 class="f-b m-0">Invoice Details</h2>
                  </div>
                  <div class="apiContent fixHeight">
                    <div class="row">
                      <div class="col-md-8">
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Tor Name</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{`${transactionDetailSuccess && transactionDetailSuccess.providerId.firstName} ${transactionDetailSuccess && transactionDetailSuccess.providerId.lastName}`}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Email Address</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess.providerId.email}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Subscription Date</h4>
                          </div>
                          <div class="col-lg-9">
                             <h4 class="f-16 f-r">{Subdate}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Validity</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess.subscriptionPlanDetails.validity}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Expiration Date</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{expdate}</h4>
                          </div>
                        </div>
                        {/* <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Auto Subscribe</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">Yes</h4>
                          </div>
                        </div> */}
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Payment Mode</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess.paymentMethod == 'Free' ? '-': transactionDetailSuccess.paymentMethod}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Payment ID</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess._id}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row org-border my-2 mx-1 br-6 p-3">
                      <div class="col-lg-4">
                        <h4 class="f-16 f-b">Product ID</h4>
                        <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess._id}</h4>
                      </div>
                      <div class="col-lg-4">
                        <h4 class="f-16 f-b">Product Name</h4>
                        <h4 class="f-16 f-r">{transactionDetailSuccess && transactionDetailSuccess.subscriptionPlanDetails.planName}</h4>
                      </div>
                      <div class="col-lg-4">
                        <h4 class="f-16 f-b">Amount</h4>
                        <h4 class="f-16 f-r">${transactionDetailSuccess && transactionDetailSuccess.totalCost}</h4>
                      </div>
                    </div>
                    <div class="row">
                      {/* <div class="col-lg-3">
                        <h4 class="f-16 f-b">Tax</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-r">$2</h4>
                      </div> */}
                      <div class="col-lg-3">
                        <h4 class="f-16 f-b txt-org">Total Amount</h4>
                      </div>
                      <div class="col-lg-9">
                        <h4 class="f-16 f-b txt-org">${transactionDetailSuccess && transactionDetailSuccess.totalCost}</h4>
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
const mapStateToProps = state => {
  return {
    transactionList: state.Transaction.transactionList,
    transactionDetailSuccess: state.Transaction.transactionDetailSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  transactionreq: () => dispatch(actions.transactionList()),
  transactionDetail: (payload) => dispatch(actions.transactionDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetail);