import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const Header = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out the user
      navigation.replace('MainStack');
      // You can add additional actions after logout if needed
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

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
            left: 10,
          }}>
          <Text style={styles.title}>Profile</Text>
        </View>
        <TouchableOpacity
          style={styles.IconContainer}
          onPress={() => handleLogout()}>
          <Text style={styles.LogutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#000',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    top: 22,
    fontWeight: '700',
  },
  TitleContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignSelf: 'center',
  },
  iconContainer: {
    // marginLeft: 10,
    marginTop: 20,
  },
  IconContainer: {
    // right: 20,
    top: 25,
  },
  LogutText: {
    color: '#FF0000',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default Header;
