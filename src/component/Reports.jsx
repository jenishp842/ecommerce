import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

class Reports extends Component {
  render() {
    const { reports, XAxisTitle, YAxisTitle } = this.props;

    const xData = [];
    const rData = [];
    reports && reports.length > 0 && reports.map((item) => {
      const { _id, total } = item;
      xData.push(moment(_id).format('MMM-YYYY'));
      rData.push(total);
    });

    const data = {
      labels: xData,
      datasets: [
        {
          label: YAxisTitle,
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#f27136',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: '#f27136',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: '#f27136',
          pointHoverBorderColor: '#f27136',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: rData,
        },
      ],
    };

    return (
      <div>
        {reports && reports.length > 0
          ? (
            <Line
              ref="chart"
              data={data}
              options={{
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: YAxisTitle,
                      fontSize: 16,
                      fontColor: '#fd7e14',
                    },
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: XAxisTitle,
                      fontSize: 16,
                      fontColor: '#fd7e14',
                    },
                  }],
                },
              }}
            />
          )
          : <div className="no-reports">No Data Found</div>}
      </div>
    );
  }
}

export default Reports;
