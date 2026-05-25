import React from 'react'
import { ButtonProps, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { styles } from './styles';

type Props = {
    title: any;
    style?: ViewStyle;
    icon?: React.ReactNode
} & ButtonProps;

const ButtonComponent = ({title, style, icon, ...rest} :Props) => {
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
        {icon}
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonComponent
