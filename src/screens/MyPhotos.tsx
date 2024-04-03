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
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Modal from 'react-native-modal';
import PhotoGrid from '../components/PhotoGrid';
import DownloadedPhotoGrid from '../components/DownloadedPhotogrid';
import checkMediaPermissions from '../utils/permisions';
const MyPhotos = () => {
  const navigation = useNavigation();
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [downloadedPhotos, setDownloadedPhotos] = useState([]);

  useEffect(() => {
    checkMediaPermissions();
    const getDownloadedPhotos = async () => {
      try {
        const photos = await AsyncStorage.getItem('downloadedPhotos');
        if (photos) {
          setDownloadedPhotos(JSON.parse(photos));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getDownloadedPhotos();
  }, []);

  return (
    <View style={styles.container}>
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
      <View>
        <FlatList
          numColumns={2}
          data={downloadedPhotos}
          renderItem={({item, index}) => {
            return <DownloadedPhotoGrid item={item} />;
          }}
        />
      </View>
    </View>
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
    marginTop: 40,
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
    marginTop: 55,
    marginLeft: 15,
  },
  headingView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: BLACK,
    marginTop: 55,
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
