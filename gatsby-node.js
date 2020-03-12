const path = require('path')
const getHomepage = require('./src/config/homepage.ts')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  getHomepage(graphql, createPage)
}
