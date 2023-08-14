import React from 'react';
import { View, Text, Button } from 'react-native';
import XLSX from 'xlsx';


const ExcelToJsonExample = () => {
  const handleConvertToJSON = async () => {
    try {
      const path = require('../assets/pres.xlsx'); // Change this to the actual path of your Excel file
      const workbook = await XLSX.readFile(path);
      const sheetName = workbook.SheetNames[0]; // Assuming you want to convert the first sheet
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      console.log('JSON Data:', jsonData);
    } catch (error) {
      console.error('Error reading Excel:', error);
    }
  };

  return (
    <View>
      <Button title="Convert to JSON" onPress={handleConvertToJSON} />
    </View>
  );
};

export default ExcelToJsonExample;
