import React from 'react'
import Img from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import { Link } from 'gatsby'
import { maxWidth } from 'helpers/media'

type SizedImage = {
  localFile: {
    childImageSharp: {
      sizes: {
        aspectRatio: number
        src: string
        srcSet: string
        sizes: string
        base64?: string
        tracedSVG?: string
        srcWebp?: string
        srcSetWebp?: string
        media?: string
      }
    }
  }
}

export type HomeBannerProps = {
  title: string
  description: {
    description: string
  }
  cta: string
  ctaLink: string
  image: SizedImage
  mobileImage: SizedImage
}

const HomeBanner = ({
  title,
  description: { description },
  cta,
  ctaLink,
  image,
  mobileImage,
}: HomeBannerProps) => (
  <Link to={ctaLink}>
    <div className="hidden md:block">
      <BackgroundImage
        Tag="section"
        className="HomeBanner mx-5 md:mx-0"
        sizes={image.localFile.childImageSharp.sizes}
        style={{ overflow: 'hidden' }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth,
          }}
        >
          <div className="bg-secondary my-10 w-1/2 lg:w-1/3 p-5 mx-5 xl:mx-0">
            <h1 className="text-3xl font-bold mb-10 font-title">{title}</h1>
            <div className="text-xl mb-10">{description}</div>
            <div className="text-2xl underline">{cta}</div>
          </div>
        </div>
      </BackgroundImage>
    </div>

    <div className="block md:hidden mt-1 mb-5">
      <Img sizes={mobileImage.localFile.childImageSharp.sizes} />
      <div className="block md:hidden mx-5 mt-1 mb-5">
        <h1 className="text-lg font-bold mb-1 font-title text-2xl">{title}</h1>
        <div className="text-base mb-1">{description}</div>
        <div className="text-sm underline">{cta}</div>
      </div>
    </div>
  </Link>
)

export default HomeBanner
