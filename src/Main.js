/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-duplicates */
/* eslint-disable space-unary-ops */
/* eslint-disable padded-blocks */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable one-var */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/order */
/* eslint-disable import/first */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable eqeqeq */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { Component } from "react";
import { withRouter, Redirect } from "react-router";
import { Switch, Route } from "react-router-dom";
import loadable from "@loadable/component";
import Loader from "./component/Loader.jsx";
import PrivateRoute from "./router/Private.jsx";
import PublicRoute from "./router/Public.jsx";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import TokenError from "./container/Auth/SessionModal.jsx";
import * as actions from "./actions";
import Modal from "./component/modal.jsx";
import io from 'socket.io-client';
import firebase from './firebase.js';
import { toast } from "react-toastify";

// import firebase from 'firebase';

import "./assets/css/bootstrap.css";
import "./assets/css/bootstrap-grid.css";
import "./assets/css/bootstrap-reboot.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/fontsCss.css";
// import './assets/css/structure.css';
import "./assets/css/custom.css";
import "./assets/css/media.css";
import "./assets/css/customReact.css";

const Signup = loadable(() => import("./container/Auth/Signup.jsx"), {
  fallback: <Loader />,
});

const Signin = loadable(() => import("./container/Auth/Signin.jsx"), {
  fallback: <Loader />,
});

const DocVerify = loadable(() => import("./container/Auth/docVerify.jsx"), {
  fallback: <Loader />,
});

const GenAgreement = loadable(
  () => import("./container/Auth/genAgreement.jsx"),
  {
    fallback: <Loader />,
  }
);
const Dashboard = loadable(() => import("./container/Auth/dashboard.jsx"), {
  fallback: <Loader />,
});

const TeamManagement = loadable(
  () => import("./container/team_management/teamManagement.jsx"),
  {
    fallback: <Loader />,
  }
);

const RolesManagement = loadable(
  () => import("./container/roles_management/rolesManagement.jsx"),
  {
    fallback: <Loader />,
  }
);

const UserManagement = loadable(
  () => import("./container/users_management/userManagement.jsx"),
  {
    fallback: <Loader />,
  }
);

const VerifyToken = loadable(
  () => import("./container/Auth/SignupVerification.jsx"),
  {
    fallback: <Loader />,
  }
);
const AddMetadata = loadable(() => import("./container/Tik/AddMetadata.jsx"), {
  fallback: <Loader />,
});
const Template = loadable(
  () => import("./container/Template/TemplateList.jsx"),
  {
    fallback: <Loader />,
  }
);
const TemplateView = loadable(
  () => import("./container/Template/TemplateView.jsx"),
  {
    fallback: <Loader />,
  }
);
const AddTemplate = loadable(
  () => import("./container/Template/AddTemplate.jsx"),
  {
    fallback: <Loader />,
  }
);
const Profile = loadable(() => import("./container/Profile/Profile.jsx"), {
  fallback: <Loader />,
});
const CreatTik = loadable(() => import("./container/Tik/CreateTik.jsx"), {
  fallback: <Loader />,
});

const EditTemplate = loadable(
  () => import("./container/Template/editTemplate.jsx"),
  {
    fallback: <Loader />,
  }
);

const SelectAcceptanceTemp = loadable(
  () => import("./container/Template/SelectAcceptanceTemp.jsx"),
  {
    fallback: <Loader />,
  }
);

const SelectTemplate = loadable(
  () => import("./container/Tik/SelectTemplate.jsx"),
  {
    fallback: <Loader />,
  }
);

const TransactionHistory = loadable(
  () => import("./container/transaction_history/transactionHistory.jsx"),
  {
    fallback: <Loader />,
  }
);

const TikListing = loadable(() => import("./container/Tik/TikListing.jsx"), {
  fallback: <Loader />,
});

const EditDraft = loadable(() => import("./container/Tik/EditDraft.jsx"), {
  fallback: <Loader />,
});

