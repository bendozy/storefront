import getHomepage from './src/config/homepage'
import createMagentoNodes from './src/config/magento-nodes'

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await getHomepage(graphql, createPage)
}

exports.sourceNodes = async ({
  actions,
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
