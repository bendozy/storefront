import React, { useState, useEffect } from 'react'
import Carousel from 'nuka-carousel'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Card from './ProductCard'
import { maxWidth, breakpoints } from 'helpers/media'

const isClient = typeof window !== 'undefined'

const getNumberOfSlides = (width: number) => {
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

const ProductsSlider = () => {
  const [slidesToShow, setSlidesToShow] = useState(4)

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
    <div style={{ maxWidth, margin: '0 auto' }} className="py-5 px-5 xl:px-0">
      <div>Featured Products</div>
      <Carousel
        renderCenterLeftControls={({ previousSlide }) => (
          <button onClick={previousSlide}>
            <FaChevronLeft size="2em" />
          </button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>
            <FaChevronRight size="2em" />
          </button>
        )}
        renderBottomCenterControls={null}
        slidesToShow={slidesToShow}
        swiping
      >
        <Card first={true} />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card last={true} />
      </Carousel>
    </div>
  )
}

export default ProductsSlider
