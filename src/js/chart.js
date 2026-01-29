const ctx1 = document.getElementById("challenge-chart-1");
new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: ['O', 'X'],
    datasets: [{
      label: '',
      data: [90, 10],
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
});

const ctx2 = document.getElementById("challenge-chart-2");
new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['O', 'X'],
    datasets: [{
      label: '',
      data: [40, 60],
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
});

const ctx3 = document.getElementById("challenge-chart-3");
new Chart(ctx3, {
  type: 'doughnut',
  data: {
    labels: ['O', 'X'],
    datasets: [{
      label: '',
      data: [20, 80],
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
});
