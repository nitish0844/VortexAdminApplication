import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VersionCheck from 'react-native-version-check';
import TigerGymGallery from './Gallery/GymGalleryMain';
import {useNavigation} from '@react-navigation/native';

const Aboutgym = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.Container}>
      <MaterialCommunityIcons name="dumbbell" size={24} color="#fff" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Tiger Gym</Text>
      </View>
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate('Gallery')}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#fff"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Download = () => {
  return (
    <View style={styles.Container}>
      <MaterialCommunityIcons name="download" size={28} color="#fff" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Download as CSV</Text>
      </View>
      <TouchableOpacity style={styles.next}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#fff"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const Support = () => {
  return (
    <View style={[styles.Container, styles.supportContainer]}>
      <MaterialCommunityIcons
        name="comment-question-outline"
        size={28}
        color="#fff"
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Support</Text>
      </View>
      <TouchableOpacity style={styles.next}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#fff"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const AppVersion = () => {
  const [version, getVersion] = useState('');

  const fetchVersion = async () => {
    try {
      const currentVersion = await VersionCheck.getCurrentVersion();
      getVersion(currentVersion);
    } catch (error) {
      console.error('Error fetching version:', error);
    }
  };

  fetchVersion();

  return (
    <View style={[styles.Container]}>
      <Entypo name="mobile" size={26} color="#fff" />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>App version</Text>
      </View>
      <View style={[styles.next, {marginRight: '1%'}]}>
        <Text style={styles.versionText}>{version}</Text>
      </View>
    </View>
  );
};

const Information = () => {
  return (
    <View style={styles.Container}>
      <MaterialCommunityIcons
        name="information-outline"
        size={28}
        color="#fff"
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={styles.text}>Information</Text>
      </View>
      <TouchableOpacity style={styles.next}>
        <Entypo
          name="chevron-small-right"
          size={30}
          color="#fff"
          style={styles.nextIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const ProfileSettings = () => {
  return (
    <View style={{flex: 1, left: 10, top: '4%', paddingBottom: '10%'}}>
      <Aboutgym />
      <Text style={styles.title}>BILLING SETTINGS</Text>
      <Download />
      <Text style={styles.title}>SUPPORT</Text>
      <Support />
      <Information />
      <Text style={styles.title}>VERSION</Text>
      <AppVersion />
    </View>
  );
};

export default ProfileSettings;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '7%', // Add some spacing between the containers
    left: '3%',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  next: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingRight: 20,
    right: 20,
  },
  Title: {
    left: 30,
    color: '#454545',
    fontWeight: '500',
  },
  versionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15, // Adjust the font size to your preference
    // marginBottom: '4%', // Add spacing between the title and the content
    paddingBottom: '3%',
    left: '3%',
  },
  supportContainer: {
    marginBottom: '2%', // Adjust the spacing as needed
  },
});
