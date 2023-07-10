import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../thmes';

export type Card = {
  item: string;
};
export default function expenseCard({item}: Card) {
  return (
    <View style={styles.data_Container}>
      <View style={styles.titleAndcategory}>
        <Text style={styles.title}>{item.title}</Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            margin: 5,
          }}>
          <Text>{item.category}</Text>

          <Text>${item.amount}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  data_Container: {
    margin: 10,
    padding: 5,
    borderRadius: 15,
    backgroundColor: colors.grey,
  },
  title: {
    margin: 5,
    fontWeight: '700',
    fontSize: 15,
  },
});
