const path = require('path')
const getHomepage = require('./src/config/homepage.ts')
const createMagentoNodes = require('./src/config/magento-nodes.ts')

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await getHomepage(graphql, createPage)
}

exports.sourceNodes = async ({
  actions,
  getNode,
  store,
  cache,
  createNodeId,
  reporter,
  auth,
}) => {
  const { createNode, touchNode, createPage } = actions

  if (!process.env.MAGENTO_API) {
    reporter.panic(`You need to pass MAGENTO_API option in your environment`)
  }

  return await createMagentoNodes({
    store,
    cache,
    createNode,
    createNodeId,
    touchNode,
    createPage,
    auth,
    reporter,
  })
}
