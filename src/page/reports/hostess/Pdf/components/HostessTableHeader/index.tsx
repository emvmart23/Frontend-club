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
    fontSize: 12,
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
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },
  salary: {
    width: "35%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  profit: {
    width: "40%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  todaySale: {
    width: "40%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  },
  commission: {
    width: "35%",
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8
  }
});

export default function HostessTableHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Nombre</Text>
      <Text style={styles.role}>Cargo</Text>
      <Text style={styles.salary}>Sueldo</Text>
      <Text style={styles.profit}>% Comision</Text>
      <Text style={styles.todaySale}>Venta del dia</Text>
      <Text style={styles.commission}>Comision</Text>
      <Text style={styles.salary}>Total</Text>
    </View>
  );
}
