import React from 'react'
import SEO from 'components/utils/seo'
import ProductsSlider, {
  ProductsSliderProps,
} from 'components/products/ProductsSlider'
import HomeBanner, { HomeBannerProps } from 'components/pages/Home/HomeBanner'

export type HomeProps = {
  pageContext: {
    primaryHomeBanner: HomeBannerProps
    bestSellingProducts: ProductsSliderProps
  }
}

const Home = ({
  pageContext: { primaryHomeBanner, bestSellingProducts },
}: HomeProps) => {
  return (
    <>
      <SEO title="Home" />
      <HomeBanner {...primaryHomeBanner} />
      <ProductsSlider {...bestSellingProducts} />
      <HomeBanner {...primaryHomeBanner} />
      <ProductsSlider {...bestSellingProducts} />
      <HomeBanner {...primaryHomeBanner} />
      <ProductsSlider {...bestSellingProducts} />
    </>
  )
}

export default Home
