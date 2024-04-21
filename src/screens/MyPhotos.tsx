/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Modal from 'react-native-modal';
import PhotoGrid from '../components/PhotoGrid';
import DownloadedPhotoGrid from '../components/DownloadedPhotogrid';
import checkMediaPermissions from '../utils/permisions';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import {SafeAreaView} from 'react-native-safe-area-context';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-1666861944997422/8610552297';

const MyPhotos = () => {
  const navigation = useNavigation();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [downloadedPhotos, setDownloadedPhotos] = useState([]);

  const fetchDownloadedPhotos = async () => {
    try {
      const photos = await AsyncStorage.getItem('downloadedPhotos');
      if (photos) {
        setDownloadedPhotos(JSON.parse(photos));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect to fetch downloaded photos when the component mounts
  useEffect(() => {
    checkMediaPermissions();
    fetchDownloadedPhotos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchDownloadedPhotos();
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={WHITE} />
      <View style={styles.headingView}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../images/back.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={[styles.heading, {fontWeight: '500'}]}>
          Downloaded Photos
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {downloadedPhotos.length > 0 ? (
          <FlatList
            numColumns={2}
            data={downloadedPhotos}
            renderItem={({item, index}) => {
              return <DownloadedPhotoGrid item={item} />;
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={{color: 'grey'}}>No downloads available</Text>
        )}
      </View>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </SafeAreaView>
  );
};

export default MyPhotos;
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
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: BLACK,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  headingView: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: BLACK,
    marginLeft: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: WHITE,
  },
  photographer: {
    fontSize: 18,
    color: 'white',
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  searchBox: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    borderColor: '#9e9e9e',
    alignItems: 'center',
  },
  typeIcon: {
    width: 20,
    height: 20,
  },
  input: {
    color: BLACK,
    marginLeft: 20,
    width: '65%',
  },
  dropBtn: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingLeft: 10,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingRight: 10,
  },
  modalView: {
    width: '100%',
    height: 150,
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  typeItem: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    marginLeft: 15,
    fontSize: 16,
    color: BLACK,
    fontWeight: '500',
  },
  searchBtn: {
    width: '90%',
    height: 50,
    backgroundColor: THEME_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 8,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
