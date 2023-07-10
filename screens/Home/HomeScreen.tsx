import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../thmes';
import {useNavigation,useIsFocused} from '@react-navigation/native';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../../config/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/slice/user';
import {doc, getDocs, query, where} from 'firebase/firestore';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = [
    {
      id: 1,
      place: 'Gujrat',
      country: 'Pakistan',
    },
    {
      id: 2,
      place: 'London Eye',
      country: 'England',
    },
    {
      id: 3,
      place: 'Washington dc',
      country: 'America',
    },
    {
      id: 4,
      place: 'New york',
      country: 'America',
    },
  ];
  const handleLogout = async () => {
    await signOut(auth);
    dispatch(setUser(null));
  };
  const [trips, setTrips] = useState(items);
  const {user} = useSelector(state => state.user);

  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      console.log('documement: ',doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };
  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tab_text_Container}>
        <Text style={styles.expensify_Text}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/groupPeople.jpg')}
        />
      </View>
      <View style={styles.text_Container}>
        <Text style={styles.recent_Text}>Recent Trips</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTripScreen')}
          style={styles.button}>
          <Text style={styles.add_Text}>Add Trip</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          data={trips}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('TripExpenses', {...item})}>
                <View style={styles.button_Menu}>
                  <Image
                    style={styles.imageTwo}
                    source={require('./../../assets/images/onePerson.jpg')}
                  />
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      flex: 1,
                    }}>
                    <Text style={styles.place_Text}>{item.place}</Text>
                    <Text style={styles.country_Text}>{item.country}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  tab_text_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },
  expensify_Text: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
  logout: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.main,
  },
  button: {
    height: 25,
    width: '20%',
    backgroundColor: '#9681EB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    elevation: 10,
  },
  image_Container: {
    alignItems: 'center',
    height: '30%',
  },
  text_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 5,
  },

  image: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },
  recent_Text: {
    fontWeight: '700',
    fontSize: 20,
    color: 'black',
  },
  add_Text: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.main,
  },
  button_Menu: {
    height: 130,
    width: 150,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    elevation: 10,
    shadowColor: '#black',
    shadowOffset: {
      height: 1,
      width: 0,
    },
  },
  imageTwo: {
    height: 90,
    width: 70,
    resizeMode: 'contain',
  },
  place_Text: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
  country_Text: {
    fontWeight: '700',
    fontSize: 16,
    color: 'black',
  },
});
