import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import {Dimensions} from 'react-native';

const Attendence = [
  {
    week1: 2,
  },
  {
    week2: 4,
  },
  {
    week3: 7,
  },
  {
    week4: 4,
  },
];

const AttendenceStats = () => {
  const calculatedData = Attendence.map((weekAttendance, index) => {
    const totalClasses = Object.values(weekAttendance)[0]; // Get the number of attended classes
    const percentage = (totalClasses / 7) * 100; // Calculate the percentage based on 7 days in a week
    const roundedPercentage = Math.round(percentage); // Round the percentage to the nearest integer
    return {
      week: `Week ${index + 1}`,
      percentage: roundedPercentage, // Ensure the percentage doesn't exceed 100%
    };
  });

  const averagePercentage =
    calculatedData.reduce((total, item) => total + item.percentage, 0) /
    calculatedData.length;

  calculatedData.push({
    week: 'Total',
    percentage: Math.round(averagePercentage),
  });

  const currentDate = new Date();
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const currentMonth = monthNames[currentDate.getMonth()];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Overall Attendance</Text>
      <View style={styles.curveContainer}>
        <View style={styles.monthContainer}>
          <View style={styles.monthTextContainer}>
            <Text style={styles.month}>{currentMonth}</Text>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>View</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.chartContainer}>
          {calculatedData.map((item, index) => (
            <View key={index} style={styles.barGraphContainer}>
              <View
                style={[
                  styles.barGraph,
                  {
                    backgroundColor: index < 4 ? '#fff' : '#FFA500',
                    height: item.percentage * 1.5, // Adjust the height
                  },
                ]}>
                <Text
                  style={[
                    styles.percentageText,
                    {
                      color: index < 4 ? '#000' : '#fff',
                    },
                  ]}>
                  {item.percentage}%
                </Text>
              </View>
              <Text
                style={[
                  styles.weekLabel,
                  {
                    color: index < 4 ? '#fff' : '#FFA500',
                  },
                ]}>
                {item.week}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AttendenceStats;

const styles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '700',
    left: 25,
  },
  container: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: '5%',
  },
  curveContainer: {
    height: 200,
    width: 370,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 25,
    top: 20,
    flexDirection: 'row',
    left: 15,
  },
  month: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
    paddingBottom: 10,
  },
  monthContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 80,
    // height: 60, // Set a fixed height for the container
  },
  monthTextContainer: {
    marginBottom: 10, // Add margin to separate the month and button
    left: 10,
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    lineHeight: 25,
    fontWeight: '700',
    fontSize: 13,
  },
  buttonContainer: {
    height: 25,
    width: 60,
    backgroundColor: '#0D69D4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    left: 13,
  },
  chartContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 70,
    paddingBottom: 20, // Added paddingBottom to align bottom
  },
  barGraphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  barGraph: {
    width: 35,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  percentageText: {
    // color: '#000',
    fontSize: 14,
    transform: [{rotate: '270deg'}],
    fontWeight: '700',
    position: 'absolute', // Position the text absolutely inside the bar
    bottom: '15%',
  },
  weekLabel: {
    marginTop: 5,
    color: '#fff',
    fontSize: 12,
  },
});
