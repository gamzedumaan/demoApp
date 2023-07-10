import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {colors} from '../../thmes';
import BackButton from '../../components/BackButton';
import expenseCard from '../../components/expenseCard';
import {useNavigation} from '@react-navigation/native';

export default function TripExpenses(props) {
  const {id, country, place} = props.route.params;
  const navigation = useNavigation();

  const items = [
    {
      id: 1,
      title: 'ate sandwitch',
      amount: 4,
      category: 'food',
    },
    {
      id: 2,
      title: 'bought a jacket',
      amount: 50,
      category: 'shopping',
    },
    {
      id: 3,
      title: 'watched a movie',
      amount: 100,
      category: 'entertainment',
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.add_Text_Container}>
        <BackButton />
        <Text style={styles.add_Text}>{country}</Text>
      </View>
      <Text style={styles.add_place}>{place}</Text>

      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/groupPeople.jpg')}
        />
      </View>
      <View style={styles.text_Container}>
        <Text style={styles.recent_Text}>Expenses</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddExpensive')}
          style={styles.button}>
          <Text style={styles.add_Text}>Add Expenses</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={items} renderItem={expenseCard} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  add_Text_Container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  add_Text: {
    fontWeight: '700',
    fontSize: 13,
    color: colors.main,
    textAlign: 'center',
    flex: 1,
    marginTop: 3,
  },
  add_place: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
  },
  image_Container: {
    alignItems: 'center',
    height: '30%',
  },
  image: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },
  text_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },
  button: {
    height: 25,
    width: '27%',
    backgroundColor: '#9681EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  recent_Text: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
});
