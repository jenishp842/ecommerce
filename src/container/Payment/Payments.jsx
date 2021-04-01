/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileDropdown,
  Modal,
  Button,
  HeaderWithoutSearch,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { formatDate } from "../../helper/utility.js";
import { Link } from "react-router-dom";
import ExpiryDateInput from "../../component/ExpiryDateInput.jsx";
import SuccessModal from "../../component/SuccessModal.jsx";
import { toast } from "react-toastify";
import searcho from "../../assets/img/searcho.png";
import header_logo from "../../assets/img/logo.png";
import logom from "../../assets/img/logom.png";
import doc from "../../assets/img/doc.png";

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAccord: false,
      index: "",
      initial: "start",
      tab: [
        {
          paymentMethod: "Debit Card",
          activeAcc: false,
          cardType: "debit",
        },
        {
          paymentMethod: "Credit Card",
          activeAcc: false,
          cardType: "credit",
        },
      ],
      expiryDate: "",
      cardNum: "",
      errormessage: "",
      error: false,
      submit: false,
      errorField: "",
      price: [],
      cvv0: "",
      isSave0: "false",
      showSuccess: false,
      saveCard: false,
      paymentMethodId: "",
      cardType: "",
      expiryDate0: "",
      warning: false,
      promo: "",
      promoApplied: false,
      promoSubId: "",
      totalAmount: 0,
      loader: false,
      discount: 0,
    };
  }
  componentDidMount() {
    const { payableId, newSubId } = this.props;
    this.props.subscriptionPayable({
      subscriptionList: payableId.data && payableId.data.unpaidPlans,
      newSubscriptionId: newSubId,
    });
    const pprou = JSON.parse(localStorage.getItem("pprou"));
    const isSuperprovider = JSON.parse(localStorage.getItem("isSuperprovider"));
    if (pprou === true) {
      this.props.customerPaymentDetail();
      this.props.invoiceDetail();
    } else {
      // this.props.history.push("/dashboard");
    }
    if (isSuperprovider == "") {
      this.props.history.push("/dashboard");
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

  successPopupClosePopup = () => {
    this.props.tikInitialization();

    this.setState({
      deleteDraftFlag: false,
      deleteDraftData: {},
      SuccessPopupFlag: false,
      deleteSuccessFlag: false,
    });
  };
  showAccord = (i, cardType) => {
    this.updateTabs(i);
    this.setState({
      error: false,
      errorField: "",
      errormessage: "",
      expiryDate0: "",
      cardNum0: "",
      cardName0: "",
      cvv0: "",
      saveCard: false,
      isSave0: false,
      cardType,
      showAccord: true,
    });
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
    this.setState({ tab: newtabs });
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
    let sum = 0;
    const { invoiceDetailData } = this.props;
    if (prevprops.invoiceDetailData != this.props.invoiceDetailData) {
      invoiceDetailData &&
        invoiceDetailData.subscriptionList.map((e, i) => {
          const priceList = this.state.price;
          const data = priceList[i];
          const object = {
            ...data,
            ...e.subscriptionPlanDetails.specialFeatures.map((j) => j.price),
            plan:
              e.subscriptionPlanDetails.type == "pay_per_use"
                ? e.subscriptionPlanDetails.pricePerTransaction *
                  e.subscriptionPlanDetails.transactionPerMonth
                : e.subscriptionPlanDetails.planPrice,
          };
          const objSum = this.sum(object);
          priceList[i] = objSum;
          this.setState({ price: priceList });
        });
    }
    if (prevprops.cardPaymentSuccess != this.props.cardPaymentSuccess) {
      localStorage.setItem("pprou", JSON.stringify(false));
      this.setState({
        showSuccess: true,
        message: "Payment successfully completed",
        loader: false,
      });
    }
    if (prevprops.cardError != this.props.cardError) {
      localStorage.setItem("pprou", JSON.stringify(false));
      toast.error(this.props.cardError.msg);
      this.setState({
        loader: false,
      });
    }
    if (this.props.promoSuccess != prevprops.promoSuccess) {
      this.setState({ promoApplied: true, discount: this.props.promoSuccess != '' ? this.props.promoSuccess.data.validationAndPriseFilter.discout : 0});
      this.props.payableId.data.unpaidPlans.map((e) => {
        if (this.props.promoSuccess && this.props.promoSuccess.data.subscriptionPlan == e) {
          this.setState({ promoSubId: e });
        }
      });
      this.props.subscriptionPayableData.requiredToPay.map((e) => {
        sum =
          e.subscriptionPlanDetails._id ==
          this.props.promoSuccess.data.subscriptionPlan
            ? sum + e.totalCost -
              e.totalCost *
                (this.props.promoSuccess != ""
                  ? this.props.promoSuccess.data.discountPercentage / 100
                  : 1)
            : e.totalCost + sum;
      });
    console.log('SUM',sum)
      const newSubSum =
        this.props.promoSuccess != ""
          ? this.props.subscriptionPayableData.newSubscriptionDetails._id ==
            this.props.promoSuccess.data.subscriptionPlan
            ? this.props.subscriptionPayableData.newSubscriptionDetails
                .totalCost -
              (this.props.promoSuccess &&
                this.props.subscriptionPayableData.newSubscriptionDetails
                  .totalCost *
                  (this.props.promoSuccess != ""
                    ? this.props.promoSuccess.data.discountPercentage / 100
                    : 1))
            : this.props.subscriptionPayableData.newSubscriptionDetails
                .totalCost
          : this.props.subscriptionPayableData.newSubscriptionDetails.totalCost;

      let total = sum + newSubSum;
      this.setState({ totalAmount: total });
      console.log("total", total);
    }
    if (
      this.props.subscriptionPayableData != prevprops.subscriptionPayableData
    ) {
      this.props.subscriptionPayableData &&
        this.props.subscriptionPayableData.requiredToPay.map((e) => {
          sum = e.totalCost + sum;
        });
      let total =
        sum +
        this.props.subscriptionPayableData.newSubscriptionDetails.totalCost;
      console.log("total", sum);
      this.setState({ totalAmount: total });
    }
  }

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

  handleChange = (e, key) => {
    const special = /^(\s*[0-9]+\s*)+$/;
    if (this.state.submit) {
      if (key == "cardNum0" && e.target.value == "") {
        this.setState({
          errormessage: "card number is required",
          error: true,
          errorField: "cardNum0",
        });
      } else if (!special.test(e.target.value) && key == "cardNum0") {
        this.setState({
          errormessage: "only number is allowed",
          error: true,
          errorField: "cardNum0",
        });
      } else if (key == "cardNum1" && e.target.value == "") {
        this.setState({
          errormessage: "card number is required",
          error: true,
          errorField: "cardNum1",
        });
      } else if (!special.test(e.target.value) && key == "cardNum1") {
        this.setState({
          errormessage: "only number is allowed",
          error: true,
          errorField: "cardNum1",
        });
      } else if (key == "cardName0" && e.target.value == "") {
        this.setState({
          errormessage: "card name is required",
          error: true,
          errorField: "cardName0",
        });
      } else if (key == "cvv0" && e.target.value == "") {
        this.setState({
          errormessage: "CVV is required",
          error: true,
          errorField: "cvv0",
        });
      } else {
        this.setState({
          errormessage: "",
          error: false,
          errorField: "",
        });
      }
    }
    if (key == "cardNum0") {
      const cardNumber = e.target.value
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ");
      this.setState({
        cardNum0: cardNumber,
        cardNumWitoutSpace: e.target.value,
      });
    } else if (e.target.type == "checkbox") {
      this.setState({ [key]: e.target.checked });
    } else {
      this.setState({ [key]: e.target.value });
    }
  };
  handleExpiryDate = (e, key) => {
    if (this.state.submit) {
      if (key == `expiryDate0` && e == "") {
        this.setState({
          errormessage: "Expiry date is required",
          error: true,
          errorField: `expiryDate0`,
        });
      } else if (e.length < 5) {
        this.setState({
          errormessage: "Expiry date is required",
          error: true,
          errorField: `expiryDate0`,
        });
      } else {
        this.setState({
          errormessage: "",
          error: false,
          errorField: "",
        });
      }
    }
    if (e.length < 6) {
      this.setState({ [key]: e });
    }
  };
  handleSubmit = () => {
    const iscardSelected = this.state.tab.some((e) => e.activeAcc == true);
    const special = /^(\s*[0-9]+\s*)+$/;
    const { price, cvv0 } = this.state;
    this.setState({
      submit: true,
      loader: true,
    });
    const date = this.state.expiryDate0.split("/");
    const month = date[0];
    const year = `20${date[1]}`;

    if (iscardSelected) {
      if (this.state.cardNum0 == "") {
        this.setState({
          errormessage: "card number is required",
          error: true,
          errorField: "cardNum0",
        });
      } else if (!special.test(this.state.cardNum0)) {
        this.setState({
          errormessage: "only number is allowed",
          error: true,
          errorField: "cardNum0",
        });
      } else if (this.state.cardName0 == "") {
        this.setState({
          errormessage: "card name is required",
          error: true,
          errorField: "cardName0",
        });
      } else if (this.state.cvv0 == "") {
        this.setState({
          errormessage: "CVV is required",
          error: true,
          errorField: "cvv0",
        });
      } else {
        this.setState({
          errormessage: "",
          error: false,
          errorField: "",
        });

        this.props.cardPayment({
          cardNumber: this.state.cardNumWitoutSpace,
          cvc: cvv0,
          expiryYear: year,
          expiryMonth: month,
          invoiceId: this.props.invoiceDetailData._id,
          amount: this.state.totalAmount,
          paymentMethodId: "",
          isSave: this.state.isSave0,
          cardType: this.state.cardType,
          promocode: {
            code: this.state.promoSubId ? this.state.promo : "",
            subscriptionId: this.state.promoSubId,
          },
          newSubscriptionId:
            this.props.newSubId != ""
              ? this.props.newSubId
              : this.props.subscriptionPayableData.newSubscriptionDetails._id,
          requiredToPay:
            this.props.payableId && this.props.payableId.data.unpaidPlans,
        });
      }
    } else if (this.state.saveCard) {
      this.props.cardPayment({
        paymentMethodId: this.state.paymentMethodId,
        invoiceId: this.props.invoiceDetailData._id,
        amount: this.state.totalAmount,
        promocode: {
          code: this.state.promo,
          subscriptionId: this.state.promoSubId,
        },
        newSubscriptionId:
          this.props.newSubId != ""
            ? this.props.newSubId
            : this.props.subscriptionPayableData.newSubscriptionDetails._id,
        requiredToPay:
          this.props.payableId && this.props.payableId.data.unpaidPlans,
      });
    } else {
      toast.error("Please select the card");
    }
  };
  closeSuccessPopup = () => {
    this.setState({
      showSuccess: false,
    });
    this.props.history.push("/dashboard");
  };
  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };
  cardChange = (data) => {
    this.updateTabs();
    this.setState({
      error: false,
      errorField: "",
      errormessage: "",
      expiryDate0: "",
      cardNum0: "",
      cardName0: "",
      cvv0: "",
      saveCard: true,
      paymentMethodId: data.id,
      cardIndex: data.id,
    });
  };
  promoHandler = (e) => {
    this.setState({ promo: e.target.value });
  };
  promoApply = () => {
    let newReqId =
      this.props.payableId && this.props.payableId.data.unpaidPlans;
    newReqId.push(this.props.newSubId);
    this.props.promo({
      promoCode: this.state.promo,
      newSubId: [...new Set(newReqId)],
    });
  };

  render() {
    const {
      showNotification,
      logout,
      error,
      errorField,
      errormessage,
      price,
      message,
      showSuccess,
      loader,
    } = this.state;
    const { invoiceDetailData, subscriptionPayableData } = this.props;
    // subscriptionPayableData != undefined && subscriptionPayableData.map
    console.log(
      this.props.payableId,
      this.props.newSubId,
      subscriptionPayableData
    );
    const date = formatDate(
      invoiceDetailData &&
        invoiceDetailData.subscriptionList[
          invoiceDetailData.subscriptionList.length - 1
        ].createdAt
    );
    console.log(invoiceDetailData);
    return (
      <>
        <HeaderWithoutSearch />
        <div id="payment" class="wrapper">
          <div class="row">
            <div class="col-xl-12">
              <div
                class="containerBox p-0"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <div class="row" style={{ minHeight: "83vh" }}>
                  <div
                    id="createTemplateleft"
                    class="col-xl-8 col-lg-8 col-sm-12 border-right py-4 pl-5"
                  >
                    {/* <!-- <div class="fixHeight" style="min-height: calc(100vh - 280px);position: relative;"> --> */}
                    <div>
                      <div id="paymentGateway">
                        <div class="row">
                          <div class="col-xl-12">
                            <div class="table-title d-flex justify-content-between align-items-center mb-4">
                              <h2 class="f-b m-0">Your Card</h2>
                            </div>
                            <div>
                              <div class="row">
                                <div class="col-md-8">
                                  <div class="row">
                                    <div class="col-lg-3">
                                      <h4 class="f-16 f-b">Name</h4>
                                    </div>
                                    <div class="col-lg-9">
                                      <h4 class="f-16 f-r">
                                        {invoiceDetailData &&
                                          `${invoiceDetailData.providerDetails.firstName} ${invoiceDetailData.providerDetails.lastName}`}
                                      </h4>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-lg-3">
                                      <h4 class="f-16 f-b">Email Address</h4>
                                    </div>
                                    <div class="col-lg-9">
                                      <h4 class="f-16 f-r">
                                        {invoiceDetailData &&
                                          invoiceDetailData.providerDetails
                                            .email}
                                      </h4>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-lg-3">
                                      <h4 class="f-16 f-b">
                                        Subscription Date
                                      </h4>
                                    </div>
                                    <div class="col-lg-9">
                                      <h4 class="f-16 f-r">{date}</h4>
                                    </div>
                                  </div>
                                  <div class="row">
                                    <div class="col-lg-3">
                                      <h4 class="f-16 f-b">Validity</h4>
                                    </div>
                                    <div class="col-lg-9">
                                      <h4 class="f-16 f-r">1 month</h4>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-md-4">
                                  <div className="row">
                                    <div
                                      className="col-lg-3"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <label>Promo</label>
                                    </div>
                                    <div className="col-lg-9">
                                      <input
                                        type="text"
                                        class="form-control f-16 px-3 py-2"
                                        onChange={this.promoHandler}
                                      />
                                      <div
                                        className="mx-auto mt-2"
                                        style={{ width: "50%" }}
                                      >
                                        <a
                                          onClick={
                                            this.state.promoApplied
                                              ? null
                                              : this.promoApply
                                          }
                                          data-toggle="modal"
                                          data-target="#activation"
                                          className={
                                            this.state.promoApplied
                                              ? "disabled btn btn-org w-100 text-center mx-auto d-block"
                                              : "btn btn-org w-100 text-center mx-auto d-block"
                                          }
                                        >
                                          Apply
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="row org-border my-2 mx-1 br-6 p-3">
                                <div class="col-lg-4">
                                  <h4 class="f-16 f-b">Product ID</h4>
                                  <h4 class="f-16 f-r">
                                    {/* {invoiceDetailData &&
                                      invoiceDetailData.subscriptionList[
                                        invoiceDetailData.subscriptionList
                                          .length - 1
                                      ].subscriptionPlanDetails._id} */}
                                    {subscriptionPayableData &&
                                      subscriptionPayableData
                                        .newSubscriptionDetails._id}
                                  </h4>
                                </div>
                                <div class="col-lg-4">
                                  <h4 class="f-16 f-b">Product Name</h4>
                                  <h4 class="f-16 f-r">
                                    {/* {invoiceDetailData &&
                                      invoiceDetailData.subscriptionList[
                                        invoiceDetailData.subscriptionList
                                          .length - 1
                                      ].subscriptionPlanDetails.planName} */}
                                    {subscriptionPayableData &&
                                      subscriptionPayableData
                                        .newSubscriptionDetails.planName}
                                  </h4>
                                </div>
                                <div class="col-lg-4">
                                  <h4 class="f-16 f-b">Amount</h4>
                                  <h4 class="f-16 f-r">
                                    $
                                    {/* {subscriptionPayableData &&
                                      subscriptionPayableData
                                        .newSubscriptionDetails.totalCost} */}
                                    {this.props.promoSuccess != ""
                                      ? this.props.subscriptionPayableData
                                          .newSubscriptionDetails._id ==
                                        this.props.promoSuccess.data
                                          .subscriptionPlan
                                        ? this.props.subscriptionPayableData
                                            .newSubscriptionDetails.totalCost -
                                          (this.props.promoSuccess &&
                                            this.props.subscriptionPayableData
                                              .newSubscriptionDetails
                                              .totalCost *
                                              (this.props.promoSuccess != ""
                                                ? this.props.promoSuccess.data
                                                    .discountPercentage / 100
                                                : 1))
                                        : this.props.subscriptionPayableData &&
                                          this.props.subscriptionPayableData
                                            .newSubscriptionDetails.totalCost
                                      : this.props.subscriptionPayableData &&
                                        this.props.subscriptionPayableData
                                          .newSubscriptionDetails.totalCost}
                                  </h4>
                                </div>
                              </div>
                              {subscriptionPayableData &&
                                subscriptionPayableData.requiredToPay.map(
                                  (e) => {
                                    return (
                                      <>
                                        <div class="row org-border my-2 mx-1 br-6 p-3">
                                          <div class="col-lg-4">
                                            <h4 class="f-16 f-b">Product ID</h4>
                                            <h4 class="f-16 f-r">
                                              {/* {invoiceDetailData &&
                                    invoiceDetailData.subscriptionList[
                                      invoiceDetailData.subscriptionList
                                        .length - 1
                                    ].subscriptionPlanDetails._id} */}
                                              {e._id}
                                            </h4>
                                          </div>
                                          <div class="col-lg-4">
                                            <h4 class="f-16 f-b">
                                              Product Name
                                            </h4>
                                            <h4 class="f-16 f-r">
                                              {/* {invoiceDetailData &&
                                    invoiceDetailData.subscriptionList[
                                      invoiceDetailData.subscriptionList
                                        .length - 1
                                    ].subscriptionPlanDetails.planName} */}
                                              {
                                                e.subscriptionPlanDetails
                                                  .planName
                                              }
                                            </h4>
                                          </div>
                                          <div class="col-lg-4">
                                            <h4 class="f-16 f-b">Amount</h4>
                                            <h4 class="f-16 f-r">
                                              $
                                              {this.props.promoSuccess != ""
                                                ? e.subscriptionPlanDetails
                                                    ._id ==
                                                  this.props.promoSuccess.data
                                                    .subscriptionPlan
                                                  ? e.totalCost -
                                                    (this.props.promoSuccess &&
                                                      e.totalCost *
                                                        (this.props
                                                          .promoSuccess != ""
                                                          ? this.props
                                                              .promoSuccess.data
                                                              .discountPercentage /
                                                            100
                                                          : 1))
                                                  : e.totalCost
                                                : e.totalCost}
                                            </h4>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  }
                                )}
                              <div class="row">
                                <div class="col-lg-3">
                                  <h4 class="f-16 f-b">Discount</h4>
                                </div>
                                <div class="col-lg-9">
                                  <h4 class="f-16 f-r">
                                    
                                    {/* {subscriptionPayableData &&
                                      subscriptionPayableData.totalCost - (subscriptionPayableData && this.props.promoSuccess &&
                                      subscriptionPayableData.totalCost * (this.props.promoSuccess != '' ? (this.props.promoSuccess.data.discountPercentage/100):1))} */}
                                    {`$ ${this.state.discount}`}
                                  </h4>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-lg-3">
                                  <h4 class="f-16 f-b">Total Amount</h4>
                                </div>
                                <div class="col-lg-9">
                                  <h4 class="f-16 f-r">
                                    $
                                    {/* {subscriptionPayableData &&
                                      subscriptionPayableData.totalCost - (subscriptionPayableData && this.props.promoSuccess &&
                                      subscriptionPayableData.totalCost * (this.props.promoSuccess != '' ? (this.props.promoSuccess.data.discountPercentage/100):1))} */}
                                    {this.state.totalAmount}
                                  </h4>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="createTemplateright"
                    class="col-xl-4 col-lg-4 col-sm-12"
                    style={{ paddingLeft: "33px" }}
                  >
                    <div class="table-title d-flex justify-content-between align-items-center mt-3 mb-4">
                      <h2 class="f-b m-0">Select Payment Method</h2>
                    </div>
                    <div class="d-flex justify-content-between flex-column">
                      <div
                        class="pr-3 br-6 mr-2 "
                        style={{
                          maxHeight: "calc(100vh - 230px)",
                          overflowY: "auto",
                        }}
                      >
                        <h4>Saved Cards</h4>
                        {this.props.cardDetails &&
                          this.props.cardDetails.map((e, index) => {
                            return (
                              <div class="custom-control custom-radio org-border br-6 my-1 p-2">
                                <input
                                  type="radio"
                                  class="custom-control-input"
                                  id={e.id}
                                  name="radio-stacked"
                                  onChange={() => this.cardChange(e)}
                                  checked={
                                    this.state.saveCard &&
                                    this.state.cardIndex == e.id
                                      ? true
                                      : false
                                  }
                                />
                                <label
                                  class="custom-control-label radio-custom"
                                  for={e.id}
                                >
                                  {e.card.funding} Card &nbsp;&nbsp;&nbsp;&nbsp;
                                  <b>XXXX XXXX XXXX {e.card.last4}</b>
                                </label>
                              </div>
                            );
                          })}
                        <div id="accordion1" class="mt-2">
                          {/* <!-- <div class="middle-line">
                                        <div class="mCircle mx-auto mb-4"></div>
                                    </div> --> */}
                          {this.state.tab &&
                            this.state.tab.map((e, i) => {
                              return (
                                <div class="card">
                                  <div class="card-header" id="headingOne">
                                    <h5
                                      class="m-0 d-flex justify-content-between align-items-center"
                                      style={{ fontSize: "12px" }}
                                    >
                                      <div>
                                        <h5
                                          class="f-20 f-m"
                                          style={{ marginBottom: "0px" }}
                                        >
                                          {e.paymentMethod}
                                        </h5>
                                      </div>
                                      <a
                                        onClick={() =>
                                          this.showAccord(i, e.cardType)
                                        }
                                        data-toggle="collapse"
                                        data-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                      >
                                        {e.activeAcc ? (
                                          <i class="fa fa-angle-down"></i>
                                        ) : (
                                          <i class="fa fa-angle-right"></i>
                                        )}
                                      </a>
                                    </h5>
                                  </div>

                                  <div
                                    id="collapseOne"
                                    class={
                                      e.activeAcc ? "collapse show" : "collapse"
                                    }
                                    aria-labelledby="headingOne"
                                    data-parent="#accordion1"
                                  >
                                    <div class="card-body">
                                      <div class="form-group row align-items-center">
                                        <label class="col-sm-4 col-form-label f-18 f-m">
                                          Card Number
                                        </label>
                                        <div class="col-sm-8">
                                          <input
                                            id="cardNum"
                                            type="text"
                                            class="form-control f-16"
                                            placeholder="Enter Card Number"
                                            onChange={(e) =>
                                              this.handleChange(e, `cardNum0`)
                                            }
                                            maxlength="19"
                                            value={this.state.cardNum0}
                                          />
                                          {error && errorField == `cardNum0` ? (
                                            <div style={{ color: "red" }}>
                                              {errormessage}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>

                                      <div class="form-group row align-items-center">
                                        <label class="col-sm-4 col-form-label f-18 f-m">
                                          Name on Card
                                        </label>
                                        <div class="col-sm-8">
                                          <input
                                            type="text"
                                            class="form-control f-16"
                                            placeholder="Enter Card Name"
                                            onChange={(e) =>
                                              this.handleChange(e, `cardName0`)
                                            }
                                            value={this.state.cardName0}
                                          />
                                          {error &&
                                          errorField == `cardName0` ? (
                                            <div style={{ color: "red" }}>
                                              {errormessage}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div class="form-group row align-items-center">
                                        <label
                                          for=""
                                          class="col-sm-4 col-form-label f-18 f-m"
                                        >
                                          Expiry Date
                                        </label>
                                        <div class="col-sm-8">
                                          <ExpiryDateInput
                                            label="Expiry Date"
                                            onChange={(e) =>
                                              this.handleExpiryDate(
                                                e,
                                                `expiryDate0`
                                              )
                                            }
                                            value={this.state.expiryDate0}
                                            disabled={false}
                                            onBlur={(e) =>
                                              this.handleExpiryDate(
                                                e,
                                                `expiryDate0`
                                              )
                                            }
                                          />
                                          {error &&
                                          errorField == `expiryDate0` ? (
                                            <div style={{ color: "red" }}>
                                              {errormessage}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div class="form-group row align-items-center">
                                        <label
                                          for=""
                                          class="col-sm-4 col-form-label f-18 f-m"
                                        >
                                          CVV
                                        </label>
                                        <div class="col-sm-8">
                                          <input
                                            type="text"
                                            class="form-control f-16"
                                            id=""
                                            placeholder="Enter CVV Number"
                                            onChange={(e) =>
                                              this.handleChange(e, `cvv0`)
                                            }
                                            maxlength="3"
                                            value={this.state.cvv0}
                                          />
                                          {error && errorField == `cvv0` ? (
                                            <div style={{ color: "red" }}>
                                              {errormessage}
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                      <div class="custom-control custom-checkbox check-dipend">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id={i}
                                          name="example1"
                                          onChange={(e) =>
                                            this.handleChange(e, `isSave0`)
                                          }
                                          checked={this.state.isSave0}
                                        />
                                        <label
                                          class="custom-control-label f-16 f-m pl-2"
                                          for={i}
                                        >
                                          Save card for future transactions
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                        <div class="clearfix"></div>
                        <div class="col mb-2">
                          <a
                            onClick={this.handleSubmit}
                            data-toggle="modal"
                            data-target="#activation"
                            class="btn btn-org w-70 text-center mx-auto d-block"
                          >
                            {loader ? (
                              <i class="fa fa-refresh fa-spin"></i>
                            ) : (
                              "Pay"
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    invoiceDetailData: state.Subscription.invoiceDetail,
    cardDetails: state.Payment.cardDetails,
    cardPaymentSuccess: state.Payment.cardPaymentSuccess,
    cardError: state.Payment.cardError,
    subscriptionPayableData: state.Subscription.subscriptionPayableData,
    payableId: state.Subscription.payableId,
    newSubId: state.Subscription.newSubId,
    promoSuccess: state.Subscription.promoSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  customerPaymentDetail: () => dispatch(actions.customerPaymentDetail()),
  invoiceDetail: () => dispatch(actions.invoiceDetail()),
  cardPayment: (payload) => dispatch(actions.cardPayment(payload)),
  subscriptionPayable: (payload) =>
    dispatch(actions.subscriptionPayable(payload)),
  promo: (payload) => dispatch(actions.promo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
