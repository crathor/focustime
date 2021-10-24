import * as React from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';

import { Timing } from './Timing';

const { useState } = React;
const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, onTimerCancel }) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const onChangeTime = (minutes) => {
    setMinutes(minutes);
    setProgress(1);
    setIsStarted(false);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      Vibration.vibrate(400, true);
    } else {
      Vibration.vibrate([400, 400], true);
    }
  };

  const finishTask = () => {
    Vibration.cancel();
    setShowDone(false);
    onTimerEnd();
  };

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    setShowDone(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={styles.focusContainer}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color="#5e84e2"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing changeTime={onChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {showDone ? (
          <RoundedButton title="Finish" onPress={() => finishTask()} />
        ) : (
          <>
            {isStarted ? (
              <RoundedButton
                title="pause"
                onPress={() => setIsStarted(false)}
              />
            ) : (
              <RoundedButton title="start" onPress={() => setIsStarted(true)} />
            )}
          </>
        )}
      </View>
      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => onTimerCancel()}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusContainer: {
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg
  }
});
