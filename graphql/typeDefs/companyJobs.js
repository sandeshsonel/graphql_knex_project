const { gql } = require("apollo-server-express");

const companyJobs = gql`
  type Error {
    success: String
    message: String
  }

  type CompanyJobs {
    id: String!
    userId: String!
    jobPosition: String!
    jobCompany: String!
    jobLocation: String!
    jobCategory: String!
    jobTags: String!
    jobDescription: String!
    maxSalary: String!
    minSalary: String!
    currency: String!
    salaryInterval: String!
    jobUrl: String!
    jobToEmail: String!
    companyLogoUrl: String!
  }

  input AddNewCompanyJob {
    jobPosition: String!
    jobCompany: String!
    jobLocation: String!
    jobCategory: String!
    jobTags: String!
    jobDescription: String!
    maxSalary: String!
    minSalary: String!
    currency: String!
    salaryInterval: String!
    jobUrl: String!
    jobToEmail: String!
    companyLogoUrl: String!
  }

  input UpdateCompanyJob {
    jobPosition: String
    jobCompany: String
    jobLocation: String
    jobCategory: String
    jobTags: String
    jobDescription: String
    maxSalary: String
    minSalary: String
    currency: String
    salaryInterval: String
    jobUrl: String
    jobToEmail: String
    companyLogoUrl: String
  }

  union CompanyJobsResponse = CompanyJobs | Error

  extend type Query {
    getAllCompanyJobs: [CompanyJobs!]
    getCompanyJob(companyJobId: String!): CompanyJobsResponse
  }

  extend type Mutation {
    addCompanyJob(input: AddNewCompanyJob): [CompanyJobs]
    updateCompanyJob(
      companyJobId: String!
      input: UpdateCompanyJob
    ): [CompanyJobs]
    deleteCompanyJob(companyJobId: String!): [CompanyJobs]
  }
`;

module.exports = companyJobs;
