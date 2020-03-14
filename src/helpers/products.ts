/* eslint-disable no-async-promise-executor */
const graphqlRequest = require('graphql-request')
const gsfs = require('gatsby-source-filesystem')
const crypto = require('crypto')
const fs = require('fs')
const productsQuery = require('../queries/products.ts')

const graphqlEndpoint = process.env.MAGENTO_API || ''

module.exports = (
  { createNode, createPage, createNodeId, store, cache, reporter, auth },
  { storeConfig },
  productMap,
  indexMap,
) => {
  if (!storeConfig) {
    reporter.panic(`got empty storeConfig`)
  }

  if (!storeConfig.secure_base_media_url) {
    reporter.panic(`got empty storeConfig.secure_base_media_url`)
  }

  if (!fs.existsSync('.skip')) {
    fs.mkdirSync('.skip')
  }

  return new Promise(async (resolve, reject) => {
    const client = new graphqlRequest.GraphQLClient(graphqlEndpoint, {})

    const response = await client.request(productsQuery)
    console.log('resp', response)

    for (let i = 0; i < response.products.items.length; i++) {
      try {
        const item = response.products.items[i]

        if (fs.existsSync(`.skip/${item.id}`)) {
          continue
        }

        if (!item) {
          reporter.panic(
            `Got invalid result from GraphQL endpoint: ${JSON.stringify(
              item,
              0,
              2,
            )}`,
          )
        }

        const fileNode = await gsfs.createRemoteFileNode({
          url: item.image.url,
          store,
          cache,
          createNode,
          createNodeId,
          auth,
        })

        if (fileNode) {
          delete item.image.url

          item.image.url___NODE = fileNode.id

          const nodeData = {
            ...item,
            id: createNodeId(`product-${item.id}`),
            magento_id: item.id,
            parent: `__PRODUCTS__`,
            children: [],
            internal: {
              type: 'MagentoProduct',
              content: JSON.stringify(item),
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(item))
                .digest(`hex`),
            },
          }

          createNode(nodeData)

          productMap[item.id] = nodeData.id

          indexMap['product'][item.id] = nodeData.id
          indexMap['product']['sku_' + item.sku] = nodeData.id

          const aggregate = ['new', 'eco_collection']

          for (const aggr of aggregate) {
            const key = aggr + '_' + item[aggr]
            if (!indexMap['product'][key]) {
              indexMap['product'][key] = []
            }

            indexMap['product'][key].push(nodeData.id)
          }
        } else {
          fs.writeFileSync(`.skip/${item.id}`)
          console.error('failed to download image:', item.image.url)
        }
      } catch (e) {
        reject(e)
      }
    }

    resolve()
  })
}
