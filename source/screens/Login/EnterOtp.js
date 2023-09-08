import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
// import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
// import LottieView from 'lottie-react-native';
import {useRoute} from '@react-navigation/native';

const EnterOtp = ({}) => {
  const route = useRoute();
  const {verificationId} = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const autoSubmitRef = useRef(null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if all OTP fields are filled, then auto-submit
    if (otp.every(digit => digit !== '')) {
      autoSubmitRef.current = setTimeout(handleVerifyOtp, 1000); // Auto-submit after 1 second
    } else {
      clearTimeout(autoSubmitRef.current); // Clear auto-submit timer
    }
  }, [otp]);

  // useEffect(() => {
  //   // Get the FCM token when the component mounts
  //   getFCMToken();
  // }, []);

  // const getFCMToken = async () => {
  //   try {
  //     const token = await messaging().getToken();
  //     console.log('FCM Token:', token);

  //     // Store the token in Firebase (replace 'users' with your collection name)
  //     const user = auth().currentUser;
  //     if (user) {
  //       await firestore()
  //         .collection('users')
  //         .doc(user.uid)
  //         .set({fcmToken: token}, {merge: true}); // Use set with merge true to update or create the document
  //     }
  //   } catch (error) {
  //     console.error('Failed to get FCM token:', error);
  //   }
  // };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      // Concatenate the elements of the otp array into a single string
      const otpString = otp.join('');

      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        otpString,
      );

      // Sign in with the credential
      await auth().signInWithCredential(credential);

      // If successful, navigate to the next screen
      // getFCMToken();
      alert('Successfully logged in!');
      navigation.replace('BottomTabs');
    } catch (error) {
      console.error(error);
      alert('Failed to log in. Please check the OTP or verify reCAPTCHA.');
    } finally {
      setIsLoading(false); // Hide loader when the process completes
    }
  };

  const handleOtpChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Focus on the next input field if available
      if (index < 5 && text !== '') {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && index > 0) {
      // Handle backspace key
      const newOtp = [...otp];
      newOtp[index - 1] = ''; // Clear the previous input box
      setOtp(newOtp);

      // Focus on the previous input field
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <StatusBar
        backgroundColor="#FFA500"
        barStyle="light-content"
        keyboardShouldPersistTaps="handled"
      />
      {/* <View style={styles.container}> */}
      <View style={styles.blackBackground} />
      <View style={styles.orangeBackground} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Confidence</Text>
        <Text style={styles.descrip}>Be confidance to your students</Text>
      </View>
      <Image source={require('./otpbg.png')} />
      <View style={styles.otpTitleContainer}>
        <Text style={styles.EnterOtpText}>Enter OTP?</Text>
        <Text style={styles.otpDesctip}>
          Enter your code for confirmation “IT IS YOU” then procced to the
          application
        </Text>
      </View>

      {/* OTP input boxes */}
      <View style={styles.otpInputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            //   placeholder="0"
            keyboardType="numeric"
            maxLength={1}
            onChangeText={text => handleOtpChange(text, index)}
            value={digit}
            onKeyPress={event => handleBackspace(event, index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, {width: '80%'}]}
        onPress={handleVerifyOtp}
        disabled={otp.some(digit => digit === '') || isLoading}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    // zIndex: 99,
  },
  submitButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  // Background styles
  orangeBackground: {
    position: 'absolute',
    top: -100,
    left: -50,
    right: 80,
    bottom: '40%',
    backgroundColor: 'orange',
    zIndex: 0, // Make sure it's behind other content
    transform: [{rotate: '-10.77deg'}],
    borderRadius: 50,
    width: 500,
    height: 500,
  },
  blackBackground: {
    position: 'absolute',
    top: '45%', // Orange background starts from the middle
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 0,
  },
  title: {
    color: '#fff',
    fontSize: 29,
    fontWeight: '700',
    textAlign: 'center',
  },
  descrip: {
    color: '#292929',
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '700',
  },
  titleContainer: {
    bottom: 50,
  },
  EnterOtpText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '700',
  },
  otpTitleContainer: {
    alignSelf: 'flex-start',
    left: 25,
    top: 40,
  },
  otpDesctip: {
    color: '#CBCBCB',
    width: 360,
    top: 5,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
  otpInput: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#FFA500',
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: '0%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loader: {
    width: 100,
    height: 100,
  },
});

export default EnterOtp;
