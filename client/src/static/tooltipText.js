export const developerTooltip = {
  acquisitionPrice: {
    header: "Acqisition Price",
    message:
      "Purchase price of the development site. This price will escalate over the design and planning period, at the chosen capital growth rate",
  },
  acquisitionCosts: {
    header: "Acquisition Costs",
    message:
      "Indirect costs associated with acquisition of the development site, ie. lawyer/agents fees",
  },
  dwellings: {
    header: "Dwellings",
    message: "Number of dwellings to be built",
  },
  constructionCostPerDwelling: {
    header: "Construction Cost Per Dwelling",
    message:
      "Today's direct cost of building 1 dwelling excluding indirect costs (design, contingency, statutory fees). This cost will increase at the Construction Cost Growth rate to the midpoint of the construction period.",
  },
  designFees: {
    header: "Design Fees",
    message:
      "Cost to plan and design the development, as a percentage of the escalated construction cost. This cost is spent in equal monthly amounts over the design and construction period",
  },
  constructionContingency: {
    header: "Construction Contingency",
    message:
      "Contingency during the construction period, as a percentage of escalated construction cost",
  },
  statutoryFees: {
    header: "Development Levy",
    message:
      "Fees on the development usually by Local, or State, Government bodies. Paid lump sum on commencement of construction",
  },
  constructionDuration: {
    header: "Construction Duration",
    message:
      "Number of months to build the development. Starts directly after the planning & design period is finished",
  },
  planningAndDesign: {
    header: "Design Period",
    message:
      "Number of months prior to construction for planning and design costs",
  },
  revenuePerDwelling: {
    header: "Revenue Per Dwelling",
    message:
      "Todays gross revenue per dwelling. This will increase at the chosen capital growth rate. Sale will occur at the end of the investment period",
  },
  sellingCosts: {
    header: "Selling Costs",
    message:
      "Indirect costs associated with selling the development such as agents/marketing allowances as a percentage of total sales value",
  },
  investmentPeriod: {
    header: "Investment Period",
    message:
      "Number of years post construction completion that you will hold the asset and lease for rental income. If you plan to sell at the end of construction, then input zero for investment period",
  },
  recurringCosts: {
    header: "Operating Costs",
    message:
      "Costs paid during the investment period, as a percentage of rental income, such as insurance, maintenance, electical, gas, water expenses",
  },
  rentalYield: {
    header: "Rental Yield",
    message:
      "Amount of gross rent per annum you will recieve during the investment period. Calculated as rent / asset value",
  },
  initialEquity: {
    header: "Initial Equity",
    message:
      "Cash you will use for the design and construction period. All remaining costs above the initial equity limit are assumed to be funded by debt",
  },
  repaymentType: {
    header: "Repayment Type",
    message:
      "Repayment structure over the investment period. 100% of the outstanding loan is repaid when the asset is sold",
  },
  interestRate: {
    header: "Interest Rate",
    message:
      "Interest rate charged on the debt use of the projet. Debt is assumed to be drawn down as a construction facility, that rolls into a term facility over the investment period. 100% of the outstanding loan is paid when the development is sold.",
  },
  loanTerm: {
    header: "Loan Term",
    message:
      "Number of years the loan repayment is paid over. This will only impact repayments if you choose a 'Principal and Interest' repayment structure. Any amount outstanding on the loan will be repaid on sale of the development, so you can choose a loan term that exceeds your investment period duration",
  },
  overPayment: {
    header: "Over Payment",
    message:
      "Any payments towards the loan that exceed the minimum required. The calculator assumes a recurring monthly overpayment of the specified value over the life of the mortgage.",
  },
  capitalGrowth: {
    header: "Dwelling Capital Growth",
    message:
      "Percentage growth rate of development site acquisition price, rental income, and development sale value. Compounded annually",
  },
  constructionCostGrowth: {
    header: "Construction Price Growth",
    message:
      "Growth rate of construction costs, design costs, contingency, and statutory fees. Compounded annually.",
  },
  cashflowBeforeFunding: {
    header: "Cashflow Before Funding",
    message: `Acquisition Costs: acquistion Cost + upfront fees
      Total Development Cost: design fees, construction costs, contingency, development Levy
      Net Operating Income: rental income - operating costs
      Net Sale Proceeds: gross sale - selling costs`,
  },
  cashflowAfterFunding: {
    header: "Cashflow After Funding",
    message: `Acquisition Costs: acquistion Cost + upfront fees
      Total Development Cost: design fees, construction costs, contingency, development Levy
      Net Operating Income: rental income - operating costs
      Net Sale Proceeds: gross sale - selling costs.
      Funding Costs: loan repayments
      Debt Source: construction loan drawdown`,
  },
};

export const occupierInvestorTooltip = {
  purchasePrice: {
    header: "Purchase Price",
    message: "Acquisition price of the property",
  },
  homeloan: {
    header: "Homeloan",
    message:
      "Amount of debt used to purchase the property. Debt will cover any costs associated with purchasing the Property, as well as Upfront Fees (tax/legal/agents fees ontop of purchase price)",
  },
  deposit: {
    header: "Deposit",
    message: "Amount of cash/equity used to purchase the property",
  },
  repaymentType: {
    header: "Repayment Type",
    message:
      "Repayment structure over the ownership period. 100% of the outstanding loan is repaid when the property is sold",
  },
  interestRate: {
    header: "Interest Rate",
    message:
      "Interest rate charged on the mortgage. 100% of the outstanding loan is paid when the property is sold.",
  },
  homeloanTerm: {
    header: "Loan Term",
    message:
      "Number of years the loan repayment is paid over. This will only impact repayments if you choose a 'Principal and Interest' repayment structure. Any amount outstanding on the loan will be repaid on sale of the property, so you can choose a loan term that exceeds your ownership length of the property",
  },
  overPayment: {
    header: "Over Payment",
    message:
      "Any payments towards the loan that exceed the minimum required. The calculator assumes a recurring monthly overpayment of the specified value over the life of the mortgage.",
  },
  ownershipLength: {
    header: "Ownership Length",
    message:
      "Number of years after purchasing the property you will hold before selling.",
  },
  sellingCosts: {
    header: "Selling Costs",
    message:
      "Indirect costs associated with selling the property such as agents/marketing allowances as a percentage of total sales value",
  },
  capitalGrowth: {
    header: "Capital Growth",
    message:
      "Percentage growth rate of property value, and rental income (if investor). Compounded annually",
  },
  opexGrowth: {
    header: "Operating Cost Growth",
    message:
      "Inflation rate used to calculate increases in the operating costs. Compounded annually",
  },
  upfrontCosts: {
    header: "Upfront Costs",
    message:
      "Indirect costs associated with acquisition of the property ie. taxes/lawyer/agents fees",
  },
  opex: {
    header: "Operating Costs",
    message:
      "Cost of holding the property such as taxes/insurance/bills & utilities",
  },
  rentalYield: {
    header: "Rental Yield",
    message:
      "Amount of gross rent per annum you will recieve during the investment period. Calculated as rent / property value",
  },
  cashflowAfterFunding: {
    header: "Cashflow After Funding",
    message: `Deposit: initial equity
      Rental Income: gross rental income
      Operating Expense: costs during investment period
      Net Sale Proceeds: gross sale - selling costs
      Mortgage Costs: loan repayments
      Debt Source: mortgage contribution to purchase price`,
  },
};
