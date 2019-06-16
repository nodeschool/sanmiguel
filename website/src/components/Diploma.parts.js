import React, { useState } from "react"
const FS = require("file-saver")
const PDFJS = window["pdfjs-dist/build/pdf"] || {}
const Snackbar = require("node-snackbar")
const copy = require("clipboard-copy")
export const ShareBox = ({ onHide = () => null, data = "" }) => {
  const [addRaw, setRaw] = useState(false)
  const _data = `${data}${addRaw ? "/raw" : ""}`
  return (
    <div className="modal is-active">
      <div
        className="modal-background animated fadeIn faster"
        onClick={onHide}
      />
      <div className="modal-content">
        <div className="card pa2">
          <div className="flex items-center justify-center">
            <input
              type="text"
              value={_data}
              readOnly
              className="input is-radiusless is-light"
            />
            <div
              title="Copiar al portapeles"
              className="button is-radiusless"
              onClick={() => {
                copy(_data).then(() => {
                  Snackbar.show({
                    text: "Copiado a la papelera",
                    backgroundColor: "white",
                    textColor: "#212121",
                    pos: "top-right",
                    showAction: false,
                    duration: 1300
                  })
                })
              }}>
              <i className="icon ion-md-clipboard is-size-5" />
            </div>
            <div
              title="Compartir como RAW"
              className={`button is-radiusless ${addRaw &&
                "is-black is-outlined"}`}
              onClick={() => setRaw(!addRaw)}
              style={{ width: "2.5rem" }}>
              <div style={{ fontSize: "0.7rem" }}>RAW</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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
