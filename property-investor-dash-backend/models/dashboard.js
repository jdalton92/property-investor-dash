const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const occupierInvestorValues = {
  housePrice: {
    type: Number,
    required: true,
    min: 0
  },
  deposit: {
    type: Number,
    required: true,
    min: 0,
    max: [this.housePrice, "Deposit cannot exceed house price"]
  },
  loanType: {
    type: String,
    required: true,
    enum: ["interestOnly", "principalAndInterest"]
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  homeloanTerm: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum term is 30 years"]
  },
  overPayments: [
    {
      year: {
        type: Number,
        required: true
      },
      payment: {
        type: Number,
        required: true
      }
    }
  ],
  investmentPeriod: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum of 30 years"]
  },
  sellingCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  capitalGrowth: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  inflation: {
    type: Number,
    min: 0,
    max: 100
  },
  upfrontCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  recurringCosts: {
    type: Number,
    required: true,
    min: 0
  },
  rentalYield: {
    type: Number,
    min: 0,
    max: [100, "Cannot exceed 100%"]
  },
  investor: {
    type: Boolean,
    required: true
  }
};

const developerValues = {
  acquisitionPrice: {
    type: Number,
    required: true,
    min: 0
  },
  acquisitionCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  dwellings: {
    type: Number,
    required: true,
    min: 1
  },
  constructionCostPerDwelling: {
    type: Number,
    required: true,
    min: 0
  },
  designFees: {
    type: Number,
    required: true,
    min: 0
  },
  constructionContingency: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  statutoryFees: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  constructionDuration: {
    type: Number,
    required: true,
    min: 0
  },
  planningAndDesign: {
    type: Number,
    required: true,
    min: 0
  },
  revenuePerDwelling: {
    type: Number,
    required: true,
    min: 0
  },
  sellingCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  investmentPeriod: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum 30 years investment period"]
  },
  recurringCosts: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  rentalYield: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  initialEquity: {
    type: Number,
    required: true,
    min: 0
  },
  loanType: {
    type: String,
    required: true,
    enum: ["interestOnly", "principalAndInterest"]
  },
  interestRate: {
    type: Number,
    required: true
  },
  loanTerm: {
    type: Number,
    required: true,
    min: 0,
    max: [30, "Maximum 30 year term"]
  },
  overPayments: [
    {
      year: {
        type: Number,
        required: true
      },
      payment: {
        type: Number,
        required: true
      }
    }
  ],
  capitalGrowth: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  constructionCostGrowth: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
};

const dashboardSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["developer", "occupierInvestor"]
    }
  },
  { discriminatorKey: "type" }
);

const schema = mongoose.Schema({
  values: dashboardSchema,
  description: {
    type: String,
    minlength: 3,
    required: true
  },
  address: {
    type: String,
    required: true,
    minlength: 3
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// Add values fields to schema dependant on what type
// the dashboard is - occupierInvestor, or developer
schema
  .path("values")
  .discriminator("occupierInvestor", mongoose.Schema(occupierInvestorValues));

schema
  .path("values")
  .discriminator("developer", mongoose.Schema(developerValues));

dashboardSchema.plugin(uniqueValidator);

const Dashboard = mongoose.model("Dashboard", schema);

module.exports = Dashboard;
