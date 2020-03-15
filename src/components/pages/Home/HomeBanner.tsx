import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import BackgroundImage from 'gatsby-background-image'
import { Link } from 'gatsby'
import { maxWidth } from 'helpers/media'

type FluidImage = {
  localFile: {
    childImageSharp: {
      fluid: FluidObject
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
  image: FluidImage
  mobileImage: FluidImage
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
          <div className="rounded-md bg-secondary my-10 w-1/2 lg:w-1/3 p-5 mx-5 xl:mx-0">
            <h1 className="text-3xl font-bold mb-10">{title}</h1>
            <div className="text-xl mb-10">
              {description} wwewew wewewew wrw weww dssd fsdffss dsddsasda
              adadadad dsdsdsd sfd sds sd sddsdd sdsd sd sddsd
            </div>
            <div className="text-2xl underline">{cta}</div>
          </div>
        </div>
      </BackgroundImage>
    </div>

    <div className="block md:hidden mx-5 mt-1 mb-5">
      <Img sizes={mobileImage.localFile.childImageSharp.sizes} />

      <h1 className="text-lg font-bold mb-1">{title}</h1>
      <div className="text-base mb-1">{description}</div>
      <div className="text-sm underline">{cta}</div>
    </div>
  </Link>
)

export default HomeBanner
