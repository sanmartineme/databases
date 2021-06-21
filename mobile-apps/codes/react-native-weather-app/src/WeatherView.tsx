import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";

import { AppText, ListItem } from "./components";
import { LocalStorage, mapColor } from "./utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  addButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
  },
});

const WEATHER_BY_CITY = gql`
  query getCityByName($name: String!) {
    getCityByName(name: $name, config: { units: metric, lang: es }) {
      name
      country
      id
      weather {
        temperature {
          actual
          min
          max
        }
      }
    }
  }
`;

const COUNTRY_NAME = gql`
  query countries($code: String!) {
    countries(alpha2Code: $code) {
      edges {
        node {
          nativeName
        }
      }
    }
  }
`;

const WeatherViewItem = ({ countryQuery, onDeleteCallback }: any) => {
  const { data, loading, error } = useQuery(WEATHER_BY_CITY, {
    variables: {
      name: countryQuery,
    },
    context: {
      name: "weather",
    },
  });

  const [getCountry, { loading: laodingCountry, data: dataCountry }] =
    useLazyQuery(COUNTRY_NAME, {});

  const [countryName, setCountryName] = useState<string>("");

  useEffect(() => {
    if (data && data.getCityByName && !loading && !error) {
      if (!laodingCountry) {
        getCountry({
          variables: {
            code: data?.getCityByName.country,
          },
          context: {
            name: "country",
          },
        });
      }
      if (dataCountry?.countries) {
        setCountryName(dataCountry?.countries.edges[0].node.nativeName);
      }
    }
  }, [data, loading, error, dataCountry]);

  // TODO: do something more interesting for the user.
  if (loading || laodingCountry) return <Text>Loading</Text>;
  if (error) return <Text>{error.message}</Text>;
  if (!data.getCityByName) return null;

  const { name, weather } = data?.getCityByName;

  return (
    <ListItem
      city={name}
      country={countryName}
      current={weather.temperature.actual}
      min={weather.temperature.min}
      max={weather.temperature.max}
      onDeleteCallback={onDeleteCallback}
    />
  );
};

export const WeatherView = ({ navigation }: any) => {
  const [listState, setListState] = useState<string[]>([]);
  const isFocused = useIsFocused();

  const loadCountries = async () => {
    const data = await LocalStorage.getCities();

    setListState(data);
  };

  useEffect(() => {
    loadCountries();
  }, [isFocused]);

  const onDeleteHandle = async (city: string) => {
    await LocalStorage.removeCity(city);
    await loadCountries();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          {listState.length > 0 ? (
            listState.map((country, index) => {
              return (
                <View key={index}>
                  <WeatherViewItem
                    countryQuery={country}
                    onDeleteCallback={onDeleteHandle}
                  />
                </View>
              );
            })
          ) : (
            <AppText
              style={{ marginTop: 60 }}
              text="No hay ciudades configuradas..."
              fontSize={16}
            />
          )}
        </View>
      </ScrollView>

      <View style={styles.addButton}>
        <Icon
          name="add-outline"
          type="ionicon"
          color={mapColor("tertiary")}
          size={48}
          onPress={() => navigation.navigate("AddCountryView")}
        />
      </View>
    </View>
  );
};
