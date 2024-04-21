/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
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
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Video from 'react-native-video';
import Share from 'react-native-share';
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from 'react-native-video-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ViewDownloadedVideo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isClicked, setIsClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  console.log('video data', route.params.data);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      setPaused(true);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setIsClicked(false);
      }, 5000);
    }
  }, [isClicked]);
  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const deleteDownloadedFile = async filePath => {
    try {
      // Show confirmation prompt
      const confirmed = await new Promise(resolve => {
        Alert.alert(
          'Confirm Deletion',
          'Are you sure you want to delete this video?',
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
        const existingVideos = await AsyncStorage.getItem('downloadedVideos');
        if (existingVideos) {
          const updatedVideos = JSON.parse(existingVideos).filter(
            photoPath => photoPath !== filePath,
          );
          await AsyncStorage.setItem(
            'downloadedVideos',
            JSON.stringify(updatedVideos),
          );
          console.log('Path removed from AsyncStorage');
          ToastAndroid.show('Video deleted!', ToastAndroid.SHORT);
          navigation.goBack();
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={BLACK} />

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
                title: 'Video Share',
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
      <View style={styles.videoView}>
        <VideoPlayer
          video={{uri: `file://${route.params.data}`}}
          autoplay={true}
          // videoWidth={'100%'}
          // videoHeight={200}
          showDuration
          fullScreenOnLongPress
          thumbnail={{uri: `file://${route.params.data}`}}
        />
      </View>
    </View>
  );
};

export default ViewDownloadedVideo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 10,
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
  video: {
    width: '100%',
    height: 200,
  },
  videoView: {
    width: '100%',
    height: 200,
  },
  playBtn: {
    width: 40,
    height: 40,
    tintColor: WHITE,
  },
  sliderView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  time: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  slider: {width: '76%', height: 40},
});
