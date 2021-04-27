const parsers = require("./utils/parsers");

const constants = require("./controllers/__tests__/constants");

const data = parsers.occupierInvestorCashflow(constants.investorAssumptions);

console.log(data);
