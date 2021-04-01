/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
  HeaderWithoutSearch
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { formatTime, formatDate } from "../../helper/utility.js";
import moment from "moment";
import { Link } from "react-router-dom";
import { Images } from "../../assets/images";
import SuccessModal from "../../component/SuccessModal.jsx";
import Loader from "../../component/Loader.jsx";
import { toast } from "react-toastify";
import search from '../../assets/img/search.png'
class Faq extends Component {
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
      tabList: [],
      loader: false,
      keyword: "",
    };
  }
  componentDidMount() {
    this.props.faq();
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
      }
      // else {
      //   tab.activeAcc = false;
      // }
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
    console.log(prevprops.faqSuccess.length > 0);
    if (prevprops.faqSuccess != this.props.faqSuccess) {
      this.setState({ loader: false });
      console.log(this.props.faqSuccess);
      this.props.faqSuccess.length > 0
        ? this.props.faqSuccess.map((o, l) => {
            console.log(o);
            console.log(this.state.tab);
            const u = this.state.tab;
            const v = u[l];
            const obj = {
              ...v,
              activeAcc: false,
              at: o.createdAt,
              question: o.question,
              answer: o.answer,
            };
            u[l] = obj;
            this.setState({ tab: u });
          })
        : this.setState({ tab: [] });
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

  search = (e) => {
    console.log(e.target.value);
    this.setState({ keyword: e.target.value });
    const iChars = "%^`~\\/{}|\":''";
    const special = /[*|\":<>[\]{}`\\'^%]/;
    console.log(!iChars.includes(this.state.keyword), this.state.keyword);
    if (!special.test(e.target.value) || e.target.value == "") {
      this.props.faqSearch({ keyword: e.target.value });
      this.setState({ tab: [], loader: true });
    } else {
      toast.error("Special characters are not allowed");
    }
  };
  render() {
    const {
      state: { showNotification, logout, price, showSuccess, message, loader },
      props: { subscriptionData, myPlan },
    } = this;
    console.log(this.state.tab);
    return (
      <>
      <HeaderWithoutSearch/>
        <div id="content" class="container my-5 selectTemp">
          <div class="row">
            <div class="offset-lg-2 col-lg-8 col-md-12 d-flex align-items-center justify-content-center flex-column f-m mt-5">
              <h1 class="text-center txt-blk mb-4 f-b">FAQs</h1>
              <form
                role="search"
                class="search navbar-form-custom form-inline"
                onSubmit={(e) => e.preventDefault()}
              >
                <div class="form-group dropdown">
                  <img
                    className="searchImg"
                    src={Images.search}
                    style={{ zIndex: "9999" }}
                    src={search}
                  />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    class="form-control pl-5"
                    name="top-search"
                    id="top-search"
                    onChange={this.search}
                  />
                </div>
                {/* <a type="submit" class="btn btn-primary f-18 ml-2 f-m px-4">
                  Search
                </a> */}
              </form>
            </div>
            <div class="offset-lg-2 col-lg-8 col-md-12 box-shd br-20 mt-5 mb-5">
              <div
                class="col my-5 selectTemplate fixHeight"
                style={{ minHeight: "450px" }}
              >
                <div id="accordion1" class="mt-2">
                  {!loader ? (
                    this.state.tab.length > 0 ? (
                      this.state.tab.map((e, i) => {
                        return (
                          <div class="card">
                            <div class="card-header" id="headingOne">
                              <h5
                                class="m-0 d-flex justify-content-between align-items-center"
                                style={{ fontSize: "12px" }}
                              >
                                <div>
                                  <h5 class="f-20 f-m">{e.question}?</h5>
                                </div>
                                <a
                                  onClick={() => this.showAccord(i)}
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
                              class={e.activeAcc ? "collapse show" : "collapse"}
                              aria-labelledby="headingOne"
                              data-parent="#accordion1"
                            >
                              <div class="card-body">{e.answer}</div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ textAlign: "center" }}>No data found</div>
                    )
                  ) : (
                    <Loader />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    faqSuccess: state.User.faqSuccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  faq: () => dispatch(actions.faq()),
  faqSearch: (payload) => dispatch(actions.faqSearch(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
