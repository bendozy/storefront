import * as React from 'react'
import objectFitImages from 'object-fit-images'
import { MediaContextProvider } from 'helpers/media'

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (!(`IntersectionObserver` in window)) {
    import(`intersection-observer`)
  }
}

export const wrapRootElement = ({ element }) => (
  <MediaContextProvider>{element}</MediaContextProvider>
)

export const onInitialClientRender = () => {
  objectFitImages()
}
