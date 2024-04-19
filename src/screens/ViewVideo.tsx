import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Video from 'react-native-video';
import Share from 'react-native-share';
import Slider from '@react-native-community/slider';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VideoPlayer from 'react-native-video-player';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1666861944997422/6115416743';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['games', 'fashion', 'clothing'],
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ViewVideo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [isClicked, setIsClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  console.log('photo data', route.params.data);
  const [progress, setProgress] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

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

  const downloadFile = async () => {
    setDownloading(true);
    const date = new Date().getTime();
    console.log(date);
    const path = RNFS.DownloadDirectoryPath + '/video_' + date + '.mp4';
    try {
      await RNFS.downloadFile({
        fromUrl: route.params.data.video_files[0].link,
        toFile: path,
      }).promise;

      console.log('file downloaded successfully');

      ToastAndroid.show('Download completed', ToastAndroid.SHORT);
      interstitial.show();
      // Save the downloaded video path to AsyncStorage
      const existingVideos = await AsyncStorage.getItem('downloadedVideos');
      const updatedVideos = existingVideos
        ? JSON.parse(existingVideos).concat(path)
        : [path];
      await AsyncStorage.setItem(
        'downloadedVideos',
        JSON.stringify(updatedVideos),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
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
          {downloading ? (
            <ActivityIndicator size="large" color={THEME_COLOR} />
          ) : (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                downloadFile();
              }}>
              <Image
                source={require('../images/download.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.backBtn, {marginLeft: 20}]}
            onPress={() => {
              Share.open({
                title: 'Video Share',
                url: route.params.data.video_files[0].link,
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
          video={{uri: route.params.data.video_files[0].link}}
          // videoWidth={'100%'}
          // videoHeight={200}
          autoplay={true}
          showDuration
          fullScreenOnLongPress
          thumbnail={{uri: route.params.data.video_files[0].link}}
        />
      </View>
      <Text style={styles.photographer}>
        {'Photographer: ' + route.params.data.user.name}
      </Text>
    </View>
  );
};

export default ViewVideo;
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
