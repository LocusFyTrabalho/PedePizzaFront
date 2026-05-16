import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { styles } from "./styles";

type Props = {
  required?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
} & TextInputProps;

const InputComponent = ({
  required = false,
  style,
  inputStyle,
  ...rest
}: Props) => {
  const [isFocado, setIsFocado] = useState(false);

  return (
    <View
      style={[
        styles.container,
        style,
        isFocado && { borderColor: "#ad0000" }
      ]}
    >
      <TextInput
        style={[
          styles.input,
          inputStyle,
          { ...({ outlineStyle: "none" } as any) }
        ]}
        placeholderTextColor="#c4c4c4"
        selectionColor="#ed4f0b"
        onFocus={() => setIsFocado(true)}
        onBlur={() => setIsFocado(false)}
        {...rest}
      />
    </View>
  );
};

export default InputComponent;