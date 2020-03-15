import path from 'path'

export default async (graphql, createPage) => {
  const language = process.env.CONTENTFUL_LOCALE || 'en-US'
  const homePageTitle = process.env.CONTENTFUL_HOMEPAGE_TITLE

  const query = await graphql(`
    {
      contentfulHomePage(
        title: { eq: "${homePageTitle}" }
        node_locale: { eq: "${language}" }
      ) {
        id
        title
        primaryHomeBanner {
          title
          ctaLink
          cta
          description {
            description
          }
          image {
            localFile {
              absolutePath
              publicURL
              childImageSharp {
                sizes(maxWidth: 2048, maxHeight: 500) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
          mobileImage {
            localFile {
              absolutePath
              publicURL
              childImageSharp {
                sizes(maxWidth: 770, maxHeight: 420) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        }
        bestSellingProducts {
          title
          skus
        }
      }
    }
  `)

  const {
    title,
    primaryHomeBanner,
    bestSellingProducts,
  } = query.data.contentfulHomePage

  const productsQuery = await graphql(`
    {
      allMagentoProduct(filter: { sku: { in: ${JSON.stringify(
        bestSellingProducts.skus,
      )} } }) {
        productList: edges {
          node {
            id
            name
            sku
            url_key
            description {
              html
            }
            metaDescription: meta_description
            image {
              label
              url {
                childImageSharp {
                  fluid(maxWidth: 910, maxHeight: 910) {
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
              }
            }
            new
          }
        }
      }
    }
  `)

  const { productList } = productsQuery.data.allMagentoProduct

  delete bestSellingProducts.skus

  bestSellingProducts.products = productList.map(p => p.node)

  createPage({
    path: '/',
    component: path.resolve('./src/components/pages/Home/index.tsx'),
    context: {
      title,
      primaryHomeBanner,
      bestSellingProducts,
    },
  })
}
