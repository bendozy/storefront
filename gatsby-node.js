const path = require('path')
const { createRemoteFileNode } = require('gatsby-source-filesystem')
const getHomepage = require('./src/config/homepage.ts')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  getHomepage(graphql, createPage)
}
