/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {View, Image, Text, Linking} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {THEME_COLOR, WHITE} from '../utils/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

const appVersion = DeviceInfo.getVersion();

const CustomDrawerContent = props => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: THEME_COLOR}}>
      {/* Logo Image */}
      <View style={{alignItems: 'center', marginVertical: 20}}>
        <Image
          source={require('../images/logo.png')}
          style={{width: 200, height: 200}}
          resizeMode="contain"
        />
      </View>

      {/* Drawer Content */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Privacy Policy"
          onPress={() =>
            Linking.openURL('https://sites.google.com/view/picpeek/home')
          }
          icon={({color, size}) => (
            <Ionicons name="lock-closed" size={size} color={'purple'} />
          )}
          labelStyle={{color: 'white'}}
        />
      </DrawerContentScrollView>
      {/* Downloads Section */}
      <View style={{paddingHorizontal: 20}}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          <Ionicons name="download-outline" size={20} color={'white'} />
          {'  '}
          Downloads
        </Text>
        <DrawerItem
          label="My Photos"
          onPress={() => navigation.navigate('MyPhotos')}
          icon={({color, size}) => (
            <Ionicons name="images-outline" size={size} color={'purple'} />
          )}
          labelStyle={{color: 'white'}}
        />
        <DrawerItem
          label="My Videos"
          onPress={() => navigation.navigate('MyVideos')}
          icon={({color, size}) => (
            <Ionicons name="videocam-outline" size={size} color={'purple'} />
          )}
          labelStyle={{color: 'white'}}
        />
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'grey', fontSize: 9}}>
          Developed by : SerialTechLab
        </Text>
        <Text style={{color: 'grey', fontSize: 9}}>Version {appVersion}</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
