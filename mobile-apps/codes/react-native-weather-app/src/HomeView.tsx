import React from "react";
import { StyleSheet, View, Image, Pressable } from "react-native";

import { AppText } from "./components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 310,
    height: 199,
    marginBottom: 20,
  },
});

export const HomeView = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/AppImage.png")} style={styles.image} />
      <AppText text="Welcome" />
      <AppText text="Francisca" color="secondary" fontSize={24} marginBotton />

      <Pressable onPress={() => navigation.navigate("WeatherView")}>
        <AppText text="Entrar" color="tertiary" fontSize={16} />
      </Pressable>

      <AppText
        text="Weather App is Open Source"
        fontSize={12}
        style={{
          position: "absolute",
          bottom: 20,
        }}
      />
    </View>
  );
};
