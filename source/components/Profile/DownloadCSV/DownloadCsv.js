// import React, {useEffect, useState} from 'react';
// import {View, Text, Button, PermissionsAndroid} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import RNFetchBlob from 'rn-fetch-blob';

// const DownloadCsv = () => {
//   const [csvData, setCsvData] = useState([]);

//   useEffect(() => {
//     const uploadCsvData = async () => {
//       try {
//         const collectionRef = firestore().collection('users');
//         await collectionRef.doc('data').set({data: csvData});
//         console.log('CSV data uploaded successfully');
//         setCsvData(collectionRef);
//       } catch (error) {
//         console.error('Error uploading CSV data:', error);
//       }
//     };

//     uploadCsvData();
//   }, []);

//   const requestStoragePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         downloadCsv();
//       } else {
//         console.log('Permission denied');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const downloadCsv = () => {
//     // Convert the JSON data back to CSV format
//     const csvContent = csvData
//       .map(entry => Object.values(entry).join(','))
//       .join('\n');

//     // Directory where the file will be saved
//     const dir = RNFetchBlob.fs.dirs.DownloadDir;

//     // File path to save the CSV
//     const filePath = `${dir}/data.csv`;

//     // Write the CSV data to the file
//     RNFetchBlob.fs
//       .writeFile(filePath, csvContent, 'utf-8')
//       .then(() => {
//         console.log('CSV file saved:', filePath);
//       })
//       .catch(error => {
//         console.error('Error saving CSV file:', error);
//       });
//   };

//   return (
//     <View>
//       {csvData.length > 0 ? (
//         <View>
//           <Text>CSV Data Downloaded</Text>
//           <Button title="Download CSV" onPress={requestStoragePermission} />
//         </View>
//       ) : (
//         <Text>CSV data is being fetched...</Text>
//       )}
//     </View>
//   );
// };

// export default DownloadCsv;
