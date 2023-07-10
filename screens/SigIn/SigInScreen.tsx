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
import Snackbar from 'react-native-snackbar';
import {useDispatch, useSelector} from 'react-redux';
import user, {setUserLoading} from '../../redux/slice/user';
import Loading from '../../components/Loading';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../config/firebase';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (email && password) {
      // navigation.goBack();
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.add_Text_Container}>
        <BackButton />
        <Text style={styles.add_Text}>Sign In</Text>
      </View>
      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/customers.jpg')}
        />
      </View>
      <View style={{justifyContent: 'center'}}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.input}
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.forget_Container}>
        <TouchableOpacity>
          <Text>Forget Password ?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.button_Container}>
        {userLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.addButton_Text}>Sign In</Text>
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
  forget_Container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});
