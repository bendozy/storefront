/* eslint-disable no-async-promise-executor */
/* eslint-disable @typescript-eslint/camelcase */
import { GraphQLClient } from 'graphql-request'
// import { createRemoteFileNode } from 'gatsby-source-filesystem'
import categoriesQuery from './categoriesQuery'
import crypto from 'crypto'

const graphqlEndpoint = process.env.MAGENTO_API || ''

/**
 * @param context
 * @param rootId
 * @returns {Promise<void>}
 */
async function fetchCategories(context, rootId, productMap) {
  const {
    client,
    categoriesQuery,
    reject,
    createNodeId,
    createNode,
    cache,
    // auth,
    // store,
  } = context
  const ids = []

  try {
    // todo: add some data to invalidate cache when updated in Magento
    const categoryCacheKey = `magento-category-${rootId}`

    let res = await cache.get(categoryCacheKey)
    if (!res) {
      res = await client.request(categoriesQuery, {
        id: rootId,
      })

      cache.set(categoryCacheKey, res)
    }

    for (const item of res.categoryList[0].children) {
      let children = []
      if (item.children_count > 0) {
        // load each of the child categories
        children = await fetchCategories(context, item.id, productMap)
      }

      const itemCopy = {
        ...item,
      }

      itemCopy.products___NODE = item.products.items.map(
        item => productMap[item.id],
      )

      itemCopy.children = children

      delete itemCopy.products

      // if (itemCopy.image) {
      //   const imageNode = await createRemoteFileNode({
      //     url: itemCopy.image,
      //     store,
      //     cache,
      //     createNode,
      //     createNodeId,
      //     auth,
      //   })

      //   if (imageNode) {
      //     delete itemCopy.image
      //     itemCopy.image___NODE = imageNode.id
      //   }
      // }

      const nodeData = {
        ...itemCopy,
        id: createNodeId(`magento-category-${item.id}`),
        magento_id: item.id,
        parent_category_id: rootId,
        internal: {
          type: 'MagentoCategory',
          content: JSON.stringify(itemCopy),
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(itemCopy))
            .digest(`hex`),
        },
      }

      createNode(nodeData)

      ids.push(nodeData.id)
    }
  } catch (e) {
    console.log('err', e)

    reject(e)
  }

  return ids
}

const createCategoryNodes = (
  { createNode, createNodeId, store, cache, reporter, auth },
  { storeConfig },
  productMap,
) => {
  if (!storeConfig) {
    reporter.panic(`got empty storeConfig`)
  }

  if (!storeConfig.secure_base_media_url) {
    reporter.panic(`got empty storeConfig.secure_base_media_url`)
  }

  const activity = reporter.activityTimer(`load Magento categories`)

  activity.start()

  return new Promise(async (resolve, reject) => {
    const client = new GraphQLClient(graphqlEndpoint, {})

    await fetchCategories(
      {
        client,
        categoriesQuery,
        reject: () => {
          activity.end()
          reject()
        },
        createNode,
        createNodeId,
        storeConfig,
        auth,
        store,
        cache,
      },
      2,
      productMap,
    )

    activity.end()

    resolve()
  })
}

export default createCategoryNodes
