import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import MainScreen from './source/screens/TabScreens/MainScreen';
import AddMember from './source/screens/TabScreens/AddMemberTab';
import ProfileTab from './source/screens/TabScreens/ProfileTab';
import AttendanceTab from './source/screens/TabScreens/AttendanceTab';
import GymGalleryMain from './source/components/Profile/Gallery/GymGalleryMain';
// import DownloadCsv from './source/components/Profile/DownloadCSV/DownloadCsv';
import EnterOtp from './source/screens/Login/EnterOtp';
import Login from './source/screens/Login/Login';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux
// import {Provider} from 'react-redux';
// import store from './source/components/Redux/Store/Store';

// import PushNotification, {Importance} from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';

import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const RootNavigator = () => {
    // const requestUserPermission = async () => {
    //   try {
    //     const authStatus = await messaging().requestPermission();
    //     const enabled =
    //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //     if (enabled) {
    //       console.log('Authorization status:', authStatus);
    //     }
    //   } catch (error) {
    //     console.error('Error requesting permission:', error);
    //   }
    // };

    // useEffect(() => {
    //   requestUserPermission();
    // }, []);

    // useEffect(async () => {
    //   let token = await messaging().getToken();
    //   console.log(token);
    // }, []);

    // useEffect(() => {
    //   const handleNotification = messaging().onMessage(async remoteMessage => {
    //     const {title, body, imageUrl} = remoteMessage.data;

    //     console.log('Received notification:');
    //     console.log('Title:', title);
    //     console.log('Body:', body);
    //     console.log('Image URL:', imageUrl);

    //     PushNotification.localNotification({
    //       title: title,
    //       message: body,
    //       channelId: '812019205023-9994365901',
    //       vibration: 500,
    //       vibrate: true,
    //       playSound: true,
    //       soundName: 'notification.mp3',
    //       color: 'red',
    //       actions: ['Open', 'Delete'],
    //       userInfo: {key: 'value'},
    //       // bigPictureUrl: 'https://wallpaperaccess.com/full/393752.jpg',
    //       bigPictureUrl: imageUrl,
    //       importance: Importance.LOW,
    //       largeIconUrl: imageUrl,
    //     });

    //     messaging().setBackgroundMessageHandler(async remoteMessage => {
    //       const {title, body, data, imageUrl} = remoteMessage.data;

    //       const notificationPayload = {
    //         channelId: '812019205023-9994365901', // Make sure this matches the channelId you defined in PushNotification.configure()
    //         category: '812019205023-9994365901',
    //         title: title,
    //         message: body,
    //         // sound: 'notification.mp3', // Specify the custom notification sound file
    //         userInfo: data, // Pass additional data to the notification
    //         playSound: true,
    //         // importance: Importance.HIGH,
    //         importance: Importance.LOW,
    //         actions: ['Open', 'Delete'],
    //         bigPictureUrl: imageUrl,
    //         largeIconUrl: imageUrl,
    //         vibration: 500,
    //         vibrate: true,
    //         color: 'red',
    //       };

    //       PushNotification.localNotification(notificationPayload);

    //       if (data && data.action === 'yourActionKey') {
    //         // Perform the desired action when the app is killed or in the background
    //         // For example, navigate to a specific screen or perform a specific task
    //         // You can use navigation.navigate or other logic here
    //       }
    //     });
    //   });
    //   //   });

    //   const configurePushNotification = async () => {
    //     await messaging().registerDeviceForRemoteMessages();

    //     messaging().onMessage(handleNotification);

    //     PushNotification.createChannel(
    //       {
    //         channelId: '812019205023-9994365901',
    //         channelName: 'com.sampleapp.app',
    //         // soundName: 'notification.mp3',
    //         vibration: 500,
    //         vibrate: true,
    //         playSound: true,
    //         actions: ['Open', 'Delete'],
    //         importance: Importance.LOW,
    //       },import AddMember from './source/screens/TabScreens/AddMember';

    //       created => console.log(`createChannel 3 returned '${created}'`),
    //     );
    //   };

    //   configurePushNotification();
    // }, []);

    const MainStack = () => {
      return (
        <Stack.Navigator
          // initialRouteName="Sliding"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EnterOtp" component={EnterOtp} />
        </Stack.Navigator>
      );
    };

    const BottomTabs = () => {
      return (
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={({route}) => ({
            // headerStyle: {backgroundColor: '#42f44b'},
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: '800'},
            tabBarActiveTintColor: '#FFA500',
            tabBarInactiveTintColor: '#fff',
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '700',
            },
            tabBarStyle: {
              backgroundColor: '#1D1D1D',
              borderTopColor: '#1D1D1D',
              height: 55,
            },
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let iconComponent;
              if (route.name === 'MainPage') {
                iconName = 'home-outline';
                iconComponent = (
                  <MaterialCommunityIcons
                    name={iconName}
                    size={30}
                    color={color}
                  />
                );
              } else if (route.name === 'Attendence') {
                iconName = 'stacked-bar-chart';
                iconComponent = (
                  <MaterialIcons name={iconName} size={25} color={color} />
                );
              } else if (route.name === 'Paymenttab') {
                iconName = 'person-add-outline';
                iconComponent = (
                  <Ionicons name={iconName} size={23} color={color} />
                );
              } else if (route.name === 'ProfileTab') {
                iconName = 'user';
                iconComponent = (
                  <Feather name={iconName} size={25} color={color} />
                );
              }
              return iconComponent;
            },
          })}>
          <Tab.Screen
            name="MainPage"
            component={MainScreen}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarHideOnKeyboard: true,
            }}
          />
          <Tab.Screen
            name="Attendence"
            component={AttendanceTab}
            options={{
              headerShown: false,
              tabBarLabel: 'Attendence',
              tabBarHideOnKeyboard: true,
            }}
          />
          <Tab.Screen
            name="Paymenttab"
            component={AddMember}
            options={{
              headerShown: false,
              tabBarLabel: 'Add Members',
              tabBarHideOnKeyboard: true,
            }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileTab}
            options={{
              headerShown: false,
              tabBarLabel: 'Profile',
              tabBarHideOnKeyboard: true,
            }}
          />
        </Tab.Navigator>
      );
    };
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainPage"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Gallery"
          component={GymGalleryMain}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };
  return (
    // <Provider store={store}>
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
    // </Provider>
  );
};

export default App;
