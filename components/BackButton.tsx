import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../thmes';
import {useNavigation} from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ChevronLeftIcon size="30" color={colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
