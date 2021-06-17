import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

import { ColorType, mapColor } from "../utils";

interface AppTextProps {
  text: string;
  color?: ColorType;
  fontSize?: number;
  fontWeight?: "100" | "200" | "300" | "400" | "700";
  marginBotton?: boolean;
  uppercase?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const AppText: React.FC<AppTextProps> = ({
  text,
  color = "primary",
  fontSize = 36,
  fontWeight = "200",
  uppercase = false,
  marginBotton = false,
  style,
}) => (
  <View style={style}>
    <Text
      style={{
        color: mapColor(color),
        fontSize,
        fontWeight,
        textTransform: uppercase ? "uppercase" : "none",
        marginBottom: marginBotton ? 10 : 0,
      }}
    >
      {text}
    </Text>
  </View>
);
