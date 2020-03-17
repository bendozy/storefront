/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-async-promise-executor */
import { GraphQLClient } from 'graphql-request'
import { createRemoteFileNode } from 'gatsby-source-filesystem'
import crypto from 'crypto'
import fs from 'fs'
import productsQuery from './productsQuery.js'

const graphqlEndpoint = process.env.MAGENTO_API || ''

export default (
  { createNode, createNodeId, store, cache, reporter, auth },
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

  const getRemoteImage = async url => {
    return await createRemoteFileNode({
      url,
      store,
      cache,
      createNode,
      createNodeId,
      auth,
    })
  }

  return new Promise(async (resolve, reject) => {
    const client = new GraphQLClient(graphqlEndpoint, {})
    const response = await client.request(productsQuery)

    for (let i = 0; i < response.products.aggregations.length; i++) {
      const attribute = response.products.aggregations[i]

      const nodeData = {
        ...attribute,
        id: createNodeId(`product-${attribute.attribute_code}`),
        magentoId: attribute.id,
        parent: `__PRODUCT_ATTRIBUTES__`,
        children: [],
        internal: {
          type: 'MagentoProductAttribute',
          content: JSON.stringify(attribute),
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(attribute))
            .digest(`hex`),
        },
      }

      createNode(nodeData)
    }

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

        const fileNode = await getRemoteImage(item.image.url)

        if (fileNode) {
          delete item.image.url
          item.image.url___NODE = fileNode.id
        } else {
          fs.writeFileSync(`.skip/${item.id}`)
          console.error('failed to download image:', item.image.url)
        }

        if (item.small_image && item.small_image.url) {
          const imageNode = await getRemoteImage(item.small_image.url)

          if (imageNode) {
            delete item.small_image.url
            item.small_image.url___NODE = imageNode.id
          }
        }

        if (item.thumbnail && item.thumbnail.url) {
          const imageNode = await getRemoteImage(item.thumbnail.url)

          if (imageNode) {
            delete item.thumbnail.url
            item.thumbnail.url___NODE = imageNode.id
          }
        }

        if (item.media_gallery.length > 0) {
          for (let j = 0; j < item.media_gallery.length; j++) {
            const imageNode = await getRemoteImage(
              item.media_gallery[j].url || '',
            )

            if (imageNode) {
              delete item.media_gallery[j].url
              item.media_gallery[j].url___NODE = imageNode.id
            }
          }
        }

        const nodeData = {
          ...item,
          id: createNodeId(`product-${item.id}`),
          magentoId: item.id,
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
      } catch (e) {
        console.log('errrr.', e)
        reject(e)
      }
    }

    resolve()
  })
}
