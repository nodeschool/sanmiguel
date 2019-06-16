import React, { memo } from "react"
import {
  Document,
  Page,
  Text,
  Image,
  View,
  StyleSheet,
  BlobProvider,
  Font
} from "@react-pdf/renderer"
import layouts from "../assets/diplomas"
const defaultIMG = require("../assets/diplomas/default.png")
Font.registerHyphenationCallback(word => [word])
Font.register({
  family: "Roboto",
  src:
    "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/Roboto-Light.ttf"
})
Font.register({
  family: "Roboto-bold",
  src:
    "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/RobotoCondensed-Bold.ttf"
})
Font.register({
  family: "Code",
  src:
    "https://cdn.staticaly.com/gh/D3Portillo/d3-assets/master/fonts/CamingoCode-Regular.ttf"
})

const getDiplomaIMG = ({ isCodevent, version }) => {
  version = version.toString()
  version = version.includes(".") ? version : `${version}.0`
  const data = layouts[isCodevent ? version : "default"]
  return !!data ? data : defaultIMG
}
export default memo(function({
  url = "",
  date = "",
  name = "",
  type = "",
  tema = "",
  isCodevent = false,
  version = "1.0",
  onRender = () => console.log("pdf-rendered")
}) {
  const color = isCodevent ? "#FFFFFF" : "#212121"
  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      textAlign: "center",
      fontFamily: "Roboto-bold",
      width: "80%",
      color
    },
    subtitle: {
      margin: 12,
      fontSize: 16,
      textAlign: "center",
      fontFamily: "Roboto",
      width: "80%",
      color
    },
    pre: {
      normal: {
        position: "absolute",
        top: "40%",
        width: "98%",
        right: "47%",
        transform: "rotate(-90deg)",
        fontFamily: "Code",
        fontSize: 9,
        color: "black",
        textAlign: "center"
      },
      codevent: {
        position: "absolute",
        top: "50%",
        width: "100%",
        left: "49.2%",
        transform: "rotate(90deg)",
        fontFamily: "Code",
        fontSize: 9,
        color: "black",
        textAlign: "center"
      }
    },
    image: {
      position: "absolute",
      height: "100%",
      width: "100%"
    },
    sign: {
      width: 70,
      marginRight: -50
    },
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      paddingBottom: 30
    }
  })
  const PDF = (
    <Document>
      <Page size="A4" orientation="landscape" wrap={false}>
        <Image
          src={getDiplomaIMG({ isCodevent, version })}
          style={styles.image}
        />
        <View style={styles.container} fixed>
          <Text style={{ ...styles.title, fontSize: 40 }}>La Comunidad de</Text>
          <Text style={{ ...styles.title, fontSize: 40 }}>
            NodeSchool San Miguel
          </Text>
          <Text style={styles.subtitle}>
            Otorga el presente reconocimiento a:
          </Text>
          <Text style={styles.title}>{name}</Text>
          {isCodevent && (
            <Text style={{ ...styles.subtitle, marginBottom: -10 }}>
              Por su excelente participación en el CODEVENT {version} cómo {""}
              {type === "taller" ? `tallerista` : `ponente`}
            </Text>
          )}
          <Text style={styles.subtitle}>
            {isCodevent
              ? "en el tema titulado:"
              : "Por haber impartido el tema:"}
          </Text>
          <Text style={styles.title}>{tema}</Text>
          <Text style={styles.subtitle}>
            El día {date} en la ciudad de San Miguel, El Salvador.
          </Text>
          <Text style={isCodevent ? styles.pre.codevent : styles.pre.normal}>
            {url}
          </Text>
        </View>
      </Page>
    </Document>
  )

  return (
    <BlobProvider document={PDF}>
      {({ blob }) => {
        if (blob !== null) {
          onRender(blob)
        }
        return null
      }}
    </BlobProvider>
  )
})
