import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../thmes';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.image_Container}>
        <Image
          style={styles.image}
          source={require('./../../assets/images/welcome.png')}
        />
      </View>
      <View style={styles.button_Container}>
        <Text style={styles.expensify_Text}>Expensify</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInScreen')}
          style={styles.button}>
          <Text style={styles.sign_Text}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUpScreen')}
          style={styles.button}>
          <Text style={styles.sign_Text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>signIn()} style={styles.google_button}>
          <Image
            style={styles.googleIcon}
            source={require('../../assets/images/google.png')}
          />
          <Text style={styles.google_Text}>Sign In with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main,
  },
  image_Container: {
    alignItems: 'center',
    height: '30%',
    marginTop: 20,
  },
  image: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
    resizeMode: 'contain',
  },
  expensify_Text: {
    fontSize: 35,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    margin: 10,
    padding: 17,
    backgroundColor: colors.button,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sign_Text: {
    color: colors.main,
    fontSize: 18,
    fontWeight: '500',
  },
  button_Container: {
    flex: 1,
    margin: 10,
    marginTop: '30%',
  },
  button_Google: {
    margin: 10,
    padding: 17,
    backgroundColor: colors.grey,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  google_button: {
    margin: 10,
    padding: 17,
    backgroundColor: colors.button,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  googleIcon: {
    height: 20,
    width: 20,
  },
  google_Text: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});
