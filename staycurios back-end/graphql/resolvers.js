const { GraphQLScalarType, Kind } = require("graphql");
const authControllers = require("../controllers/auth");
const userControllers = require("../controllers/user");
const projectControllers = require("../controllers/project");
const certificateControllers = require("../controllers/certificate");
const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.toISOString(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  // parseLiteral(ast) {
  //   if (ast.kind === Kind.INT) {
  //     return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
  //   }
  //   return null; // Invalid hard-coded value (not an integer)
  // },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    getUserLogin: authControllers.getUserLogin,

    getUserProfile: userControllers.getUserProfile,
    getAllUser: userControllers.getAllUser,

    getAllProjects: projectControllers.getAllProjects,
  },

  Mutation: {
    createUser: authControllers.createUser,
    updateProfile: userControllers.updateProfile,
    createEducation: userControllers.createEducation,
    updateEducation: userControllers.updateEducation,
    deleteEducation: userControllers.deleteEducation,
    deleteUser: userControllers.deleteUser,

    createProject: projectControllers.createProject,
    updateProject: projectControllers.updateProject,
    deleteProject: projectControllers.deleteProject,
    createDetailsProject: projectControllers.createDetailsProject,
    updateDetailsProject: projectControllers.updateDetailsProject,
    deleteDetailsProject: projectControllers.deleteDetailsProject,

    createCertificate: certificateControllers.createCertificate,
    updateCertificate: certificateControllers.updateCertificate,
    deleteCertificate: certificateControllers.deleteCertificate,
  },
};

module.exports = resolvers;
