import React from "react"
const FS = require("file-saver")
const PDFJS = window["pdfjs-dist/build/pdf"] || {}

export const renderDiploma = ({ blob, setDiploma, setBlob }) => {
  PDFJS.getDocument(URL.createObjectURL(blob)).then(pdf => {
    pdf.getPage(1).then(page => {
      const canvas = document.createElement("canvas")
      const scale = 1
      const viewport = page.getViewport(scale)
      const context = canvas.getContext("2d")
      canvas.height = 595
      canvas.width = 842
      const renderContext = {
        canvasContext: context,
        viewport: viewport
      }
      page.render(renderContext).then(() => {
        const imageURL = canvas.toDataURL()
        fetch(imageURL)
          .then(req => req.blob())
          .then(img => {
            setBlob({
              img,
              pdf: blob
            })
          })
        setDiploma(
          <div
            className="ba center bw2 __preview"
            style={{
              width: "80vw",
              maxWidth: "40rem",
              backgroundImage: `url(${imageURL})`
            }}>
            <img
              src={imageURL}
              style={{ opacity: 0 }}
              alt=""
              className="is-block"
            />
          </div>
        )
      })
    })
  })
}

export const save = ({ blob, name, format }) => {
  FS.saveAs(blob, `${name.substr(0, 40)}.${format}`)
}
