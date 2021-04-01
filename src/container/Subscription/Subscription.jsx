/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
  HeaderWithoutSearch
} from "../../component/index.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { formatTime, formatDate } from "../../helper/utility.js";
import moment from "moment";
import { Link } from "react-router-dom";
import SuccessModal from "../../component/SuccessModal.jsx";
import searcho from "../../assets/img/searcho.png";
import header_logo from "../../assets/img/logo.png";
import logom from "../../assets/img/logom.png";
import doc from "../../assets/img/doc.png";
import dollar from "../../assets/img/dollar.png";

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccord: false,
      sharedModal: false,
      sharedMeModal: false,
      index: "",
      initial: "start",
      tab: [],
      showNotification: false,
      logout: false,
      price: [],
      planType: "",
      showSuccess: false,
      message: "",
    };
  }
  componentDidMount() {
    const isSuperprovider = JSON.parse(localStorage.getItem('isSuperprovider'));
    this.props.getSubscription();
    if(isSuperprovider == ''){
      this.props.history.push('/dashboard')
    }
  }
  successPopup = () => {
    this.setState({
      deleteSuccessFlag: false,
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: true,
    });

    // this.props.getDocumentListInfo('Drafts');
  };

  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
    this.props.history.push("/dashboard");
  };
  showAccord = (i, e) => {
    this.setState({ tab: this.updateTabs(i) });
  };
  updateTabs(id) {
    let tabs = this.state.tab;
    let newtabs = tabs.map((tab, index) => {
      if (index == id) {
        if (tab.activeAcc == true) {
          tab.activeAcc = false;
        } else {
          tab.activeAcc = true;
        }
      } else {
        tab.activeAcc = false;
      }
      return tab;
    });
    return newtabs;
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
    if (prevprops.subscriptionData != this.props.subscriptionData) {
      this.props.subscriptionData.map((e, i) => {
        const priceList = this.state.price;
        const data = priceList[i];
        const object = {
          ...data,
          ...e.specialFeatures.map((j) => j.price),
          plan: e.type == 'pay_per_use' ? e.pricePerTransaction * e.transactionPerMonth : e.planPrice,
        };
        const objSum = this.sum(object);
        priceList[i] = objSum;
        this.setState({ price: priceList });
      });
    }
    if (
      prevprops.subscriptionSelectionPlan !=
      this.props.subscriptionSelectionPlan
    ) {
      
      localStorage.setItem('pprou',JSON.stringify(true))
      if(this.state.planType == 'pay_per_use'){
        this.setState({
          showSuccess: true,
          message: this.props.successMsg,
        })
      }else{
        this.props.history.push('/payment')
      }
    }
    if(prevprops.payableId != this.props.payableId){
      if(this.props.payableId.data.unpaidPlans.length > 0){
        this.props.history.push('/payment')
      }
    }
  }
  closePopup = () => {
    this.setState({ sharedModal: false, sharedMeModal: false });
  };

  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isFree");
    this.props.history.push("/signin");
  };
  closeLogoutPopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      logout: false,
    });
  };

  showNotification = () => {
    this.setState({
      showNotification: !this.state.showNotification,
    });
  };
  planSelection = (id, event) => {
    this.setState({ planType: "level_base" });
    if (
      this.props.myPlan &&
      this.props.myPlan.subscriptionPlanDetails._id != id &&
      event.target.text != "Subscribed" &&
      !this.props.myPlan.subscriptionPlanDetails.isFreeTirePlan
    ) {
      this.props.subscriptionUpdateSelection({ subscriptionId: id });
      this.props.newSubscriptipn({newSubId: id})

    } else if (event.target.text != "Subscribed") {
      this.props.subscriptionSelection({ subscriptionId: id });
      this.props.newSubscriptipn({newSubId: id})
      console.log('selection')
    }
  };
  payPerUse = (id, event) => {
    console.log(id, event.target.text);
    this.setState({ planType: "pay_per_use" });
    if (
      this.props.myPlan &&
      this.props.myPlan.subscriptionPlanDetails._id != id &&
      event.target.text != "Subscribed" &&
      !this.props.myPlan.subscriptionPlanDetails.isFreeTirePlan
    ) {
      this.props.subscriptionUpdateSelection({ subscriptionId: id });
      this.props.newSubscriptipn({newSubId: id})
    } else if (event.target.text != "Subscribed") {
      this.props.subscriptionSelection({ subscriptionId: id });
      this.props.newSubscriptipn({newSubId: id})
    }
  };

  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };

  render() {
    const {
      state: { showNotification, logout, price, showSuccess, message },
      props: { subscriptionData, myPlan },
    } = this;
    console.log(this.props.payableId)
    return (
      <>
        <HeaderWithoutSearch/>
        <div id="content" class="container my-5">
          <div class="row">
            <div class="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m">
              <h1 class="text-center txt-blk mb-2 f-b">Subscription Plans</h1>
              <a
                class="txt-org cm-tw-underline mb-5"
              >
              </a>
            </div>
            {subscriptionData &&
              subscriptionData.map((e, i) => {
                {console.log(e.validity)}
                return (
                  <div class="col-lg-4" style={{ marginBottom: "12px" }}>
                    <div class="box-shd br-20">
                      <div class="p-5 metadata">
                        <div class="top-div d-block text-center">
                          <h3 class="f-b f-24 minH-50">{e.planName}</h3>
                          <img class="img-fluid my-3" src={dollar} />
                          <div class="f-40 f-b">
                            <span style={{fontSize: '22px'}}>$</span>{price[i]}
                            <span style={{fontSize: '22px'}} class="text-muted"> / {e.validity <= 1 ? '': e.validity} {e.validity > 1 ? 'Months':'Month'}</span>
                          </div>
                        </div>
                        <hr />
                        <div class="text-center">
                          {e.specialFeatures.map((k) => {
                            if(e.type == 'pay_per_use'){
                              return (
                                <>
                                  <p>
                                    {" "}
                                    {k.show_case_name} - ${k.price}
                                  </p>
                                </>
                              );
                            }else{
                              return (
                                <>
                                  <p>
                                    {" "}
                                    {k.show_case_name}
                                  </p>
                                </>
                              );
                            }
                          })}
                           <p>Document size per transaction - Max.{e.docSizePerTransaction}</p> 
                           <p>Document per month - Max.{e.transactionPerMonth}</p> 
                           {e.type == 'pay_per_use' ? <p>pricePerTransaction - ${e.pricePerTransaction}</p> : null}
                        </div>
                        <div class="col-lg-12 d-flex mt-5">
                          <a
                            onClick={(event) => {
                              e.type === "pay_per_use"
                                ? this.payPerUse(e._id, event)
                                : this.planSelection(e._id, event);
                            }}
                            className={
                              myPlan &&
                              myPlan.subscriptionPlanDetails._id == e._id
                                ? "btn btn-org m-1 w-100 f-b"
                                : "btn btn-default m-1 w-100 f-b"
                            }
                          >
                            {myPlan.subscriptionPlanDetails && !myPlan.subscriptionPlanDetails.isFreeTirePlan
                              ? myPlan.subscriptionPlanDetails._id == e._id
                                ? "Subscribed"
                                : "Upgrade"
                              : "Subscribe"}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        {showSuccess == true ? (
          <SuccessModal
            closePopup={this.closeSuccessPopup}
            history={this.props.history}
            message={message}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    roledocument: state.Profile.Roledocument,
    document: state.Profile.document,
    subscriptionData: state.Subscription.subscriptionPlan,
    subscriptionSelectionPlan: state.Subscription.subscriptionSelectionPlan,
    myPlan: state.Subscription.myPlan,
    successMsg: state.Subscription.successMsg,
    subscriptionPayableData: state.Subscription.subscriptionPayable,
    payableId: state.Subscription.payableId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSubscription: () => dispatch(actions.getSubscription()),
  subscriptionSelection: (payload) => dispatch(actions.subscriptionSelection(payload)),
  subscriptionUpdateSelection: (payload) => dispatch(actions.subscriptionUpdateSelection(payload)),
  getMyPlan: () => dispatch(actions.getMyPlan()),
  subscriptionPayable: (payload) => dispatch(actions.subscriptionPayable(payload)),
  newSubscriptipn: (payload) => dispatch(actions.newSubscriptipn(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
