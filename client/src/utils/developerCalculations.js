import { currencyFormatter, reducerHelper } from "./dashboardHelper";

export const cumulativeChartParse = (data) => {
  const labels = data.map((c) => c.month);

  const cumulativePreFinanceCashflow = data.reduce((acc, c) => {
    acc.push(c.preFinanceCashflow + (acc.length > 0 ? acc[acc.length - 1] : 0));
    return acc;
  }, []);
  const cumulativePostFinanceCashflow = data.reduce((acc, c) => {
    acc.push(
      c.postFinanceCashflow + (acc.length > 0 ? acc[acc.length - 1] : 0)
    );
    return acc;
  }, []);

  const dataObject = {
    data: {
      postFinance: {
        datasets: [
          {
            data: [...cumulativePostFinanceCashflow],
            fill: true,
            backgroundColor: "#92bed2",
            pointBackgroundColor: "#3282bf",
            borderColor: "#3282bf",
            pointHighlightStroke: "#3282bf",
            borderCapStyle: "butt",
          },
        ],
        labels: [...labels],
      },
      preFinance: {
        datasets: [
          {
            data: [...cumulativePreFinanceCashflow],
            fill: true,
            backgroundColor: "#92bed2",
            pointBackgroundColor: "#3282bf",
            borderColor: "#3282bf",
            pointHighlightStroke: "#3282bf",
            borderCapStyle: "butt",
          },
        ],
        labels: [...labels],
      },
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value) => {
                return currencyFormatter.format(value);
              },
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          beforeTitle: (tooltipItem, object) => {
            return "Month";
          },
          label: (tooltipItem, data) => {
            return currencyFormatter.format(tooltipItem.yLabel);
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };
  return dataObject;
};

export const annualChartParse = (data) => {
  //Get annual cashflow
  const { annualCashflow } = tableParse(data);

  //Transform annual cashflow from objects of annual
  //cashflow summary, to an object with each cost item
  //an array of each year sum
  let annualData = {
    acquisitionCosts: [],
    TDC: [],
    NOI: [],
    netSale: [],
  };

  annualCashflow.forEach((cf) => {
    for (let [key, value] of Object.entries(cf)) {
      if (!annualData[key]) continue;
      annualData[key].push(value);
    }
  });

  //Transform annualData into ChartJS data structure
  const datasets = [];
  const dataLabels = [
    "Acquisition Costs",
    "Total Development Costs",
    "Net Rental Income",
    "Net Sale Proceeds",
  ];
  const dataColors = [
    "rgba(8, 65, 92, 0.6)",
    "rgba(107, 129, 140, 0.6)",
    "rgba(241, 192, 152, 0.6)",
    "rgba(238, 229, 233, 0.6)",
  ];
  let i = 0;
  for (let value of Object.values(annualData)) {
    datasets.push({
      label: dataLabels[i],
      data: value,
      backgroundColor: dataColors[i],
    });
    i++;
  }

  //x-axis labels
  const labels = annualCashflow.map((c) => c.year);

  //ChartJS data object for config of stacked bar chart
  const dataObject = {
    data: {
      labels: [...labels],
      datasets: [...datasets],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            stacked: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value) => {
                return currencyFormatter.format(value);
              },
            },
          },
        ],
        xAxes: [
          {
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: "Year",
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            return `${
              data.datasets[tooltipItem.datasetIndex].label
            } ${currencyFormatter.format(tooltipItem.yLabel)}`;
          },
          beforeTitle: (tooltipItem, object) => {
            return "Year";
          },
        },
      },
    },
  };
  return dataObject;
};

export const pieChartParse = (data) => {
  const totalData = reducerHelper(data);

  const preFinanceDataset = [
    Math.round(totalData.acquisition),
    Math.round(totalData.initialCosts),
    Math.round(totalData.constructionCost),
    Math.round(totalData.professionalFees),
    Math.round(totalData.statutoryCosts),
    Math.round(totalData.contingency),
    Math.round(totalData.sellingCost),
    Math.round(totalData.opex),
  ];

  const postFinanceDataset = preFinanceDataset.concat(
    Math.round(totalData.interest)
  );

  const preFinanceLabels = [
    "Acquisition",
    "Acquisition Costs",
    "Construction Costs",
    "Planning & Design Fees",
    "Development Levy",
    "Contingency",
    "Selling Costs",
    "Operating Costs",
  ];

  const postFinanceLabels = preFinanceLabels.concat("Interest on Debt");

  const dataObject = {
    data: {
      postFinance: {
        datasets: [
          {
            data: [...postFinanceDataset],
          },
        ],
        labels: [...postFinanceLabels],
      },
      preFinance: {
        datasets: [
          {
            data: [...preFinanceDataset],
          },
        ],
        labels: [...preFinanceLabels],
      },
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        position: "right",
      },
    },
  };
  return dataObject;
};

