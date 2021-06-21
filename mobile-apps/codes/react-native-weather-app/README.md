# :iphone: Weather App :iphone:

Simple aplicación realizada en React Native que consume una API GraphQL y despliega los datos del clima de las ciudades que el usuario selecciona.

<p align="center">
  <img src="./assets/Demo.gif" height="512"/>
</p>

## ¿Cómo ejecutar la app?

```bash
# Instalar dependencias del proyecto.
yarn install

# Para simular en iOS.
yarn ios

# Pra simular en Android.
yarn android

# Para simular para web.
yarn web
```

## Dependencias del proyecto

```bash
# React Navigation
yarn add @react-navigation/native @react-navigation/stack
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

# Icons
yarn add react-native-elements

# GraphQL client
yarn add @apollo/client graphql

# Local Storage
yarn add @react-native-async-storage/async-storage
```
