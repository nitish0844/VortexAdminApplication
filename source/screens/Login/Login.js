import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity, // Import TouchableOpacity
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();

  const handleScreenTouch = () => {
    Keyboard.dismiss(); // Close the keyboard when the screen is touched
  };

  const handleSubmit = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+91${mobileNumber}`,
      );
      const verificationId = confirmation.verificationId; // Extract the verification ID
      //   navigation.navigate('EnterOtp', {verificationId});
      navigation.navigate('EnterOtp', {verificationId});
    } catch (error) {
      console.error(error);
      alert('Failed to send OTP. Please check the phone number.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <TouchableWithoutFeedback onPress={handleScreenTouch}>
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Tiger Gym</Text>
          </View>
          <View style={styles.loginTitleContainer}>
            <Text style={styles.loginTitle}>Login</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              placeholderTextColor="grey"
              keyboardType="numeric"
              onChangeText={text => setMobileNumber(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.submitButton} // Style for the submit button
            onPress={handleSubmit} // Handle submit button press
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <View style={styles.conditionContainer}>
            <Text style={styles.conditionText}>
              Once submitted you will agree all the terms and conditions
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: '5%',
  },
  loginTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  loginTitleContainer: {
    marginLeft: 25,
    marginTop: '10%',
  },
  inputContainer: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#454545',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#FFA500', // Orange background color
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  conditionText: {
    color: '#7C7C7C',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 1.5, // Increase letter spacing
    textAlign: 'center',
  },
  conditionContainer: {
    top: 15,
    left: 20,
    width: '90%',
  },
});

export default Login;
