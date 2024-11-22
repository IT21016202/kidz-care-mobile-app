import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../thems';
import Alert from './../components/Alert';
import Card from '../components/Card';
import AttendanceService from './../service/attendanceService';
import AlertService from '../service/alertService';
import notifee, {AndroidImportance} from '@notifee/react-native';

const HomeScreen = () => {
  const [range, setRange] = useState(null);
  const [fall, setFall] = useState(null);

  useEffect(() => {
    const unsubscribeKids = AttendanceService.getKidsCountListener(count => {
      console.log('range kids listener===================');
      AttendanceService.getAttendanceCount().then(attendanceCount => {
        console.log('attendanceCount', attendanceCount);
        console.log('count', count);
        if (attendanceCount > count) {
          //handleAddRrangeAlert('range');
          displayNotification('Children Have Exited the Designated Area!');
          displayRrangeAlert();
        } else {
          setRange(null);
        }
      });
    });

    return () => {
      unsubscribeKids();
    };
  }, []);

  async function displayNotification(message) {
    // Create a notification channel
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    // Display the notification
    await notifee.displayNotification({
      title: 'KidzCare',
      body: message,
      android: {
        channelId: 'default',
      },
    });
  }

  const displayRrangeAlert = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0];
    setRange(formattedTime);
  };

  const handleAddRrangeAlert = type => {
    console.log('ok');
    AlertService.saveAlert(type)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome Back
        <Text style={styles.name}> Tharindu!</Text>
      </Text>
      <View style={(fall != null) | (range != null) ? styles.alerts : ''}>
        {fall != null ? <Alert type={'fall'} time={fall} /> : ''}
        {range != null ? <Alert type={'range'} time={range} /> : ''}
      </View>
      <View style={styles.cards}>
        <Card type={'mark'} />
        <Card type={'alert'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  welcome: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  name: {
    color: colors.primary,
  },
  alerts: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginVertical: 25,
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeScreen;