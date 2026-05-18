import { DEFAULT_THEME_COLORS, FONT_SIZE } from "@/utils/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 130, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingTop: 30, 
    paddingBottom: 0, 
    backgroundColor: DEFAULT_THEME_COLORS.mainColor,
    flexDirection:"row"
  },
  logo: {
    width: 300,  
    height: 120,  
  },
    botaoVoltar: {
    width: 300,  
    height: 120,  
  },
  headerDivisor: {
    width: "100%", 
    backgroundColor: "#F0F0F0",
    height: 3,
    marginTop: 10,
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