import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 15,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 8,
    borderBottom: "1px solid black",
    marginVertical: 1,
    width: "100%"
  },
  cant: {
    width: "33%",
  },
  description: {
    width: "33%",
  },
  total: {
    width: "33%",
  },
});

export default function NotesTableHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.cant}>CANT</Text>
      <Text style={styles.description}>DESCRIPCIÓN</Text>
      <Text style={styles.total}>TOTAL</Text>
    </View>
  );
}
