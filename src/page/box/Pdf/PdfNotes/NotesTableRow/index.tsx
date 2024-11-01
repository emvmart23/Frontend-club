import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  data: Header;
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
    width: "44%",
  },
  name: {
    width: "53%",
  },
  total: {
    width: "3%",
  },
});

export default function NotesTableRow({ data }: Props) {
  return (
    <>
      {data?.orders.map((item, index) => {
        return (
          <View key={index} style={styles.container}>
            <Text style={styles.count}>{item?.count}</Text>
            <Text style={styles.name}>{item?.name}</Text>
            <Text style={styles.total}>{item?.price}</Text>
          </View>
        );
      })}
    </>
  );
}
