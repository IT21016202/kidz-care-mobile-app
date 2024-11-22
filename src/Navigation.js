import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AlertScreen from './screens/AlertScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import {NavigationContainer} from '@react-navigation/native';
import {Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './screens/ProfileScreen';
import colors from '../thems';
import {Image} from 'react-native-elements';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Alert') {
            iconName = 'bell';
          } else if (route.name === 'Mark') {
            iconName = 'bookmark';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          // return <Ionicons name={iconName} size={size} color={color} />;
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 0, // Customize label font size
          fontWeight: 'bold',
          // Customize label font weight
        },
        tabBarStyle: {
          backgroundColor: '#C9E6FF', // Customize background color of the bottom bar
          borderTopWidth: 1, // Optional: add border to the top of the bottom bar
          borderTopColor: '#ddd', // Optional: border color
          margin: 10,
          borderRadius: 30,
          marginHorizontal: 20,
        },
        tabBarActiveTintColor: colors.primary, // Customize active icon and label color
        tabBarInactiveTintColor: 'gray', // Customize inactive icon and label color
        headerShown: false, // Hide header for tab screens
      })}
      // tabBarOptions={{
      //   activeTintColor: 'blue',
      //   inactiveTintColor: 'gray',
      // }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mark" component={AttendanceScreen} />
      <Tab.Screen name="Alert" component={AlertScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppHeader = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Tabs"
      component={BottomTabs}
      options={{
        // headerTitle: 'KINZCARE', // Set the app name here
        headerTitle: () => (
          <Image
            source={require('./assets/top-logo.png')} // Replace with your logo path
            style={{width: 140, height: 50}} // Adjust the size as needed
            resizeMode="contain"
          />
        ),
        headerStyle: {
          backgroundColor: '#f8f9fa', // Customize header style if needed
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <BottomTabs /> */}
      <AppHeader />
    </NavigationContainer>
  );
}
