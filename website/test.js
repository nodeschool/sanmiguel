const path = require("path")
const fs = require("fs")
const yaml = require("js-yaml")
const base = "../reconocimientos"
fs.readdirSync(base).forEach(async dude => {
  const file = fs.readFileSync(base + `/${dude}`, "utf8")
  const json = yaml.load(file)
  const path = `/reconocimientos/${encodeURI(
    dude
      .trim()
      .slice(0, -4)
      .replace(/ /gi, "")
  )}`
  Object.keys(json).forEach(key => {
    if (key == "tema") {
      const temas = json[key]
      Object.keys(temas).forEach(tema=>{
        const payload = json[key][tema]
        console.log(payload)
        tema = tema.replace(/ /gi,"-").replace(/-+/,"-")
        console.log(`${path}/${tema}`)
      })
    }
  })
})
