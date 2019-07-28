const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-layouts-lista-charla-taller-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/layouts/listaCharlaTaller.js"))),
  "component---src-layouts-diploma-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/layouts/diploma.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/spot/sanmiguel/website/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/pages/404.js"))),
  "component---src-pages-album-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/pages/album.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/pages/index.js"))),
  "component---src-pages-reconocimientos-js": hot(preferDefault(require("/home/spot/sanmiguel/website/src/pages/reconocimientos.js")))
}

