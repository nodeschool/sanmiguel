import React from "react"
import { Helmet } from "react-helmet"
import siteMetadata from "../../siteMetadata"
const defaultImage = require("assets/img/banner.png")
export const Metas = ({
  description = "",
  title = "",
  keywords = "",
  url = "",
  author = "",
  image = defaultImage
}) => {
  if (!title) {
    console.log("At least a title must be provided :: METAS")
    return null
  }

  url = url ? url : siteMetadata.url
  keywords = keywords ? keywords : siteMetadata.keywords
  description = description ? description : siteMetadata.description
  return (
    <Helmet>
      {/* Site tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" cpntent={keywords} />
      {/* OpenGraph tags */}
      <meta name="og:url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={image} />
      <meta name="og:type" content="website" />
      {/* Twitter Card tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content={description} />
      <meta name="twitter:creator" content={author} />
    </Helmet>
  )
}
