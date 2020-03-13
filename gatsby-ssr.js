import * as React from 'react'

import { MediaContextProvider } from 'helpers/media'

export const wrapRootElement = ({ element }) => (
  <MediaContextProvider>{element}</MediaContextProvider>
)
