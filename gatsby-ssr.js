import * as React from 'react'

import { MediaContextProvider } from './src/utils/media'

export const wrapRootElement = ({ element }) => (
  <MediaContextProvider>{element}</MediaContextProvider>
)
