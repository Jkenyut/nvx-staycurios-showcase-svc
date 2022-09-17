const { gql } = require("apollo-server");
const { GraphQLScalarType, Kind } = require("graphql");

const typeDefs = gql`
  scalar Date

  type Certificate {
    _id: ID!
    nameCertificate: String!
    avatarCertificate: String
    descriptionCertificate: String
    creatorCertificate: User!
    createdAtCertificate: Date!
  }

  type AvatarDetailsProjectofCertificate {
    imageDetailProject: String!
    imageDescriptionDetailProject: String!
  }

  type Project {
    _id: ID!
    nameProject: String!
    descriptionProject: String!
    githubLinkProject: String
    youtubeLinkProject: String
    googleCollabLinkProject: String
    featuresProject: [String]
    categoriesProject: [String]
    avatarProject: String
    avatarDetailsProject: [AvatarDetailsProjectofCertificate]
    creatorProject: User!
    createdAtProject: Date!
  }

  type EducationofUser {
    educationName: String!
    educationTitle: String!
    educationStudies: String!
    educationDescription: String
    educationAvatar: String
    educationStartDate: Date!
    educationEndDate: Date
  }

  type ItemofUser {
    certificateId: [Certificate]
    projectId: [Project]
  }
  enum ActiveStatusofUser {
    active
    inactive
  }
  enum StatusofUser {
    user
    admin
  }
  type User {
    _id: ID!
    emailUser: String!
    # passwordUser: String!
    nameUser: String!
    usernameUser: String!
    activeStatusUser: ActiveStatusofUser
    statusUser: StatusofUser
    avatarUser: String
    resetTokenUser: String
    resetTokenExpiresUser: Date
    githubLinkUser: String
    linkedinLinkUser: String
    showcaseLinkUser: String
    gmailLinkUser: String
    cvUrl: String
    educationUser: [EducationofUser!]
    itemsUser: ItemofUser
  }

  input UserInputSignUpData {
    email: String!
    name: String!
    password: String!
    username: String!
  }

  input UserInputProfileData {
    name: String!
    username: String!
    github: String
    linkedin: String
    gmail: String
    showcase: String
    imageUrl: String!
    cvUrl: String
  }

  input UserInputEducationData {
    name: String!
    title: String!
    studies: String!
    description: String
    avatar: String!
    start: Date!
    end: Date
  }

  input UserProjectInputData {
    name: String!
    description: String!
    github: String
    youtube: String
    googleCollab: String
    features: [String]
    category: [String]
    avatar: String!
    creatorProject: ID!
    createdAt: Date!
  }

  input UserCertificateInputData {
    name: String!
    avatar: String!
    organizer: String!
    description: String
    createdAt: Date!
    expiredAt: Date
    idCredential: String
    urlCredential: String
  }

  input UserInputDetailsProjectData {
    avatar: String!
    description: String!
  }

  type isAuth {
    token: String!
    userId: String!
  }
  type getAllUserData {
    users: [User!]
    totalUsers: Int!
  }
  type getAllProjectData {
    projects: [Project!]
    totalProjects: Int!
  }
  type Query {
    getUserLogin(email: String!, password: String!): isAuth!
    getUserProfile: User!
    getAllUser(page: Int!): getAllUserData!
    getAllProjects(page: Int!): getAllProjectData!
  }

  type Mutation {
    createUser(userSignUpInput: UserInputSignUpData!): User!
    deleteUser(id: ID!, password: String!): Boolean!
    updateProfile(userProfileInput: UserInputProfileData): User!
    createEducation(userEducationInput: UserInputEducationData): User!
    updateEducation(id: ID!, userEducationInput: UserInputEducationData): User!
    deleteEducation(id: ID!): Boolean!

    createProject(UserProjectInput: UserProjectInputData): Project!
    updateProject(id: ID!, UserProjectInput: UserProjectInputData): Project!
    deleteProject(id: ID!): Boolean!
    createDetailsProject(id: ID!, UserDetailsProjectInput: UserInputDetailsProjectData!): Project!
    updateDetailsProject(idProject: ID!idDetail: ID!UserDetailsProjectInput: UserInputDetailsProjectData!): Project! # prettier-ignore
    deleteDetailsProject(idProject: ID!, idDetail: ID!): Boolean!

    createCertificate(userCertificateInput: UserCertificateInputData!): Certificate!
    updateCertificate(id: ID!, userCertificateInput: UserCertificateInputData): Certificate!
    deleteCertificate(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;
