import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const TableExample = () => {
  const spreadsheetId = "https://docs.google.com/spreadsheets/d/13dC1M4SvysyiAogGLQDqYn7IIqbKW_zEKMmBQWFCjJI/edit?usp=sharing"
  const range = 'Sheet1!D2' // Assuming the URLs are in column A and other data is in column B
  const apiKey = 'AIzaSyDIpd5CY4qApQ5t_azRPvLPr26gqTiC3HA'
  const url =
    'https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}'
  const [sheetData, setSheetData] = useState([])
  useEffect(() => {
    const fetchSheetData = async () => {
      try {
        const response = await axios.get(
          'https://script.googleusercontent.com/macros/echo?user_content_key=a7FYq6zdJBrB5643gSkJ1Gh9mp5IZ7t4v4H6ygtqnIcEA71j5Mk6Vj-RM2hhn77CTGIP4GfVM6xfeI2AuU4GtaS7Vu4gZe_bm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNTpQVOAbO-e10yb5OVf8CJ7SmGZ8jMlfFJnq_VLyDQWB7v3I7vju9c26-ZAB7tm5uQgsUUI_iGq8CtNOIae6bpBAcIoptOhrdz9Jw9Md8uu&lib=MELw67nwW2E5sw1H-VB-MPMWQ4spgb1DD',
        )
        console.log('first ', response.data.data)
        setSheetData(response.data.data)
      } catch (error) {
        console.error('Error fetching sheet data:', error)
      }
    }

    fetchSheetData();
  }, [sheetData])
  return (
    <View>

      <View style={{ backgroundColor: "#002060", alignItems: "center", marginTop: 10, marginBottom: 10, padding: 10, borderRadius: 20 }}>
        <Text style={{ color: "#fff" }}>Day-1 (November 01,2023)</Text>
      </View>
      <View style={{ backgroundColor: '#ffc000', alignItems: "center", padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>Plenary Presentations | 40 Minutes</Text>
      </View>
      {/* <DataTable style={styles.container}>
        {sheetData &&
          sheetData.map((row, index) => (
            // <DataTable.Header style={styles.tableHeader}>
            //   <DataTable.Title>Name</DataTable.Title>
            //   <DataTable.Title>index</DataTable.Title>
            //   <DataTable.Title>Image</DataTable.Title>
            // </DataTable.Header>
            // <Text key={index}>{JSON.stringify(row)}</Text>
            (
              <>
                <DataTable.Row key={index}>
                  {row.url !== "" && (
                    <DataTable.Cell style={{ flex: 1, borderWidth: 1 }}>
                      <Image source={{ uri: row.url }} style={styles.image} />

                    </DataTable.Cell>
                  )}
                  <DataTable.Cell style={{ flex: 3, alignItems: "flex-start" }}>
                    <Text numberOfLines={2} style={{fontSize: 10}}> {row.Name}</Text>
                  </DataTable.Cell>
                  {/* <DataTable.Cell style={{ alignItems: "center", borderWidth: 1, alignText: "center" }}>{row.Index}</DataTable.Cell> */}

      {/* </DataTable.Row >
              </>
            )
          ))}
      </DataTable > */}

      <View>
        {sheetData &&
          sheetData.map((row, index) => (
            <>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }} key={index}>
                {/* <Row data={state.tableHead} style={styles.head} textStyle={styles.text} /> */}
                
                <Rows data={row} textStyle={styles.text} />
              </Table>
            </>
          ))
        }
      </View>
    </View >
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  image: {
    width: 80,
    height: 50
  },
  author: {
    fontSize: 14,
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});
