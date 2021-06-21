import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { CheckBox } from "react-native-elements";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useIsFocused } from "@react-navigation/native";

import { mapColor, LocalStorage } from "./utils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },

  countryItemContainer: {
    backgroundColor: "white",
    margin: 0,
    padding: 20,
    borderWidth: 0,
    borderBottomColor: "rgba(0, 191, 166, 0.1)",
    borderBottomWidth: 1,
    borderRadius: 0,
  },

  checked: {
    backgroundColor: mapColor("secondary"),
    color: "white",
  },

  text: {
    fontSize: 22,
    fontWeight: "200",
  },
});

const COUNTRIES_QUERY = gql`
  {
    countries {
      edges {
        node {
          nativeName
          capital
        }
      }
    }
  }
`;

const CountryItem = ({ countryName, isChecked }: any) => {
  const [isCheckedState, setIsCheckedState] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    setIsCheckedState(isChecked);
  }, [isFocused, isChecked]);

  return (
    <CheckBox
      title={countryName}
      checked={isCheckedState}
      onPress={() => {
        if (!isCheckedState) {
          LocalStorage.addCity(countryName);
        } else {
          LocalStorage.removeCity(countryName);
        }
        setIsCheckedState(!isCheckedState);
      }}
      containerStyle={
        !isCheckedState
          ? styles.countryItemContainer
          : { ...styles.countryItemContainer, ...styles.checked }
      }
      checkedIcon="check-circle"
      uncheckedIcon="circle"
      checkedColor={mapColor("secondary")}
      uncheckedColor="#ffffff"
      textStyle={
        !isCheckedState ? styles.text : { ...styles.text, ...styles.checked }
      }
    />
  );
};

export const AddCountryView = () => {
  const [getCountries, { data, loading }] = useLazyQuery(COUNTRIES_QUERY);
  const [citiesList, setCitiesList] = useState<string[]>();
  const isFocused = useIsFocused();

  const loadCities = async () => setCitiesList(await LocalStorage.getCities());

  useEffect(() => {
    if (!loading && !data?.countries) {
      getCountries({
        context: { name: "countries" },
      });
    }
    loadCities();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 0,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
        }}
        style={{ width: "100%", margin: 0, padding: 0 }}
      >
        {data?.countries?.edges.map((country: any, index: number) => {
          if (country.node.capital.length === 0) return null;

          return (
            <CountryItem
              key={index}
              countryName={country.node.capital}
              isChecked={citiesList?.includes(country.node.capital)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};
