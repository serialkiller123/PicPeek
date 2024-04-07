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
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
          icon={({color, size}) => (
            <Ionicons name="lock-closed" size={size} color={color} />
          )}
          labelStyle={{color: 'gray'}}
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
          Downloads
        </Text>
        <DrawerItem
          label="My Photos"
          onPress={() => navigation.navigate('MyPhotos')}
          icon={({color, size}) => (
            <Ionicons name="images-outline" size={size} color={color} />
          )}
          labelStyle={{color: 'white'}}
        />
        <DrawerItem
          label="My Videos"
          onPress={() => navigation.navigate('MyVideos')}
          icon={({color, size}) => (
            <Ionicons name="videocam-outline" size={size} color={color} />
          )}
          labelStyle={{color: 'white'}}
        />
      </View>

      <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
        <Text style={{color: 'grey'}}>Version 1.0</Text>
        <Text style={{color: 'grey'}}>Developed by : Serial Tech</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
