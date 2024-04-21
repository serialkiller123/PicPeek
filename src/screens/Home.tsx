/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {BLACK, WHITE} from '../utils/Colors';
import {NEW_PHOTOS, POPULAR_VIDEOS, getData} from '../utils/Apis';
import PhotoItem from '../components/PhotoItem';
import VideoItem from '../components/VideoItem';
import {useNavigation} from '@react-navigation/native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-1666861944997422/9152643628';

const LoadingSkeleton = () => {
  return (
    <View style={{flexDirection: 'row', marginTop: 20}}>
      {[1, 2, 3].map((_, index) => (
        <View
          key={index}
          style={{
            width: 300,
            height: 200,
            borderRadius: 10,
            marginLeft: 20,
            backgroundColor: '#f0f0f0',
          }}
        />
      ))}
    </View>
  );
};
const Home: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getPhotos();
    getVideos();
  }, []);

  const getPhotos = () => {
    getData(NEW_PHOTOS, '?per_page=10').then(res => {
      console.log('photos', res);
      setPhotos(res.photos);
    });
  };

  const getVideos = () => {
    getData(POPULAR_VIDEOS, '?per_page=10').then(res => {
      console.log('videos', res);
      setVideos(res.videos);
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.topView}>
        <Image
          source={require('../images/banner2.jpg')}
          style={styles.banner}
        />
        <View style={styles.transLayout}>
          <View style={styles.headingView}>
            <Text style={styles.logo}>PicPeek</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
              }}>
              <IonIcons
                style={styles.logo}
                name="menu"
                size={25}
                color={WHITE}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Search');
            }}
            style={styles.searchBox}>
            <Image
              source={require('../images/search.png')}
              style={styles.search}
            />
            <Text style={styles.placeholder}>
              Search Photos/Videos here....
            </Text>
          </TouchableOpacity>
          <Text style={styles.tagline}>Search 1000+ Photos/Videos here</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.headingView}>
          <Text style={styles.heading}>New Photos</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllPhotos');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.heading,
                  {
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                    marginRight: 5,
                  },
                ]}>
                All Photos
              </Text>
              <FontAwesome name="angle-double-right" size={18} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          {photos.length > 0 ? (
            <FlatList
              data={photos}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginTop: 20}}
              renderItem={({item, index}) => {
                return <PhotoItem item={item} />;
              }}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>New Videos</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllVideos');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={[
                  styles.heading,
                  {
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                    marginRight: 5,
                  },
                ]}>
                All Videos
              </Text>
              <FontAwesome name="angle-double-right" size={18} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.listView}>
          {videos.length > 0 ? (
            <FlatList
              data={videos}
              contentContainerStyle={{marginTop: 20}}
              showsHorizontalScrollIndicator={false}
              horizontal
              renderItem={({item, index}) => {
                return <VideoItem item={item} />;
              }}
            />
          ) : (
            <LoadingSkeleton />
          )}
        </View>
        <View style={styles.headingView}>
          <Text style={styles.heading}>Downloads</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}>
            <Text
              style={[
                styles.heading,
                {fontWeight: '500', textDecorationLine: 'underline'},
              ]}>
              More
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomlistView}>
          <TouchableOpacity
            style={[styles.DButtons, {backgroundColor: 'indigo'}]}
            onPress={() => {
              navigation.navigate('MyPhotos');
            }}>
            <Ionicons name="images-outline" size={26} color={'white'} />
            <Text style={{color: 'white'}}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.DButtons, {backgroundColor: 'purple'}]}
            onPress={() => {
              navigation.navigate('MyVideos');
            }}>
            <Ionicons name="play-circle-outline" size={26} color={'white'} />
            <Text style={{color: 'white'}}>Videos</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  topView: {
    width: '100%',
    height: '40%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  transLayout: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
  },
  logo: {
    fontSize: 30,
    color: WHITE,
    fontWeight: '600',
    marginTop: 40,
    marginLeft: 15,
  },
  searchBox: {
    width: '90%',
    height: 50,
    backgroundColor: WHITE,
    alignSelf: 'center',
    marginTop: 70,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  search: {
    width: 30,
    height: 30,
  },
  placeholder: {
    fontSize: 16,
    color: '#9e9e9e',
    marginLeft: 15,
  },
  typeIcon: {
    width: 20,
    height: 20,
    tintColor: 'purple',
  },
  tagline: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  headingView: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: BLACK,
  },
  listView: {marginBottom: 20},
  bottomlistView: {
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  DButtons: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    // backgroundColor: 'yellow',
    paddingVertical: 15,
  },
});
