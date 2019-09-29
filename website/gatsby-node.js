const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")
const listaCharlaTaller = path.resolve("src/layouts/listaCharlaTaller.js")
const diploma = path.resolve("src/layouts/diploma.js")
const reconocimientos = path.resolve("src/layouts/reconocimientos.js")
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  const payload = await Promise.all(
    fs.readdirSync("../reconocimientos", "utf-8").map(dude => {
      const base = "../reconocimientos"
      const file = fs.readFileSync(base + `/${dude}`, "utf8")
      const payload = yaml.load(file)
      let NAME = dude.trim().slice(0, -4)
      const path = `/reconocimientos/${encodeURI(NAME.replace(/ /gi, ""))}`
      createPage({
        path,
        component: listaCharlaTaller,
        context: {
          route: path,
          payload
        }
      })
      NAME = payload.nombre
      const temas = payload.tema
      Object.keys(temas).forEach(tema => {
        const _payload = payload.tema[tema]
        tema = tema.replace(/ /gi, "-").replace(/-+/, "-")
        const _path = `${path}/${tema}`
        createPage({
          path: _path,
          component: diploma,
          context: {
            route: _path,
            payload: _payload,
            name: NAME
          }
        })
      })
      return {
        nombre: NAME,
        path
      }
    })
  )
  createPage({
    path: "/reconocimientos",
    component: reconocimientos,
    context: {
      payload
    }
  })
}
