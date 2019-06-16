import React, { useState, useEffect } from "react"
import { withRouter } from "react-router-dom"
import "moment/locale/es"
import { Nav } from "./PalList.parts"
import { nameParser } from "./Home.helpers"
import DiplomaLayout from "./DiplomaLayout"
import "node-snackbar/dist/snackbar.min.css"
import { Helmet } from "react-helmet"
import { ShareBox } from "./Diploma.parts"
const FS = require("file-saver")
const PDFJS = window["pdfjs-dist/build/pdf"] || {}
const yaml = require("js-yaml")
const moment = require("moment")
moment.locale("es")
const url =
  "https://raw.githubusercontent.com/nodeschool/sanmiguel/master/reconocimientos/"

const renderDiploma = ({ blob, setDiploma, setBlob }) => {
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

const save = ({ blob, name, format }) => {
  FS.saveAs(blob, `${name.substr(0, 40)}.${format}`)
}

export default withRouter(
  ({
    match: {
      params: { pal, topic, raw = "" }
    },
    location: { pathname }
  }) => {
    const isRaw = raw === "raw"
    console.log("isRaw: " + isRaw)
    const [info, setInfo] = useState(false)
    const fetchData = async () => {
      const req = await fetch(url + `${pal.split("_").join("%20")}.yml`)
      const data = await req.text()
      console.log(data)
      setInfo(yaml.load(data))
    }
    useEffect(() => {
      info || fetchData()
    }, [info])
    const _topic = topic.split("_").join(" ")
    const _pal = pal.split("_").join(" ")
    const curTopic = info && info.tema[_topic]
    const _to = pathname
      .split("/")
      .slice(0, -1)
      .join("/")
    const _url = `https://nodeschool.io/sanmiguel/#${pathname.substr(
      1
    )}`.replace(/\/raw$/, "")
    const { titulo = false, fecha = false, tipo = false } = curTopic
    const [diploma, setDiploma] = useState(false)
    const [diplomaBlob, setBlob] = useState({ img: null, pdf: null })
    const [modal, showModal] = useState(false)

    const MainLayout = () => {
      return (
        <div className="container content">
          <div className="pa3 flex flex-column min-vh-100">
            <Nav
              title={
                info
                  ? `${info.nombre} / ${titulo}`
                  : `${nameParser(_pal)} / ${nameParser(_topic)}`
              }
              to={_to}
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
                        name: encodeURI(`${pal}-${topic}`),
                        format: "png"
                      })
                    }
                    className="button is-warning is-small">
                    <i className="icon ion-md-image" />
                    <span>Descargar PNG</span>
                  </div>
                  <div
                    title="Descargar en formato PDF"
                    onClick={() =>
                      save({
                        blob: diplomaBlob.pdf,
                        name: encodeURI(`${pal}-${topic}`),
                        format: "pdf"
                      })
                    }
                    className="button is-warning is-inverted is-small">
                    <i className="icon ion-md-document" />
                    <span>Descargar PDF</span>
                  </div>
                  <div
                    title="Obtener URL para compartir el reconocimiento"
                    onClick={() => showModal(true)}
                    className="button is-black is-small is-outlined">
                    <span>Compartir</span>
                    <i className="icon ion-md-share-alt" />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-grow-1 w-100 items-center justify-center">
                <div className="animated flipInY infinite slower f2 b ba bw2 pv1 ph3">
                  CARGANDO
                </div>
              </div>
            )}
          </div>
        </div>
      )
    }

    if (diploma && isRaw)
      window.location.href = diploma.props.style.backgroundImage.slice(4, -1)
    return (
      <div className="Diploma has-background-warning">
        <Helmet>
          <title>Here's the Title!</title>
          <meta property="og:title" content="Cambia" />
          <meta property="og:description" content="Cambia alv" />
        </Helmet>
        {modal && <ShareBox data={_url} onHide={() => showModal(false)} />}
        {!diploma && info && (
          <DiplomaLayout
            url={_url}
            date={moment(fecha, "DD-MM-YYYY").format(
              "dddd DD [de] MMMM [del] YYYY"
            )}
            name={info.nombre}
            type={tipo}
            tema={titulo}
            onRender={blob => {
              console.log("Update")
              renderDiploma({ blob, setDiploma, setBlob })
            }}
          />
        )}
        {isRaw ? (
          <div className="flex flex-grow-1 w-100 vh-100 items-center justify-center">
            <div className="animated flipInY infinite slower f2 b ba bw2 pv1 ph3">
              GENERANDO
            </div>
          </div>
        ) : (
          <MainLayout />
        )}
      </div>
    )
  }
)
