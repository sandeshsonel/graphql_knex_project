const database = require("../helpers/db");
const User = require("./userModel");
const CompanyJob = require("./companyModel");

const user = new User(database);
const companyJobs = new CompanyJob(database);

const models = {
  user,
  companyJobs,
};

module.exports = models;
