import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';

const BASE_URL = '192.168.145.220:3000';

const image =
  'https://img.freepik.com/premium-vector/tiger-body-builder-gym-logo-mascot_9645-2701.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchImageUrls = useCallback(async () => {
    try {
      const storageRef = storage().ref('Gallery');
      const imageList = await storageRef.listAll();
      const urls = await Promise.all(
        imageList.items.map(async item => {
          return await item.getDownloadURL();
        }),
      );
      setImageUrls(urls);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImageUrls();
  }, [fetchImageUrls]);

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

      // Refresh image list
      fetchImageUrls();
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={{uri: image}} style={styles.profileImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.userNumber}>Ph: 9994365901</Text>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleImagePicker}>
          <Text style={styles.editButtonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageContainer}>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="orange" />
          </View>
        ) : (
          <FlatList
            data={imageUrls}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Align button to the right end
    marginTop: 20,
    borderRadius: 12,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 16,
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
    alignSelf: 'flex-end', // Align button to the right end
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    padding: 5,
  },
  image: {
    width: '32%', // Increase the width of the images
    aspectRatio: 1,
    margin: 2, // Added margin to images
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Gallery;
