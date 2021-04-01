import React, { Component } from "react";
import { connect } from "react-redux";
import { WithLayoutContainer, Table, SuccessPopup } from "../../component/index.jsx";
import * as actions from "../../actions";
import { TransactionHistory } from '../../constants/Mapper.js';
import { formatTime, formatDate, } from "../../helper/utility.js"
import moment from 'moment';
import ndoc from "../../assets/img/ndoc.png";
import io from "socket.io-client";

const actionsData = {
  edit: true,
  delete: true,
};
let socket = io("https://provider-backend.doctrace.com:3001", {
  path: "/provider/socket",
});
class Notification extends Component {
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
    this.props.notification()
  }
  notificationRoute = (item) => {
    console.log(item);
    if (item.itemType == "document") {
      this.props.viewTik({ Id: item.itemId });
      localStorage.setItem("docId", JSON.stringify(item.itemId));
    } else if (item.itemType == "user") {
      this.props.history.push("/userMgnt");
    } else if (item.itemType == "role") {
      this.props.history.push("/roleMgnt");
    } else if (item.itemType == "team") {
      this.props.history.push("/teamMgnt");
    } else if (item.itemType == "subscription") {
      this.props.history.push("/subscription");
    }
  };
  markAllRead = () => {
    socket.emit("mark-all-read", { providerId: this.props.providerId });
    this.props.socketNotificationSuccess({
      data: { ...this.props.notificationSocketData, count: 0 },
    });
  };
  render() {
    const { notificationListData } = this.props;
    console.log(notificationListData)
    // const Subdate = formatDate(transactionDetailSuccess.startOfSubscription)
    // const expdate = formatDate(transactionDetailSuccess.endOfSubscription)
    // const a = moment(transactionDetailSuccess.endOfSubscription);
    // const b = moment(transactionDetailSuccess.startOfSubscription);
    // const Validity = a.diff(b, 'month');
    return (
      <WithLayoutContainer>
           <div id="notification" class="wrapper wrapper-content">
                <div class="row">
                    <div class="col-xl-12">
                        <div id="changingContent" class="containerBox">
                            <div>
                                <div class="table-title d-flex justify-content-between flex-wrap">
                                    <h2 class="f-b mb-4 mt-0">Your Notifications</h2>
                                    <a href="#!" class="txt-org"><u>Mark All As Read</u></a>
                                </div>
                                <div class="fixHeight">
                                    <ul class="pl-0">
                                        {notificationListData && notificationListData.map(e => {
                                           return <><li class="mt-3">
                                            <a onClick={() => this.notificationRoute(e)}>
                                                <div class="f-16 f-m txt-blk d-flex align-items-start justify-content-between">
                                                    <img class="mr-3" src={ndoc}/>
                                                    <span class="w-100">{e.description}</span>
                                                    <span class="text-muted f-14">{moment(e.at).fromNow()}</span>
                                                </div>
                                            </a>
                                        </li>
                                        
                                        <li class="dropdown-divider my-3"></li>
                                        </>
                                        })}
                
                                    </ul>
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
    notificationListData: state.Notification.notificationListData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  notification: () => dispatch(actions.notification()),
  socketNotificationSuccess: (payload) =>
  dispatch(actions.socketNotificationSuccess(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);