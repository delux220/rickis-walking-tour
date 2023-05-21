const path = require(`path`)
const moment = require('moment');

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `

    type strapiTour implements Node {
      Link: String!
      Title: String!
      Description: String!
      Price: Float!
      Duration: Float!
      Photo: Node!
      MinimumSize: Float
      Private: Boolean
    }

    type strapiDestinationPhotography implements Node {
      Title: String
      Description: String
      Price: Float
      PriceList: [Node]
    }
    
  `
  createTypes(typeDefs);
}