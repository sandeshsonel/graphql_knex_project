const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signToken = (id, email) => {
  return jwt.sign({ id: id, email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const userResolver = {
  Query: {
    users: async (parent, args, { models }, info) => {
      console.log("xoox", models.user.database);
      try {
        const users = await models.user.database("users");
        console.log(users);
      } catch (error) {}
      // const users = await models.user.from("users");
      // console.log(users);
      return [
        {
          id: "123",
          firstName: "Sandesh",
          lastName: "Sonel",
          email: "sonelsandesh@gmail.com",
          phoneNumber: "9111164064",
          photo: "hi",
        },
      ];
    },
    user: async (_, { id }, args) => {
      console.log(id);
      return {
        id: "123",
        firstName: "Sandesh",
        lastName: "Sonel",
        email: "sonelsandesh@gmail.com",
        phoneNumber: "9111164064",
        photo: "hi",
      };
    },
  },
  Mutation: {
    signUp: async (parent, userDetails, { models }, info) => {
      console.log(userDetails);
      try {
        const alreadyUser = await models.user
          .database("users")
          .where("email", userDetails.email);

        if (alreadyUser.length) {
          throw new Error({
            message: "User already register, Please login",
            success: "0",
          });
        }
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);

        const userObj = {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          phoneNumber: userDetails.phoneNumber,
          userType: userDetails.userType,
          password: hashedPassword,
        };

        await models.user.database("users").insert(userObj);

        const newUser = await models.user
          .database("users")
          .where("email", userDetails.email);

        console.log(newUser[0]._id);
        const token = signToken(newUser[0]._id, newUser[0].email);
        console.log(token);

        return {
          id: newUser[0]._id,
          firstName: newUser[0].firstName,
          lastName: newUser[0].lastName,
          email: newUser[0].email,
          phoneNumber: newUser[0].phoneNumber,
          token: token,
        };
      } catch (error) {
        console.log(error);

        throw new Error({
          success: "0",
          message: error,
        });
      }
    },
    login: async (parent, { email, password }, { models }, info) => {
      console.log(email, password);
      try {
        if (!email || !password) {
          throw new Error({
            status: "0",
            message: "Please provide email and password",
          });
        }
        const user = await models.user.database("users").where("email", email);
        console.log(user[0]);
        if (!user) {
          throw new Error({
            status: "0",
            message: "Email not found, Please register",
          });
        }

        const checkPassword = await bcrypt.compare(password, user[0].password);
        console.log(checkPassword);
        if (!checkPassword) {
          throw new Error({
            status: "0",
            message: "Incorrect password",
          });
        }

        const token = signToken(user[0]._id, user[0].email);

        return {
          id: user[0]._id,
          firstName: user[0].firstName,
          lastName: user[0].lastName,
          email: user[0].email,
          phoneNumber: user[0].phoneNumber,
          token: token,
        };
      } catch (error) {
        console.log(error);
        throw new Error({
          success: "0",
          message: error,
        });
      }
    },
  },
};

module.exports = userResolver;
