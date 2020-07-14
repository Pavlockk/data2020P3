
// chart colors
var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];

/* large line chart */
var movieLine = document.getElementById("movieLine");
var movieBar = document.getElementById("movieBar");
var chartData = {
  labels: ["S", "M", "T", "W", "T", "F", "S"],
  datasets: [{
    data: [589, 445, 483, 503, 689, 692, 634],
    backgroundColor: 'transparent',
    borderColor: colors[0],
    borderWidth: 4,
    pointBackgroundColor: colors[0]
  },
  {
    data: [639, 465, 493, 478, 589, 632, 674],
    backgroundColor: colors[3],
    borderColor: colors[1],
    borderWidth: 4,
    pointBackgroundColor: colors[1]
  }]
};

if (movieBar) {
  new Chart(movieBar, {
  type: 'bar',
  data: chartData,
  options: {
    scales: {
      xAxes: [{
        barPercentage: 0.4,
        categoryPercentage: 0.5
      }],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
  });
}
if (movieLine) {
  new Chart(movieLine, {
  type: 'line',
  data: chartData,
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    legend: {
      display: false
    }
  }
  });
}

  var movieDonut = document.getElementById("movieDonut");
  if (movieDonut) {
    new Chart(movieDonut, {
      type: 'pie',
      data: {
        labels: ['Desktop', 'Phone', 'Tablet', 'Unknown'],
        datasets: [
          {
            backgroundColor: [colors[1],colors[0],colors[2],colors[5]],
            borderWidth: 0,
            data: [50, 40, 15, 5]
          }
        ]
      },
      plugins: [{
        beforeDraw: function(chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
          ctx.restore();
          var fontSize = (height / 70).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          var text = chart.config.data.datasets[0].data[0] + "%",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }],
      options: {layout:{padding:0}, legend:{display:false}, cutoutPercentage: 80}
    });
  }