import React, { useState, useEffect } from "react"
import { css } from "emotion"
export const Sponsors = () => {
  const [sponsors, setSponsors] = useState([])
  useEffect(() => {
    const _fetch = async () => {
      const req = await fetch(
        "https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/sponsors"
      )
      const data = await req.json()
      setSponsors(data)
    }
    sponsors.length || _fetch()
  }, [sponsors])
  return (
    <div
      className={css`
    display: flex;
    align-items:center;
    justify-content: center;
    & a{
      &:last-child::after{
        content: "";
        position: absolute;
        top: 0;
        bottom; 0;
        left: 100%;
        border-bottom: 4.25rem solid transparent;
        border-left: 1rem solid white;
        width: 0;
      }
      &:first-child::before{
        content: "";
        position: absolute;
        top: 0;
        bottom; 0;
        right: 100%;
        border-top: 4.25rem solid transparent;
        border-right: 1rem solid white;
        width: 0;
      }
    }
    `}
    >
      {sponsors.map(({ image, slug, site }) => {
        return (
          <a
            href={site}
            title={slug}
            target="_blank"
            rel="noopener noreferrer"
            className="animated fadeIn flex items-center justify-center pa2"
            style={{
              background: "white",
              minHeight: "4.2rem"
            }}
          >
            <img src={image} alt={slug} />
          </a>
        )
      })}
    </div>
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
          rel="noopener noreferrer"
        >
          <i className="icon ion-logo-slack f3" />
          <span>Slack</span>
        </a>
        <a
          className="button is-large --resize is-warning ma1"
          href="https://discord.gg/VzKQtup"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={require("../assets/img/discord.no.svg")}
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
          rel="noopener noreferrer"
        >
          <i className="icon ion-logo-facebook f3" />
          <span>Facebook</span>
        </a>
        <a
          className="button is-large --resize is-warning ma1"
          href="https://chat.whatsapp.com/JfnmCNgjlaR3A7H8DBFRgz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="icon ion-logo-whatsapp f3" />
          <span>Whatsapp</span>
        </a>
      </div>
    </div>
  )
}

export const MeetUpMembers = () => {
  const [members, setMembers] = useState([])
  useState(() => {
    const _fetch = async () => {
      const req = await fetch(
        "https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/meetup"
      )
      const data = await req.json()
      setMembers(data)
    }
    members.length || _fetch()
  }, [members])
  return (
    <div className="flex align-center justify-center flex-wrap ma4 mt0">
      {members.map(({ name, photo = {}, group_profile: { link } }) => {
        const { thumb_link = false } = photo
        return thumb_link ? (
          <a
            href={link}
            rel="noopener noreferrer"
            title={name}
            alt={name}
            target="_blank"
            className={css`
              &:hover {
                transform: scale(1.08);
              }
            `}
            style={{
              width: "2.8rem",
              height: "2.8rem",
              borderRadius: "100%",
              background: `url(${thumb_link})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              margin: "2px"
            }}
            children=" "
          />
        ) : null
      })}
    </div>
  )
}

export const InfoCards = () => {
  return (
    <div className="columns is-multiline animated fadeIn slow relative pa4">
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
              Juntate y agregate a los <b>miembros activos</b>, así estarás al
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

export const PhotoAlbum = () => {
  const [photos, setPhotos] = useState([])
  useEffect(() => {
    const _fetch = async () => {
      const req = await fetch(
        "https://na9izifwg4.execute-api.us-east-1.amazonaws.com/production/api/meetup",
        { headers: { endpoint: "photos" } }
      )
      let data = await req.json()
      data = data.splice(0, Math.round(window.innerWidth / 100))
      setPhotos(data)
    }
    photos.length || _fetch()
  }, [photos])
  return (
    <div
      className="flex items-center justify-end bt bb mt6"
      style={{ borderColor: "#f0db4f", borderWidth: 2 }}
    >
      {photos.map(({ thumb_link }) => {
        return <img src={thumb_link} alt=" " style={{ height: 50 }} />
      })}
      <a
        href="/album"
        className="button is-radiusless is-warning"
        target="_blank"
        rel="noopener noreferrer"
        style={{ minHeight: 50 }}
      >
        <span>Ver album</span>
        <i className="icon ion-ios-arrow-round-forward f3" />
      </a>
    </div>
  )
}

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
        rel="noopener noreferrer"
      >
        <div
          className="pic"
          style={{ backgroundImage: `url(${imageLoaded})` }}
          title={e.login}
        />
      </a>
    )
  )
}
