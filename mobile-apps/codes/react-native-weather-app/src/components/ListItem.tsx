import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { mapColor } from "../utils";

import { AppText } from "./AppText";

const styles = StyleSheet.create({
  root: {
    height: 120,

    // TODO: replace with real viewport with (100%)
    width: 400,

    // TODO: add alpha to mapColor function.
    borderBottomColor: "rgba(0, 191, 166, 0.1)",
    borderBottomWidth: 1,
    backgroundColor: "transparent",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },

  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
  },

  deleteButton: {
    marginBottom: 20,
    padding: 0,
  },
});

interface ListItemProps {
  city: string;
  country: string;
  current: string;
  min: string;
  max: string;
  onDeleteCallback: (city: string) => void;
}

export const ListItem: React.FC<ListItemProps> = ({
  city,
  country,
  current,
  min,
  max,
  onDeleteCallback,
}) => {
  const formatTemperature = (temp: string) =>
    Math.round(Number(temp)).toString() + "º";

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <View>
          <AppText text={city}></AppText>
          <AppText
            text={country}
            color="secondary"
            fontSize={10}
            uppercase
          ></AppText>
        </View>

        <View style={styles.flex}>
          <AppText
            text={formatTemperature(current)}
            fontSize={64}
            fontWeight="100"
          />

          <View
            style={{
              ...styles.flex,
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <Icon
              style={styles.deleteButton}
              name="trash-outline"
              type="ionicon"
              color={mapColor("grey")}
              size={16}
              onPress={() => onDeleteCallback(city)}
            />
            <View style={{ ...styles.flex }}>
              <AppText
                text="min "
                color="secondary"
                fontSize={10}
                fontWeight="100"
                uppercase
              />
              <AppText
                text={formatTemperature(min)}
                fontSize={10}
                fontWeight="100"
              />
            </View>

            <View style={{ ...styles.flex }}>
              <AppText
                text="max "
                color="secondary"
                fontSize={10}
                fontWeight="100"
                uppercase
              />
              <AppText
                text={formatTemperature(max)}
                fontSize={10}
                fontWeight="100"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
