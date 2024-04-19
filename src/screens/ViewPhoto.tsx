import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WHITE, THEME_COLOR} from '../utils/Colors';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1666861944997422/3320565158';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['games', 'fashion', 'clothing'],
});

const ViewPhoto: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const [downloading, setDownloading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  console.log('photo data', route.params.data);

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

  const downloadFile = async () => {
    setDownloading(true);
    const date = new Date().getTime();
    const path = RNFS.DownloadDirectoryPath + '/img_' + date + '.jpg';
    try {
      await RNFS.downloadFile({
        fromUrl: route.params.data.src.original,
        toFile: path,
      }).promise;

      console.log('file downloaded successfully');

      ToastAndroid.show('Download completed', ToastAndroid.SHORT);
      interstitial.show();
      // Save the downloaded photo path to AsyncStorage
      const existingPhotos = await AsyncStorage.getItem('downloadedPhotos');
      const updatedPhotos = existingPhotos
        ? JSON.parse(existingPhotos).concat(path)
        : [path];
      await AsyncStorage.setItem(
        'downloadedPhotos',
        JSON.stringify(updatedPhotos),
      );
    } catch (err) {
      console.log(err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <Image
        source={{uri: route.params.data.src.original}}
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
                title: 'Image Share',
                url: route.params.data.src.original,
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
      <Text style={styles.photographer}>
        {'Photographer: ' + route.params.data.photographer}
      </Text>
    </View>
  );
};

export default ViewPhoto;

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
