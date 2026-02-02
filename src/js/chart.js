let chartMap = {};

function makeChart(challengeId, challengeAmount){
  const ctx = document.getElementById("challenge-chart-" + challengeId);

  if (!ctx) return;

  chartMap[challengeId] = new Chart(ctx, {
    type: 'doughnut',
      data: {
        labels: ['O', 'X'],
        datasets: [{
          label: '',
          data: [0, challengeAmount*10],
          borderWidth: 1,
          backgroundColor: [
          '#d1d5db',
          '#9ca3af',
        ],
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
            border: {
              display: false,
            }
          }
        }
      }
  })
}


function updateChart(challengeId, successPercent) {
  const chart = chartMap[challengeId];

  if (!chart) {
    console.error("chart 없음:", challengeId);
    return;
  }

  chart.data.datasets[0].data = [
    successPercent,
    100 - successPercent
  ];

  chart.update();
}

