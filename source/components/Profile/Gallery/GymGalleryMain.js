import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GalleryHeader from './GalleryHeader';
import GalleryProfile from './GaleryProfile';
import GalleryImages from './GalleryImages';

const image =
  'https://img.freepik.com/premium-vector/tiger-body-builder-gym-logo-mascot_9645-2701.jpg';

const GymGalleryMain = () => {
  const scrollViewRef = useRef(null);

  useFocusEffect(() => {
    // Check if scrollViewRef is not null before scrolling
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}>
        <GalleryHeader />
        <GalleryProfile />
        <GalleryImages />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  // scrollContent: {
  //   flexGrow: 1,
  // },
  componentContainer: {
    marginBottom: 20, // Add appropriate margin between components
  },
  Profilecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    // paddingVertical: 12,
    marginTop: '10%',
    borderRadius: 12,
    backgroundColor: '#000',
  },
  profileImageContainer: {
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
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default GymGalleryMain;
