import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_DATA = "@weather-app-cities";

export const LocalStorage = {
  removeCity: async (city: string) => {
    try {
      const data = (await AsyncStorage.getItem(KEY_DATA)) || "[]";
      const citiesList = JSON.parse(data);

      const index = (citiesList as Array<string>).indexOf(city);

      if (index > -1) {
        const newList = [
          ...citiesList.slice(0, index),
          ...citiesList.slice(index + 1),
        ];

        await AsyncStorage.setItem(KEY_DATA, JSON.stringify(newList));
      }
    } catch (error) {
      console.log(error);
    }
  },

  addCity: async (city: string) => {
    try {
      const data = (await AsyncStorage.getItem(KEY_DATA)) || "[]";
      const citiesList = JSON.parse(data);

      citiesList.push(city);

      await AsyncStorage.setItem(KEY_DATA, JSON.stringify(citiesList));
    } catch (error) {
      console.log(error);
    }
  },

  getCities: async () => {
    const data = await AsyncStorage.getItem(KEY_DATA);
    return JSON.parse(data || "[]");
  },
};
