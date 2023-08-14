// import { StyleSheet, Text, View } from "react-native";
// import ExcelScreen from "./ExcelScreen";


// export default function Page() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.main}>
//         <Text style={styles.title}>Hello World</Text>
//         <Text style={styles.subtitle}>This is the first page of your app.</Text>
//       </View>
//       <ExcelScreen />
//     </View>
//   //   <NavigationContainer>
//   //   <Stack.Navigator>
//   //   <Stack.Screen name="Excel Reader" component={ExcelScreen} />
//   // </Stack.Navigator>
//   // </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     padding: 24,
//   },
//   main: {
//     flex: 1,
//     justifyContent: "center",
//     maxWidth: 960,
//     marginHorizontal: "auto",
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     fontSize: 36,
//     color: "#38434D",
//   },
// });
import React from 'react';
import { View, StyleSheet } from 'react-native';
import GoogleSheetReader from './GoogleSheetReader';
import DataTable from './DataTable';
import ExcelToJsonExample from './ExcelToJsonExample';


const App = () => {
  return (
    <View style={styles.container}>
      {/* <GoogleSheetReader /> */}
      {/* <DataTable /> */}
      <ExcelToJsonExample />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default App;
