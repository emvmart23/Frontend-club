import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import TableRow from "../TableRow";

const PDF = () => {

  Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'path/to/Roboto-Regular.ttf' },
      { src: 'path/to/Roboto-Bold.ttf', fontWeight: 'bold' },
    ]
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    container_data: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: 1
    },
    order:{
      fontWeight: 2000,
      fontSize:13,
      marginBottom: 4,
      marginTop: 8
    },
    page: {
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
    },
    section: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 8,
      paddingVertical: 1,
      paddingHorizontal: 5
    },
    title: {
      fontSize: 8,
      fontWeight: 400,
    },
    description: {
      fontSize: 8,
    },
    line: {
      width: "85%",
      height: 1,
      backgroundColor: "black",
      color: "black",
      textAlign: "center"
    }
  });

  const mmToPt = (mm:number) => mm * 2.83465;

  return (
    <Document>
      <Page size={[mmToPt(80), mmToPt(150)]} style={styles.page}>
        <Text style={styles.order} >PD-312319</Text>
        <View style={styles.line} />
        <View style={styles.container}>
          <View style={styles.container_data}>
            <View style={styles.section}>
              <Text style={styles.title}>F.Emision: </Text>
              <Text style={styles.description}>2024-04-16</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Mozo: </Text>
              <Text style={styles.description}>Administrador</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Anfitriona: </Text>
              <Text style={styles.description}>Sara</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>H.Emisión: </Text>
            <Text style={styles.description}>Administrador</Text>
          </View>
        </View>
        <View>
          
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
