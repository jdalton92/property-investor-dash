// const occupierInvestorInputs = {
//   //standard inputs
//   housePrice: 1000000,
//   homeloan: 800000,
//   deposit: 200000,
//   loanType: "principalAndInterest",
//   interestRate: 4,
//   homeloanTerm: 30,
//   overPayments: [
//     { year: 1, payment: 1000 },
//     { year: 2, payment: 1000 }
//   ],
//   investmentPeriod: 10,
//   sellingCosts: 2.5,
//   capitalGrowth: 3,

//   //advanced inputs
//   inflation: 2.5,
//   upfrontCosts: 5,
//   recurringCosts: 30,

//   //Investor data
//   rentalYield: 4,
//   investor: true
// };

// const developerInputs = {
//   acquisitionPrice: 800000,
//   acquisitionCosts: 5,
//   dwellings: 4,
//   constructionCostPerDwelling: 400000,
//   designFees: 10,
//   constructionContingency: 10,
//   statutoryFees: 1.5,
//   constructionDuration: 6,
//   planningAndDesign: 6,

//   revenuePerDwelling: 650000,
//   sellingCosts: 2.5,
//   investmentPeriod: 3,
//   recurringCosts: 30,
//   rentalYield: 4,

//   initialEquity: 400000,
//   loanType: "interestOnly",
//   interestRate: 3,
//   loanTerm: 30,
//   overPayments: [
//     { year: 3, payment: 1000 },
//     { year: 4, payment: 1000 }
//   ],

//   capitalGrowth: 3.5,
//   constructionCostGrowth: 3
// };

const initialState = {
  description: null,
  address: null,
  values: {}
};

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUTS":
      return { ...state, values: action.data };
    case "SET_DASHBOARD":
      return action.data;
    default:
      return state;
  }
};

export const setValues = values => {
  return dispatch => {
    dispatch({
      type: "SET_INPUTS",
      data: values
    });
  };
};

export const setDashboard = dashboard => {
  return dispatch => {
    dispatch({
      type: "SET_DASHBOARD",
      data: dashboard
    });
  };
};

export default formReducer;
