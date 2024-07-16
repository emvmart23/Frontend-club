import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 15,
    textAlign: "left",
    fontStyle: "bold",
    fontSize: 6,
    borderBottom: "1px solid black",
    marginVertical: 1,
    width: "100%",
  },
  cant: {
    width: "12%",
  },
  description: {
    width: "40%",
  },
  unit: {
    width: "20%",
  },
  total: {
    width: "18%",
  },
});

export default function TicketsTableHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.cant}>CANT</Text>
      <Text style={styles.description}>DESCRIPCIÓN</Text>
      <Text style={styles.unit}>P.UNIT</Text>
      <Text style={styles.total}>TOTAL</Text>
    </View>
  );
}