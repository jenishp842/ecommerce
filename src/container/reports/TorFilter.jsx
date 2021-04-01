/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { staticLabel } from "../../constants/Constants.js";
import moment from "moment";
import * as actions from "../../actions";
import { formateDateMonth } from "../../helper/utility.js";
import DateFilter from "./DateFilter.jsx";
import { toast } from "react-toastify";
import Loader from "../../component/Loader.jsx";
import { withRouter } from "react-router";
import search from "../../assets/img/search.png";

class TorFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: "all",
      startDateTab: "",
      endDateTab: "",
      flag: false,
      showFilter: false,
      showSelecter: "user",
      searchValue: "",
      filterData: [],
      startDate: "",
      endDate: "",
      loader: false,
    };
  }

  handleChanges = (startDate, endDate) => {
    const {location} = this.props;
    this.setState({
      selectedTab: "",
      startDateTab: startDate,
      endDateTab: endDate,
      startDate: formateDateMonth(startDate),
      endDate: formateDateMonth(endDate)
    });
    let body = {
      startDate: formateDateMonth(startDate),
      endDate: formateDateMonth(endDate),
      filter: this.state.showSelecter,
      filterData: this.state.applyFilter,
    };
    const date1 = moment(startDate, "DD.MM.YYYY");
    const date2 = moment(endDate, "DD.MM.YYYY");
    console.log(date2.diff(date1, "days"));
    if (date2.diff(date1, "days") >= 0) {
      location.pathname != "/team-report" ?
      this.props.torReports(body):this.props.teamReports(body)
    } else if (isNaN(date2.diff(date1, "days")) === false) {
      toast.error("From date should not greater than To date");
    }
  };

  componentDidMount() {
    const { torRole, location } = this.props;

    location.pathname != "/team-report"
      ? torRole({ keyword: "", filter: "user" })
      : (torRole({ keyword: "", filter: "team" }),this.showSelecter('team'));
    
  }
  componentDidUpdate(prevProps) {
    if (prevProps.torFilterData != this.props.torFilterData) {
      let filter = this.props.torFilterData;
      if(filter.length > 0){
        filter.map((e, i) => {
          let data = filter[i];
          let object = {
            ...data,
            id: e._id,
            isChecked: false,
          };
          filter[i] = object;
          this.setState({ filterData: filter, loader: false });
        });
      }else{
        this.setState({ filterData: [], loader: false });
      }
      
    }
    console.log(this.props.filterStatus != prevProps.filterStatus);
    if (this.props.filterStatus != prevProps.filterStatus) {
      if (this.props.filterStatus == false) {
        this.setState({ showFilter: false });
      }
    }
  }
  handleReportTab = (tab) => {
    const {location } = this.props;

    if (tab.value == "all") {
      this.setState({
        selectedTab: tab.value,
        startDateTab: "",
        endDate: "",
      });
      location.pathname != "/team-report" ?
      this.props.torReports(null):this.props.teamReports(null)
    } else {
      let startDate = "";
      let endDate = moment().format("MM-DD-YYYY");

      switch (tab.value) {
        case "30day":
          startDate = moment().subtract(1, "month").format("MM-DD-YYYY");
          break;
        case "90day":
          startDate = moment().subtract(3, "month").format("MM-DD-YYYY");
          break;
        default:
          startDate = moment().subtract(1, "year").format("MM-DD-YYYY");
      }
      let finalDate = new Date(startDate);

      this.setState({
        selectedTab: tab.value,
        startDateTab: finalDate,
        endDateTab: new Date(),
        startDate: startDate,
        endDate: endDate,
      });
      let body = {
        startDate: startDate,
        endDate: endDate,
        filter: this.state.showSelecter,
        filterData: this.state.applyFilter,
      };
      //   this.props.getTikTabData(tab.value);
      location.pathname != "/team-report" ?
      this.props.torReports(body):this.props.teamReports(body)
    }
  };
  showFilter = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  };
  showSelecter = (e) => {
    this.setState({
      showSelecter: e,
      searchValue: "",
      loader: true,
    });
  };
  filterSearch = (e) => {
    this.props.torRole({
      keyword: e.target.value,
      filter: this.state.showSelecter,
    });
    this.setState({ searchValue: e.target.value });
  };
  globalHandleChange = (event) => {
    let filterArray = this.state.filterData;
    filterArray.map((e, i) => {
      let data = filterArray[i];
      let object = {
        ...data,
        id: e._id,
        isChecked: event,
      };
      filterArray[i] = object;
      this.setState({ filterData: filterArray });
    });
  };
  handleChange = (event, index) => {
    let filterArray = this.state.filterData;
    filterArray.map((e, i) => {
      let data = filterArray[index];
      let object = {
        ...data,
        id: e._id,
        isChecked: event.target.checked,
      };
      filterArray[index] = object;
      this.setState({ filterData: filterArray });
    });
  };
  applyFilter = () => {
    const {location} = this.props;
    let applyFilter = [];
    this.setState({ showFilter: false });
    this.state.filterData.map((e) => {
      if (e.isChecked === true) {
        applyFilter.push(e._id);
      }
    });
    this.setState({ applyFilter: applyFilter });
    let body = {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      filter: this.state.showSelecter,
      filterData: applyFilter,
    };
    const date1 = moment(this.state.startDate, "DD.MM.YYYY");
    const date2 = moment(this.state.endDate, "DD.MM.YYYY");
    console.log(date2.diff(date1, "days"),isNaN(date2.diff(date1, "days")),this.state.startDate,this.state.endDat);
    if (date2.diff(date1, "days") >= 0) {
      location.pathname != "/team-report" ?
      this.props.torReports(body):this.props.teamReports(body)
    } else if(date2.diff(date1, "days") <= 0){
      toast.error("From date should not greater than To date");
    }
    if (isNaN(date2.diff(date1, "days"))) {
      location.pathname != "/team-report" ?
      this.props.torReports(body):this.props.teamReports(body)
    }
  
  };
  render() {
    console.log(this.props);
    const { reports } = staticLabel;
    const { tikReportsTab } = reports;
    const { startDateTab, endDateTab, selectedTab, showSelecter } = this.state;
    return (
      <>
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
          <li className="nav-item  d-flex align-items-center">
            <DateFilter
              startDateTab={startDateTab}
              endDateTab={endDateTab}
              handleChanges={this.handleChanges}
            />
          </li>
          <li class="ml-4 nav-item d-flex align-items-center justify-content-end minW-100">
            <a
              onClick={(e) => {
                this.showFilter();
                e.stopPropagation();
                this.props.showFilter(true);
              }}
              id="chart-filter-btn"
              class="btn-border org-border px-4 br-6 d-flex txt-org py-1 align-items-center"
            >
              <i class="fa fa-filter txt-org"></i>
              <span class="txt-org">Filter</span>
            </a>
          </li>
        </ul>
        <div
          onClick={(e) => e.stopPropagation()}
          className={
            this.state.showFilter
              ? this.props.filterStatus
                ? "chart-filter showDiv"
                : "chart-filter"
              : "chart-filter"
          }
        >
          <div class="d-flex">
            <ul
              class="nav nav-tabs flex-column p-3 "
              id="filtertab"
              role="tablist"
            >
              {this.props.location.pathname != "/team-report" ? (
                <li class="nav-item">
                  <a
                    className={
                      this.state.showSelecter == "user"
                        ? "nav-link  f-16 f-m active torFilter"
                        : "nav-link torFilter  f-16 f-m"
                    }
                    data-toggle="tab"
                    role="tab"
                    onClick={() => {
                      this.showSelecter("user");
                      this.props.torRole({ keyword: "", filter: "user" });
                    }}
                  >
                    Users
                  </a>
                </li>
              ) : null}
              {this.props.location.pathname != "/team-report" ? (
                <li class="nav-item">
                  <a
                    className={
                      this.state.showSelecter == "role"
                        ? "nav-link  f-16 f-m active torFilter"
                        : "nav-link  torFilter f-16 f-m"
                    }
                    data-toggle="tab"
                    role="tab"
                    onClick={() => {
                      this.showSelecter("role");
                      this.props.torRole({ keyword: "", filter: "role" });
                    }}
                  >
                    Roles
                  </a>
                </li>
              ) : null}
              <li class="nav-item">
                <a
                  className={
                    this.state.showSelecter == "team"
                      ? "nav-link  f-16 f-m active torFilter"
                      : "nav-link  torFilter f-16 f-m"
                  }
                  data-toggle="tab"
                  role="tab"
                  onClick={() => {
                    this.showSelecter("team");
                    this.props.torRole({ keyword: "", filter: "team" });
                  }}
                >
                  Team
                </a>
              </li>
              <li class="nav-item" style={{ marginTop: "76px" }}>
                <button
                  class="btn btn-primary min-wA"
                  onClick={this.applyFilter}
                >
                  Apply
                </button>
              </li>
            </ul>
            <div class="tab-content p-4" id="filtertabContent">
              <div class="tab-pane fade show active" id="Users" role="tabpanel">
                <div class="d-flex justify-content-end">
                  <a
                    class="txt-org mx-1"
                    onClick={() => this.globalHandleChange(true)}
                  >
                    <u>Select All</u>
                  </a>
                  <a
                    class="txt-org mx-1"
                    onClick={() => {
                      this.globalHandleChange(false);
                      this.setState({
                        startDateTab: "",
                        selectedTab: "all",
                        endDateTab: "",
                        startDate: "",
                        endDate: ""
                      });
                    }}
                  >
                    <u>Clear All</u>
                  </a>
                </div>
                <div class="search my-3">
                  <div class="form-group dropdown">
                    <img class="searchImg" src={search} />
                    <input
                      type="text"
                      placeholder="Search..."
                      class="form-control dull"
                      name="top-search"
                      id="top-search"
                      onChange={this.filterSearch}
                      value={this.state.searchValue}
                    />
                  </div>
                </div>
                <form class="form-group chart-checkbox-filter">
                  {this.state.filterData && !this.state.loader ? (
                    this.state.filterData.length > 0 ? this.state.filterData.map((e, i) => {
                      return (
                        <div class="form-check-inline custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id={e._id}
                            name="example1"
                            onChange={(event) => this.handleChange(event, i)}
                            checked={e.isChecked}
                          />
                          <label class="custom-control-label" for={e._id}>
                            {showSelecter == "user"
                              ? e.email
                              : showSelecter == "role"
                              ? e.roleName
                              : e.name}
                          </label>
                        </div>
                      );
                    }): <p style={{textAlign: "center"}}>No data found</p>
                  ) : (
                    <div style={{ marginTop: "-20px" }}>
                      <Loader />
                    </div>
                  )}
                </form>
              </div>
              <div class="tab-pane fade" id="Roles" role="tabpanel">
                ...
              </div>
              <div class="tab-pane fade" id="Team" role="tabpanel">
                ...
              </div>
              <div class="tab-pane fade" id="Tiks" role="tabpanel">
                ...
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  torFilterData: state.Reports.torFilterData,
});

const mapDispatchToProps = (dispatch) => ({
  torRole: (payload) => dispatch(actions.TorfilterRole(payload)),
  torReports: (data) => dispatch(actions.torReports(data)),
  teamReports: (payload) => dispatch(actions.teamReports(payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TorFilter)
);
