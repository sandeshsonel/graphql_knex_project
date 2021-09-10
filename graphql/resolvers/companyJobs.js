const { ApolloError } = require("apollo-server-errors");

const companyJobsResolver = {
  Query: {
    getAllCompanyJobs: async (parent, args, { models, user }, info) => {
      try {
        const companyJobs = await models.companyJobs
          .database("companyjobs")
          .where("userId", user[0]._id);
        return [...companyJobs];
      } catch (error) {}
    },
    getCompanyJob: async (parent, { companyJobId }, { models }, info) => {
      try {
        console.log({ companyJobId });
        const companyJob = await models.companyJobs
          .database("companyJobs")
          .where("id", companyJobId);

        if (!companyJob.length) {
          return {
            success: "0",
            message: "Company job not found",
          };
        }

        return companyJob[0];
      } catch (error) {}
    },
  },
  Mutation: {
    addCompanyJob: async (parent, { input }, { models, user }, info) => {
      try {
        if (!user[0]) {
          throw new Error({
            success: "0",
            message: "Please login",
          });
        }

        const newJobObj = {
          userId: user[0]._id,
          ...input,
        };
        await models.companyJobs.database("companyJobs").insert(newJobObj);

        const companyJobs = await models.companyJobs
          .database("companyJobs")
          .where("userId", user[0]._id);

        return [...companyJobs];
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    updateCompanyJob: async (
      parent,
      { companyJobId, input },
      { models },
      info
    ) => {
      try {
        console.log(companyJobId, input);
        await models.companyJobs
          .database("companyJobs")
          .where("id", companyJobId)
          .update(input);

        const companyJobs = await models.companyJobs
          .database("companyJobs")
          .where("id", companyJobId);

        return [...companyJobs];
      } catch (error) {
        console.log(error);
      }
    },
    deleteCompanyJob: async (
      parent,
      { companyJobId },
      { models, user, errorName },
      info
    ) => {
      try {
        if (!user[0]) {
          throw new Error({
            success: "0",
            message: "Please login",
          });
        }

        const companyJob = await models.companyJobs
          .database("companyJobs")
          .where({ id: companyJobId, userId: user[0]._id });

        if (companyJob.length === 0) {
          throw new Error({
            success: "0",
            message: "Company job not found",
          });
        }
        console.log("xoxoxo", companyJob);
        await models.companyJobs
          .database("companyJobs")
          .del()
          .where("id", companyJobId);

        const companyJobs = await models.companyJobs
          .database("companyJobs")
          .where("userId", user[0]._id);

        return [...companyJobs];
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = companyJobsResolver;
