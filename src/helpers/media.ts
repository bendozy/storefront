import { createMedia } from '@artsy/fresnel'

export const breakpoints = {
  xs: 450,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

const QueryBreakpoints = createMedia({
  breakpoints,
})

export const mediaStyles = QueryBreakpoints.createMediaStyle()
export const { Media, MediaContextProvider } = QueryBreakpoints
export const maxWidth = 1176
