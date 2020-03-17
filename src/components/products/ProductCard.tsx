import React from 'react'
import Image, { FluidObject } from 'gatsby-image'
import classNames from 'classnames'
import { Link } from 'gatsby'

export type ProductPreview = {
  id: string
  name: string
  metaDescription?: string
  image: {
    label?: string
    url: {
      childImageSharp: { fluid: FluidObject }
    }
  }
}

export type ProductCardProps = {
  firstItem?: boolean
  lastItem?: boolean
  product: ProductPreview
}

const ProductCard = ({
  product: {
    name,
    image: {
      url: {
        childImageSharp: { fluid },
      },
    },
  },
  firstItem,
  lastItem,
}: ProductCardProps) => {
  return (
    <div
      className={classNames('max-w-sm border', {
        'ml-2': !firstItem,
        'mr-2': !lastItem,
      })}
    >
      <Link to="/">
        <Image fluid={fluid} imgStyle={{ objectFit: 'contain' }} />
        <div className="px-6 py-4 h-auto overflow-hidden">
          <div className="font-bold text-xl mb-2 font-title text-orange-700">
            $10
          </div>
          <div className="font-title">{name}</div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
