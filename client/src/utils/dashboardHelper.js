import { CONSTANTS } from "../static/constants";

export const paginatedResults = {
  nextPage: null,
  pagesCount: null,
  previousPage: null,
  resultsCount: 0,
  currentPage: 0,
  results: [],
};

export const getPaginateOptions = (currentPage, totalPages, viewPages = 3) => {
  let startPage;
  let endPage;

  if (totalPages <= viewPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(viewPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(viewPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = viewPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - viewPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pages = Array.from(Array(endPage + 1 - startPage).keys()).map((i) => ({
    label: startPage + i,
    active: currentPage === startPage + i,
    link: true,
  }));
  if (pages.some((page) => page.label === totalPages)) {
    return pages;
  } else {
    return pages.concat(
      {
        label: "...",
        active: false,
        link: false,
      },
      {
        label: totalPages,
        active: false,
        link: true,
      }
    );
  }
};

export const isEmpty = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

export const sumFields = (data) => {
  return data.reduce((acc, item) => {
    Object.keys(item).forEach((key) => {
      acc[key] = (acc[key] || 0) + item[key];
    });
    return acc;
  }, []);
};

export const getDashboardTypeAndBaseUrl = (dashboard) => {
  let baseUrl;
  let type;
  switch (dashboard.type) {
    case CONSTANTS.TYPES.DEVELOPER:
      baseUrl = "developer";
      type = "Developer";
      break;
    case CONSTANTS.TYPES.INVESTOR:
      baseUrl = "investor";
      type = "Investor";
      break;
    case CONSTANTS.TYPES.OCCUPIER:
      baseUrl = "owner-occupier";
      type = "Owner-Occupier";
      break;
    default:
      throw new Error("Invalid dashboard type");
  }
  return { type, baseUrl };
};

export const formatDate = (dbDate) => {
  const date = new Date(dbDate);
  return new Intl.DateTimeFormat("en-GB").format(date);
};

export const cashflowFormatter = (number, minimumFractionDigits = 0) => {
  let cashflow;
  let className = "text-gray-500";
  const integer = parseInt(number);
  switch (true) {
    case integer === 0:
      cashflow = "-";
      break;
    case integer > 0:
      cashflow = integer.toLocaleString("en-US", {
        minimumFractionDigits,
      });
      break;
    case integer < 0:
      cashflow = `(${Math.abs(integer).toLocaleString("en-US", {
        minimumFractionDigits,
      })})`;
      className = "text-red-500";
      break;
    default:
      cashflow = `${integer}`;
  }
  return <span className={`${className}`}>{cashflow}</span>;
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
  let guessCount = 1;
  let guess;
  let NPV;

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

    if (guessCount > 100) {
      return undefined;
    }

    guessCount++;
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
