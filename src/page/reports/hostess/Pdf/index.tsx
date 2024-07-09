import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { HostessTableHeader, HostessTableRow } from "./components";

interface Props {
  data: ReportHostess[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 15,
    paddingTop: 20,
    paddingLeft: 40,
    paddingRight: 40,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#bff0fd",
  },
});

export default function PdfHostess({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>Reporte de anfitriones</Text>
        <View style={styles.tableContainer}>
          <HostessTableHeader />
          <HostessTableRow data={data} />
        </View>
      </Page>
    </Document>
  );
}
