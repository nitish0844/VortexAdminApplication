import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';

const image =
  'https://img.freepik.com/premium-vector/tiger-body-builder-gym-logo-mascot_9645-2701.jpg';

const ProfileImage = () => {
  const phoneNumber = '1234567890';

  const handleCallPress = () => {
    const phoneNumberWithoutSpaces = phoneNumber.replace(/\s+/g, '');

    let phoneUrl = '';

    if (Platform.OS === 'ios') {
      phoneUrl = `tel://${phoneNumberWithoutSpaces}`;
    } else {
      phoneUrl = `tel:${phoneNumberWithoutSpaces}`;
    }

    Linking.canOpenURL(phoneUrl)
      .then(supported => {
        if (supported) {
          return Linking.openURL(phoneUrl);
        } else {
          console.error(`Cannot open phone call with URL: ${phoneUrl}`);
        }
      })
      .catch(error => {
        console.error('An error occurred while opening the phone call:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri: image}} style={styles.profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <TouchableOpacity onPress={handleCallPress}>
          <Text style={styles.userNumber}>Ph: {phoneNumber}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 12,
    marginTop: '10%',
    borderRadius: 12,
  },
  profileContainer: {
    marginRight: 16,
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#fff',
  },
  userNumber: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ProfileImage;
