import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const { useState } = React;

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState('');

  const handleOnPress = () => {
    addSubject(subject);
    setSubject(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What would you like to focus</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setSubject(text)}
            onSubmitEditing={handleOnPress}
          />
          <RoundedButton size={50} title="+" onPress={handleOnPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.md,
  },
});
