const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { paginate } = require("../utils/paginate");

const occupierSchema = {
  // Growth rates/yields
  capitalGrowth: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  opexGrowth: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  // Base assumptions
  purchasePrice: {
    type: Number,
    required: true,
    min: 0,
  },
  ownershipLength: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum of 30 years"],
  },
  // Associated Costs
  upfrontCosts: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  sellingCosts: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  opex: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  // Mortgage assumptions
  deposit: {
    type: Number,
    required: true,
    min: 0,
    max: [this.purchasePrice, "Deposit cannot exceed house price"],
  },
  homeloanTerm: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum term is 30 years"],
  },
  repaymentType: {
    type: String,
    required: true,
    enum: ["interestOnly", "principalAndInterest"],
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  overPayment: {
    type: Number,
    min: 0,
    default: 0,
  },
};

const investorSchema = {
  ...occupierSchema,
  rentalYield: {
    type: Number,
    required: true,
    min: 0,
    max: [100, "Cannot exceed 100%"],
  },
};

const developerSchema = {
  acquisitionPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  acquisitionCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  dwellings: {
    type: Number,
    required: true,
    min: 1,
  },
  constructionCostPerDwelling: {
    type: Number,
    required: true,
    min: 0,
  },
  designFees: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  constructionContingency: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  statutoryFees: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  constructionDuration: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  planningAndDesign: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  revenuePerDwelling: {
    type: Number,
    required: true,
    min: 0,
  },
  sellingCosts: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  investmentPeriod: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum 30 years investment period"],
  },
  recurringCosts: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  rentalYield: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  initialEquity: {
    type: Number,
    required: true,
    min: 0,
  },
  loanType: {
    type: String,
    required: true,
    enum: ["interestOnly", "principalAndInterest"],
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  loanTerm: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum 30 year term"],
  },
  overPayments: {
    type: Number,
    default: 0,
    min: 0,
  },
  capitalGrowth: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
  constructionCostGrowth: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
    max: 100,
  },
};

const dashboardSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      minlength: 3,
      required: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 3,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
  },
  { discriminatorKey: "type" }
);

dashboardSchema.statics.paginate = paginate;

const Dashboard = mongoose.model("Dashboard", dashboardSchema);

Dashboard.discriminator(
  "occupier",
  mongoose.Schema({ assumptions: occupierSchema })
);
Dashboard.discriminator(
  "investor",
  mongoose.Schema({ assumptions: investorSchema })
);
Dashboard.discriminator(
  "developer",
  mongoose.Schema({ assumptions: developerSchema })
);

dashboardSchema.plugin(uniqueValidator);

module.exports = Dashboard;
