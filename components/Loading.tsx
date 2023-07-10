import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../thmes';

export default function Loading() {
  return (
    <View style={styles.ActivityIndicator_Container}>
      <ActivityIndicator size="large" style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator_Container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: colors.button,
  },
});
