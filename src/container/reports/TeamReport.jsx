import React, { Component } from 'react';
import { connect } from "react-redux";
import { WithLayoutContainer, Reports, TorReports } from "../../component/index.jsx";
import { staticLabel } from '../../constants/Constants.js';
import TikFilter from './TikFilter.jsx';
import * as actions from "../../actions";
import Loader from "../../component/Loader.jsx";
import { formateDateMonth } from '../../helper/utility.js';
import moment from 'moment';
import TorFilter from './TorFilter.jsx';
import { CSVLink } from 'react-csv';

class TeamReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: '',
      reportsData: [],
      csvData: [],
      showFilter: false
    }
  }

  handleReportTab = (tab) => {
    this.setState({
      selectedTab: tab.value
    });

    let startDate = '';
    let endDate = moment().format("MM-DD-YYYY");

    switch (tab.value) {
      case '30day':
        startDate = moment().subtract(1, 'month').format("MM-DD-YYYY");
        break;
      case '90day':
        startDate = moment().subtract(3, 'month').format("MM-DD-YYYY");
        break;
      default:
        startDate = moment().subtract(1, 'year').format("MM-DD-YYYY");
    }

    let body = {
      startDate: startDate,
      endDate: endDate
    }

    this.props.teamReports(body)
  }

  componentDidMount() {
    this.props.teamReports(null)
  }
componentDidUpdate(prevprops){
 if(prevprops.reportsTor != this.props.reportsTor){
    const { torReportsData } = this.props.reportsTor;
    torReportsData.report && torReportsData.report.map((e,i) => {
        let csvList = torReportsData.report;
        let data = csvList[i]
        let object = {
            ...data,
            provider: e._id.name
        }
        csvList[i] = object
        this.setState({csvData:csvList })
    })
 }
}
  render() {
    const { reports } = staticLabel;
    const { title, tikReportsTab, totalNumberTik, averageTik,
      totalNumberDay,
      percentageChange, downloadCSV, tikReportsTitle, XAxiosTitle } = reports;
    const { selectedTab,csvData } = this.state;
    const { reportsTor } = this.props;
    const { torReportsData, torReportsLoader } = reportsTor;

    const { totalTeams, totalDocument, highestTeams, leastTeams, report: reportsData } = torReportsData;
    let sortedReportData = '';
    console.log(reportsTor)
    return (
      <WithLayoutContainer>
        <div id="docreport" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div id="changingContent" className="containerBox" onClick={() => this.setState({showFilter: false})} >
                <div className="tikReport">
                  <div className="table-title">
                    <h2 className="f-b mb-4 mt-0">Team Report</h2>
                   
                        <TorFilter showFilter={() => this.setState({showFilter: true})} filterStatus={this.state.showFilter} />
                  
                  </div>
                  <div className="fixHeight p-0" style={{ maxHeight: 'calc(100vh - 340px)' }}>
                    <div className="tab-content mt-2">
                      {/* tab-content-all */}
                      <div className="col tab-pane active" id="30day">
                        {/* chart */}

                        {torReportsLoader && <Loader /> ||
                         
                          <div id="chartdiv" style={{ height: '65vh', marginTop: '12px',overflowX:'scroll' }} >
                            {/* <div id="chartdiv" style={{ height: '60vh' }} > */}
                            <TorReports
                              reports={reportsData}
                              YAxisTitle={'Number of Tiks'}
                              XAxisTitle={'Tor'}
                            />
                          </div>
                          }
                        {/*end chart */}
                        <div className="row align-items-center mt-4 report-number-wrapper">
                          <div className="col-lg-8">
                            <div className="d-flex flex-wrap">
                              <div className="col-lg-4">
                                <h3 className="f-b">Total number of teams</h3>
                              </div>
                              <div className="col-lg-2">
                                <h3 className>{torReportsData && totalTeams}</h3>
                              </div>
                              <div className="col-lg-4">
                                <h3 className="f-b">Highest publishing team</h3>
                              </div>
                              <div className="col-lg-2">
                                <h3 className>{torReportsData && highestTeams}</h3>
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className=" col-lg-4">
                                <h3 className="f-b ">Total number of tiks</h3>
                              </div>
                              <div className="col-lg-2 ">
                                <h3 className=" ">{torReportsData && totalDocument}</h3>
                              </div>
                              <div className="col-lg-4 ">
                                <h3 className="f-b ">Least publishing team</h3>
                              </div>
                              <div className="col-lg-2 ">
                                <h3 className=" ">{torReportsData && leastTeams}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            {/* <a href="#! " className="btn btn-org px-3 ">{downloadCSV}</a> */}
                            {csvData && csvData.length > 0
                                && <CSVLink data={csvData} className="btn btn-org px-3 " filename="tikData.csv">{downloadCSV}</CSVLink>}
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane" id="90day">
                        90 days
                       </div>
                      <div className="tab-pane " id="1year">
                        1 year
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    reportsTor: state.Reports.torReports,
    torFilterData: state.Reports.torFilterData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  teamReports: (payload) => dispatch(actions.teamReports(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamReport);
