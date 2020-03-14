import React from 'react'

import SEO from 'components/utils/seo'
import ProductsSlider from 'components/products/ProductsSlider'
import HomeBanner, { HomeBannerProps } from 'components/pages/Home/HomeBanner'

export type HomeProps = {
  pageContext: {
    primaryHomeBanner: HomeBannerProps
  }
}

const Home = ({
  pageContext: { primaryHomeBanner, productList },
}: HomeProps) => {
  console.log('productList', productList)

  return (
    <>
      <SEO title="Home" />
      <HomeBanner {...primaryHomeBanner} />
      <ProductsSlider />
      <HomeBanner {...primaryHomeBanner} />
      <HomeBanner {...primaryHomeBanner} />
    </>
  )
}

export default Home
