import React, { useState } from "react"
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
