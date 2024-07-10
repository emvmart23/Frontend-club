import {
  Page,
  Text,
  View,
  Document,
  StyleSheet
} from "@react-pdf/renderer";
import { format } from "date-fns";
import NotesTableHeader from "./NotesTableHeader";
import NotesTableRow from "./NotesTableRow";

interface Props {
  data?: Header;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 40,
    paddingTop: 6,
  },
  container_data: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  order: {
    fontSize: 13,
    marginBottom: 4,
    marginTop: 8,
  },
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
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
    textAlign: "center",
  },
  table: {
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    width: "85%",
    marginTop: 6,
  },
  total: {
    fontSize: 8,
    fontWeight: 400,
    position: "absolute",
    right: 15,
    bottom: -12,
  },
});

const PDF = ({ data }: Props) => {
  const mmToPt = (mm: number) => mm * 2.83465;

  if (!data) {
    return null;
  }

  return (
    <Document>
      <Page size={[mmToPt(80), mmToPt(150)]} style={styles.page}>
        <Text style={styles.order}>PD-312319</Text>
        <View style={styles.line} />
        <View style={styles.container}>
          <View style={styles.container_data}>
            <View style={styles.section}>
              <Text style={styles.title}>F.Emision: </Text>
              <Text style={styles.description}>
                {format(data.created_at, "yyyy-MM-dd")}
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Mozo: </Text>
              <Text style={styles.description}>{data.mozo}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.title}>Anfitriona: </Text>
              <Text style={styles.description}>{data.hostess}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>H.Emisión: </Text>
            <Text style={styles.description}>Aopopo</Text>
          </View>
        </View>
        <View style={styles.table}>
          <NotesTableHeader />
          <NotesTableRow items={data} />
          <Text style={styles.total}>TOTAL A PAGAR: S/.{data.total_price}</Text>
        </View>
      </Page>
    </Document>
  );
};
export default PDF;