const UpdateTik = loadable(() => import("./container/Tik/UpdateTik.jsx"), {
  fallback: <Loader />,
});

const TikReports = loadable(() => import("./container/reports/TikReport.jsx"), {
  fallback: <Loader />,
});

const TorReports = loadable(() => import("./container/reports/TorReport.jsx"), {
  fallback: <Loader />,
});

const ViewDraft = loadable(() => import("./container/Tik/ViewDraft.jsx"), {
  fallback: <Loader />,
});

const ViewTik = loadable(() => import("./container/Tik/ViewTik.jsx"), {
  fallback: <Loader />,
});

const Search = loadable(() => import("./container/search/Search.jsx"), {
  fallback: <Loader />,
});

const TeamReports = loadable(
  () => import("./container/reports/TeamReport.jsx"),
  {
    fallback: <Loader />,
  }
);

const Payment = loadable(() => import("./container/Payment/Payments.jsx"), {
  fallback: <Loader />,
});
const Subscription = loadable(
  () => import("./container/Subscription/Subscription.jsx"),
  {
    fallback: <Loader />,
  }
);
const Analytics = loadable(
  () => import("./container/Analytics/Analytics.jsx"),
  {
    fallback: <Loader />,
  }
);

const ApiUsage = loadable(() => import("./container/Analytics/ApiUsage.jsx"), {
  fallback: <Loader />,
});
const ApiDetail = loadable(
  () => import("./container/Analytics/ApiDetail.jsx"),
  {
    fallback: <Loader />,
  }
);
const Faq = loadable(() => import("./container/Faq/Faq.jsx"), {
  fallback: <Loader />,
});

const Help = loadable(() => import("./container/Help/Help.jsx"), {
  fallback: <Loader />,
});

const TransactionDetail = loadable(() => import("./container/transaction_history/transactionDetail.jsx"), {
  fallback: <Loader />,
});

const Notification = loadable(() => import("./container/Notification/Notification.jsx"), {
  fallback: <Loader />,
});

