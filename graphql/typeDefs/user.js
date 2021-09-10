const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    photo: String
    token: String!
  }

  input SignUpUserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    password: String!
    confirmPassword: String!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }
  extend type Mutation {
    signUp(
      firstName: String!
      lastName: String!
      email: String!
      phoneNumber: String!
      password: String!
      confirmPassword: String!
      userType: String!
    ): User!
    login(email: String!, password: String!): User!
  }
`;

module.exports = user;
