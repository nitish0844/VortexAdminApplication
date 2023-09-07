import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const image =
  'https://img.freepik.com/premium-vector/tiger-body-builder-gym-logo-mascot_9645-2701.jpg';

const GalleryProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 300,
      cropperCircleOverlay: false,
      includeBase64: true,
    })
      .then(image => {
        setSelectedImage(image);
        handleImageUpload(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const handleImageUpload = async imageUri => {
    try {
      if (!selectedImage) {
        return;
      }

      const randomName = `${Math.random().toString(36).substring(7)}.jpg`;

      const imageRef = storage().ref(`Gallery/${randomName}`);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await imageRef.put(blob);

      const downloadURL = await imageRef.getDownloadURL();

      // Here, you can save the downloadURL to your Firestore or wherever you want to store it.
      // For demonstration, we'll just log it.
      console.log('Image URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri: image}} style={styles.profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.userNumber}>Ph: 9994365901</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={handleImagePicker}>
        <Text style={styles.editButtonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 20, // Use a fixed value in pixels
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

export default GalleryProfile;
