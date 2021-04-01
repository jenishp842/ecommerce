import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from 'react-csv';
import _ from 'lodash';
import { WithLayoutContainer, Reports } from '../../component/index.jsx';
import { staticLabel } from '../../constants/Constants.js';
import TikFilter from './TikFilter.jsx';
import * as actions from '../../actions';
import Loader from '../../component/Loader.jsx';
import moment from 'moment';

class TikReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reportsData: [],
      startDate: '',
      endDate: ''
    };
  }

  componentDidMount() {
    this.props.tikReports(null);
  }

  render() {
    const { reports } = staticLabel;
    const {
      title, totalNumberTik, averageTik,
      totalNumberDay,
      percentageChange, downloadCSV, tikReportsTitle, XAxiosTitle,
    } = reports;
    const { reportsTik, tabData } = this.props;
    const { tikReportsData, tikReportsLoader } = reportsTik;
    const {
      totalDoc, avgPerDay, numberOfDays, percentageOfChange, report: reportsData,
    } = tikReportsData;
    let sortedReportData = '';

    if (reportsData && reportsData.length > 0) {
      sortedReportData = _.sortBy(reportsData, (dateObj) => new Date(dateObj._id));
    }

    let startDate = sortedReportData && sortedReportData.length > 0 && moment(sortedReportData[0]._id).format('MM/DD/YYYY');
    let endDate = sortedReportData && sortedReportData.length > 0 && moment(sortedReportData[sortedReportData.length - 1]._id).format('MM/DD/YYYY');

    // if (tabData == "30day") {
    //   startDate = moment(startDate).format('MM/DD/YYYY');
    //   endDate = moment(endDate).format('MM-DD');
    // } else if (tabData == "90day") {
    //   startDate = moment(startDate).format('MM-YYYY');
    //   endDate = moment(endDate).format('MM-YYYY');
    // } else {
    //   startDate = moment(startDate).format('MM-YYYY');
    //   endDate = moment(endDate).format('MM-YYYY');
    // }
    let finalCSVData = '';
    if (reportsData && reportsData.length > 0) {
      let reportCSVData = JSON.parse(JSON.stringify(reportsData));

      finalCSVData = reportCSVData.map(function (obj) {
        obj['totaltik'] = obj['total']; // Assign new key 
        delete obj['total']; // Delete old key 
        delete obj['createdDate']
        return obj;
      });
    }

    return (
      <WithLayoutContainer>
        <div id="docreport" className="wrapper wrapper-content">
          <div className="row">
            <div className="col-xl-12">
              <div id="changingContent" className="containerBox">
                <div className="tikReport">

                  <>
                    <div className="table-title">
                      <h2 className="f-b mb-4 mt-0">{title}</h2>

                      <TikFilter sortedReportData={sortedReportData} />
                    </div>
                    <div className="fixHeight p-0" style={{ maxHeight: 'calc(100vh - 340px)' }}>
                      <div className="tab-content mt-2">
                        {/* tab-content-all */}
                        <div className="col tab-pane active" id="30day">
                          {/* chart */}
                          {tikReportsLoader && <Loader />
                            || (
                              <div
                                id="chartdiv"
                                style={{
                                  overflow: 'hidden', textAlign: 'left',
                                }}
                              >
                                <Reports
                                  reports={sortedReportData}
                                  YAxisTitle={tikReportsTitle}
                                  XAxisTitle={XAxiosTitle}
                                />
                              </div>
                            )}
                          {/* end chart */}
                          <div className="row align-items-center mt-4 report-number-wrapper">
                            <div className="col-lg-8">
                              <div className="d-flex flex-wrap">
                                <div className="col-lg-4">
                                  <h3 className="f-b">{totalNumberTik}</h3>
                                </div>
                                <div className="col-lg-2">
                                  {tikReportsData && totalDoc ? <h3>{totalDoc}</h3>:<h3 style={{marginLeft:'10px'}} className=" ">-</h3>}
                                </div>
                                <div className="col-lg-4">
                                  <h3 className="f-b">{averageTik}</h3>
                                </div>
                                <div className="col-lg-2">
                                  {tikReportsData && Math.round(avgPerDay)  ? <h3>{Math.round(avgPerDay)}</h3> :<h3 style={{marginLeft:'10px'}} className=" ">-</h3>}
                                </div>
                              </div>
                              <div className="d-flex flex-wrap">
                                <div className=" col-lg-4">
                                  <h3 className="f-b ">{totalNumberDay}</h3>
                                </div>
                                <div className="col-lg-2 ">
                                  {tikReportsData && numberOfDays ? <h3>{numberOfDays}</h3>:<h3 style={{marginLeft:'10px'}} className=" ">-</h3>}
                                </div>

                                <div class="col-lg-6 d-flex flex-wrap from-to-data">
                                  <div class="col d-flex p-0">
                                    <h3 class="f-b ">From :</h3><span class="f-b f-20 mt-1"> &nbsp;{startDate}</span>
                                  </div>
                                  <div class="col d-flex p-0">
                                    <h3 class="f-b ">To :</h3><span class="f-b f-20 mt-1"> &nbsp;{endDate}</span>
                                  </div>
                                </div>
                                {/* <div className="col-lg-4 ">
                                  <h3 className="f-b ">{percentageChange}</h3>
                                </div> */}
                                {/* <div className="col-lg-2 ">
                                  <h3 className=" ">
                                    {' '}
                                    {tikReportsData && percentageOfChange || '-'}
                                    {' '}
                                    <i className="fas fa-arrow-up ml-2 " style={{ color: '#13B75A' }} />
                                  </h3>
                                </div> */}
                              </div>
                            </div>
                            <div className="col-lg-4">
                              {finalCSVData && finalCSVData.length > 0
                                && <CSVLink data={finalCSVData} className="btn btn-org px-3 " filename="tikData.csv">{downloadCSV}</CSVLink>}
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
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithLayoutContainer >
    );
  }
}

const mapStateToProps = (state) => ({
  reportsTik: state.Reports.tikReports,
  tabData: state.Reports.tabData,
});

const mapDispatchToProps = (dispatch) => ({
  tikReports: (data) => dispatch(actions.tikReports(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TikReport);
