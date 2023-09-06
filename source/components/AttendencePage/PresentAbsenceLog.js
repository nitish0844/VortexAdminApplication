import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PresentAbsenceLog = () => {
  const [attendanceType, setAttendanceType] = useState('Present');

  // Dummy data for student attendance
  const attendanceData = [
    {
      id: '1',
      name: 'John Doe',
      date: '2023-09-05',
      time: '09:00 AM',
      image: 'https://pngfre.com/wp-content/uploads/hulk-39-1-1024x820.png',
    },
    {
      id: '2',
      name: 'Jane Smith',
      date: '2023-09-05',
      time: '10:30 AM',
      image: 'https://pngfre.com/wp-content/uploads/hulk-39-1-1024x820.png',
    },
    // Add more data as needed
  ];

  const renderAttendanceItem = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.image}} style={styles.studentImage} />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.dateTimeText}>{`${item.date}, ${item.time}`}</Text>
      </View>
      <Text
        style={[
          styles.attendanceTypeText,
          {color: attendanceType === 'Present' ? '#19CE19' : '#D62828'},
        ]}>
        {attendanceType}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            attendanceType === 'Present' && styles.selectedButton,
          ]}
          onPress={() => setAttendanceType('Present')}>
          <Text
            style={[
              styles.buttonText,
              {color: attendanceType === 'Present' ? 'black' : '#fff'},
            ]}>
            Present
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            attendanceType === 'Absent' && styles.selectedButton,
          ]}
          onPress={() => setAttendanceType('Absent')}>
          <Text
            style={[
              styles.buttonText,
              {color: attendanceType === 'Absent' ? 'black' : '#fff'},
            ]}>
            Absent
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={attendanceData}
        keyExtractor={item => item.id}
        renderItem={renderAttendanceItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    left: '6%',
    marginBottom: 16,
  },
  button: {
    // backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    // borderWidth: 1,
    // borderColor: 'orange',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: 'orange',
    color: '#000',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    // backgroundColor: '#F5F5F5',
    marginBottom: 8,
    borderRadius: 8,
    height: 60,
  },
  itemText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#fff',
  },
  studentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 8,
  },
  textContainer: {
    flex: 1,
  },
  dateTimeText: {
    fontSize: 14,
    marginLeft: 8,
    color: 'orange',
  },
  attendanceTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    // color: 'orange',
    marginLeft: 8,
  },
});

export default PresentAbsenceLog;
