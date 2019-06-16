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

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-bold",
    width: "80%",
    color: "#212121"
  },
  subtitle: {
    margin: 12,
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Roboto",
    width: "80%",
    color: "#212121"
  },
  pre: {
    fontFamily: "Code",
    fontSize: 11,
    textAlign: "center",
    width: "80%",
    color: "#212121"
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
const getDiplomaIMG = ({ isCodevent, version }) => {
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
  const PDF = (
    <Document>
      <Page size="A4" orientation="landscape" wrap={false}>
        <Image
          src={getDiplomaIMG({ isCodevent, version })}
          style={styles.image}
        />
        <View style={styles.container} fixed>
          <Text style={styles.title}>La Comunidad de</Text>
          <Text style={styles.title}>NodeSchool San Miguel</Text>
          <Text style={styles.subtitle}>
            OTORGA EL PRESENTE RECONOCIMIENTO A
          </Text>
          <Text style={{ ...styles.title, fontSize: 40 }}>{name}</Text>
          <Text style={styles.subtitle}>
            POR HABER IMPARTIDO{" "}
            {type === "taller"
              ? `EL ${type.toUpperCase()}`
              : `LA ${type.toUpperCase()}`}
          </Text>
          <Text style={styles.title}>{tema}</Text>
          <Text style={styles.subtitle}>
            El día {date} en la ciudad de San Miguel, El Salvador
          </Text>
          <Text style={styles.pre}>Verificable en:</Text>
          <Text style={styles.pre}>{url}</Text>
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
