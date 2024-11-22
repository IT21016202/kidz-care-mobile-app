// import {View, Text, StyleSheet} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import History from '../components/History';
// import {ScrollView} from 'react-native-gesture-handler';
// import AlertService from '../service/alertService';
// import {useIsFocused} from '@react-navigation/native';
// const AlertScreen = () => {
//   const isFocused = useIsFocused();
//   const [alerts, setAlerts] = useState({});
//   const handlealert = () => {
//     AlertService.getAlerts() // Convert input to number
//       .then(result => {
//         const formatDate = date => {
//           return date.toISOString().split('T')[0];
//         };
//         console.log(result);
//         const categorizedData = {};
//         Object.keys(result).forEach(timestamp => {
//           console.log(timestamp);
//           const date = new Date(parseInt(timestamp));
//           console.log(date);
//           const dateString = formatDate(date);

//           // Initialize array for the date if not already present
//           if (!categorizedData[dateString]) {
//             categorizedData[dateString] = [];
//           }

//           // Add entry to the appropriate date array
//           categorizedData[dateString].push({timestamp, ...result[timestamp]});
//         });
//         setAlerts(categorizedData);
//         console.log(categorizedData);
//       })
//       .catch(error => {
//         console.log('Error adding attendance:', error);
//       });
//   };

//   useEffect(() => {
//     handlealert();
//   }, [isFocused]);
//   return (
//     <ScrollView style={styles.container}>
//       {Object.entries(alerts).map(([date, alertsArray]) => {
//         // <History />;
//         <Text>ok</Text>;
//       })}
//       <History />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//   },
// });
// export default AlertScreen;


import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import History from '../components/History';
import {ScrollView} from 'react-native-gesture-handler';
import AlertService from '../service/alertService';
import {useIsFocused} from '@react-navigation/native';
import Loading from '../components/Loading';

const AlertScreen = () => {
  const isFocused = useIsFocused();
  const [alerts, setAlerts] = useState(null); // Initialize as empty object

  const handlealert = async () => {
    try {
      const result = await AlertService.getAlerts();
      console.log('Raw Alerts Data:', result);

      const formatDate = date => date.toISOString().split('T')[0];
      const categorizedData = {};

      Object.keys(result).forEach(timestamp => {
        const date = new Date(parseInt(timestamp));
        const dateString = formatDate(date);

        if (!categorizedData[dateString]) {
          categorizedData[dateString] = [];
        }

        categorizedData[dateString].push({timestamp, ...result[timestamp]});
      });

      setAlerts(categorizedData);
      console.log('Categorized Alerts Data:', categorizedData);
    } catch (error) {
      console.log('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      handlealert();
    }
  }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
      {alerts === null ? (
        <Loading />
      ) : Object.entries(alerts).length === 0 ? (
        <Text>No alerts available.</Text>
      ) : (
        Object.entries(alerts).map(([date, alertsArray]) => (
          <History key={date} date={date} alertsArray={alertsArray} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  alertSection: {
    marginBottom: 16,
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
});

export default AlertScreen;
