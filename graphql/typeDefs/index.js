const { gql } = require("apollo-server-express");
const userSchema = require("./user");
const companyJobSchema = require("./companyJobs");

const baseSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

const schemaArray = [baseSchema, userSchema, companyJobSchema];

module.exports = schemaArray;
