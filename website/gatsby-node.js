const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")
const listaCharlaTaller = path.resolve("src/layouts/listaCharlaTaller.js")
const diploma = path.resolve("src/layouts/diploma.js")
exports.createPages = ({ actions }) => {
  const { createPage } = actions
  fs.readdirSync("../reconocimientos").forEach(async dude => {
    const base = "../reconocimientos"
    fs.readdirSync(base).forEach(async dude => {
      const file = fs.readFileSync(base + `/${dude}`, "utf8")
      const payload = yaml.load(file)
      const path = `/reconocimientos/${encodeURI(
        dude
          .trim()
          .slice(0, -4)
          .replace(/ /gi, "")
      )}`
      createPage({
        path,
        component: listaCharlaTaller,
        context: {
          route: path,
          payload
        }
      })
      Object.keys(payload).forEach(key => {
        if (key == "tema") {
          const temas = payload[key]
          Object.keys(temas).forEach(tema => {
            const _payload = payload[key][tema]
            tema = tema.replace(/ /gi, "-").replace(/-+/, "-")
            const _path = `${path}/${tema}`
            createPage({
              path: _path,
              component: diploma,
              context: {
                route: _path,
                payload: _payload
              }
            })
          })
        }
      })
    })
  })
}
