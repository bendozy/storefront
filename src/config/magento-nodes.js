import createStoreNode from './storeConfig'
import createProductNodes from './products'

// type Config

export default async params => {
  const productMap = {}

  const indexMap = {
    product: {},
    category: {},
  }

  const config = await createStoreNode(params)

  await createProductNodes(params, { ...config }, productMap, indexMap)
}
