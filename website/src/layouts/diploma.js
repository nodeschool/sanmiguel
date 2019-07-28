import React, { useState } from "react"
import "moment/locale/es"
import { Nav, Loader } from "components"
import { nameParser } from "helpers/homepage"
import DiplomaLayout from "components/rawDiploma"
import "node-snackbar/dist/snackbar.min.css"
import { ShareBox } from "components/diploma"
import { renderDiploma, save } from "helpers/diploma"
const moment = require("moment")
moment.locale("es")
export default ({ pageContext: { payload, route, name = "NAME" } }) => {
  const diplomaURL = `https://nodeschool.io/sanmiguel${route}`
  const {
    titulo = "TITULO",
    fecha = moment.format("DD-MM-YYYY"),
    tipo = "Charla",
    codevent = false,
    version = "1.0"
  } = payload
  const topic = encodeURI(titulo)
  const [diploma, setDiploma] = useState(false)
  const [diplomaBlob, setBlob] = useState({ img: null, pdf: null })
  const [modal, showModal] = useState(false)
  const MainLayout = () => {
    return (
      <div className="container content">
        <div className="pa3 flex flex-column min-vh-100">
          <Nav
            title={`${nameParser(name)} / ${titulo}`}
            to={route
              .split("/")
              .slice(0, -1)
              .join("/")}
          />
          {diploma ? (
            <>
              <div className="flex-grow-1 w-100 items-center justify-center flex">
                {diploma}
              </div>
              <div className="buttons is-right mt3">
                <div
                  title="Descargar como una imagen PNG"
                  onClick={() =>
                    save({
                      blob: diplomaBlob.img,
                      name: encodeURI(`${name}-${topic}`),
                      format: "png"
                    })
                  }
                  className="button is-warning is-small"
                >
                  <i className="icon ion-md-image" />
                  <span>Descargar PNG</span>
                </div>
                <div
                  title="Descargar en formato PDF"
                  onClick={() =>
                    save({
                      blob: diplomaBlob.pdf,
                      name: encodeURI(`${name}-${topic}`),
                      format: "pdf"
                    })
                  }
                  className="button is-warning is-inverted is-small"
                >
                  <i className="icon ion-md-document" />
                  <span>Descargar PDF</span>
                </div>
                <div
                  title="Obtener URL para compartir el reconocimiento"
                  onClick={() => showModal(true)}
                  className="button is-black is-small is-outlined"
                >
                  <span>Compartir</span>
                  <i className="icon ion-md-share-alt" />
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    )
  }
  const canIRender = typeof window !== "undefined" && !diploma
  return (
    <div className="Diploma has-background-warning">
      {modal && <ShareBox data={diplomaURL} onHide={() => showModal(false)} />}
      {canIRender && (
        <DiplomaLayout
          url={diplomaURL}
          date={moment(fecha, "DD-MM-YYYY").format(
            "dddd DD [de] MMMM [del] YYYY"
          )}
          name={nameParser(name)}
          type={tipo}
          tema={titulo}
          isCodevent={codevent}
          version={version}
          onRender={blob => {
            console.log("Updated")
            renderDiploma({ blob, setDiploma, setBlob })
          }}
        />
      )}
      <MainLayout />
    </div>
  )
}
