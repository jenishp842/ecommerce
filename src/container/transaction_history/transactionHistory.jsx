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

const actionsData = {
  edit: true,
  delete: true,
};
class transactionHistory extends Component {
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
    this.props.transactionreq();
  }
  sum = (obj) => {
    let sum = 0;
    for (let el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  };
  componentDidUpdate(prevprops) {
    if (prevprops.transactionList != this.props.transactionList) {
      console.log(this.props.transactionList);

      if (this.props.transactionList.length > 0) {
        this.props.transactionList.map((role, key) => {
          const { startOfSubscription, subscriptionPlanDetails } = role;

          const priceList = this.state.dataTable.data;
          const data = priceList[key];
          const object = {
            ...data,
            _id: role._id,
            sr_no: key + 1,
            subscription_date: formatDate(startOfSubscription),
            subscription_time: formatTime(startOfSubscription),
            subscription_plan: role.planName,
            amount: `$${role.cost}`
          };
          const objSum = object;
          console.log(objSum);
          priceList[key] = objSum;
          const tranData = { ...this.state.dataTable };
          tranData.data = priceList;
          this.setState({ tranData });
        });
      }
    }
    if(prevprops.transactionDetailSuccess != this.props.transactionDetailSuccess){
      this.props.history.push('/transaction-detail')
  }
  }
  viewPopup = (data) => {
    console.log(data)
    this.props.transactionDetail({Id: data._id})
    localStorage.setItem('transId',JSON.stringify(data._id))
     }
  render() {
    const { transactionList, payment, Rolepayment } = this.props;
    console.log(payment, Rolepayment);
    return (
      <WithLayoutContainer>
             <div id="teamMgnt" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div className="containerBox">
                <div className="table-title d-flex justify-content-between align-items-center mb-4">
                  <h2 className="f-b m-0">Transaction History</h2>
                </div>
                <div className="table-responsive fixHeight">
                  <Table
                    dataTable={this.state.dataTable}
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
const mapStateToProps = (state) => {
  return {
    transactionList: state.Transaction.transactionList,
    transactionDetailSuccess: state.Transaction.transactionDetailSuccess,
    payment: state.Profile.payment,
    Rolepayment: state.Profile.Rolepayment,
  };
};

const mapDispatchToProps = (dispatch) => ({
  transactionreq: () => dispatch(actions.transactionList()),
  transactionDetail: (payload) => dispatch(actions.transactionDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(transactionHistory);
