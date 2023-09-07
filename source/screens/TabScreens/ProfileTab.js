import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Header from '../../components/Profile/Header';
import GymFeeCard from '../../components/Profile/GymFeeCard';
import ProfileImage from '../../components/Profile/ProfileImage';
import ProfileSettings from '../../components/Profile/ProfileSettings';

const ProfileTab = () => {
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
        <Header />
        <GymFeeCard />
        <ProfileImage />
        <ProfileSettings />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    flexGrow: 1,
  },
  componentContainer: {
    marginBottom: 20, // Add appropriate margin between components
  },
});
