/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { ProfileDropdown, Notification, Modal, Button } from "./index.jsx";
import header_logo from "../assets/img/logo.png";
import logom from "../assets/img/logom.png";
import doc from "../assets/img/doc.png";
import searcho from "../assets/img/searcho.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import io from "socket.io-client";
import { withRouter } from "react-router";
import * as actions from "../actions";

let socket = io("https://provider-backend.doctrace.com:3001", {
  path: "/provider/socket",
});
class HeaderWithoutSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNotification: false,
      logout: false,
    };
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
  logoutHandler = () => {
    document.body.classList.add("modal-open");
    this.setState({
      logout: true,
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
  markAllRead = () => {
    socket.emit("mark-all-read", { providerId: this.props.providerId });
    this.props.socketNotificationSuccess({
      data: { ...this.props.notificationSocketData, count: 0 },
    });
  };
  markRead = (id) => {
    socket.emit("mark-read", { notificationId: id });
    this.props.socketNotificationSuccess({
      data: { ...this.props.notificationSocketData },
    });
  };
  seeAll = () => {
    this.props.history.push("/notification");
  };
  showNotification = () => {
    this.setState({
      showNotification: !this.state.showNotification,
    });
  };
  render() {
    const { showNotification, logout } = this.state;
    const { notificationSocketData } = this.props;
    return (
      <>
        <nav className="navbar beforel navbar-expand-md py-1">
          <Link to="/dashboard" class="navbar-brand" href="dashboard.html">
            <img class="big img-fluid" src={header_logo} />
            <img class="mini img-fluid" src={logom} />
          </Link>
         {this.props.history.location.pathname == '/add-metadata' ? <div>
            <h2 class="f-b" style={{fontWeight:'100',fontSize:'24px'}}>
              <b>Create Tik</b>
            </h2>
          </div>:null}
          <ul className="nav navbar-top-links navbar-right">
            <li className="ml-2 mr-2">
              <a
                href
                className="btn p-0"
                data-toggle="modal"
                data-target="#searchmodal"
              >
                <img className src={searcho} />
                {/* <i className="fas fa-search"></i> */}
              </a>
            </li>

            {this.props.document == null && this.props.history.location.pathname != '/add-metadata' ? (
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
              ) : null
            ) : null}
            <li className="dropdown mx-2">
              <a
                className="dropdown-toggle count-info px-0"
                data-toggle="dropdown"
                onClick={() => this.showNotification()}
              >
                <i className="fa fa-bell f-26"></i>{" "}
                <span className="label label-primary">
                  {notificationSocketData && notificationSocketData.count}
                </span>
              </a>
              {showNotification === true ? (
                <Notification
                  markAllRead={this.markAllRead}
                  notification={notificationSocketData}
                  notificationRoute={this.notificationRoute}
                  seeAll={this.seeAll}
                  markRead={this.markRead}
                />
              ) : null}
            </li>

            <li className="ml-2">
              <ProfileDropdown logout={this.logoutHandler} />
            </li>
          </ul>
        </nav>
        {logout ? (
          <Modal closePopup={this.closeLogoutPopup}>
            <div class="modal-body pt-0 plr-100 pb-5">
              <h4 class="modal-title text-center f-20 f-m" id="">
                Are you sure you want to log out?
              </h4>
              <div class="d-flex logout-buttons">
                <Button
                  type="button"
                  buttonText="No"
                  className="m-1 clear_button"
                  onClick={() => this.closeLogoutPopup()}
                />
                <Button
                  type="button"
                  buttonText={"Yes"}
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
  notificationSocketData: state.Notification.notificationSocketData,
  roledocument: state.Profile.Roledocument,
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
  connect(mapStateToProps, mapDispatchToProps)(HeaderWithoutSearch)
);
