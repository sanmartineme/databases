import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { apolloClient } from "./src/utils";
import { HomeView } from "./src/HomeView";
import { WeatherView } from "./src/WeatherView";
import { AddCountryView } from "./src/AddCountryView";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeView} />
          <Stack.Screen name="WeatherView" component={WeatherView} />
          <Stack.Screen name="AddCountryView" component={AddCountryView} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApolloProvider>
  );
}
