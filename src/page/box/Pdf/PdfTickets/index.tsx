import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import NotesTableHeader from "../PdfNotes/NotesTableHeader";
import NotesTableRow from "../PdfNotes/NotesTableRow";
import { title } from "process";
import TicketsTableHeader from "./TicketsTableHeader";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  data: Header
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    paddingLeft: 12,
    paddingRight: 12,
  },
  titleContainer: {
    alignItems: "center",
    flexDirection: "column",
    fontSize: 10,
    padding: 10,
  },
  descriptionContainer: {
    alignItems: "center",
    flexDirection: "column",
    borderTop: "1px solid black",
    borderBottom: "1px solid black",
    fontSize: 12,
    paddingTop: 12,
    paddingBottom: 12,
    width: "100%",
    marginBottom: 12,
  },
  bodyContainer: {
    marginBottom: 12,
    width: "95%",
    paddingLeft: 8,
    paddingRight: 24,
  },
  itemsContainer: {
    fontSize: 8,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 1,
  },
  paymentsContainer: {
    alignItems: "flex-start",
    flexDirection: "column",
    fontSize: 8,
  },
  tableContainer: {
    width: "95%",
    marginBottom: 20,
  },
});

export default function PdfTickets({ data }: Props ) {

  const mmToPt = (mm: number) => mm * 2.83465;
  
  const contentBody = [
    {
      title: "F.Emision",
      description: data.box_date,
    },
    {
      title: "Cliente",
      description: "Clientes - Varios",
    },
    {
      title: "Doc.trib.dom.sin.ruc",
      description: "999999999",
    },
    {
      title: "Dirección",
      description: "mz U lt 9 trebol azul",
    },
    {
      title: "Vendedor",
      description: "",
    },
  ];
  console.log("header as object", data)
  
  return (
    <Document>
      <Page size={[mmToPt(80), mmToPt(150)]} style={styles.page}>
        <View style={styles.titleContainer}>
          <Text>Paraiso</Text>
          <Text>RUC 000000</Text>
          <Text>, LIMA, LIMA - LIMA</Text>
          <Text>demo@paraiso.com</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text>Nota de venta</Text>
          <Text>NV01-00003123</Text>
        </View>
        <View style={styles.bodyContainer}>
          {contentBody.map((item, index) => (
            <View key={index} style={styles.itemsContainer}>
              <Text>{item.title}:</Text>
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
        <View style={styles.tableContainer}>
          <TicketsTableHeader />
          <NotesTableRow data={data}/>
        </View>
        <View style={styles.paymentsContainer}>
          <Text style={{ marginBottom: 3 }}>PAGOS:</Text>
          <Text>- 10/06/2024 - Efectivo - S/50</Text>
          <Text>- 10/06/2024 - Yape - S/20</Text>
          <Text style={{ marginTop:4 }}>SALDO: S/0.00</Text>
        </View>
      </Page>
    </Document>
  );
}
