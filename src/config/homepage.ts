const path = require('path')

module.exports = async (graphql, createPage) => {
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
                fluid(cropFocus: EAST, fit: COVER, quality: 100, maxHeight: 500) {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
              }
            }
          }
          mobileImage {
            localFile {
              absolutePath
              publicURL
              childImageSharp {
                fluid(maxHeight: 150) {
                  src
                  srcSet
                  aspectRatio
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
