import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from "../utils/colors"

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.radius(size), style]}
      onPress={props.onPress}>
      <Text style={[styles.text(size), textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    radius: (size) => ({
      borderRadius: size / 2,
      width: size,
      height: size,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors.white,
      borderWidth: 2,
    }),
    text: (size) => ({
      color: colors.white,
      fontSize: size / 3,
    }),
  });
