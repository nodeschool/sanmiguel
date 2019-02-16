const INPUT = document.querySelector(`input[type="file"]`)
const PF = document.querySelector(".profile img")
const BG = document.querySelector(".bg img")
window.onload = () => {
  applyFilters(BG, 1)
  applyFilters(PF)
}
generate = () => {
  html2canvas(document.querySelector(".container")).then(canvas => {
    window.open(canvas.toDataURL("image/png", 0.97), "_blank")
  })
}

INPUT.onchange = e => {
  const reader = new FileReader()
  reader.onload = e => {
    PF.src = e.target.result
    BG.src = e.target.result
    BG.onload = e => {
      applyFilters(BG, 1)
    }
    PF.onload = e => {
      applyFilters(PF)
    }
  }
  reader.readAsDataURL(e.target.files[0])
}

changepics = () => {
  INPUT.click()
}

applyFilters = (e, isBg = false) => {
  console.info("filtering")
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  const img = new Image()
  img.src = e.src
  img.onload = () => {
    const { width, height } = img
    canvas.width = width
    canvas.height = height
    const daSize = height > width ? height : width
    const blur = (daSize / 700) * 9
    ctx.filter = isBg
      ? `brightness(1) sepia(1) saturate(4) hue-rotate(-350deg) blur(${blur}px)`
      : "sepia(1) saturate(1.5)"
    ctx.drawImage(img, 0, 0)
    const url = canvas.toDataURL("image/png", 0.97)
    e.src = url
    e.onload = () => null
  }
}
