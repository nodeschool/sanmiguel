const fs = require("fs")
const setDiplomas = async () => {
  console.log("Building assets...")
  const baseURL = __dirname + "/diplomas"
  const blobilize = blobURL => {
    return `data:image/png;base64,${blobURL}`
  }
  let dic = {}
  const getBase64 = async url => {
    return await new Promise((acc, can) => {
      fs.readFile(url, "base64", (e, file) =>
        e !== null ? can("") : acc(file)
      )
    })
  }
  let codeventImages = await new Promise((acc, can) => {
    fs.readdir(baseURL + "/codevent", (e, files) =>
      e !== null ? can([]) : acc(files)
    )
  })
  codeventImages = await Promise.all(
    codeventImages.map(async url => {
      const img = await getBase64(baseURL + "/codevent/" + url)
      dic = {
        ...dic,
        [url.replace(".png", "")]: blobilize(img)
      }
      return img
    })
  )
  const defaultImage = await getBase64(baseURL + "/default.png")
  dic = {
    ...dic,
    default: blobilize(defaultImage)
  }
  fs.writeFileSync(
    baseURL + "/index.js",
    `module.exports = ${JSON.stringify(dic)}`
  )
  console.log("Done!")
}

setDiplomas()
