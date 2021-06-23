import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  farmaItem: {
    width: "100%",
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginTop: 50 }}>
        Minsal API Demo
      </Text>

      <ScrollView
        contentContainerStyle={{
          paddingVertical: 0,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
        style={{ width: "100%", margin: 0, padding: 0 }}
      >
        <FarmatView />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

export const FarmatView = () => {
  const [data, setData] = useState<string[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const dataFetched = await fetch(
      "https://farmanet.minsal.cl/index.php/ws/getLocalesTurnos"
    );
    const dataJson = await dataFetched.json();
    setData(dataJson);
  };

  return (
    <View style={styles.container}>
      {data?.map((f: any) => {
        return (
          <View key={f.local_id} style={styles.farmaItem}>
            <Text>{f.local_nombre}</Text>
            <Text>{f.comuna_nombre}</Text>
            <Text>{f.local_direccion}</Text>
            <Text>{f.funcionamiento_hora_apertura}</Text>
            <Text>{f.funcionamiento_hora_cierre}</Text>
          </View>
        );
      })}
    </View>
  );
};
