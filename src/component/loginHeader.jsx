import React, { Component } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  ProfileDropdown,
  Notification,
  Modal,
  Button,
  AdvanceSearch,
} from "./index.jsx";
import * as actions from "../actions";
import cal from "../assets/img/cal.png";
import searcho from "../assets/img/searcho.png";
import doc from "../assets/img/doc.png";
import "../assets/css/structure.css";
import io from "socket.io-client";

let socket = io("https://provider-backend.doctrace.com:3001/", {
  path: "/provider/socket",
});

class LoginHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      showNotification: false,
      logout: false,
      notificationData: "",
    };
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
    });
  };
  handleClickOutside(event) {
    if (
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({
        showNotification: false,
      });
    }
  }
  logout = () => {
    document.body.classList.remove("modal-open");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isFree");
    this.props.history.push("/signin");
  };

  handleMenu = () => {
    document.body.classList.toggle("mini-navbar");
  };

  handleResize() {
    if (window.innerWidth < 768) {
      document.body.classList.add("body-small");
    }
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
    this.props.getMyPlan();
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.viewTikData != this.props.viewTikData) {
      this.props.history.push("/view-tik");
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

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
  seeAll = () => {
    this.props.history.push("/notification");
  };
  markAllRead = () => {
    socket.emit("mark-all-read", { providerId: this.props.providerId });
    this.props.socketNotificationSuccess({
      data: { ...this.props.notificationSocketData, count: 0 },
    });
  };
  markRead = (id) => {
    socket.emit("mark-read", { notificationId: id });
    this.props.socketNotificationSuccess({
      data: { ...this.props.notificationSocketData, count: 0 },
    });
  }
  render() {
    const { showNotification, logout, notificationData } = this.state;
    const { notificationSocketData } = this.props;
    return (
      <>
        <nav
          className="navbar navbar-static-top white-bg p-1"
          role="navigation"
        >
          <div className="navbar-header">
            <a
              className="navbar-minimalize minimalize-styl-2 btn "
              onClick={() => this.handleMenu()}
            >
              <i className="fa fa-bars" />{" "}
            </a>
            <AdvanceSearch />
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li className="ml-2 mr-2">
              <a
                href
                className="btn p-0"
                data-toggle="modal"
                data-target="#searchmodal"
              >
                <img className src={searcho} />
                {/* <i className="fa fa-search"></i> */}
              </a>
            </li>
            {this.props.document == null ? (
              <li className="ml-2 mr-2">
                <a
                  onClick={() => {
                    this.props.history.push("/add-metadata");
                    localStorage.setItem(
                      "prevroute",
                      JSON.stringify("create-tik")
                    );
                  }}
                  className="btn-border org-border br-6 d-flex p-2"
                >
                  <img className src={doc} />
                  <h4
                    style={{ fontSize: "14px", marginTop: "5px" }}
                    className="txt-org f-m ml-2 mb-0 newDoc"
                  >
                    Create New Tik
                  </h4>
                </a>
              </li>
            ) : this.props.roledocument != undefined ? (
              this.props.document.create || this.props.roledocument.create ? (
                <li className="ml-2 mr-2">
                  {" "}
                  <a
                    onClick={() => {
                      this.props.history.push("/add-metadata");
                      localStorage.setItem(
                        "prevroute",
                        JSON.stringify("create-tik")
                      );
                    }}
                    className="btn-border org-border br-6 d-flex p-2"
                  >
                    <img className src={doc} />
                    <h4
                      style={{ fontSize: "14px", marginTop: "5px" }}
                      className="txt-org f-m ml-2 mb-0 newDoc"
                    >
                      Create New Tik
                    </h4>
                  </a>
                </li>
              ) : null
            ) : null}
            <li className="dropdown mx-2" ref={this.wrapperRef}>
              <a
                className="dropdown-toggle count-info px-0"
                data-toggle="dropdown"
                onClick={() => this.showNotification()}
              >
                <i className="fa fa-bell f-26" />{" "}
                <span className="label label-primary">
                  {notificationSocketData ? notificationSocketData.count : 0}
                </span>
              </a>
              {showNotification === true ? (
                <Notification
                  markAllRead={this.markAllRead}
                  notification={
                    notificationSocketData && notificationSocketData
                  }
                  notificationRoute={this.notificationRoute}
                  seeAll={this.seeAll}
                  markRead={this.markRead}
                />
              ) : null}
            </li>

            <li className="ml-2">
              <ProfileDropdown
                history={this.props.history}
                logout={this.logoutHandler}
              />
            </li>
          </ul>
        </nav>
        {logout ? (
          <Modal closePopup={this.closeLogoutPopup}>
            <div className="modal-body pt-0 plr-100 pb-5">
              <h4 className="modal-title text-center f-20 f-m" id="">
                Are you sure you want to log out?
              </h4>
              <div className="d-flex logout-buttons">
                <Button
                  type="button"
                  buttonText="No"
                  className="m-1 clear_button"
                  onClick={() => this.closeLogoutPopup()}
                />
                <Button
                  type="button"
                  buttonText="Yes"
                  className="m-1"
                  onClick={() => this.logout()}
                />
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  document: state.Profile.document,
  roledocument: state.Profile.Roledocument,
  notificationSocketData: state.Notification.notificationSocketData,
  viewTikData: state.Tik.viewTik,
  providerId: state.Profile.providerId,
});

const mapDispatchToProps = (dispatch) => ({
  dashboard: () => dispatch(actions.getDashboardCount()),
  viewTik: (payload) => dispatch(actions.viewTik(payload)),
  getMyPlan: () => dispatch(actions.getMyPlan()),
  socketNotificationSuccess: (payload) =>
    dispatch(actions.socketNotificationSuccess(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginHeader)
);
