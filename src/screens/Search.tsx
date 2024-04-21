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
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import Modal from 'react-native-modal';
import {SEARCH_PHOTOS, SEARCH_VIDEOS, searchData} from '../utils/Apis';
import PhotoGrid from '../components/PhotoGrid';
import VideoGrid from '../components/VideoGrid';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Ionicons from 'react-native-vector-icons/Ionicons';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-1666861944997422/5568621832';

const Search = () => {
  const navigation = useNavigation();
  const [type, setType] = useState(0);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = async () => {
    try {
      setLoading(true);
      let res;
      if (type === 0) {
        res = await searchData(SEARCH_PHOTOS, search);
        setPhotos(res.photos);
      } else {
        res = await searchData(SEARCH_VIDEOS, search);
        setVideos(res.videos);
      }
      console.log(res);
    } catch (error) {
      console.error('Error during search:', error);
      // Handle the error here, such as displaying an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={THEME_COLOR} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.searchBox}>
        <TouchableOpacity
          style={styles.dropBtn}
          onPress={() => {
            setShowTypeModal(true);
          }}>
          <Image
            source={
              type == 0
                ? require('../images/photo.png')
                : require('../images/play.png')
            }
            style={styles.typeIcon}
          />
          <Image
            source={require('../images/down.png')}
            style={[styles.typeIcon, {marginLeft: 10}]}
          />
        </TouchableOpacity>
        <TextInput
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          placeholder="Search here...."
          placeholderTextColor="#999"
        />
        {search !== '' && (
          <TouchableOpacity
            onPress={() => {
              setSearch('');
              setPhotos([]);
              setVideos([]);
            }}>
            <Ionicons name="close-outline" size={26} color={'grey'} />
          </TouchableOpacity>
        )}
      </View>

      {search !== '' && (
        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => {
            Keyboard.dismiss();
            doSearch();
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color="white"
                style={{marginRight: 5}}
              />
            ) : null}
            <Text style={styles.searchTitle}>
              {loading ? 'Searching...' : 'Search'}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      {type == 0 ? (
        <FlatList
          numColumns={2}
          data={photos}
          renderItem={({item, index}) => {
            return <PhotoGrid item={item} />;
          }}
        />
      ) : (
        <FlatList
          data={videos}
          numColumns={2}
          renderItem={({item, index}) => {
            return <VideoGrid item={item} />;
          }}
        />
      )}
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
      <Modal
        onBackdropPress={() => {
          setShowTypeModal(false);
        }}
        onBackButtonPress={() => {
          setShowTypeModal(false);
        }}
        isVisible={showTypeModal}
        backdropOpacity={0.3}
        style={{margin: 0}}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.typeItem}
            onPress={() => {
              setType(0);
              setShowTypeModal(false);
            }}>
            <Image
              source={require('../images/photo.png')}
              style={styles.typeIcon}
            />
            <Text style={styles.title}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.typeItem}
            onPress={() => {
              setType(1);
              setShowTypeModal(false);
            }}>
            <Image
              source={require('../images/play.png')}
              style={styles.typeIcon}
            />
            <Text style={styles.title}>Videos</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Search;
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
    color: 'black',
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
    marginLeft: 15,
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
