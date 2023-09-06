import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['in'] = {
  monthNames: [
    'January',
    'Febrauary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],

  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'June',
    'July.',
    'Aug',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'],
  today: 'Thu',
};

LocaleConfig.defaultLocale = 'in';

const Calender = () => {
  const [selected, setSelected] = useState('');
  const fakeData = [
    '2023-08-08',
    '2023-08-06',
    '2023-08-07',
    '2023-08-15',
    '2023-08-23',
  ];

  const markedDates = {};

  fakeData.forEach(date => {
    markedDates[date] = {
      selected: true,
      disableTouchEvent: true,
      selectedDotColor: 'orange',
    };
  });

  return (
    <View
      style={{
        // flex: 1, // Expand to fill available space
        justifyContent: 'center', // Vertically center content
        alignItems: 'center', // Horizontally center content
        backgroundColor: '#000', // Set background color
        bottom: '42%',
        width: '100%',
        alignSelf: 'center',
      }}>
      <View style={{borderRadius: 15, overflow: 'hidden', width: '90%'}}>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          theme={{
            calendarBackground: '#fff',
            textSectionTitleColor: '#000',
            selectedDayBackgroundColor: 'orange',
            todayTextColor: 'orange',
            arrowColor: 'orange',
            monthTextColor: 'orange',
            arrowHeight: 20,
            textMonthFontSize: 18,
            textMonthFontWeight: 'bold',
            textDayFontWeight: 'bold',
            arrowWidth: 25,
          }}
          markedDates={{
            ...markedDates,
            [selected]: {
              selected: false,
              disableTouchEvent: true,
              selectedDotColor: 'orange',
            },
          }}
        />
      </View>
    </View>
  );
};

export default Calender;
