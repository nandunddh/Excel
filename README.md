# Excel

function doGet(req){
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName('Sheet1');
  var values = sheet.getDataRange().getValues();

  var output = [];

  for(var i = 0; i < values.length; i++) {
    var row = {};
    row['Name'] = values[i][0];
    row['Index'] = values[i][1];
    row['profile'] = values[i][2];
    output.push(row);

  }

  return ContentService.createTextOutput(JSON.stringify({data : output})).setMimeType(ContentService.MimeType.JSON);
