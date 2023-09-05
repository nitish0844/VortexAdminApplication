import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const HeadText = () => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textName}>Hello, Cooper 👋</Text>
      <Text style={styles.textDescription}>
        Boost your muscle and train hard
      </Text>
    </View>
  );
};

export default HeadText;

const styles = StyleSheet.create({
  textName: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  textDescription: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 30,
  },
  textContainer: {
    top: 40,
    left: 20,
  },
});
