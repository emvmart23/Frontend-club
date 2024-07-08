import { StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 8,
    width: "89%",
    paddingLeft: 27,
    paddingRight:14,

  },
  count: {
    width: "44%",
  },
  name: {
    width: "53%",
  },
  total: {
    width: "3%",
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
            <Text style={styles.count}>{item?.hostess}</Text>
            <Text style={styles.name}>{formatRole}</Text>
            <Text style={styles.total}>{item?.salary}</Text>
            <Text style={styles.total}>{item?.profit_margin}</Text>
            <Text style={styles.total}>{item?.todaySale}</Text>
            <Text style={styles.total}>{item?.commission}</Text>
            <Text style={styles.total}>300</Text>
          </View>
        );
      })}
    </>
  );
}
