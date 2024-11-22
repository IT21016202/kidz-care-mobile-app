/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import Navigation from './src/Navigation';
import './gesture-handler';
import notifee, {AuthorizationStatus} from '@notifee/react-native';

function App(): React.JSX.Element {

  async function requestUserPermission() {
    const authStatus = await notifee.requestPermission();
    if (authStatus.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      console.log('Permission status:', authStatus);
    } else {
      console.log('User declined permissions');
    }
  }

  useEffect(() => {
    requestUserPermission();
  }, []);
  return <Navigation />;
}
export default App;
