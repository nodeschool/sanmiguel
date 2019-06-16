import React, { useState, useEffect } from "react"

export const ImageLoader = ({ e }) => {
  const [imageLoaded, setImage] = useState(false)
  const fetchImage = async () => {
    let img = await fetch(e.avatar_url)
    img = await img.blob()
    img = URL.createObjectURL(img)
    setImage(img)
  }
  useEffect(() => {
    imageLoaded || fetchImage()
  }, [imageLoaded])
  return (
    imageLoaded && (
      <a
        className="grid-item animated fadeIn slower"
        href={e.html_url}
        target="_blank"
        rel="noopener noreferrer">
        <div
          className="pic"
          style={{ backgroundImage: `url(${imageLoaded})` }}
          title={e.login}
        />
      </a>
    )
  )
}

export const JoiningLinks = () => {
  return (
    <div className="pt4 ph4">
      <div className="has-text-warning has-text-centered has-text-weight-light">
        INFORMÁTE POR
      </div>
      <div className="flex items-center justify-center flex-wrap">
        <a
          className="button is-large --resize is-warning ma1"
          href="https://join.slack.com/t/nodeschoolsm/shared_invite/enQtNjEzNjc2NjczOTA4LWNhZDhhZTg2YzBiODUzMDJiZTg5NjZiMzIzZTg5YTIxMjIwNzRjMzIyMjQwYTA4NWJmZTIyZGQ4MmNmZjYwMTA"
          target="_blank"
          title="Preferido"
          rel="noopener noreferrer">
          <i className="icon ion-logo-slack f3" />
          <span>Slack</span>
        </a>
        <a
          className="button is-large --resize is-warning ma1"
          href="https://discord.gg/VzKQtup"
          target="_blank"
          rel="noopener noreferrer">
          <img
            src={require("../assets/img/discord.svg")}
            className="mr2"
            alt=""
            style={{ width: "1.5rem" }}
          />
          <span>Discord</span>
        </a>
        <a
          className="button is-large --resize is-warning ma1"
          href="https://www.facebook.com/groups/nodeschoolsm"
          target="_blank"
          rel="noopener noreferrer">
          <i className="icon ion-logo-facebook f3" />
          <span>Facebook</span>
        </a>
        <a
          className="button is-large --resize is-warning ma1"
          href="https://chat.whatsapp.com/2IZr2FEY1cI5oXOeiWF7yb"
          target="_blank"
          rel="noopener noreferrer">
          <i className="icon ion-logo-whatsapp f3" />
          <span>Whatsapp</span>
        </a>
      </div>
    </div>
  )
}

export const FacebookFeed = () => {
  const __html = `<iframe class="facebook-feed" src=https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnodeschoolsm%2F&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"  style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>`
  return (
    <div
      dangerouslySetInnerHTML={{
        __html
      }}
      className="flex items-center flex-column justify-center mb5 flex-grow-1"
      style={{
        minHeight: "500px"
      }}
    />
  )
}

export const InfoCards = () => {
  return (
    <div className="columns is-multiline animated fadeIn slow relative pb4 pt6 ph4">
      <div className="column is-6 animated fadeIn slower">
        <div className="__card">
          <div className="content">
            <div className="has-text-centered">
              <i
                className="icon ion-md-contacts"
                style={{ fontSize: "10rem", padding: "3.5rem 1rem" }}
              />
            </div>
            <h1 className="subtitle has-text-centered">
              COMPARTÍ LO QUE SABÉS
            </h1>
            <p>
              En <b>NodeSchool San Miguel</b> podés ya sea brindar una charla o
              un taller relacionado a cualquier tema de desarrollo, no
              precisamente <b>Javascript</b> o tecnologías <b>Web</b>.
            </p>
          </div>
        </div>
      </div>
      <div className="column is-6 animated fadeIn slower">
        <div className="__card">
          <div className="content">
            <div className="has-text-centered">
              <i
                className="icon ion-md-medal"
                style={{ fontSize: "9rem", padding: "3.5rem 1rem" }}
              />
            </div>
            <h1 className="subtitle has-text-centered">VOLVETE MEJOR</h1>
            <p>
              Cuando das tu opinión en lo que sos muy bueno, podés tomar de
              buena manera el <b>escuchar</b> versiones de los demás{" "}
              <b>miembros</b> así como dar tu punto de vista y asimismo{" "}
              <b>discutirlas</b> entre todos.
            </p>
          </div>
        </div>
      </div>

      <div className="column is-6 animated fadeIn slower">
        <div className="__card">
          <div className="content">
            <div className="has-text-centered">
              <i
                className="icon ion-ios-cash"
                style={{ fontSize: "9rem", padding: "3.5rem 1rem" }}
              />
            </div>
            <h1 className="subtitle has-text-centered">NO GASTÉS PISTO</h1>
            <p>
              Si te gusta aprender autodidacta y colectivamente, acercáte y
              practiquemos entre todos, comentános y hagamos Bugs!
            </p>
          </div>
        </div>
      </div>

      <div className="column is-6 animated fadeIn slower">
        <div className="__card">
          <div className="content">
            <div className="has-text-centered">
              <i
                className="icon ion-md-cube"
                style={{ fontSize: "8rem", padding: "4rem 1rem" }}
              />
            </div>
            <h1 className="subtitle has-text-centered">HACÉ DEPLOY</h1>
            <p>
              Juntáte y agregáte a los <b>miembros activos</b>, así estarás al
              pendiente de las actividades que se realizan cada sábado, además
              podras consultar por las <b>camisetas</b> y demás <b>SWAG</b>{" "}
              disponible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
