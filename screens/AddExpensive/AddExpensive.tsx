import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../thmes';
import BackButton from '../../components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {categories} from './../../constants/index';
import Snackbar from 'react-native-snackbar';
import Loading from '../../components/Loading';

export default function AddTripScreen({props}) {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (title && amount && category) {
      // good to go
      // navigation.goBack();
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        amount,
        category,
        tripId: id,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Please fill all the fields!',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.add_Text_Container}>
        <BackButton />
        <Text style={styles.add_Text}>Add Expensive</Text>
      </View>
      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/customers.jpg')}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.inputText}>For what ?</Text>
        <TextInput
          value={title}
          onChangeText={value => setTitle(value)}
          style={styles.input}
        />
        <Text style={styles.inputText}>How Much ?</Text>
        <TextInput
          value={amount}
          onChangeText={value => setAmount(value)}
          style={styles.input}
        />
      </View>
      <View>
        <Text style={styles.categories}>Categories</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {categories.map(cat => {
            let bgColor = colors.main;
            if (cat.value == category) {
              bgColor = colors.heading;
            }
            return (
              <TouchableOpacity
                onPress={() => setCategory(cat.value)}
                style={styles.button_Category}>
                <Text style={{color: bgColor}}>{cat.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.button_Container}>
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={handleAddExpense} style={styles.button}>
            <Text style={styles.addButton_Text}>Add Trip</Text>
          </TouchableOpacity>
        )}
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
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  image: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },
  image_Container: {
    alignItems: 'center',
    height: '30%',
  },
  inputText: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 15,
  },
  input: {
    margin: 10,
    padding: 15,
    backgroundColor: colors.grey,
    borderRadius: 20,
  },
  button_Container: {
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: colors.heading,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton_Text: {
    fontSize: 20,
    color: colors.main,
  },
  categories: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
    margin: 5,
  },
  button_Category: {
    margin: 5,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});
