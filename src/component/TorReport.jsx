/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
// import AmCharts from "@amcharts/amcharts3-react";
import { Bar as BarChart } from 'react-chartjs-2';
import _ from "lodash";
import {withRouter} from 'react-router';
require ('../helper/rounderChart.js');

class TorReport extends Component {
    datasetKeyProvider = () => {
        return Math.random();
      }
  render() {
    const { reports, location } = this.props;
     let acceptedCountList = [];
     let pendingCountList = [];
     let rejectedCountList = [];
     let updateRequiredCountList = [];
     let allCount = [];
    let firstName = [];

    // let object = {
    //   ...reports,
    //   acceptedCount: reports && reports[0].acceptedCount,
    //   pendingCount: reports && reports[0].pendingCount,
    //   rejectedCount: reports && reports[0].rejectedCount,
    //   updateRequiredCount: reports && reports[0].updateRequiredCount,
    //   firstName: reports && reports[0].provider.firstName
    // // }
    // reportData.push(object)
    reports && reports.map(e => {
        console.log(e)

        Object.keys(e).map(j => {
            
         if(j == 'acceptedCount'){
            acceptedCountList.push(e[j])
            allCount.push(e[j])
         }
         if(j == 'pendingCount'){
            pendingCountList.push(e[j])
            allCount.push(e[j])
         }
         if(j == 'rejectedCount'){
            rejectedCountList.push(e[j])
            allCount.push(e[j])
         }
         if(j == 'updateRequiredCount'){
            updateRequiredCountList.push(e[j])
            allCount.push(e[j])
         }
         if(j == 'provider'){
             console.log(e[j])
            firstName.push(e[j])
         }
    })
})
    console.log(allCount,acceptedCountList,pendingCountList,rejectedCountList,updateRequiredCountList)
    let data = {
        labels: firstName,
        datasets: [{
          label: 'AcceptedCount',
          backgroundColor: "#5F3818",
          data: acceptedCountList
        }, {
          label: 'RejectCount',
          backgroundColor: "#3090CD",
          data: rejectedCountList
        }, {
          label: 'PendingCount',
          backgroundColor: "#F27136",
          data: pendingCountList
        },{
            label: 'UpdateRequestCount',
            backgroundColor: "#E7E7E7",
            data: updateRequiredCountList
          },]
      };
     
    return (
       
        <BarChart
        data={data}
        width={4000}
        height={400}
        // datasetKeyProvider={this.datasetKeyProvider}
        options={{
            legend: {
                display: false
            },
        responsive:acceptedCountList.length > 5 ? false:true,
          maintainAspectRatio: false,
          cornerRadius: 8,
          scales: {
            yAxes: [{
                ticks: {
                  min: 0,
                  stepSize: 1,
                  max: _.max(allCount)+ 2
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Number of Tiks',
                  fontSize: 16,
                  fontColor: '#fd7e14'
                },}],
          xAxes: [{
            // Change here
            barPercentage: 0.4,
            categoryPercentage: 0.1,
            barValueSpacing: 0.2,
            scaleLabel: {
              display: true,
              labelString: location.pathname != '/team-report'? 'Tor':'Team',
              fontSize: 16,
              fontColor: '#fd7e14'
            }
        }]
    }
        }}
      />

    );
  }
}

// Chart.propTypes = {
//     datasets: PropTypes.object,
//   }

export default withRouter(TorReport);