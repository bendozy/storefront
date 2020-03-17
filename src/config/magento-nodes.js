import createStoreNode from './storeConfig'
import createProductNodes from './products'
import createCategoryNodes from './categories.js'

// type Config

export default async params => {
  const productMap = {}

  const indexMap = {
    product: {},
    category: {},
  }

  const config = await createStoreNode(params)

  await createProductNodes(params, { ...config }, productMap, indexMap)
  await createCategoryNodes(params, { ...config }, productMap, indexMap)
}
