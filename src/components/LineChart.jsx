import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart = ({ data, chartTitle }) => {
  const groupedData = {};
  data.forEach(item => {
    if (!groupedData[item.applicationId]) {
      groupedData[item.applicationId] = [];
    }
    groupedData[item.applicationId].push({
      x: parseInt(item.timestamp) * 1000,
      y: parseFloat(item.cpuUtilization || item.memoryUtilization)
    });
  });

  const series = Object.keys(groupedData).map(applicationId => ({
    name: getLegendName(applicationId),
    data: groupedData[applicationId],
    marker: {
      enabled: false
    }
  }));

  const options = {
    chart: {
      type: 'line',
      height: 290
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        hour: '%H:%M',
        minute: '%H:%M',
        second: '%H:%M:%S'
      },
      title: {
        text: ''
      }
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    title: {
      text: chartTitle,
      align: "left",
    },
    series
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

const getLegendName = applicationId => {
  switch (applicationId) {
    case '1':
      return 'tic-tac-toe';
    case '2':
      return 'sudoku';
    case '3':
      return 'chess';
    default:
      return `Application ${applicationId}`;
  }
};

export default LineChart;
