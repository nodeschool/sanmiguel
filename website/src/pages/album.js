import React, { useState, useEffect } from "react"
import { css } from "emotion"
export default () => {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    const _fetch = async () => {
      const req = await fetch(
        "https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/meetup",
        { headers: { endpoint: "photos" } }
      )
      let data = await req.json()
      setPhotos(data)
    }
    photos.length || _fetch()
  }, [photos])
  return (
    <div className="Album has-background-warning min-vh-100">
      <div className="flex pa2 f1 b items-center has-text-black justify-center">
        #ALBUM
      </div>
      <div className="container content flex flex-items justify-center flex-wrap">
        {photos.map(
          ({
            highres_link,
            photo_link,
            photo_album: { title = "CODEVENT X.X" }
          }) => {
            if (!title.includes("CODEVENT")) return null
            return (
              <a
                href={highres_link}
                className={
                  "flex items-center justify-end flex-column " +
                  css`
                    .me {
                      position: absolute;
                      top: 0;
                      left: 0;
                      right: 0;
                      background: black;
                      bottom: 0;
                      z-index: 1;
                      text-transform: uppercase;
                      text-shadow: -3px 4px black;
                      padding: 1rem;
                      opacity: 0;
                      box-shadow: inset 0px 0px 40px 10px rgba(0, 0, 0, 0.9),
                        0px 0px 10px 5px rgba(0, 0, 0, 0.5);
                      transition: all 0.15s ease-in;
                    }
                    &:hover .me {
                      opacity: 0.8;
                    }
                  `
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="me f1 b has-text-warning flex items-center is-marginless">
                  {title}
                </div>
                <img src={photo_link} alt=" " style={{ maxHeight: "15rem" }} />
              </a>
            )
          }
        )}
      </div>
      <p className="pa2 has-text-centered pb4">
        Pequeño recuerdo de los <b>CODEVENT's</b>
      </p>
    </div>
  )
}
