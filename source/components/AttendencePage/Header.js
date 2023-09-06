import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.TitleContainer}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate('MainPage')}>
          <Octicons name="chevron-left" color={'#fff'} size={32} />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Attendence</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    top: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  TitleContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    left: '40%',
    marginTop: 20,
  },
  IconContainer: {
    right: 20,
    top: 20,
  },
});

export default Header;
