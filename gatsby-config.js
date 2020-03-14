const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Storefront`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://divyanshu013.dev`,
    social: {
      twitter: `https://twitter.com/divyanshu013`,
      github: 'https://github.com/divyanshu013',
      youtube: 'https://youtube.com/WhatTheJavaScript',
      soundcloud: 'https://soundcloud.com/divyanshu-maithani',
      instagram: 'https://instagram.com/divyanshu013',
      email: 'mailto:div.blackcat@gmail.com',
    },
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-postcss`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layouts/index.tsx`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-use-dark-mode',
      options: {
        classNameDark: 'dark',
        classNameLight: 'light',
        storageKey: 'darkMode',
        minify: true,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js'),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          components: path.resolve(__dirname, 'src/components'),
          helpers: path.resolve(__dirname, 'src/helpers'),
          queries: path.resolve(__dirname, 'src/queries'),
        },
      },
    },

    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-background-image`,
      options: {
        specialChars: '/:',
      },
    },
  ],
}
