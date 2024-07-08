import { StyleSheet, Text, View } from "@react-pdf/renderer";

const borderColor = '#90e5fc'

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#bff0fd",
    backgroundColor: "#bff0fd",
    alignItems: "center",
    borderBottomWidth: 1,
    height: 24,
    textAlign: "center",
    fontStyle: "bold",
    fontSize: 9,
    borderBottom: "1px solid black",
    marginVertical: 1,
    flexGrow: 1,
  },
  name: {
    width: "33%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  role: {
    width: "33%",
  },
  salary: {
    width: "33%",
  },
});

export default function HostessTableHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Nombre</Text>
      <Text style={styles.role}>Cargo</Text>
      <Text style={styles.salary}>Sueldo</Text>
      <Text style={styles.salary}>% Comision</Text>
      <Text style={styles.salary}>Venta del dia</Text>
      <Text style={styles.salary}>Comision</Text>
      <Text style={styles.salary}>Total</Text>
    </View>
  );
}
