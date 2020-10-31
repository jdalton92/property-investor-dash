export const reducerHelper = (data) => {
  return data.reduce((accumulator, item) => {
    Object.keys(item).forEach((key) => {
      accumulator[key] = (accumulator[key] || 0) + item[key];
    });
    return accumulator;
  }, []);
};

export const typeAndUrl = (d) => {
  let baseUrl;
  let type;
  if (d.values?.type === "developer") {
    baseUrl = "developer/dash";
    type = "Developer";
  } else if (d.values?.investor) {
    baseUrl = "investor/dash";
    type = "Investor";
  } else if (d.values.investor === false) {
    baseUrl = "owner-occupier/dash";
    type = "Owner-Occupier";
  }
  return { type, baseUrl };
};

export const formatDate = (dbDate) => {
  const date = new Date(dbDate);
  return new Intl.DateTimeFormat("en-GB").format(date);
};

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export const percentageFormatter = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const IRRHelper = (cashflow) => {
  let min = -1.0;
  let max = 1.0;
  let j = 1;
  let guess = 0;
  let NPV = 0;
  do {
    guess = (min + max) / 2;
    NPV = 0;
    for (let i = 0; i < cashflow.length; i++) {
      NPV += cashflow[i] / Math.pow(1 + guess / 12, i);
    }
    if (NPV > 0) {
      min = guess;
    } else {
      max = guess;
    }
    if (j > 100) {
      return undefined;
    }
    j++;
  } while (Math.abs(NPV) > 0.01);
  return guess;
};

export const IRRCalculation = (data) => {
  const preCashflow = data.map((c) => c.preFinanceCashflow);
  const postCashflow = data.map((c) => c.postFinanceCashflow);
  const preFinance = IRRHelper(preCashflow);
  const postFinance = IRRHelper(postCashflow);
  return {
    preFinance,
    postFinance,
  };
};
