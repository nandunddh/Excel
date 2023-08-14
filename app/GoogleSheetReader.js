import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview'

const GoogleSheetReader = () => {
  const spreadsheetId =
    // 'https://docs.google.com/spreadsheets/d/13dC1M4SvysyiAogGLQDqYn7IIqbKW_zEKMmBQWFCjJI/edit?usp=sharing'
    "https://docs.google.com/spreadsheets/d/13dC1M4SvysyiAogGLQDqYn7IIqbKW_zEKMmBQWFCjJI/edit?usp=sharing"
  const range = 'Sheet1!C2' // Assuming the URLs are in column A and other data is in column B
  const apiKey = 'AIzaSyDIpd5CY4qApQ5t_azRPvLPr26gqTiC3HA'

  // const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=a7FYq6zdJBrB5643gSkJ1Gh9mp5IZ7t4v4H6ygtqnIcEA71j5Mk6Vj-RM2hhn77CTGIP4GfVM6xfeI2AuU4GtaS7Vu4gZe_bm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNTpQVOAbO-e10yb5OVf8CJ7SmGZ8jMlfFJnq_VLyDQWB7v3I7vju9c26-ZAB7tm5uQgsUUI_iGq8CtNOIae6bpBAcIoptOhrdz9Jw9Md8uu&lib=MELw67nwW2E5sw1H-VB-MPMWQ4spgb1DD';
  const url =
    'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}'
  const [sheetData, setSheetData] = useState([])

  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await axios.get(
          // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVu4gn6Sgp-0VbKUWrpxDd5wVKc96DpiMdAgNx1XBQxcWXz9naPQDML3lIj7CQM71KGFmlL4qHY75d/pubhtml'
          // https://script.google.com/macros/s/AKfycbwkBUU1UZyAq9M1LDOurgTF9983YPPXhz_TZA8G3ADofjRA538vD4MGaF3DIJxUZQb-Yw/exec
          // 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/YOUR_RANGE?key=YOUR_API_KEY'
          'https://script.googleusercontent.com/macros/echo?user_content_key=a7FYq6zdJBrB5643gSkJ1Gh9mp5IZ7t4v4H6ygtqnIcEA71j5Mk6Vj-RM2hhn77CTGIP4GfVM6xfeI2AuU4GtaS7Vu4gZe_bm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNTpQVOAbO-e10yb5OVf8CJ7SmGZ8jMlfFJnq_VLyDQWB7v3I7vju9c26-ZAB7tm5uQgsUUI_iGq8CtNOIae6bpBAcIoptOhrdz9Jw9Md8uu&lib=MELw67nwW2E5sw1H-VB-MPMWQ4spgb1DD',
        )
        console.log('first ', response.data.data[3])
        setSheetData(response.data.data)
      } catch (error) {
        console.error('Error fetching sheet data:', error)
      }
    }

    fetchSheetData();

    function convertToJSON(data) {
      const jsonData = data.map((row) => {
        return {
          imageUrl: row[0], // Assuming URL is in column A
          otherData: row[1], // Assuming other data is in column B
        }
      })
      return jsonData
    }

    // axios.get(url)
    // .then(response => {
    //   const data = response.data.values;
    //   const jsonData = convertToJSON(data);
    //   console.log("jsonData ",jsonData);
    // })
    // .catch(error => {
    //   console.error('Error fetching data jsonData:', error);
    // });
    // axios
    //   .get(url)
    //   .then((response) => {
    //     const data = response.data.values
    //     console.log('data === ', data)
    //     if (data) {
    //       const jsonData = convertToJSON(data)
    //       console.log(jsonData)
    //     } else {
    //       console.error('No data found in API response.')
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data Json:', error)
    //   })
  }, [])

  return (
    // <View>
    //   {sheetData &&
    //     sheetData.map((row, index) => (
    //       <Text key={index}>{JSON.stringify(row)}</Text>
    //     ))}
    // </View>
    <View>
       <FlatList
        data={sheetData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.Name}</Text>
            <Text>{item.Index}</Text>
            {/* {item.profile.valueType === 'IMAGE' && (
              <Image source={{ uri: item.profile.url }} style={styles.image} />
              )} */}
              <Image source={{ uri: item.url.url }} style={styles.image} />
          </View>
        )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
});

export default GoogleSheetReader
