import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  data: Header;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    fontSize: 8,
  },
  count: {
    width: "12%",
  },
  name: {
    width: "40%",
    fontSize: 7,
  },
  unit: {
    width: "20%",
  },
  total: {
    width: "3%",
  },
});

export default function TicketsTableRow({ data }: Props) {
  return (
    <>
      {data?.orders.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.count}>{item?.count}</Text>
            <Text style={styles.name}>{item?.name} + compañia</Text>
            <Text style={styles.unit}>{item?.price}</Text>
            <Text style={styles.total}>{item?.price}</Text>
          </View>
        );
      })}
    </>
  );
}