export const tableParse = (data) => {
  let tableData = {
    summaryCashflow: [],
    annualCashflow: [],
  };

  for (let i = 1; i <= Math.ceil(data.length / 12); i++) {
    const annualData = reducerHelper(data.filter((d) => d.year === i));
    tableData.annualCashflow.push({
      year: i,
      acquisitionCosts: -annualData.acquisition - annualData.initialCosts,
      TDC:
        -annualData.constructionCost -
        annualData.professionalFees -
        annualData.statutoryCosts -
        annualData.contingency,
      NOI: annualData.rentalIncome - annualData.opex,
      netSale: annualData.grossRealisation - annualData.sellingCost,
      preFinanceCashflow: annualData.preFinanceCashflow,
      loanCosts: -annualData.loanInstallment - annualData.principalRepayment,
      postFinanceCashflow: annualData.postFinanceCashflow,
      totalIncome: annualData.rentalIncome + annualData.grossRealisation,
      preFinanceTotalCost:
        -annualData.acquisition -
        annualData.initialCosts -
        annualData.constructionCost -
        annualData.professionalFees -
        annualData.statutoryCosts -
        annualData.contingency -
        annualData.opex -
        annualData.sellingCost,
      debtSource: annualData.debtSource,
      postFinanceTotalCost:
        -annualData.acquisition -
        annualData.initialCosts -
        annualData.constructionCost -
        annualData.professionalFees -
        annualData.statutoryCosts -
        annualData.contingency -
        annualData.opex -
        annualData.sellingCost -
        annualData.loanInstallment -
        annualData.principalRepayment,
    });
  }

  const summaryData = reducerHelper(data);

  tableData.summaryCashflow.push({
    year: null,
    totalRevenue: summaryData.grossRealisation + summaryData.rentalIncome,
    totalCostsPreFinance:
      summaryData.acquisition +
      summaryData.initialCosts +
      summaryData.constructionCost +
      summaryData.professionalFees +
      summaryData.statutoryCosts +
      summaryData.contingency +
      summaryData.opex +
      summaryData.sellingCost,
    totalCostsPostFinance:
      summaryData.acquisition +
      summaryData.initialCosts +
      summaryData.constructionCost +
      summaryData.professionalFees +
      summaryData.statutoryCosts +
      summaryData.contingency +
      summaryData.opex +
      summaryData.sellingCost +
      summaryData.loanInstallment,
    acquisitionCosts: -summaryData.acquisition - summaryData.initialCosts,
    TDC:
      -summaryData.constructionCost -
      summaryData.professionalFees -
      summaryData.statutoryCosts -
      summaryData.contingency,
    NOI: summaryData.rentalIncome - summaryData.opex,
    netSale: summaryData.grossRealisation - summaryData.sellingCost,
    preFinanceCashflow: summaryData.preFinanceCashflow,
    loanCosts: -summaryData.loanInstallment - summaryData.principalRepayment,
    postFinanceCashflow: summaryData.postFinanceCashflow,
    totalIncome: summaryData.rentalIncome + summaryData.grossRealisation,
    preFinanceTotalCost:
      -summaryData.acquisition -
      summaryData.initialCosts -
      summaryData.constructionCost -
      summaryData.professionalFees -
      summaryData.statutoryCosts -
      summaryData.contingency -
      summaryData.opex -
      summaryData.sellingCost,
    debtSource: summaryData.debtSource,
    postFinanceTotalCost:
      -summaryData.acquisition -
      summaryData.initialCosts -
      summaryData.constructionCost -
      summaryData.professionalFees -
      summaryData.statutoryCosts -
      summaryData.contingency -
      summaryData.opex -
      summaryData.sellingCost -
      summaryData.loanInstallment -
      summaryData.principalRepayment,
  });
  return tableData;
};

export const developerMOCCalculation = (data) => {
  const summaryData = reducerHelper(data);

  const preProfit = summaryData.preFinanceCashflow;
  const postProfit = summaryData.postFinanceCashflow;
  const preCost =
    summaryData.acquisition +
    summaryData.initialCosts +
    summaryData.constructionCost +
    summaryData.professionalFees +
    summaryData.statutoryCosts +
    summaryData.contingency +
    summaryData.sellingCost;
  const postCost = preCost + summaryData.loanInstallment;

  return {
    preFinance: preProfit / preCost,
    postFinance: postProfit / postCost,
  };
};

export const fundingChartParse = (data) => {
  const labels = data.map((c) => c.month);
  const cumulativeEquity = data.reduce((acc, c) => {
    acc.push(
      Math.round(c.equitySource - c.equityWithdraw) +
        (acc.length > 0 ? acc[acc.length - 1] : 0)
    );
    return acc;
  }, []);
  const cumulativeDebt = data.reduce((acc, c) => {
    acc.push(
      Math.round(
        c.debtSource + c.interest - c.loanInstallment - c.principalRepayment
      ) + (acc.length > 0 ? acc[acc.length - 1] : 0)
    );
    return acc;
  }, []);

  const dataObject = {
    data: {
      datasets: [
        {
          data: [...cumulativeEquity],
          label: "Equity",
          fill: true,
          backgroundColor: "#8fa8c8",
          pointBackgroundColor: "#75539e",
          borderColor: "#75539e",
          pointHighlightStroke: "#75539e",
          borderCapStyle: "butt",
        },
        {
          data: [...cumulativeDebt],
          label: "Debt",
          fill: true,
          backgroundColor: "#92bed2",
          pointBackgroundColor: "#3282bf",
          borderColor: "#3282bf",
          pointHighlightStroke: "#3282bf",
          borderCapStyle: "butt",
        },
      ],
      labels: [...labels],
    },
    options: {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              // Include a dollar sign in the ticks
              callback: (value) => {
                return currencyFormatter.format(value);
              },
            },
            stacked: true,
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          beforeTitle: (tooltipItem, object) => {
            return "Month";
          },
          label: (tooltipItem, data) => {
            return currencyFormatter.format(tooltipItem.yLabel);
          },
        },
      },
    },
  };
  return dataObject;
};
