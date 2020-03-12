const path = require('path')

module.exports = async (graphql, createPage) => {
  const language = process.env.language || 'en'

  const query = await graphql(`
    {
      allPrismicHomepage(filter: { data: { language: { eq: "${language}" } } }) {
        nodes {
          data {
            title
            banners {
              banner_description
              cta
              cta_link
              weight
              banner_image {
                url
                name
              }
            }
            featured_products {
              product_sku
            }
            best_sellers {
              product_sku
            }
            categories {
              category_title
              weight
              category_image {
                url
                name
              }
            }
          }
        }
      }
    }
  `)

  const {
    title,
    banners,
    categories,
    ...homePage
  } = query.data.allPrismicHomepage.nodes[0].data

  createPage({
    path: '/',
    component: path.resolve('./src/components/pages/Home/index.tsx'),
    context: {
      title,
      banners: banners.sort((a, b) => a.weight - b.weight),
      categories: categories.sort((a, b) => a.weight - b.weight),
    },
  })

  console.log('query', JSON.stringify(homePage, null, 2))
}
