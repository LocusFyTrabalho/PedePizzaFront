import { DEFAULT_THEME_COLORS, FONT_SIZE } from "@/utils/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: 330,
    justifyContent: "flex-end",
    backgroundColor: DEFAULT_THEME_COLORS.mainColor,
  },
  headerDivisor: {
    width: "auto",
    backgroundColor: "#F0F0F0",
    height: 3,
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: FONT_SIZE.title,
  },
  subtitle: {
    fontSize: FONT_SIZE.subtitle,
  },
  text: {
    color: DEFAULT_THEME_COLORS.textColor,
  },
});
