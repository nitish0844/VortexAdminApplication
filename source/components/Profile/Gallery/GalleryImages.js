import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';

const GalleryImages = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Initially, set isLoading to true

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        // Reference to the Firebase Storage folder where your images are stored
        const storageRef = storage().ref('Gallery');

        // List all the items (images) in the storage folder
        const imageList = await storageRef.listAll();

        // Get download URLs for each image
        const urls = await Promise.all(
          imageList.items.map(async item => {
            return await item.getDownloadURL();
          }),
        );

        // Update state with image URLs and set isLoading to false
        setImageUrls(urls);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
        setIsLoading(false); // Set isLoading to false in case of an error
      }
    };

    fetchImageUrls();
  }, []);

  const renderItem = ({item}) => {
    return (
      <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? ( // Render loader if isLoading is true
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        <FlatList
          data={imageUrls} // Use imageUrls state to display Firebase Storage images
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3} // Display 3 images in a row
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '32%', // 3 images in a row with some spacing
    aspectRatio: 1, // To maintain aspect ratio
    margin: 1, // Adjust the margin as needed
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GalleryImages;
