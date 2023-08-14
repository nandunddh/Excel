import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';

const ExcelScreen = () => {
  const [data, setData] = useState([]);

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: DocumentPicker.types.allFiles,
      });

      if (result.type === 'success') {
        const fileUri = result.uri;
        const fileExtension = fileUri.split('.').pop();

        if (fileExtension === 'xls' || fileExtension === 'xlsx') {
          const response = await fetch(fileUri);
          const blob = await response.blob();
          const fileReader = new FileReader();

          fileReader.onload = async (event) => {
            const arrayBuffer = event.target.result;
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            setData(excelData);
          };

          const arrayBuffer = await blob.arrayBuffer();
          fileReader.readAsArrayBuffer(new Blob([arrayBuffer]));
        }
      }
    } catch (error) {
      console.log('Error picking document:', error);
    }
  };

  return (
    <View>
      <Button title="Pick Excel File" onPress={handlePickDocument} />
      {data.map((row, index) => (
        <Text key={index}>{row.join('\t')}</Text>
      ))}
    </View>
  );
};

export default ExcelScreen;
