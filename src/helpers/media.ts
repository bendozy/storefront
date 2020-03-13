import { createMedia } from '@artsy/fresnel'

const QueryBreakpoints = createMedia({
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
})

export const mediaStyles = QueryBreakpoints.createMediaStyle()
export const { Media, MediaContextProvider } = QueryBreakpoints
export const maxWidth = 1176
