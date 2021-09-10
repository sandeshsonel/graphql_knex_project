require("dotenv").config();
const path = require("path");
const { promisify } = require("util");
const { ApolloServer, ApolloError } = require("apollo-server-express");
const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 8000;

const models = require("./models");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      let token;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
      );
      let user = await models.user.database("users").where("_id", decoded.id);
      return {
        models: models,
        user,
      };
    },
    formatError: (err) => {
      return {
        success: err.success,
        message: err.message,
      };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
  });
}

startServer();

app.listen(PORT, () => {
  console.log(`🚀🤣Server ready at http://localhost:${PORT}/graphql `);
});
