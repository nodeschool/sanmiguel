module.exports = {
  siteMetadata: {
    title: `Iorika | Una comunidad de desarrolladores, para desarolladores.`,
    siteUrl: `https://iorika.com`,
    description: `Un website crafteado por web devs, para web devs. Acá encontraras, herramientas, posts, cursos y talleres de alta calidad evaluados, bien revisados y sin bullshit para tí.`
  },
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
    },{
      resolve: `gatsby-plugin-module-resolver`,
      options: {
        root: `./src`,
        aliases: {
          "assets": `./assets`,
          "helpers": `./helpers`,
          "components": `./components`
        }
      }
    }
  ]
}
