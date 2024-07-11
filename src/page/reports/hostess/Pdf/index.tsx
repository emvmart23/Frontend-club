import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import HostessTableHeader from "./HostessTableHeader";
import HostessTableRow from "./HostessTableRow";
import HostessTableTotals from "./HostessTableTotals";

interface Props {
  data: ReportHostess[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 15,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    lineHeight: 1.5,
    flexDirection: "column",
    backgroundColor: "#f5f5f5"
  },
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
    borderTop: "1px solid black"
  },
});

export default function PdfHostess({ data }: Props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text>Reporte de anfitrionas</Text>
        <View style={styles.tableContainer}>
          <HostessTableHeader />
          <HostessTableRow data={data} />
          <HostessTableTotals data={data}/>
        </View>
      </Page>
    </Document>
  );
}
