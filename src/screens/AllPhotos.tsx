import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {WHITE, THEME_COLOR} from '../utils/Colors';
import {NEW_PHOTOS, getData} from '../utils/Apis';
import PhotoGrid from '../components/PhotoGrid';
import {SafeAreaView} from 'react-native-safe-area-context';

const AllPhotos: React.FC = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = () => {
    setLoading(true);
    getData(NEW_PHOTOS, `?per_page=10&page=${page}`)
      .then(res => {
        console.log('photos', res);
        setPhotos(prevPhotos => [...prevPhotos, ...res.photos]);
        setPage(prevPage => prevPage + 1);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setLoading(false);
      });
  };

  const handleLoadMore = () => {
    if (!loading) {
      getPhotos();
    }
  };

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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.heading]}>New Photos</Text>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={photos}
          numColumns={2}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item, index}) => {
            return <PhotoGrid item={item} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            loading && <ActivityIndicator size="large" color={THEME_COLOR} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default AllPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  headingView: {
    width: '90%',
    alignSelf: 'center',
    // marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME_COLOR,
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
});
