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
import Loading from '../../components/Loading';
import Snackbar from 'react-native-snackbar';
import {useSelector} from 'react-redux';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../../config/firebase';

export default function AddTripScreen() {
  const navigation = useNavigation();
  const {user} = useSelector(state => state.user);
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const handleAddTrip = async () => {
    if (country && place) {
      // navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Place and Country are required !',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.add_Text_Container}>
        <BackButton />
        <Text style={styles.add_Text}>Add Trip</Text>
      </View>
      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/customers.jpg')}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.inputText}>Where On Earth?</Text>
        <TextInput
          value={place}
          onChangeText={value => setPlace(value)}
          style={styles.input}
        />
        <Text style={styles.inputText}>Which Country</Text>
        <TextInput
          value={country}
          onChangeText={value => setCountry(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.button_Container}>
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={handleAddTrip} style={styles.button}>
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
});
