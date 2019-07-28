const siteMetadata = require("./siteMetadata")
module.exports = {
  pathPrefix: `/sanmiguel`,
  siteMetadata,
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nodeschool San Miguel`,
        short_name: `nodeschoolsm`,
        start_url: `/`,
        background_color: `#f0db4f`,
        theme_color: `#f0db4f`,
        display: `minimal-ui`,
        icon: `src/assets/img/padded-transparent.png`
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /([^\.no])\.svg$/
        }
      }
    },
    {
      resolve: `gatsby-plugin-module-resolver`,
      options: {
        root: `./src`,
        aliases: {
          assets: `./assets`,
          helpers: `./helpers`,
          components: `./components`
        }
      }
    }
  ]
}
