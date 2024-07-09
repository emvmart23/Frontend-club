import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
    width: "100%",
    paddingLeft: 14,
    paddingRight:14,
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    borderRight: "1px solid black",
    marginTop: 3

  },
  name: {
    width: "13%",
  },
  role: {
    width: "15%",
  },
  salary: {
    width: "20%",
  },
  profit: {
    width: "15%",
  },
  todaySale:{
    width: "18%",
  },
  commission: {
    width: "20%",
  },
  total: {
    width: "8%",
    marginRight: 6
  },
});

interface Props {
  data: ReportHostess[];
}

export default function NotesTableRow({ data }: Props) {
  return (
    <>
      {data.map((item, index) => {
        const formatRole =  item.hostess_role == 4 ? "Anfitriona" : "Bailarina";
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.name}>{item?.hostess}</Text>
            <Text style={styles.role}>{formatRole}</Text>
            <Text style={styles.salary}>S/.{item?.salary}</Text>
            <Text style={styles.profit}>{item?.profit_margin}%</Text>
            <Text style={styles.todaySale}>{item?.todaySale}</Text>
            <Text style={styles.commission}>{item?.commission}</Text>
            <Text style={styles.total}>S/.{item?.total}</Text>
          </View>
        );
      })}
    </>
  );
}
