import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import Storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

DatePicker.UNSAFE_componentWillReceiveProps =
  DatePicker.componentWillReceiveProps;

const DetailForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [showCameraIcon, setShowCameraIcon] = useState(true);
  const [allFieldsFilled, setAllFieldsFilled] = useState(true);

  useEffect(() => {
    if (name && email && phoneNumber && address && dob && image) {
      setAllFieldsFilled(true);
    } else {
      setAllFieldsFilled(false);
    }
  }, [name, email, phoneNumber, address, dob, image]);

  const handleImagePicker = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 300,
      height: 300,
      cropperCircleOverlay: true,
      includeBase64: true,
    })
      .then(image => {
        setImage(image.path);
        handleImageUpload(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const handleCameraIconClick = () => {
    handleImagePicker();
  };

  const renderImageOrCameraIcon = () => {
    if (showCameraIcon) {
      return (
        <TouchableOpacity
          style={styles.cameraIconContainer}
          onPress={handleCameraIconClick}>
          <Feather name="camera" size={40} color={'#fff'} />
        </TouchableOpacity>
      );
    } else {
      return (
        <Image
          source={{uri: imageURL}} // Use the imageURL from state
          style={styles.selectedImage}
        />
      );
    }
  };

  const handleImageUpload = async path => {
    try {
      const response = await fetch(path);
      const blob = await response.blob();

      //   const storageRef = Storage().ref(`/profile/${auth().currentUser.uid}`);
      const storageRef = Storage().ref(`/profile/test`);
      await storageRef.put(blob);

      const downloadUrl = await storageRef.getDownloadURL();

      setImageURL(downloadUrl); // Store the image URL in state
      setShowCameraIcon(false);

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  const handleSubmit = () => {
    if (allFieldsFilled) {
      // Call handleImageUpload to upload the image and get URL
      handleImageUpload(image);

      const currentUser = auth().currentUser;

      // Prepare user data
      const userData = {
        name,
        email,
        phoneNumber,
        address,
        dob,
        imageUrl: imageURL, // Use the imageURL from state
      };

      // Upload user data to Firestore
      firestore()
        .collection('users') // Change 'users' to your Firestore collection name
        .doc(currentUser.uid)
        .add(userData)
        .then(() => {
          console.log('User data uploaded to Firestore successfully');
          // Clear form fields
          setName('');
          setEmail('');
          setPhoneNumber('');
          setAddress('');
          setDob('');
          setImage(null);
          setShowCameraIcon(true);
        })
        .catch(error => {
          console.error('Error uploading user data to Firestore:', error);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.Title}>Enter person details</Text>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, {textAlign: 'center'}]}>
            Select Image
          </Text>
          {renderImageOrCameraIcon()}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#A6A6AA"
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter your name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            placeholderTextColor="#A6A6AA"
            onChangeText={text => setEmail(text)}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#A6A6AA"
            value={phoneNumber}
            onChangeText={text => setPhoneNumber(text)}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#A6A6AA"
            value={address}
            onChangeText={text => setAddress(text)}
            placeholder="Enter your address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Birth</Text>
          <DatePicker
            style={styles.datePicker}
            backgroundColor="#454545"
            date={dob}
            mode="date"
            placeholder="Select DOB"
            format="YYYY-MM-DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={date => setDob(date)}
            useNativeDriver={false}
            iconComponent={
              <View style={styles.calendarIcon}>
                {/* Place your custom calendar icon here */}
                <Text style={styles.calendarIconText}>📅</Text>
              </View>
            }
            customStyles={{
              dateInput: {
                borderWidth: 0, // Remove the border of the date input
                alignItems: 'flex-start', // Align the date input to the left
              },
              dateText: {
                color: '#fff',
                textAlign: 'center',
              },
              placeholderText: {
                color: '#A6A6AA',
                textAlign: 'center',
              },
            }}
          />
        </View>

        {allFieldsFilled && (
          //   <Button
          //     title="Add member"
          //     onPress={handleSubmit}
          //     style={{borderRadius: 50}}
          //   />
          <TouchableOpacity
            style={styles.submitButtonContainer}
            onPress={handleSubmit}>
            <Text style={styles.submitButton}>Add members</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: '10%',
    paddingTop: '10%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    backgroundColor: '#454545', // Set the background color to grey
    height: 40,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#fff',
  },
  Title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: '8%',
  },
  datePicker: {
    width: '50%',
    backgroundColor: '#454545',
    borderRadius: 8,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  calendarIcon: {
    position: 'absolute',
    right: 0, // Adjust the position as needed
    top: '50%', // Vertically center the icon
    transform: [{translateY: -12}], // Center the icon vertically
  },
  calendarIconText: {
    fontSize: 20,
  },
  cameraIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#454545',
    borderRadius: 50, // Make it round
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  cameraIcon: {
    fontSize: 40,
    color: '#fff',
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make it round
    justifyContent: 'center',
    alignSelf: 'center',
  },
  submitButton: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '700',
  },
  submitButtonContainer: {
    top: '1%',
    height: '6%',
    width: '95%',
    backgroundColor: '#FFA500',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default DetailForm;
