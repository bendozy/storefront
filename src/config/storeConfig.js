import { GraphQLClient } from 'graphql-request'
import crypto from 'crypto'
import storeConfigQuery from './storeConfigQuery'

const graphqlEndpoint = process.env.MAGENTO_API || ''

export default ({ createNode, createNodeId, reporter }) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const client = new GraphQLClient(graphqlEndpoint, {})

    try {
      const config = await client.request(storeConfigQuery)

      createNode({
        ...config.storeConfig,
        id: createNodeId(`${config.id}`),
        magentoId: config.id,
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
