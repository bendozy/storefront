const graphqlRequest = require('graphql-request')
const crypto = require('crypto')
const storeConfigQuery = require('../queries/storeConfig.ts')

const graphqlEndpoint = process.env.MAGENTO_API || ''

module.exports = ({ createNode, createNodeId, reporter }) => {
  return new Promise(async (resolve, reject) => {
    const client = new graphqlRequest.GraphQLClient(graphqlEndpoint, {})

    try {
      const config = await client.request(storeConfigQuery)

      createNode({
        ...config.storeConfig,
        id: createNodeId(`${config.id}`),
        magento_id: config.id,
        parent: `__STORE__`,
        children: [],
        internal: {
          type: 'MagentoStore',
          content: JSON.stringify(config),
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(config))
            .digest(`hex`),
        },
      })

      resolve(config)
    } catch (e) {
      reporter.panic(`Failed to fetch Magento store config: ${e}`)
    }
  })
}
