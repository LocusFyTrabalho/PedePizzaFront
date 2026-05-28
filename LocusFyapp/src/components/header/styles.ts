import { DEFAULT_THEME_COLORS, FONT_SIZE } from "@/utils/themeColors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 140, 
    flexDirection: "row",
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingTop: 0, 
    paddingHorizontal: 16, 
    backgroundColor: "#ffffff",
    position: "relative",
  },
  botaoVoltar: {
    width: 44,  
    height: 44, 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,  
    height: 130,  
  },
  botaoHistorico: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
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