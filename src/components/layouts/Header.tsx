import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import useDarkMode from 'use-dark-mode'
import { FiSun, FiMoon } from 'react-icons/fi'

const Toggle = ({ checked, onChange }) => (
  <span className="toggle-control">
    <input
      className="dmcheck"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id="dmcheck"
    />
    <label htmlFor="dmcheck" />
  </span>
)

const Header = ({ siteTitle }) => {
  const darkMode = useDarkMode(false, {
    classNameDark: 'dark',
    classNameLight: 'light',
    storageKey: 'darkMode',
  })

  return (
    <header
      style={{
        background: `#ff6900`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1176,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div className="dark-mode-toggle">
          <button
            className="text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={darkMode.toggle}
          >
            {darkMode.value ? (
              <FiSun color="white" />
            ) : (
              <FiMoon color="black" />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
