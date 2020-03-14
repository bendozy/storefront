import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import useDarkMode from 'use-dark-mode'
import classNames from 'classnames'

import Header from './Header'
import './index.scss'

const Layout = ({ children, uri, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const darkMode = useDarkMode(false)
  const theme = `theme-${darkMode.value ? `dark` : `light`}`

  return (
    <div className={classNames(['layout', theme])}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: uri !== '/' ? `1176px` : undefined,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
