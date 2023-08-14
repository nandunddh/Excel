import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from 'react-native'
import axios from 'axios'
import { WebView } from 'react-native-webview'

const GoogleSheetReader = () => {
  const spreadsheetId =
    // 'https://docs.google.com/spreadsheets/d/13dC1M4SvysyiAogGLQDqYn7IIqbKW_zEKMmBQWFCjJI/edit?usp=sharing'
    "https://docs.google.com/spreadsheets/d/13dC1M4SvysyiAogGLQDqYn7IIqbKW_zEKMmBQWFCjJI/edit?usp=sharing"
  const range = 'Sheet1!D2' // Assuming the URLs are in column A and other data is in column B
  const apiKey = 'AIzaSyDIpd5CY4qApQ5t_azRPvLPr26gqTiC3HA'

  // const url = 'https://script.googleusercontent.com/macros/echo?user_content_key=a7FYq6zdJBrB5643gSkJ1Gh9mp5IZ7t4v4H6ygtqnIcEA71j5Mk6Vj-RM2hhn77CTGIP4GfVM6xfeI2AuU4GtaS7Vu4gZe_bm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNTpQVOAbO-e10yb5OVf8CJ7SmGZ8jMlfFJnq_VLyDQWB7v3I7vju9c26-ZAB7tm5uQgsUUI_iGq8CtNOIae6bpBAcIoptOhrdz9Jw9Md8uu&lib=MELw67nwW2E5sw1H-VB-MPMWQ4spgb1DD';
  const url =
    'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}'
  const [Plenary, setPlenary] = useState([]);
  const [Keynote, setKeynote] = useState([]);
  const [Oral, setOral] = useState([]);
  const [Sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQVu4gn6Sgp-0VbKUWrpxDd5wVKc96DpiMdAgNx1XBQxcWXz9naPQDML3lIj7CQM71KGFmlL4qHY75d/pubhtml'
          // https://script.google.com/macros/s/AKfycbwkBUU1UZyAq9M1LDOurgTF9983YPPXhz_TZA8G3ADofjRA538vD4MGaF3DIJxUZQb-Yw/exec
          // 'https://sheets.googleapis.com/v4/spreadsheets/YOUR_SPREADSHEET_ID/values/YOUR_RANGE?key=YOUR_API_KEY'
          'https://script.googleusercontent.com/macros/echo?user_content_key=a7FYq6zdJBrB5643gSkJ1Gh9mp5IZ7t4v4H6ygtqnIcEA71j5Mk6Vj-RM2hhn77CTGIP4GfVM6xfeI2AuU4GtaS7Vu4gZe_bm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNTpQVOAbO-e10yb5OVf8CJ7SmGZ8jMlfFJnq_VLyDQWB7v3I7vju9c26-ZAB7tm5uQgsUUI_iGq8CtNOIae6bpBAcIoptOhrdz9Jw9Md8uu&lib=MELw67nwW2E5sw1H-VB-MPMWQ4spgb1DD',
        )
        console.log('first ', response)
        setPlenary(response.data.data);
        setKeynote(response.data.output2);
        setOral(response.data.output3);
        setSessions(response.data.output4);
      } catch (error) {
        console.error('Error fetching sheet data:', error)
      }
    }

    fetchData();

  }, [Plenary, Keynote, Oral, Sessions])

  return (
    <ScrollView>
      <View>

        <View style={[styles.ScientificSessions, { marginBottom: 10 }]}>
          <Text style={{ fontWeight: "bold" }}>Scientific Sessions</Text>
        </View>
        <View>
          <FlatList
            data={Sessions}
            style={styles.flatList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.row}>
                  <Text style={styles.OralProfile}>{item.Sessions}
                  </Text>
                </View>
              </>
            )}
          />
        </View>
      </View>
      <View>
        <View style={styles.heading1}>
          <Text style={{ color: "#fff" }}>Day-1 (November 01,2023)</Text>
        </View>
        <View style={styles.heading2}>
          <Text style={{ fontWeight: "bold" }}>Plenary Presentations | 40 Minutes</Text>
        </View>
        <View>
          <FlatList
            data={Plenary}
            style={styles.flatList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.row}>
                  <>
                    {item.url !== "" && (
                      <Image source={{ uri: item.url }} style={styles.image} />
                    )}
                  </>
                  <Text style={styles.Profile}>{item.Profile}
                    {'\n'}
                    <Text style={styles.name}>{item.Name},<Text style={styles.affiliation}> {item.Affiliation}</Text></Text>
                  </Text>
                </View>
              </>
            )}
          />
        </View>
        <View style={styles.heading2}>
          <Text style={{ fontWeight: "bold" }}>Keynote Presentations | 30 Minutes</Text>
        </View>
        <View>
          <FlatList
            data={Keynote}
            style={styles.flatList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.row}>
                  <>
                    {item.url !== "" && (
                      <Image source={{ uri: item.url }} style={styles.image} />
                    )}
                  </>
                  <Text style={styles.Profile}>{item.Profile}
                    {'\n'}
                    <Text style={styles.name}>{item.Name},<Text style={styles.affiliation}> {item.Affiliation}</Text></Text>
                  </Text>
                </View>
              </>
            )}
          />
        </View>
        <View style={styles.heading2}>
          <Text style={{ fontWeight: "bold" }}>Oral Presentations | 20 Minutes</Text>
        </View>
        <View>
          <FlatList
            data={Oral}
            style={styles.flatList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                <View style={styles.row}>
                  <Text style={styles.OralProfile}>{item.Profile}
                    {'\n'}
                    <Text style={styles.name}>{item.Name},<Text style={styles.affiliation}> {item.Affiliation}</Text></Text>
                  </Text>
                </View>
              </>
            )}
          />
        </View>

      </View >
      <View style={[styles.heading1, { marginBottom: 10 }]}>
        <Text style={{ color: "#fff" }}>Day-2 (November 02,2023) </Text>
      </View>
      <View>
        <FlatList
          data={Oral}
          style={[styles.flatList, { marginBottom: 20 }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <>
              <View style={styles.row}>
                <Text style={styles.OralProfile}>{item.Profile}
                  {'\n'}
                  <Text style={styles.name}>{item.Name},<Text style={styles.affiliation}> {item.Affiliation}</Text></Text>
                </Text>
              </View>
            </>
          )}
        />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flatList: {
    borderWidth: 1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    marginLeft: 0,
    paddingLeft: 0
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
    // borderRightWidth: 1,
    // paddingEnd: 10,
    // marginEnd: 10,
  },
  name: {
    color: "red",
  },
  affiliation: {
    color: "#000",
  },
  heading2: {
    backgroundColor: '#ffc000',
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  heading1: {
    backgroundColor: "#002060",
    alignItems: "center",
    marginTop: 10,
    // marginBottom: 10, 
    padding: 10,
    borderRadius: 20,
  },
  ScientificSessions: {
    backgroundColor: "#ffc000",
    alignItems: "center",
    marginTop: 10,
    // marginBottom: 10, 
    padding: 10,
    borderTopEndRadius: 20,
    borderBottomLeftRadius: 10,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  Profile: {
    paddingHorizontal: 10,
    // borderLeftWidth: 1,
    fontWeight: "bold"
  },
  OralProfile: {
    paddingHorizontal: 10,
    // borderLeftWidth: 1,
    fontWeight: "bold"
  },
});

export default GoogleSheetReader
