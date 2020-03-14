interface PageInput {
  path: string
  component: string
  layout?: string
  context?: {}
}

interface BoundActionCreators {
  createPage: (page: PageInput) => void
  deletePage: (page: PageInput) => void
  createRedirect: (opts: {
    fromPath: string
    isPermanent?: boolean
    redirectInBrowser?: boolean
    toPath: string
  }) => void
}

export type GatsbyCreatePages = (fns: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  graphql: any
  actions: BoundActionCreators
}) => void
