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
        bestSellingProducts
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
        bestSellingProducts,
      )} } }) {
        productList: edges {
          node {
            id
            name
            sku
            attribute_set_id
            url_key
            description {
              html
            }
            categories {
              id
              name
            }
            image {
              label
              url {
                childImageSharp {
                  fluid {
                    srcSet
                    src
                    aspectRatio
                  }
                }
              }
            }
            thumbnail {
              label
              url {
                childImageSharp {
                  fluid {
                    srcSet
                    src
                    aspectRatio
                  }
                }
              }
            }
            meta_description
            related_products {
              id
            }
            media_gallery {
              label
              url {
                childImageSharp {
                  fluid {
                    src
                    srcSet
                    aspectRatio
                  }
                }
              }
            }
            options_container
            new
            performance_fabric
          }
        }
      }
    }
  `)

  const { productList } = productsQuery.data.allMagentoProduct
  console.log('productList', productsQuery.data.allMagentoProduct.edges)

  createPage({
    path: '/',
    component: path.resolve('./src/components/pages/Home/index.tsx'),
    context: {
      title,
      primaryHomeBanner,
      bestSellingProducts,
      productList,
    },
  })
}
