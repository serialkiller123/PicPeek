/* eslint-disable react/no-unstable-nested-components */
import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Search from './screens/Search';
import ViewPhoto from './screens/ViewPhoto';
import ViewVideo from './screens/ViewVideo';
import MyPhotos from './screens/MyPhotos';
import ViewDownloadedPhoto from './screens/ViewDownloadedPhoto';
import MyVideos from './screens/MyVideos';
import ViewDownloadedVideo from './screens/ViewDownloadedVideo';
import AllPhotos from './screens/AllPhotos';
import AllVideos from './screens/AllVideos';
import {THEME_COLOR, WHITE} from './utils/Colors';
import CustomDrawerContent from './components/CustomeDrwawerContent';
import IonIcons from 'react-native-vector-icons/Ionicons';
const stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreen = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="Search"
        component={Search}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="AllPhotos"
        component={AllPhotos}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="AllVideos"
        component={AllVideos}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewPhoto"
        component={ViewPhoto}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewVideo"
        component={ViewVideo}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="MyPhotos"
        component={MyPhotos}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewDownloadedPhoto"
        component={ViewDownloadedPhoto}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="MyVideos"
        component={MyVideos}
        options={{headerShown: false}}
      />
      <stack.Screen
        name="ViewDownloadedVideo"
        component={ViewDownloadedVideo}
        options={{headerShown: false}}
      />
    </stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: WHITE,
          drawerActiveTintColor: THEME_COLOR,
        }}>
        <Drawer.Screen
          name="PicPeek"
          component={HomeScreen}
          options={{
            drawerIcon: ({focused, color, size}) => (
              <IonIcons
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={'purple'}
              />
            ),
          }}
        />
        {/* <Drawer.Screen name="Article" component={Article} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
