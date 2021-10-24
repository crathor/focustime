import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { RoundedButton } from './src/components/RoundedButton';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

const { useState, useEffect, useCallback } = React;

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => setFocusHistory([]);

  const saveFocusHistory = useCallback(async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory, saveFocusHistory]);

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          onTimerCancel={() => {
            addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Focus addSubject={(subject) => setFocusSubject(subject)} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBlue,
    flex: 1,
    paddingTop: spacing.lg * 3,
  },
});
