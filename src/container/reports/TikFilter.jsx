import React, { Component } from "react";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { staticLabel } from "../../constants/Constants.js";
import moment from "moment";
import * as actions from "../../actions";
import { formateDateMonth } from "../../helper/utility.js";
import DateFilter from "./DateFilter.jsx";

class TikFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "all",
      startDateTab: new Date(),
      endDateTab: new Date(),
      flag: false,
    };
  }

  componentDidMount() {
    const { sortedReportData } = this.props;
    if (sortedReportData.length > 0) {
      this.setState({
        startDateTab: new Date(sortedReportData[0]._id),
      });
    }
  }

  componentDidUpdate(prevProps) {
    const { sortedReportData } = this.props;
    if (
      this.props.sortedReportData !== prevProps.sortedReportData &&
      this.state.flag === false
    ) {
      if (sortedReportData.length > 0) {
        this.setState({
          flag: true,
          startDateTab: new Date(sortedReportData[0]._id),
        });
      }
    }
  }
  handleChanges = (startDate, endDate) => {
    this.setState({
      selectedTab: "",
      startDateTab: startDate,
      endDateTab: endDate,
    });
    let body = {
      startDate: formateDateMonth(startDate),
      endDate: formateDateMonth(endDate),
    };
    this.props.tikReports(body);
  };

  handleReportTab = (tab) => {
    if (tab.value == "all") {
      const { sortedReportData } = this.props;
      if (sortedReportData.length > 0) {
        this.setState({
          selectedTab: tab.value,
          startDateTab: new Date(sortedReportData[0]._id),
        });
      }
      this.props.tikReports(null);
    } else {
      let startDate = "";
      let endDate = moment().format("MM-DD-YYYY");

      switch (tab.value) {
        case "30day":
          startDate = moment().subtract(30, "days").format("MM-DD-YYYY");
          break;
        case "90day":
          startDate = moment().subtract(90, "days").format("MM-DD-YYYY");
          break;
        default:
          startDate = moment().subtract(365, "days").format("MM-DD-YYYY");
      }
      let finalDate = new Date(startDate);

      this.setState({
        selectedTab: tab.value,
        startDateTab: finalDate,
        endDateTab: new Date(),
      });
      let body = {
        startDate: startDate,
        endDate: endDate
      }
      this.props.getTikTabData(tab.value);
      this.props.tikReports(body);

    }
  }
  render() {
    const { reports } = staticLabel;
    const { tikReportsTab } = reports;
    const { startDateTab, endDateTab, selectedTab } = this.state;
    return (
      <ul className="nav nav-pills">
        {tikReportsTab.map((tab) => {
          return (
            <li className="nav-item">
              <a
                className={`nav-link ${
                  selectedTab === tab.value ? "active" : ""
                  }`}
                onClick={() => this.handleReportTab(tab)}
              >
                {tab.label}
              </a>
            </li>
          );
        })}
        <li className="nav-item w-50 d-flex align-items-center">
          <DateFilter
            startDateTab={startDateTab}
            endDateTab={endDateTab}
            handleChanges={this.handleChanges}
          />
        </li>
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  tikReports: (data) => dispatch(actions.tikReports(data)),
  getTikTabData: (data) => dispatch(actions.getTikTabData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TikFilter);
