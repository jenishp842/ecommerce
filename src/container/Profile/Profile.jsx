/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
  HeaderWithoutSearch,
} from "../../component/index.jsx";
import { connect } from "react-redux";
import * as actions from "../../actions";
import SuccessModal from "../../component/SuccessModal.jsx";
import MobileUpdateModal from "./MobileUpdateModal.jsx";
import MobileOtpModal from "./MobileOtpModal.jsx";
import { toast } from "react-toastify";
import { formatTime, formatDate } from "../../helper/utility.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cam from "../../assets/img/cam.png"
import user from "../../assets/img/user.png";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      showNotification: false,
      logout: false,
      tabActive: "Personal",
      updateBtn: false,
      firstName: "",
      lastName: "",
      designation: "",
      companyName: "",
      address: "",
      showSuccess: false,
      message: "",
      coverImage: "",
      imageURL: "",
      mobileNumberUpdate: false,
      MobileOtpPopup: false,
      errormessage: "",
      error: false,
      submit: false,
      errorField: "",
      loader: false,
      userLimit: "",
      isInfinite: false,
      referalPopup: false,
      isCardRemove: false,
      cardId: ''
    };
  }
  componentDidMount() {
    this.props.profile();
    this.props.customerPaymentDetail();
    this.props.getMyPlan();
  }

  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.profileUpdateSuccess != this.props.profileUpdateSuccess) {
      this.setState({
        showSuccess: true,
        message: "Profile edited successfully",
        updateBtn: false,
        loader: false,
      });
      this.props.profile();
    }
    if (prevProps.cardRemoveSuccess != this.props.cardRemoveSuccess) {
      this.setState({
        showSuccess: true,
        message: "Card removed successfully",
        loader: false,
      });
    }
    if (prevProps.myPlan != this.props.myPlan) {
      this.props.specialFeatures.map((e) => {
        if (e.featureName == "user_management") {
          this.setState({
            userLimit: e.limit,
            isInfinite: e.isInfinite,
          });
        }
      });
    }
    if(prevProps.transactionDetailSuccess != this.props.transactionDetailSuccess){
      this.props.history.push('/invoice')
  }
  }
  closeSuccessPopup = () => {
    this.setState({ showSuccess: false });
    this.props.customerPaymentDetail();
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

  activeTab = (activeName) => {
    this.setState({
      tabActive: activeName,
    });
  };
  updateToggle = () => {
    this.setState({
      updateBtn: true,
    });
  };
  handleChange = (e, key) => {
    const special = /^[a-zA-Z]+$/;
    this.props.profileEdit({ e, key });
    if (this.state.submit) {
      if (key == "firstName" && e.target.value == "") {
        this.setState({
          errormessage: "First name is required",
          error: true,
          errorField: "firstName",
        });
      } else if (key == "firstName" && !special.test(e.target.value)) {
        this.setState({
          errormessage: "Only character is allowed",
          error: true,
          errorField: "firstName",
        });
      } else if (key == "lastName" && e.target.value == "") {
        this.setState({
          errormessage: "Last name is required",
          error: true,
          errorField: "lastName",
        });
      } else if (key == "lastName" && !special.test(e.target.value)) {
        this.setState({
          errormessage: "Only character is allowed",
          error: true,
          errorField: "lastName",
        });
      } else if (key == "address" && e.target.value == "") {
        this.setState({
          errormessage: "Address is required",
          error: true,
          errorField: "address",
        });
      } else if (key == "designation" && e.target.value == "") {
        this.setState({
          errormessage: "Designation is required",
          error: true,
          errorField: "designation",
        });
      } else {
        this.setState({ errormessage: "", error: false, errorField: "" });
      }
    }
  };

  handleSubmit = () => {
    const { firstName, lastName, designation, address } = this.props;
    const special = /^[a-zA-Z]+$/;
    const trimAddress = address.trim();
    this.setState({
      submit: true,
    });
    if (this.props.firstName == "") {
      this.setState({
        errormessage: "Firstname is required",
        error: true,
        errorField: "First Name",
      });
    } else if (!special.test(this.props.firstName)) {
      this.setState({
        errormessage: "Only character is allowed",
        error: true,
        errorField: "firstName",
      });
    } else if (this.props.lastName == "") {
      this.setState({
        errormessage: "Last Name is required",
        error: true,
        errorField: "lastName",
      });
    } else if (!special.test(this.props.lastName)) {
      this.setState({
        errormessage: "Only character is allowed",
        error: true,
        errorField: "lastName",
      });
    } else if (trimAddress == "") {
      this.setState({
        errormessage: "Address is required",
        error: true,
        errorField: "address",
      });
    } else if (this.props.designation == "") {
      this.setState({
        errormessage: "Designation is required",
        error: true,
        errorField: "designation",
      });
    } else {
      this.setState({ loader: true });
      this.props.profileUpdate({
        firstName,
        lastName,
        designation,
        address,
        photoData: this.state.coverImage ? this.state.coverImage : null,
      });
    }

    // this.props.profilePic({photoData: this.state.coverImage ? this.state.coverImage : null})
  };
  imageChangeHandler = (e) => {
    if (
      !e.target.files[0].name.split(".").includes("jpg") &&
      !e.target.files[0].name.split(".").includes("jpeg") &&
      !e.target.files[0].name.split(".").includes("png")
    ) {
      toast.error("Only jpg,jpeg,png files are supported");
    } else {
      this.props.profilePic({
        photoData: e.target.files[0] ? e.target.files[0] : null,
      });
      this.setState({
        imageURL: URL.createObjectURL(e.target.files[0]),
        coverImage: e.target.files[0],
      });
    }
  };
  closePopup = () => {
    document.body.classList.remove("modal-open");
    this.setState({
      mobileNumberUpdate: false,
    });
  };
  mobileUpdateHandler = () => {
    this.setState({
      mobileNumberUpdate: true,
    });
  };
  mobileOtpModalClose = () => {
    this.setState({
      MobileOtpPopup: false,
    });
  };
  confirmMobileUpdate = () => {
    this.setState({
      mobileNumberUpdate: false,
      showSuccess: true,
      message: "Phone number updated successfully",
    });
  };
  removeCard = () => {
    this.props.cardRemove({ cardId: this.state.cardId });
    this.setState({isCardRemove: false})
  };
  showReferalPopup = () => {
    this.setState({ referalPopup: true });
  };
  closeReferalPopup = () => {
    this.setState({ referalPopup: false });
  };
  closeCardPopup = () => {
    this.setState({ isCardRemove: false})
  }
  removeCardPopup = (id) => {
    this.setState({ cardId: id,isCardRemove: true });
  }
  render() {
    const {
      showNotification,
      logout,
      tabActive,
      updateBtn,
      showSuccess,
      message,
      mobileNumberUpdate,
      MobileOtpPopup,
      errorField,
      errormessage,
      error,
      loader,
      referalPopup,
      isCardRemove,
    } = this.state;
    const {
      firstName,
      lastName,
      designation,
      mobileNumber,
      companyName,
      email,
      address,
      role,
      document,
      invoice,
      payment,
      template,
      updatedAt,
      userFirstname,
      userLastname,
      roleName,
      rolerole,
      roledocument,
      roleinvoice,
      rolepayment,
      roletemplate,
      myPlan,
      invitationCode,
      referralDetails,
    } = this.props;
    const date = formatDate(updatedAt);
    const time = formatTime(updatedAt);
    return (
      <>
      <HeaderWithoutSearch/>
        <div id="content" class="container-fluid my-5">
          <div class="row">
            <div class="col">
              <div class="containerBox mb-5 px-0" id="profile">
                <div class="offset-lg-2 col-lg-8 col-md-12 d-flex flex-wrap f-m mb-5">
                  <div class="pro-container">
                    <img
                      class="img-fluid img-circle"
                      src={
                        this.props.photoData != ""
                          ? this.state.imageURL
                            ? this.state.imageURL
                            : this.props.photoData
                          : this.state.imageURL != ""
                          ? this.state.imageURL
                          : user
                      }
                    />
                    <div class="camera">
                      <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        multiple={false}
                        onChange={this.imageChangeHandler}
                      />
                      <img class="img-fluid" src={cam} />
                    </div>
                  </div>
                  <div class="pro-detail ml-4 mt-4">
                    <h5 class="f-24 f-b">
                      {userFirstname != undefined
                        ? `${userFirstname} ${userLastname}`
                        : ""}{" "}
                    </h5>
                    <h5 class="f-20 f-m my-2">
                      {email != undefined ? email : ""}{" "}
                    </h5>
                    <h5 class="f-20 f-m">
                      {companyName != undefined ? companyName : ""}
                    </h5>
                  </div>
                </div>
                <div class="offset-lg-2 col-lg-8">
                  <nav id="profile-tab">
                    <div
                      class="nav nav-tabs d-flex justify-content-between"
                      id="nav-tab"
                      role="tablist"
                    >
                      <a
                        className={
                          tabActive == "Personal"
                            ? "nav-item f-m nav-link active"
                            : "nav-item f-m nav-link"
                        }
                        data-toggle="tab"
                        role="tab"
                        onClick={() => {
                          this.activeTab("Personal"), this.props.profile();
                        }}
                      >
                        Personal
                      </a>
                      <a
                        className={
                          tabActive == "Roles"
                            ? "nav-item f-m nav-link active"
                            : "nav-item f-m nav-link"
                        }
                        data-toggle="tab"
                        role="tab"
                        onClick={() => this.activeTab("Roles")}
                      >
                        Roles & Responsibilities
                      </a>
                      <a
                        className={
                          tabActive == "Subscription"
                            ? "nav-item f-m nav-link active"
                            : "nav-item f-m nav-link"
                        }
                        data-toggle="tab"
                        role="tab"
                        onClick={() => this.activeTab("Subscription")}
                      >
                        Subscription
                      </a>
                      <a
                        className={
                          tabActive == "Security"
                            ? "nav-item f-m nav-link active"
                            : "nav-item f-m nav-link"
                        }
                        data-toggle="tab"
                        role="tab"
                        onClick={() => this.activeTab("Security")}
                      >
                        Security
                      </a>
                    </div>
                  </nav>
                </div>
                <hr />
                <div class="offset-lg-2 col-lg-8">
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      className={
                        tabActive == "Personal"
                          ? "tab-pane fade show active"
                          : "tab-pane fade show"
                      }
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div id="profile1" class="wrapper">
                        <div class="row">
                          <div class="col-xl-12 mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                              <h2 class="f-b m-0 f-20">
                                My Personal Information
                              </h2>
                            </div>
                            <div class="">
                              <div class="row mb-2">
                                <div class="col-lg-3">
                                  <h4 class="f-16 f-b">First Name</h4>
                                </div>
                                <div class="col-lg-6">
                                  <input
                                    type="text"
                                    className={
                                      updateBtn
                                        ? "w-100 f-16 f-r"
                                        : "w-100 f-16 f-r read"
                                    }
                                    placeholder=""
                                    value={
                                      firstName != undefined ? firstName : ""
                                    }
                                    onChange={(e) =>
                                      this.handleChange(e, "firstName")
                                    }
                                  />
                                </div>
                              </div>
                              {error && errorField == "firstName" ? (
                                <div className="input-feedback-profile">
                                  {errormessage}
                                </div>
                              ) : null}
                              <div class="row mb-2">
                                <div class="col-lg-3">
                                  <h4 class="f-16 f-b">Last Name</h4>
                                </div>
                                <div class="col-lg-6">
                                  <input
                                    type="text"
                                    className={
                                      updateBtn
                                        ? "w-100 f-16 f-r"
                                        : "w-100 f-16 f-r read"
                                    }
                                    placeholder=""
                                    value={
                                      lastName != undefined ? lastName : ""
                                    }
                                    onChange={(e) =>
                                      this.handleChange(e, "lastName")
                                    }
                                  />
                                </div>
                              </div>
                              {error && errorField == "lastName" ? (
                                <div className="input-feedback-profile">
                                  {errormessage}
                                </div>
                              ) : null}
                              <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Email Address</h4>
                                </div>
                                <div class="col-lg-6 ">
                                  <h4 class="f-16 f-r ">
                                    {email != undefined ? email : ""}
                                  </h4>
                                </div>
                              </div>
                              <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Phone Number</h4>
                                </div>
                                <div class="col-lg-6 ">
                                  <h4 class="f-16 f-r ">
                                    {mobileNumber != undefined
                                      ? mobileNumber
                                      : ""}
                                  </h4>
                                </div>
                              </div>
                              <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Address</h4>
                                </div>
                                <div class="col-lg-6 ">
                                  <input
                                    type="text"
                                    className={
                                      updateBtn
                                        ? "w-100 f-16 f-r"
                                        : "w-100 f-16 f-r read"
                                    }
                                    placeholder=""
                                    value={address != undefined ? address : ""}
                                    onChange={(e) =>
                                      this.handleChange(e, "address")
                                    }
                                  />
                                </div>
                              </div>
                              {error && errorField == "address" ? (
                                <div className="input-feedback-profile">
                                  {errormessage}
                                </div>
                              ) : null}
                              <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Company Name</h4>
                                </div>
                                <div class="col-lg-6 ">
                                  <input
                                    type="text"
                                    className="w-100 f-16 f-r read"
                                    placeholder=""
                                    value={
                                      companyName != undefined
                                        ? companyName
                                        : ""
                                    }
                                    // onChange={(e) => this.handleChange(e,'companyName')}
                                  />
                                </div>
                              </div>
                              <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Designation</h4>
                                </div>
                                <div class="col-lg-6 ">
                                  <input
                                    type="text"
                                    className={
                                      updateBtn
                                        ? "w-100 f-16 f-r"
                                        : "w-100 f-16 f-r read"
                                    }
                                    placeholder=""
                                    value={
                                      designation != undefined
                                        ? designation
                                        : ""
                                    }
                                    onChange={(e) =>
                                      this.handleChange(e, "designation")
                                    }
                                  />
                                </div>
                              </div>
                              {error && errorField == "designation" ? (
                                <div className="input-feedback-profile">
                                  {errormessage}
                                </div>
                              ) : null}
                              {this.props.showReferral ? <div class="row  mb-2">
                                <div class="col-lg-3 ">
                                  <h4 class="f-16 f-b ">Referral Code</h4>
                                </div>
                                <div class="col-lg-6 ">
                                <CopyToClipboard
                                    text={invitationCode}
                                    onCopy={() =>
                                      toast.success("Referral copied")
                                    }
                                  >
                                  <a
                                    id="copyButton"
                                    class="d-inline-block bg-muted br-6 copy-mute"
                                  >
                                    <i class="fa fa-copy "></i>
                                  </a>
                                  </CopyToClipboard>
                               
                                    <span id="copyTarget" class="refcode">
                                      {invitationCode}
                                    </span>
                                  <br />
                                  <a
                                    data-toggle="modal"
                                    data-target="#refViews"
                                    onClick={this.showReferalPopup}
                                  >
                                    <small class="text-muted font-italic">
                                      <span>
                                        `{referralDetails.complete}/
                                        {referralDetails.require}`
                                      </span>
                                      Referrals to get bonus
                                    </small>
                                  </a>
                                </div>
                              </div>:null}
                            </div>
                            <div class="mt-4 ">
                              {updateBtn ? null : (
                                <a
                                  onClick={this.updateToggle}
                                  class="edit btn btn-default w-50 "
                                >
                                  Edit
                                </a>
                              )}
                              {updateBtn ? (
                                <a
                                  onClick={this.handleSubmit}
                                  class="update btn btn-default w-50"
                                  data-toggle="modal"
                                  data-target="#updatedProfile"
                                >
                                  {loader ? (
                                    <i class="fa fa-refresh fa-spin"></i>
                                  ) : (
                                    "Update"
                                  )}
                                </a>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tabActive == "Roles"
                          ? "tab-pane fade show active"
                          : "tab-pane fade show"
                      }
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div id="profile2" class="wrapper">
                        <div class="row">
                          <div class="col-xl-12 mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                              <h2 class="f-b m-0 f-20">
                                Roles & Responsibilities
                              </h2>
                            </div>
                            <div class="">
                              <div class="row mb-2">
                                <div class="col-lg-3">
                                  <h4 class="f-18 f-r">Role</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4
                                    class="f-18 f-b"
                                    style={{ marginLeft: "-12px" }}
                                  >
                                    {roleName}
                                  </h4>
                                </div>
                              </div>
                              <div class="row  mb-2">
                                <div class="col-lg-12 row align-items-center">
                                  <label class="col-sm-3 col-form-label justify-content-start f-18 f-m">
                                    Roles
                                  </label>
                                  <div class="col-sm-6">
                                    <form class="d-flex flex-wrap">
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck112"
                                          name="example1"
                                          checked={
                                            role != null && rolerole != null
                                              ? role.create || rolerole.create
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck112"
                                        >
                                          Create
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck1121"
                                          name="example1"
                                          checked={
                                            role != null && rolerole != null
                                              ? role.delete || rolerole.delete
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck1121"
                                        >
                                          Delete
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck1123"
                                          name="example1"
                                          checked={
                                            role != null && rolerole != null
                                              ? role.update || rolerole.update
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck1123"
                                        >
                                          Edit
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11232"
                                          name="example1"
                                          checked={
                                            role != null && rolerole != null
                                              ? role.view || rolerole.view
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11232"
                                        >
                                          View
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div class="row  mb-2">
                                <div class="col-lg-12 row align-items-center">
                                  <label class="col-sm-3 col-form-label justify-content-start f-18 f-m">
                                    Tik
                                  </label>
                                  <div class="col-sm-6">
                                    <form class="d-flex flex-wrap">
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck1122"
                                          name="example1"
                                          checked={
                                            document != null &&
                                            roledocument != null
                                              ? document.create ||
                                                roledocument.create
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck1122"
                                        >
                                          Create
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11212"
                                          name="example1"
                                          checked={
                                            document != null &&
                                            roledocument != null
                                              ? document.update ||
                                                roledocument.update
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11212"
                                        >
                                          Update
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11232"
                                          name="example1"
                                          checked={
                                            document != null &&
                                            roledocument != null
                                              ? document.view ||
                                                roledocument.view
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11232"
                                        >
                                          View
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div class="row  mb-2">
                                <div class="col-lg-12 row align-items-center">
                                  <label class="col-sm-3 col-form-label justify-content-start f-18 f-m">
                                    Templates
                                  </label>
                                  <div class="col-sm-6">
                                    <form class="d-flex flex-wrap">
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck1122"
                                          name="example1"
                                          checked={
                                            template != null &&
                                            roletemplate != null
                                              ? template.create ||
                                                roletemplate.create
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck1122"
                                        >
                                          Create
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11212"
                                          name="example1"
                                          checked={
                                            template != null &&
                                            roletemplate != null
                                              ? template.delete ||
                                                roletemplate.delete
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11212"
                                        >
                                          Delete
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11232"
                                          name="example1"
                                          checked={
                                            template != null &&
                                            roletemplate != null
                                              ? template.update ||
                                                roletemplate.update
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11232"
                                        >
                                          Edit
                                        </label>
                                      </div>
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck112312"
                                          name="example1"
                                          checked={
                                            template != null &&
                                            roletemplate != null
                                              ? template.view ||
                                                roletemplate.view
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck112312"
                                        >
                                          View
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div class="row  mb-2">
                                <div class="col-lg-12 row align-items-center">
                                  <label class="col-sm-3 col-form-label justify-content-start f-18 f-m">
                                    Invoice
                                  </label>
                                  <div class="col-sm-6">
                                    <form class="d-flex flex-wrap">
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheckq1122"
                                          name="example1"
                                          checked={
                                            invoice != null &&
                                            roleinvoice != null
                                              ? invoice.view || roleinvoice.view
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheckq1122"
                                        >
                                          View
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>

                              <div class="row  mb-2">
                                <div class="col-lg-12 row align-items-center">
                                  <label class="col-sm-3 col-form-label justify-content-start f-18 f-m">
                                    Payment
                                  </label>
                                  <div class="col-sm-6">
                                    <form class="d-flex flex-wrap">
                                      <div class="form-check-inline custom-control custom-checkbox">
                                        <input
                                          type="checkbox"
                                          class="custom-control-input"
                                          id="customCheck11122"
                                          name="example1"
                                          checked={
                                            payment != null &&
                                            rolepayment != null
                                              ? payment.access ||
                                                rolepayment.access
                                              : true
                                          }
                                        />
                                        <label
                                          class="custom-control-label"
                                          for="customCheck11122"
                                        >
                                          Access
                                        </label>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tabActive == "Subscription"
                          ? "tab-pane fade show active"
                          : "tab-pane fade show"
                      }
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <div id="profile3" class="wrapper">
                        <div class="row">
                          <div class="col-xl-12 mt-4">
                            <div class="">
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Current Plan</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {myPlan &&
                                      myPlan.subscriptionPlanDetails.planName}
                                  </h4>
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Total User Limit</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {this.state.isInfinite === true
                                      ? "infinite"
                                      : this.state.userLimit}
                                  </h4>
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Validity</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {myPlan &&
                                      myPlan.subscriptionPlanDetails.validity} {myPlan &&
                                        myPlan.subscriptionPlanDetails.isFreeTirePlan ? "days": "month"}
                                  </h4>
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Total Tik Limit</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {myPlan &&
                                      myPlan.subscriptionPlanDetails
                                        .transactionPerMonth}
                                  </h4>
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Subscribed On</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {myPlan &&
                                      formatDate(myPlan.startOfSubscription)}
                                  </h4>
                                </div>
                              </div>
                              <div class="row mb-2">
                                <div class="col-lg-4">
                                  <h4 class="f-18 f-b">Subscription Till</h4>
                                </div>
                                <div class="col-lg-6">
                                  <h4 class="f-18 f-r">
                                    {myPlan &&
                                      formatDate(myPlan.endOfSubscription)}
                                  </h4>
                                </div>
                              </div>
                              {this.props.showReferral ? <div class="row mb-2">
                                <div class="mt-4 col d-flex">
                                 {invoice == null ? <a class="w-70 btn btn-default m-1 py-2 f-m" style={{display: 'flex', alignItems: 'center'}} onClick={() => this.props.transactionDetail({Id: ''})}>
                                    View Invoice
                                  </a>: invoice != null && roleinvoice != null ? invoice.view || roleinvoice.view ?  <a class="w-70 btn btn-default m-1 py-2 f-m" style={{display: 'flex', alignItems: 'center'}} onClick={() => this.props.transactionDetail({Id: ''})}>
                                    View Invoice
                                  </a>:null:null}
                                  <a
                                    onClick={() =>
                                      this.props.history.push("/subscription")
                                    }
                                    class="w-70 btn btn-primary m-1 f-m"
                                  >
                                    Upgrade Your Plan
                                  </a>
                                </div>
                                <div class="mt-4 col"></div>
                              </div>:null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        tabActive == "Security"
                          ? "tab-pane fade show active"
                          : "tab-pane fade show"
                      }
                      id="nav-contact1"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <div id="profile3" class="wrapper">
                        <div class="row">
                          <div class="col-xl-12 mt-4">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                              <h2 class="f-b m-0 f-20">Security</h2>
                            </div>
                            <div class="col">
                              <div class="row mb-2 br-6 p-3 org-border align-items-center txt-blk">
                                <div class="col-lg-4 col-md-4 col-xs-11">
                                  <h4 class="f-16 f-m m-1">Phone Number</h4>
                                </div>
                                <div class="col-lg-7 col-md-7 col-xs-11">
                                  <h4 class="f-16 f-b m-1 ">
                                    {updatedAt != undefined
                                      ? `Updated on ${date} ${time}`
                                      : null}
                                  </h4>
                                </div>
                                <a
                                  class="col-xs-1 ml-3 px-2 br-20 border-blk txt-blk right-arrow"
                                  onClick={this.mobileUpdateHandler}
                                  data-target="#mobileupdate"
                                  data-toggle="modal"
                                >
                                  <i class="fa fa-chevron-right"></i>
                                </a>
                              </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center my-4">
                              <h2 class="f-b m-0 f-20">Card Details</h2>
                            </div>
                            <div class="col">
                              {this.props.cardDetails &&
                                this.props.cardDetails.map((e, index) => {
                                  return (
                                    <div class="row mb-2 br-6 p-3 org-border align-items-center txt-blk">
                                      <div class="col-lg-4 col-md-4 col-xs-11">
                                        <h4 class="f-16 f-m m-1">
                                          {e.card.funding} Card
                                        </h4>
                                      </div>
                                      <div class="col-lg-7 col-md-7 col-xs-11">
                                        <h4 class="f-16 f-b m-1 ">
                                          XXXX XXXX XXXX {e.card.last4}
                                        </h4>
                                      </div>
                                      <a
                                        class="col-xs-1 ml-3 br-20 border-blk txt-blk right-arrow"
                                        onClick={() => this.removeCardPopup(e.id)}
                                        style={{paddingLeft: '6px'}}
                                      >
                                        <i class="fa fa-times"></i>
                                      </a>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
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
        {mobileNumberUpdate == true ? (
          <MobileUpdateModal
            closePopup={this.closePopup}
            history={this.props.history}
            confirmMobileUpdate={this.confirmMobileUpdate}
          />
        ) : null}
        {MobileOtpPopup == true ? (
          <MobileOtpModal
            closePopup={this.mobileOtpModalClose}
            history={this.props.history}
            initialuser={this.state.user}
            email={this.state.email}
            password={this.state.password}
            popupMobileVerifiFlag={this.popupMobileVerifiFlag}
            //   sentNum={sentNum}
          />
        ) : null}
        {referalPopup ? (
          <Modal closePopup={this.closeReferalPopup}>
            <div class="modal-body pt-0 plr-100 pb-5">
              <h4 class="modal-title  f-24 mb-5 f-b" id="forgotTitle">
                Referred
              </h4>
              {referralDetails.referralUser.length > 0
                ? referralDetails.referralUser.map((e) => {
                    return  <h4 class="modal-title  f-20 f-m" id="">
                        {e.userEmail}
                      </h4>
                  })
                : null}
              <br />
              <p class="text-muted">
                <i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;refer{" "}
                <span>
                  <b>{referralDetails.require - referralDetails.complete}</b>
                </span>{" "}
                more to get bonus
              </p>
            </div>
          </Modal>
        ) : null}
        {isCardRemove ? (
            <Modal closePopup={this.closeCardPopup}>
            <div className="modal-body pt-0 plr-100 pb-5">
              <h4 className="modal-title text-center f-20 f-m" id="">
                Are you sure you want to remove card?
              </h4>
              <div className="d-flex logout-buttons">
                <Button
                  type="button"
                  buttonText="No"
                  className="m-1 clear_button"
                  onClick={() => this.closeCardPopup()}
                />
                <Button
                  type="button"
                  buttonText="Yes"
                  className="m-1"
                  onClick={() => this.removeCard()}
                />
              </div>
            </div>
          </Modal>
        ):null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  firstName: state.Profile.firstName,
  lastName: state.Profile.lastName,
  mobileNumber: state.Profile.mobileNumber,
  email: state.Profile.email,
  designation: state.Profile.designation,
  companyName: state.Profile.companyName,
  address: state.Profile.address,
  profileUpdateSuccess: state.Profile.profileUpdateSuccess,
  document: state.Profile.document,
  invoice: state.Profile.invoice,
  payment: state.Profile.payment,
  role: state.Profile.role,
  template: state.Profile.template,
  photoData: state.Profile.photoData,
  updatedAt: state.Profile.updatedAt,
  isSuperProvider: state.Auth.isSuperProvider,
  userFirstname: state.Profile.userFirstname,
  userLastname: state.Profile.userLastname,
  roleName: state.Profile.roleName,
  roledocument: state.Profile.Roledocument,
  roleinvoice: state.Profile.Roleinvoice,
  rolepayment: state.Profile.Rolepayment,
  rolerole: state.Profile.Rolerole,
  roletemplate: state.Profile.Roletemplate,
  cardDetails: state.Payment.cardDetails,
  cardRemoveSuccess: state.Payment.cardRemoveSuccess,
  myPlan: state.Subscription.myPlan,
  specialFeatures: state.Subscription.specialFeatures,
  invitationCode: state.Profile.invitationCode,
  referralDetails: state.Profile.referralDetails,
  transactionDetailSuccess: state.Transaction.transactionDetailSuccess,
  showReferral: state.Profile.showReferral,
});

const mapDispatchToProps = (dispatch) => ({
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  profileEdit: (payload) => dispatch(actions.profileEdit(payload)),
  profileUpdate: (payload) => dispatch(actions.profileUpdate(payload)),
  profilePic: (payload) => dispatch(actions.profilePicUpdate(payload)),
  customerPaymentDetail: () => dispatch(actions.customerPaymentDetail()),
  cardRemove: (payload) => dispatch(actions.cardRemove(payload)),
  getMyPlan: () => dispatch(actions.getMyPlan()),
  transactionDetail: (payload) => dispatch(actions.transactionDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
