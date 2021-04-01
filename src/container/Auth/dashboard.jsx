/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { WithLayoutContainer } from "../../component/index.jsx";
import OnloadModal from "./OnLoadModal.jsx";
import * as actions from "../../actions";
import { connect } from "react-redux";
import Modal from "../../component/modal.jsx";
import acceptedDoc from "../../assets/img/acceptedDoc.png";
import update from "../../assets/img/update.png";
import rejectDoc from "../../assets/img/rejectDoc.png";
import pendingDoc from "../../assets/img/pendingDoc.png";
import share from "../../assets/img/share.png";
import drafts from "../../assets/img/drafts.png";
import signup from "../../assets/img/signup.png";
import moment from 'moment';
import { formateDateMonth } from "../../helper/utility.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFreeTrial: false,
    };
  }
  componentDidMount() {
    this.props.createTikEdit({ metaData: [] });
    this.props.dashboard();
    this.props.errorClear();
    this.props.paymentUser();
  }
  componentDidUpdate(prevProps) {
    if (this.props.myPlan != prevProps.myPlan) {
      const isFree = JSON.parse(localStorage.getItem("isFree"));
      if (isFree == null) {
        console.log(isFree);
        this.setState({
          isFreeTrial:
            this.props.myPlan &&
            this.props.myPlan.subscriptionPlanDetails.isFreeTirePlan,
        });
      }
      if (isFree == false) {
        this.setState({
          isFreeTrial: false,
        });
      }
    }
  }
  closeLogoutPopup = () => {
    this.setState({
      isFreeTrial: false,
    });
    localStorage.setItem("isFree", JSON.stringify(false));
    localStorage.removeItem("trialPop");
  };

  render() {
    const { dashboardData, isActive, myPlan } = this.props;
    const { isFreeTrial } = this.state;
    const isFirstTimeLogin = JSON.parse(
      localStorage.getItem("isFirstTimeLogin")
    );
  
    const date3 = moment(myPlan && new Date(myPlan.startOfSubscription), "DD.MM.YYYY");
    const date4 = moment(myPlan && new Date(), "DD.MM.YYYY");
    const monthPeriod = date4.diff(date3, "days")
    console.log(monthPeriod)
    return (
      <>
        {/* <>
        <Helmet>
         <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=65b14d0c-22c8-4442-91db-9ce4323055aa"> </script>
        </Helmet>
      </> */}
        <WithLayoutContainer style={"auto"}>
          <div id="dashboard" className="wrapper wrapper-content">
            <div className="row">
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-green">
                    <img src={acceptedDoc} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.acceptedCount}
                    </h1>
                    <div className="stat-percent f-m f-24">Accepted Tiks</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-mgnt">
                    <img src={update} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.updateRequiredCount}
                    </h1>
                    <div className="stat-percent f-m f-24">Update Required</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-red">
                    <img src={rejectDoc} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.rejectedCount}
                    </h1>
                    <div className="stat-percent f-m f-24">Rejected Tiks</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-org">
                    <img src={pendingDoc} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.pendingCount}
                    </h1>
                    <div className="stat-percent f-m f-24">Pending Tiks</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-lbrw">
                    <img src={share} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.sharedWithMe}
                    </h1>
                    <div className="stat-percent f-m f-24">Shared with me</div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="ibox d-flex align-items-center py-4 pl-4 pr-2">
                  <div className="ibox-title bg-lblu">
                    <img src={drafts} />
                  </div>
                  <div className="ibox-content">
                    <h1 className="no-margins f-40 f-b">
                      {dashboardData.draftCount}
                    </h1>
                    <div className="stat-percent f-m f-24">Saved as drafts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.props.isActive === false && this.props.isVerified === false ? (
            <OnloadModal verify history={this.props.history} />
          ) : null}
             {this.props.isActive === false && this.props.isVerified === true ?(
            <Modal closePopup={this.closeLogoutPopup} verify>
              <div class="modal-body pt-0 plr-100 pb-5 text-center">
                <img src={signup} />
                <br />
                <br />
                <h4
                  class="modal-title text-center f-20 mb-4 f-m"
                  id="onloadTitle"
                >
                  Your account is not active
                  <br />
                </h4>
              </div>
            </Modal>
          ) : null}
          {isFreeTrial && isFirstTimeLogin ? (
            <Modal closePopup={this.closeLogoutPopup}>
              <div class="modal-body pt-0 plr-100 pb-5 text-center">
                <img src={signup} />
                <br />
                <br />
                <h4
                  class="modal-title text-center f-20 mb-4 f-m"
                  id="onloadTitle"
                >
                  Thank you for signing up on DocTrace.
                  <br />
                  <br />
                  Congratulations. You have subscribed to our Free Trial
                </h4>
              </div>
            </Modal>
          ) : null}
          {this.props.myPlan && this.props.myPlan.subscriptionPlanDetails.type == "pay_per_use"  && monthPeriod >= 30? (
            <Modal closePopup={this.closeLogoutPopup}>
              <div class="modal-body pt-0 plr-100 pb-5 text-center">
                <img src={signup} />
                <br />
                <br />
                <h4
                  class="modal-title text-center f-20 mb-4 f-m"
                  id="onloadTitle"
                >
                  Thank you for signing up on DocTrace.
                  <br />
                  <br />
                  Congratulations. You have subscribed to our Free Trial
                </h4>
                <div className="text-center w-100 mb-2 mt-4">
                  <span
                    onClick={() => {
                      this.props.history.push("/invoice");
                      // this.setState({ freeTrialPopup: false });
                      // localStorage.setItem("trialPop", JSON.stringify(false));
                    }}
                    className="btn btn-primary w-50 f-18 f-b"
                  >
                    Invoice
                  </span>
                </div>
              </div>
            </Modal>
          ) : null}
        </WithLayoutContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isSuperProvider: state.Auth.isSuperProvider,
  isVerified: state.Auth.isVerified,
  dashboardData: state.Profile.dashboard,
  myPlan: state.Subscription.myPlan,
  isActive: state.User.isActive,
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(actions.login(payload)),
  createTikEdit: (data) => dispatch(actions.createTikEdit(data)),
  dashboard: () => dispatch(actions.getDashboardCount()),
  errorClear: () => dispatch(actions.errorClear()),
  paymentUser: () => dispatch(actions.paymentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
