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
  editable = true, // valor padrão é verdadeiro
  ...rest
}: Props) => {
  const [isFocado, setIsFocado] = useState(false);

  return (
    <View
      style={[
        styles.container,
        style,
        !editable && styles.containerDisabled, // Fundo cinza se não for editável
        isFocado && editable && { borderColor: "#1D4ED8" } // Borda azul do sistema ao focar
      ]}
    >
      <TextInput
        style={[
          styles.input,
          inputStyle,
          !editable && styles.inputDisabled,
          { ...({ outlineStyle: "none" } as any) }
        ]}
        placeholderTextColor="#A3A3A3"
        selectionColor="#1D4ED8"
        editable={editable}
        onFocus={() => setIsFocado(true)}
        onBlur={() => setIsFocado(false)}
        {...rest}
      />
    </View>
  );
};

export default InputComponent;