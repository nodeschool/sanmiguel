import React from "react"
import ful from "../assets/img/diploma-full.png"
import sign from "../assets/img/d3 sign black.png"
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
import FileSaver from "file-saver"
Font.registerHyphenationCallback(word => [word])
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
  }
})

const Full = ({ url, date, name, type, tema, pdfName }) => {
  const PDF = (
    <Document>
      <Page size="A4" orientation="landscape" wrap={false}>
        <Image src={ful} style={styles.image} />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            paddingBottom: 30
          }}
          fixed>
          <Text style={styles.title}>La Comunidad de</Text>
          <Text style={styles.title}>NodeSchool San Miguel</Text>
          <Text style={styles.subtitle}>
            OTORGA EL PRESENTE RECONOCIMIENTO A
          </Text>
          <Text style={{ ...styles.title, fontSize: 40 }}>{name}</Text>
          <Text style={styles.subtitle}>POR HABER IMPARTIDO {type}</Text>
          <Text style={styles.title}>{tema}</Text>
          <Text style={styles.subtitle}>
            El día {date} en la ciudad de San Miguel, El Salvador
          </Text>
          <Text style={styles.pre}>
            Verificable en:
          </Text>
          <Text style={styles.pre}>
            {url}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "center",
              marginLeft: 10
            }}>
            <Image src={sign} style={styles.sign} />
            <View style={{ width: 130, marginBottom: -15 }}>
              <Text
                style={{
                  ...styles.subtitle,
                  textAlign: "left",
                  fontFamily: "Roboto-bold",
                  marginLeft: 20
                }}>
                nny Portillo
              </Text>
              <Text
                style={{
                  ...styles.subtitle,
                  textAlign: "left",
                  marginTop: -15,
                  marginLeft: 15,
                  fontSize: 12
                }}>
                ORGANIZADOR
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )

  return (
    <BlobProvider document={PDF}>
      {({ blob, url, loading, error }) => {
        if (blob !== null) {
          FileSaver.saveAs(blob, `${pdfName}.pdf`)
        }
        return "PDF GENERADO , YAY!"
      }}
    </BlobProvider>
  )
}

export default Full
