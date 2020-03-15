import React, { useState, useEffect } from 'react'
import Carousel from 'nuka-carousel'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCard, { ProductPreview } from 'components/products/ProductCard'
import { breakpoints, maxWidth } from 'helpers/media'

const isClient = typeof window !== 'undefined'

const getNumberOfSlides = (width: number) => {
  // if (width >= breakpoints.xl) {
  //   return 5
  // }
  if (width >= breakpoints.lg) {
    return 4
  }

  if (width >= breakpoints.md) {
    return 3
  }

  if (width > breakpoints.xs) {
    return 2
  }

  return 1
}

export type ProductsSliderProps = {
  title: string
  products: [ProductPreview]
}

const ProductsSlider = ({ title, products }: ProductsSliderProps) => {
  const [slidesToShow, setSlidesToShow] = useState(1)

  useEffect(() => {
    if (isClient) {
      const handleResize = () =>
        setSlidesToShow(getNumberOfSlides(window.innerWidth))

      window.addEventListener('resize', handleResize)
      handleResize()
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  })

  return (
    <div style={{ maxWidth }} className="mx-auto py-5 mx-5 px-5 xl:px-0">
      <div>{title}</div>
      <Carousel
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}>
            <div className="bg-secondary py-5">
              <FaChevronLeft size="2em" />
            </div>
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>
            <div className="bg-secondary py-5">
              <FaChevronRight size="2em" />
            </div>
          </button>
        )}
        renderBottomCenterControls={null}
        slidesToShow={slidesToShow}
        swiping
      >
        {products.map((product, index) => (
          <ProductCard
            key={`_${product.id}-${index}`}
            product={product}
            firstItem={index === 0}
            lastItem={index === products.length - 1}
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ProductsSlider
