import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { HostessTableHeader, HostessTableRow } from "./components";

interface Props {
  data: ReportHostess[];
}

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
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
        <Text>Hostess Report</Text>
        <View style={styles.tableContainer}>
          <HostessTableHeader />x
          <HostessTableRow data={data} />
        </View>
      </Page>
    </Document>
  );
}
