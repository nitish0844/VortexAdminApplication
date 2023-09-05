import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import HeadText from './../../components/MainPage/HeadText';
import {useFocusEffect} from '@react-navigation/native';
import AttendenceStats from '../../components/MainPage/AttendenceStat';
import Datacard from '../../components/MainPage/Datacard';

const MainScreen = () => {
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
        <HeadText />
        <Datacard />
        <AttendenceStats />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainScreen;

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
