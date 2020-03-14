const createStoreNode = require('../helpers/storeConfig.ts')
const createProductNodes = require('../helpers/products.ts')

module.exports = async params => {
  const productMap = {}

  const indexMap = {
    product: {},
    category: {},
  }

  const config = await createStoreNode(params)

  await createProductNodes(params, { ...config }, productMap, indexMap)
}
