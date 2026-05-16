import { DEFAULT_THEME_COLORS } from "@/utils/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: DEFAULT_THEME_COLORS.buttonColor,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
  },
  text: {
    color: "#ffff",
    fontSize: 17,
  },
});
