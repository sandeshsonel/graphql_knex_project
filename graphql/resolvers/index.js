const userResolver = require("./user");
const companyJobResolver = require("./companyJobs");

const resolverArray = [userResolver, companyJobResolver];

module.exports = resolverArray;
