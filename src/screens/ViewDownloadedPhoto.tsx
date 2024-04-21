/* eslint-disable prettier/prettier */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Share from 'react-native-share';
import {WHITE, THEME_COLOR} from '../utils/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewDownloadedPhoto: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  console.log('photo data', route.params.data);

  const deleteDownloadedFile = async filePath => {
    try {
      // Show confirmation prompt
      const confirmed = await new Promise(resolve => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this photo?',
          [
            {
              text: 'Cancel',
              onPress: () => resolve(false),
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => resolve(true),
            },
          ],
          {cancelable: false},
        );
      });

      // If confirmed, proceed with deletion
      if (confirmed) {
        // Delete the file
        await RNFS.unlink(filePath);
        console.log('File deleted successfully');

        // Remove the path from AsyncStorage
        const existingPhotos = await AsyncStorage.getItem('downloadedPhotos');
        if (existingPhotos) {
          const updatedPhotos = JSON.parse(existingPhotos).filter(
            photoPath => photoPath !== filePath,
          );
          await AsyncStorage.setItem(
            'downloadedPhotos',
            JSON.stringify(updatedPhotos),
          );
          console.log('Path removed from AsyncStorage');
          ToastAndroid.show('Photo deleted!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <Image
        source={{uri: `file://${route.params.data}`}}
        style={styles.photo}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            style={[styles.backBtn, {marginLeft: 20}]}
            onPress={() => {
              deleteDownloadedFile(route.params.data);
            }}>
            <Ionicons name="trash" size={24} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backBtn, {marginLeft: 20}]}
            onPress={() => {
              Share.open({
                title: 'Image Share',
                url: `file://${route.params.data}`,
              })
                .then(res => {
                  console.log(res);
                })
                .catch(err => {
                  err && console.log(err);
                });
            }}>
            <Image
              source={require('../images/share.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text style={styles.photographer}>
        {'Photographer: ' + route.params.data.photographer}
      </Text> */}
    </View>
  );
};

export default ViewDownloadedPhoto;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    position: 'absolute',
    marginTop: 55,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  photographer: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
});
