import React from 'react'
import { Link } from 'gatsby'

import Image from 'components/utils/image'
import SEO from 'components/utils/seo'
import HomeBanner, { HomeBannerProps } from 'components/pages/Home/HomeBanner'

export type HomeProps = {
  pageContext: {
    primaryHomeBanner: HomeBannerProps
    bestSellingProducts: [string]
  }
}

const Home = ({
  pageContext: { primaryHomeBanner, bestSellingProducts },
}: HomeProps) => {
  return (
    <>
      <SEO title="Home" />
      <HomeBanner {...primaryHomeBanner} />
      <HomeBanner {...primaryHomeBanner} />
      <HomeBanner {...primaryHomeBanner} />
    </>
  )
}

export default Home
