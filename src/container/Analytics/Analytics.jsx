/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  WithLayoutContainer,
  Modal,
  Button,
} from "../../component/index.jsx";
import * as actions from "../../actions";
import { Doughnut, Line } from "react-chartjs-2";
import { formatDate, formatlogDate } from "../../helper/utility.js";

class Analytics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "",
      reportsData: [],
      csvData: [],
      showFilter: false,
      showPopup: false,
    };
  }
  componentDidMount() {
    this.props.logReport();
  }
  componentDidUpdate(prevprops) {
    if (prevprops.apiKey != this.props.apiKey) {
      this.props.profile();
      this.props.logReport();
      this.setState({
        showPopup: false,
      });
    }
  }
  closeLogoutPopup = () => {
    this.setState({
      showPopup: false,
    });
  };
  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  };
  apiKeyPopup = () => {
    if (this.props.userKey) {
      this.setState({
        showPopup: true,
      });
    } else {
      this.setState({
        showPopup: false,
      });
    }
  };

  render() {
    const { logReportSuccess } = this.props;
    const { showPopup } = this.state;
    const date = formatDate(logReportSuccess.renewDate);
    const logDate = formatlogDate(logReportSuccess.renewDate);
    let logReportdate = [];
    let logCount = [];
    logReportSuccess &&
      logReportSuccess.tikGraphData.map((e) => {
        logReportdate.push(logDate);
        logCount.push(e.count);
      });
    var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
    Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
      draw: function () {
        originalDoughnutDraw.apply(this, arguments);

        var chart = this.chart.chart;
        var ctx = chart.ctx;
        var width = chart.width;
        var height = chart.height;

        // var fontSize = (height / 125).toFixed(2);
        ctx.font = "20px  sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000";
        var text = chart.config.data.text,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2.2;
        var text2 = chart.config.data.text2,
          textX2 = Math.round((width - ctx.measureText(text2).width) / 2),
          textY2 = height / 1.7;
        ctx.fillText(text, textX, textY);
        ctx.fillText(text2, textX2, textY2);
      },
    });
    let data = {
      labels: ["RequestRemaining", "RequestUsed"],
      datasets: [
        {
          label: "AcceptedCount",
          backgroundColor: ["#FF6600", "#FF0F00"],
          data: [
            logReportSuccess.requestRemaining,
            logReportSuccess.requestUsed,
          ],
        },
      ],
      text: logReportSuccess && "Total",
      text2:
        logReportSuccess &&
        logReportSuccess.requestRemaining + logReportSuccess.requestUsed,
    };
    let data2 = {
      labels: logReportdate,
      datasets: [
        {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "#f27136",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#f27136",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#f27136",
          pointHoverBorderColor: "#f27136",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: logCount,
        },
      ],
    };
    return (
      <WithLayoutContainer>
        <div id="docreport" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div
                id="changingContent"
                className="containerBox"
                onClick={() => this.setState({ showFilter: false })}
              >
                <div className="tikReport">
                  <div className="table-title">
                    <h2 class="f-b mb-2 mt-0">Analytics & Usage</h2>
                    <h2 class="f-m mb-4 mt-0 f-20">
                      API Request Used This Billing Period
                    </h2>
                  </div>
                  <div
                    className="fixHeight p-0"
                    style={{ maxHeight: "calc(100vh - 340px)" }}
                  >
                    <div class=" mt-2">
                      <div class="row" id="30day">
                        <div class="col-xl-7 col-lg-6 col-sm-12">
                          <div class="row">
                            <div class="col-xl-12 col-lg-12 d-flex flex-wrap align-items-center">
                              <div class="col">
                                <div
                                  id="donut"
                                  style={{
                                    height: "50vh",
                                    marginTop: "0px",
                                    width: "100%",
                                  }}
                                >
                                  <Doughnut
                                    data={data}
                                    width={400}
                                    height={400}
                                    // datasetKeyProvider={this.datasetKeyProvider}
                                    options={{
                                      legend: {
                                        display: false,
                                        position: "bottom",
                                        labels: {
                                          boxWidth: 10,
                                          boxHeight: 10,
                                          usePointStyle: true,
                                        },
                                      },
                                      responsive: true,
                                      maintainAspectRatio: false,
                                      cornerRadius: 8,
                                    }}
                                  />
                                </div>
                              </div>
                              <div class="col" style={{ minWidth: "340px" }}>
                                <div class="row align-items-center mt-4">
                                  <div class="col-lg-12">
                                    <div class="d-flex flex-wrap">
                                      <div class="col-lg-6">
                                        <h3 class="f-b analytics-font">
                                          Requests Remaining
                                        </h3>
                                      </div>
                                      <div class="col-lg-6">
                                        <h3 className="analytics-font">
                                          {logReportSuccess.requestRemaining}
                                        </h3>
                                      </div>
                                      <div class="col-lg-6">
                                        <h3 class="f-b analytics-font">
                                          Requests Used
                                        </h3>
                                      </div>
                                      <div class="col-lg-6">
                                        <h3 className="analytics-font">
                                          {logReportSuccess.requestUsed}
                                        </h3>
                                      </div>
                                      <div class=" col-lg-6">
                                        <h3 class="f-b analytics-font">
                                          Renewed Date
                                        </h3>
                                      </div>
                                      <div class="col-lg-6 ">
                                        <h3 class="analytics-font"> {date}</h3>
                                      </div>
                                      <div class="col-lg-6 ">
                                        <h3 class="f-b analytics-font">
                                          Plan Name
                                        </h3>
                                      </div>
                                      <div class="col-lg-6 ">
                                        <h3 class="analytics-font">
                                          {logReportSuccess.planName}
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-12 col-lg-12">
                              <div class="apiDiv col">
                                <div class=" col-lg-12">
                                  <h3 class="f-b analytics-font">API Key</h3>
                                </div>
                                <div class="col-lg-12">
                                  <h3 class="text-muted gKey analytics-font">
                                    {this.props.userKey == null
                                      ? this.props.userKey.key.key
                                      : this.props.apiKey
                                      ? this.props.apiKey.key
                                      : "API key not generated yet"}
                                  </h3>
                                </div>
                                <div class="col-lg-12 mt-4">
                                  <a
                                    id="apiGen"
                                    onClick={this.apiKeyPopup}
                                    class="btn btn-org px-3 "
                                  >
                                    Generate API Key
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-5 col-lg-6 col-sm-12">
                          <div
                            id="chartdiv"
                            style={{ height: "60vh", marginTop: "0px" }}
                          >
                            <Line
                              data={data2}
                              width={400}
                              height={330}
                              options={{
                                legend: {
                                  display: false,
                                  position: "bottom",
                                  labels: {
                                    boxWidth: 10,
                                    boxHeight: 10,
                                    usePointStyle: true,
                                  },
                                },
                                responsive: true,
                                maintainAspectRatio: false,
                              }}
                            />
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
        {showPopup && (
          <Modal closePopup={this.closePopup}>
            <div class="modal-body pt-0 plr-100 pb-5">
              <h4 class="modal-title text-center f-20 f-m" id="">
                Are you sure to generate new API key? Old API key will be
                expired.
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
                  onClick={() => this.props.generateKey()}
                />
              </div>
            </div>
          </Modal>
        )}
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    apiKey: state.Analytics.apiKey,
    userKey: state.Profile.userkey,
    logReportSuccess: state.Analytics.logReportSuccess,
    myPlan: state.Subscription.myPlan,
  };
};

const mapDispatchToProps = (dispatch) => ({
  generateKey: (data) => dispatch(actions.generateKey(data)),
  logReport: () => dispatch(actions.logReport()),
  profile: (payload) => dispatch(actions.profileGetInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
