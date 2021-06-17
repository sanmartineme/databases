import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import { ListItem } from "./components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
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

const WeatherViewItem = ({ countryQuery }: any) => {
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

  const onDeleteHandle = (city: string) => {
    alert(city);
  };

  return (
    <ListItem
      city={name}
      country={countryName}
      current={weather.temperature.actual}
      min={weather.temperature.min}
      max={weather.temperature.max}
      onDeleteCallback={onDeleteHandle}
    />
  );
};

export const WeatherView = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {[
          "Santiago",
          "La Paz",
          "New York",
          "Monaco",
          "Bogota",
          "Rio de Janeiro",
          "Los Angeles",
          "Curico",
          "Valparaiso",
        ].map((country, index) => {
          return (
            <View key={index}>
              <WeatherViewItem countryQuery={country} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};
