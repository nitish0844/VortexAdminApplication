import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const Datacard = () => {
  const handleButtonClick = () => {
    console.log('Clicked');
    // Add your desired functionality here
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.title}>Total members</Text>
          <Text style={styles.number}>101</Text>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={handleButtonClick}>
            <Entypo
              style={styles.sideButtonText}
              name="chevron-right"
              size={24}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Members paid</Text>
          <Text style={styles.number}>51</Text>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={handleButtonClick}>
            <Entypo
              style={styles.sideButtonText}
              name="chevron-right"
              size={24}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.box}>
          <Text style={styles.title}>Members not paid</Text>
          <Text style={[styles.number, {color: '#D61F1F'}]}>50</Text>
          <TouchableOpacity
            style={styles.sideButton}
            onPress={handleButtonClick}>
            <Entypo
              style={styles.sideButtonText}
              name="chevron-right"
              size={24}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <Text style={styles.title}>Total Amount</Text>
          <Text style={styles.number}>20k</Text>
          {/* <TouchableOpacity style={styles.sideButton}>
            <Text style={styles.sideButtonText}>{'>'}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: '42%',
    height: '85%',
    backgroundColor: '#313133',
    borderRadius: 20,
    justifyContent: 'center',
    marginHorizontal: 12,
    position: 'relative', // Added for positioning the side button
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
    left: '5%',
    width: '90%',
  },
  number: {
    fontSize: 35,
    color: '#19C319',
    marginTop: 5,
    left: '10%',
    fontWeight: 'bold',
  },
  sideButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 15,
    height: '100%',
    backgroundColor: '#7B61FF',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Increase the zIndex to make it clickable
  },
  sideButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default Datacard;
