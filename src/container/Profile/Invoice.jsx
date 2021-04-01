import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WithLayoutContainer,
  Table,
  SuccessPopup,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { TransactionHistory } from "../../constants/Mapper.js";
import { formatTime, formatDate } from "../../helper/utility.js";
import moment from "moment";
const actionsData = {
  edit: true,
  delete: true,
};
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTable: {
        titles: TransactionHistory,
        data: [],
      },
    };
  }
  componentDidMount() {
    const transId = JSON.parse(localStorage.getItem("transId"));
    // this.props.transactionDetail({Id: transId})
    this.props.transactionDetail({ Id: "" });
  }

  render() {
    const { transactionDetailSuccess } = this.props;
    const Subdate = formatDate(
      transactionDetailSuccess &&
        transactionDetailSuccess.lastPlan.startOfSubscription
    );
    const expdate = formatDate(
      transactionDetailSuccess &&
        transactionDetailSuccess.lastPlan.endOfSubscription
    );
    const a = moment(
      transactionDetailSuccess &&
        transactionDetailSuccess.lastPlan.endOfSubscription
    );
    const b = moment(
      transactionDetailSuccess &&
        transactionDetailSuccess.lastPlan.startOfSubscription
    );
    const Validity = a.diff(b, "month");
    console.log(transactionDetailSuccess);
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
                            <h4 class="f-16 f-r">{`${
                              transactionDetailSuccess &&
                              transactionDetailSuccess.providerDetails.firstName
                            } ${
                              transactionDetailSuccess &&
                              transactionDetailSuccess.providerDetails.lastName
                            }`}</h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Email Address</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">
                              {transactionDetailSuccess &&
                                transactionDetailSuccess.providerDetails.email}
                            </h4>
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
                            <h4 class="f-16 f-r">
                              {transactionDetailSuccess &&
                                transactionDetailSuccess.lastPlan
                                  .subscriptionPlanDetails.validity}
                            </h4>
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
                            <h4 class="f-16 f-r">
                              {transactionDetailSuccess != '' ?
                              transactionDetailSuccess.lastPlan.paymentMethod ==
                                "Free"
                                ? "-"
                                : transactionDetailSuccess.lastPlan
                                    .paymentMethod: '-'}
                            </h4>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-3">
                            <h4 class="f-16 f-b">Payment ID</h4>
                          </div>
                          <div class="col-lg-9">
                            <h4 class="f-16 f-r">
                              {transactionDetailSuccess &&
                                transactionDetailSuccess.lastPlan._id}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    {transactionDetailSuccess &&
                      transactionDetailSuccess.subscriptionIds.map((e) => {
                        return (
                          <>
                            {" "}
                            <div class="row org-border my-2 mx-1 br-6 p-3">
                              <div class="col-lg-4">
                                <h4 class="f-16 f-b">Product ID</h4>
                                <h4 class="f-16 f-r">{e._id}</h4>
                              </div>
                              <div class="col-lg-4">
                                <h4 class="f-16 f-b">Product Name</h4>
                                <h4 class="f-16 f-r">
                                  {e.subscriptionPlanDetails.planName}
                                </h4>
                              </div>
                              <div class="col-lg-4">
                                <h4 class="f-16 f-b">Amount</h4>
                                <h4 class="f-16 f-r">${e.totalCost}</h4>
                              </div>
                            </div>
                          </>
                        );
                      })}

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
                        <h4 class="f-16 f-b txt-org">
                          $
                          {transactionDetailSuccess &&
                            transactionDetailSuccess.finalTotalCost}
                        </h4>
                        <div className="text-center w-100 mb-2 mt-4">
                  {transactionDetailSuccess &&
                              transactionDetailSuccess.lastPlan.subscriptionPlanDetails.type == 'pay_per_use' &&  transactionDetailSuccess.finalTotalCost != 0 ?<span
                    onClick={() => {
                      this.props.history.push("/payment");
                      // this.setState({ freeTrialPopup: false });
                      // localStorage.setItem("trialPop", JSON.stringify(false));
                    }}
                    className="btn btn-primary w-20 f-18 f-b"
                  >
                    Payment
                  </span>:null}
                </div>
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
    transactionList: state.Transaction.transactionList,
    transactionDetailSuccess: state.Transaction.transactionDetailSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  transactionreq: () => dispatch(actions.transactionList()),
  transactionDetail: (payload) => dispatch(actions.transactionDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
