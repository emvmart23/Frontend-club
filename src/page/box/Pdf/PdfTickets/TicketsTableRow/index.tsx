import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  items: Header;
}

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
    width: "12%",
  },
  name: {
    width: "40%",
  },
  unit: {
    width: "20%",
  },
  total: {
    width: "3%",
  },
});

export default function TicketsTableRow({ items }: Props) {
  return (
    <>
      {items?.orders.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.count}>{item?.count}</Text>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.unit}>{item?.name}</Text>
            <Text style={styles.total} >{item?.total_price}</Text>
          </View>
        );
      })}
    </>
  );
}
