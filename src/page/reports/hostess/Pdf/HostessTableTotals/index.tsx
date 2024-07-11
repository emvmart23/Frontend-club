import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  data: ReportHostess[];
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 15,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 11,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    backgroundColor: "#f5f5f5",
    marginLeft: "auto",
  },
  textTotal:{
  },
  salary:{
    width: 35,
  },
  profit: {
    width: 43,
  },
  sale: {
    marginLeft: 12
  },
  total: {
    marginRight: 15
  }
});

export default function HostessTableTotals({ data }: Props) {
    // const r = data.map(item => { })

    // Here you can use a reduce function to calculate the total of a specific property
    // const totalAllOfProperties = <T,>(x : T) => {
    //     const d = data.reduce((acc, item) => acc + item.salary , 0);
    //     return d
    // }

  // Calculate total profit, total sales, total commission, etc.
  const totalSalary = data.reduce((acc, item) => acc + Number(item.salary),0);
  const totalSales = data.reduce((acc, item) => acc + item.currentSale,0);
  const totalCommission = data.reduce((acc, item) => acc + item.comission,0);
  const total = data.reduce((acc, item) => acc + item.total,0);

  return (
    <View style={styles.container}>
      <Text style={styles.textTotal}>Totales</Text>
      <Text style={styles.salary}>S/.{totalSalary}</Text>
      <Text style={styles.profit}></Text>
      <Text style={styles.sale}>S./{totalSales}</Text>
      <Text>{totalCommission}</Text>
      <Text style={styles.total}>S./{total}</Text>
    </View>
  );
}