const Invoice = loadable(() => import("./container/Profile/Invoice.jsx"), {
  fallback: <Loader />,
});
const Terms = loadable(() => import("./container/Terms/Terms.jsx"), {
  fallback: <Loader />,
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryTime: "",
      currentTime: "",
      subscriptionPopup: false,
      freeTrialPopup: false,
      verify: true,
    };
  }

  componentDidMount() {

    // socket init

    //firebase

    const msg = firebase.messaging();
   
    msg.requestPermission()
      .then(async () => {
        await msg.getToken().then((data) => {localStorage.setItem('fireToken', JSON.stringify(data));
        this.props.fcmUpdate({newFCMToken: data})
      });
      })
      .catch((err) => {
        console.log("Unable to get permission to notify.", err);
      });
    navigator.serviceWorker.addEventListener("message", (data) => { console.log(data); toast.success(data && data.data.notification.body); });
 
  }

  refreshSession = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = cognitoUser.signInUserSession;
      cognitoUser.refreshSession(
        currentSession.refreshToken,
        (err, session) => {
          localStorage.setItem("jwtToken", JSON.stringify(session));
        }
      );
    } catch (e) {
      console.log("Unable to refresh Token", e);
    }
  };

  closePopup = () => {
    this.setState({
      subscriptionPopup: false,
    });
  };

  componentDidUpdate(prevprops) {
    if (prevprops.isFree.data != this.props.isFree.data) {
      if (this.props.isFree.data.data.subscriptionPlanDetails != undefined) {
        if (this.props.isFree.data.data.subscriptionPlanDetails.isFreeTirePlan == true) {
          this.setState({
            freeTrialPopup: true,
            subscriptionPopup: false,
          });
        } else {
          this.setState({
            subscriptionPopup: true,
            freeTrialPopup: false
          });
        }
      } else {
        this.setState({
          verify: false,
        });
      }
    }
    // if (this.props.myPlan != prevprops.myPlan) {
    //   this.setState({
    //     freeTrialPopup: false
    //   });
    // }
  }

  shouldComponentUpdate(nextprops) {
    if (nextprops.isFree != this.props.isFree && this.state.freeTrialPopup == true) {
      return false;
    } else if (nextprops.isFree != this.props.isFree && this.state.subscriptionPopup == true) {
      return false;
    } else if (this.state.verify == false) {
      return false;
    }
    return true;
  }

  closeLogoutPopup = () => {
    this.setState({
      freeTrialPopup: false,
    });
    localStorage.removeItem("isFree");
  };

  render() {
    const { tokenError, providerId } = this.props;
    const oldJwtToken = JSON.parse(localStorage.getItem("jwtToken"));
    const trialPop = JSON.parse(localStorage.getItem("trialPop"));
    const isSuperprovider = JSON.parse(localStorage.getItem("isSuperprovider"));
    console.log(this.props.isFree);
    if (providerId){
      const socket = io('https://provider-backend.doctrace.com:3001', {
        path: '/provider/socket',
      });
      socket.on('connect', (data) => {
        console.log('socket', data);
      });
      socket.emit('join', { providerId: this.props.providerId }, (notify) => {
        console.log(notify);
        this.props.socketNotificationSuccess({data: notify})
      });
      socket.on('notification', (data) => {
        console.log('socket_notifi', data);
          this.props.socketNotificationSuccess({data})
      });
      socket.on('error', (error) => {
        console.log('socket_error', error);
      });
      socket.on('disconnect', (data) => {
        console.log('socket_disconnect', data);
      });
    }
   
    if (oldJwtToken != null) {
      this.props.getMyPlan();
      const expiryTime = new Date(oldJwtToken.accessToken.payload.exp * 1000);
      if (new Date().getTime() > expiryTime - 1000 * 5 * 60) {
        this.refreshSession();
      }
    }
    const msg = firebase.messaging();
    const fireToken = JSON.parse(localStorage.getItem('fireToken'))
    msg.requestPermission()
      .then(async () => {
        await msg.getToken().then((data) => {
          if(data == fireToken){
            localStorage.setItem('fireToken', JSON.stringify(data))
          }else{
            localStorage.setItem('fireToken', JSON.stringify(data))
            this.props.fcmUpdate({oldFCMToken: fireToken, newFCMToken: data})
          }
        });
      })
      .catch((err) => {
        console.log("Unable to get permission to notify.", err);
      });
    console.log(this.state.freeTrialPopup);
    const route = (
      <Switch>
        <PublicRoute restricted component={Signup} path="/signup" exact />
        <PublicRoute restricted component={Signin} path="/signin" exact />
        <PrivateRoute
          restricted
          component={DocVerify}
          path="/docVerify"
          exact
        />
        <PrivateRoute
          restricted
          component={GenAgreement}
          path="/genAgreement"
          exact
        />
        <PrivateRoute
          restricted
          component={Dashboard}
          path="/dashboard"
          exact
        />
        <PrivateRoute
          restricted
          component={TeamManagement}
          path="/teamMgnt"
          exact
        />
        <PrivateRoute
          restricted
          component={RolesManagement}
          path="/roleMgnt"
          exact
        />
        <PrivateRoute
          restricted
          component={UserManagement}
          path="/userMgnt"
          exact
        />
        <PrivateRoute component={AddMetadata} path="/add-metadata" exact />
        <PrivateRoute component={Template} path="/template" exact />
        <PrivateRoute component={TemplateView} path="/template-view" exact />
        <PrivateRoute component={AddTemplate} path="/createTemp" exact />
        <PrivateRoute component={Profile} path="/profile" exact />
        <PrivateRoute component={CreatTik} path="/create-tik" exact />
        <PrivateRoute component={EditTemplate} path="/editTemp" exact />
        <PrivateRoute
          component={SelectAcceptanceTemp}
          path="/selectAcceptanceTemp"
          exact
        />
        <PrivateRoute
          component={SelectTemplate}
          path="/select-template"
          exact
        />
        <PrivateRoute
          component={TransactionHistory}
          path="/transaction"
          exact
        />
        <PrivateRoute component={TikListing} path="/docHistory" exact />
        <PrivateRoute component={EditDraft} path="/edit-draft" exact />
        <PrivateRoute component={UpdateTik} path="/edit-tik" exact />
        <PrivateRoute component={TikReports} path="/docReport" exact />
        <PrivateRoute component={TorReports} path="/tor-report" exact />
        <PrivateRoute component={ViewDraft} path="/view-draft" exact />
        <PrivateRoute component={ViewTik} path="/view-tik" exact />
        <PrivateRoute component={Search} path="/search" exact />
        <PrivateRoute component={TeamReports} path="/team-report" exact />
        <PrivateRoute component={Payment} path="/payment" exact />
        <PrivateRoute component={Subscription} path="/subscription" exact />
        <PrivateRoute component={Analytics} path="/analytics" exact />
        <PrivateRoute component={ApiUsage} path="/api-usage" exact />
        <PrivateRoute component={ApiDetail} path="/api-detail" exact />
        <PrivateRoute component={Faq} path="/faq" exact />
        <PrivateRoute component={Help} path="/help" exact />
        <PrivateRoute component={TransactionDetail} path="/transaction-detail" exact />
        <PrivateRoute component={Notification} path="/notification" exact />
        <PrivateRoute component={Invoice} path="/invoice" exact />
        <PrivateRoute component={Terms} path="/fine-print" exact />

        <Redirect to="/signin" />
      </Switch>
    );
    return (
      <>
        {tokenError != "" ? (
          <TokenError />
        ) : (
          <>
            {route}
            {this.state.subscriptionPopup
              && this.props.location.pathname != "/subscription"
              && this.props.location.pathname != "/payment"
              && this.props.location.pathname != "/docVerify"
              && this.props.location.pathname != "/genAgreement"
              && (
                <Modal Subscription>
                  <h4
                    className="modal-title text-center f-20 mb-4 f-m "
                    id="successTitle"
                  >
                    Please subscribe the plan
                  </h4>
                  {isSuperprovider ? (
                    <div className="text-center w-100 mb-5">
                      <span
                        onClick={() => this.props.history.push("/subscription")}
                        className="btn btn-primary w-50 f-18 f-b"
                      >
                        click
                      </span>
                    </div>
                  ) : null}
                </Modal>
              )}
            {this.state.freeTrialPopup && this.props.location.pathname != "/subscription" && trialPop == null ? (
              <Modal freeTrial>
                <div className="modal-body pt-0 plr-100 pb-5 text-center">
                  {/* <img src={Images.signup} /> */}
                  <br />
                  <br />
                  <h4
                    className="modal-title text-center f-20 mb-4 f-m"
                    id="onloadTitle"
                  >
                    Your free trial has been expired.Please subscribe to our plans
                    <div className="text-center w-100 mb-2 mt-4">
                      <span
                        onClick={() => { this.props.history.push("/subscription"); this.setState({ freeTrialPopup: false }); localStorage.setItem('trialPop', JSON.stringify(false)); }}
                        className="btn btn-primary w-50 f-18 f-b"
                      >
                        click
                      </span>
                    </div>
                  </h4>
                </div>
              </Modal>
            ) : null}
          </>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  tokenError: state.Auth.tokenError,
  subscriptionError: state.Subscription.subscriptionError,
  isFree: state.Subscription.isfree,
  providerId: state.Profile.providerId
  // myPlan: state.Subscription.myPlan,
});
const mapDispatchToProps = (dispatch) => ({
  getMyPlan: () => dispatch(actions.getMyPlan()),
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
  socketNotificationSuccess: (payload) => dispatch(actions.socketNotificationSuccess(payload)),
  fcmUpdate: (payload) => dispatch(actions.fcmUpdate(payload)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
